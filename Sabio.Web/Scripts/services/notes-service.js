(function () {
    'use strict';

    angular.module(APPNAME)
        .service('notesService', notesService);

    /*
    A "note" looks like this:
    {
        "id": 1, // auto-generated, starts at 1,
        "revision": 1, // incremented every time we save the note
        "type": "text", // could be anything: "text", "markdown", "youtube", "graphviz", etc.
        "body": null,
        "parents": [] // ids of parent, or 0 if this is a top-level note.
                      // DO NOT directly modify this array. Only use functions from inside notesService to add/remove child notes!!
        "dateCreated": auto-populated Date object
        "dateModified": auto-populated Date object
    }
    */

    /*
    Angular messages that are broadcast from $rootScope:

    When a note is saved:
    "note:saved:12345"         data: none

    When a note's child was saved:
    "note:child-saved:12345"   data: [childId, childId, ...]

    When one or more of a note's children are unlinked:
    "note:child-unlinked:12345"  data: [childId, childId, ...]
    */

    notesService.$inject = ['$q', '$rootScope'];

    function notesService($q, $rootScope) {
        var svc = this;

        svc.getById = _getById;
        svc.getChildCount = _getChildCount;
        svc.getChildNotes = _getChildNotes;
        svc.getChildNoteIds = _getChildNoteIds;
        svc.getNotesWithTag = _getNotesWithTag;
        svc.saveNote = _saveNote;
        svc.unlinkNotesFromParent = _unlinkNotesFromParent;
        svc.linkNotesToParent = _linkNotesToParent;


        // ↑↑↑↑↑↑↑↑ PUBLIC INTERFACE

        // ↓↓↓↓↓↓↓↓ INTERNAL implementation details below

        var dbPromise = idb.open('user-data', 3, function (upgradeDb) {
            // This is the "database migration" portion:
            switch (upgradeDb.oldVersion) {
                case 0:
                    var store = upgradeDb.createObjectStore('notes', { keyPath: 'id', unique: true, autoIncrement: true });
                    store.createIndex('parents', 'parents', { unique: false, multiEntry: true });
                case 1:
                    upgradeDb.transaction.objectStore('notes')
                        .createIndex('dateCreated', 'dateCreated', { unique: false, multiEntry: true });
                case 2:
                    upgradeDb.transaction.objectStore('notes')
                        .createIndex('tags', 'tags', { unique: false, multiEntry: true });
            }
        });

        function log(){
            console.log.apply(console, arguments);
        }

        function broadcast(message, data){
            log('$broadcast ' + message, data);
            $rootScope.$broadcast(message, data);
        }

        function _getById(id) {
            log('notesService.getById', id);

            var promise =
                dbPromise.then(db =>
                    db.transaction('notes')
                        .objectStore('notes')
                        .get(id));

            return $q(function(resolve, reject){
                promise.then(resolve, reject);
            });
        }

        function _saveNote(note) {
            log('notesService.saveNote id:' + note.id, note);
        
            if (!note.parents || note.parents.length == 0) {
                throw new Error("Invalid parents array on note");
            }

            var seen = {};
            for (var i = 0; i < note.parents.length; i++) {
                var parentId = note.parents[i];
                if (seen[parentId]) {
                    throw new Error("Duplicate parent ID: " + parentId);
                }
                seen[parentId] = true;
            }

            // attach dates to the note. angular.toJson will convert these dates to strings
            if (!note.dateCreated){
                note.dateCreated = new Date();
            }
            note.dateModified = new Date();

            if (note.revision){
                note.revision += 1;
            }
            else {
                note.revision = 1;
            }

            // assertion: at this point, we know this is a valid note

            var noteToSave = angular.copy(note);
            delete noteToSave.$$hashkey; // todo: remove angular stuff recursively

            var promise =
                dbPromise.then(db =>
                    db.transaction('notes', 'readwrite')
                        .objectStore('notes')
                        .put(noteToSave)
                        .then(newId => {
                            note.id = newId;
                            noteToSave.id = newId; // mutate original note instance

                            // let the rest of the program know this note has changed
                           broadcast('note:saved:' + noteToSave.id, noteToSave);

                            // let every parent note know that the child has changed
                            for (var parentId of noteToSave.parents){
                                broadcast('note:child-changed:' + parentId, { childId: noteToSave.id });
                            }

                            return newId;
                        }));

            return $q(function(resolve, reject){
                promise.then(resolve, reject);
            });
        }


        function _getChildNotes(parentId) {
            log('notesService.getChildNotes', parentId);

            var promise =
                dbPromise.then(db =>
                    db.transaction('notes')
                        .objectStore('notes')
                        .index('parents')
                        .getAll(IDBKeyRange.only(parentId)));

            return $q(function(resolve, reject){
                promise.then(resolve, reject);
            });
        }

        function _getChildNoteIds(parentId) {
            log('notesService.getChildNoteIds', parentId);

            var promise =
                dbPromise.then(db => _txGetChildNoteIds(db.transaction('notes'), parentId));

            return $q(function(resolve, reject){
                promise.then(resolve, reject);
            });
        }

        function _txGetChildNoteIds(tx, parentId){
            return tx
                .objectStore('notes')
                .index('parents')
                .getAllKeys(IDBKeyRange.only(parentId));
        }

        function _getChildCount(parentId){
            log('notesService.getChildCount', parentId);

            var promise =
                dbPromise.then(db =>
                    db.transaction('notes')
                        .objectStore('notes')
                        .index('parents')
                        .getAllKeys(IDBKeyRange.only(parentId))
                        .then(ids => ids.length));

            return $q(function(resolve, reject){
                promise.then(resolve, reject);
            });
        }

        function _unlinkNotesFromParent(parentId, noteIds){
            log('notesService.unlinkNotesFromParent', parentId, JSON.stringify(noteIds));

            if (noteIds.length == 0){
                return $q.resolve();
            }

            var promise =
                dbPromise.then(db =>
                    _txUnlinkNotesFromParent(
                        db.transaction('notes', 'readwrite'),
                        parentId,
                        noteIds))
                .then(() => {
                    broadcast('note:child-unlinked:' + parentId, noteIds);
                });

            return $q(function(resolve, reject){
                promise.then(resolve, reject);
            });
        }

        function _txUnlinkNotesFromParent(tx, parentId, noteIds){
            return Promise.all(
                noteIds
                .map(noteId =>
                    tx.objectStore('notes')
                        .get(noteId)
                        .then(note => {
                            var index = note.parents.indexOf(parentId);
                            if (index < 0){
                                throw new Error('invalid parent id ' + parentId + ' while unlinking note ' + noteId);
                            }

                            note.parents.splice(index, 1);

                            if (note.parents.length == 0){
                                return _txGetChildNoteIds(tx, noteId)
                                    .then(childNoteIds => _txUnlinkNotesFromParent(tx, noteId, childNoteIds))
                                    .then(() => tx.objectStore('notes').delete(noteId));
                            }
                            else {
                                return tx.objectStore('notes').put(note);
                            }
                        })));
        }

        function _getNotesWithTag(tag){
            log('notesService.getNotesWithTag', tag);

            var promise =
                dbPromise.then(db =>
                    db.transaction('notes')
                        .objectStore('notes')
                        .index('tags')
                        .getAll(IDBKeyRange.only(tag)));

            return $q(function(resolve, reject){
                promise.then(resolve, reject);
            });
        }

        function _linkNotesToParent(parentId, noteIds){
            log('notesService.linkNotesToParent', parentId, JSON.stringify(noteIds));

            if (noteIds.length == 0){
                return $q.resolve();
            }

            var promise =
                dbPromise.then(db => {
                    var tx = db.transaction('notes', 'readwrite');

                    return Promise.all(
                        noteIds
                            .map(noteId =>
                                tx.objectStore('notes')
                                    .get(noteId)
                                    .then(note => {
                                        note.parents.push(parentId);
                                        return tx.objectStore('notes').put(note);
                                    })));
                });

            return $q(function(resolve, reject){
                promise.then(resolve, reject);
            });
        }
    }
})();

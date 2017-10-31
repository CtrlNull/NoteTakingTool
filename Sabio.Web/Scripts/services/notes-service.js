(function () {
    'use strict';

    angular.module(APPNAME)
        .service('notesService', notesService);

    /*
    A "note" looks like this:
    {
        "id": 1, // auto-generated, starts at 1
        "body": null,
        "parents": [] // ids of parent, or 0 if this is a top-level note
    }
    */

    notesService.$inject = ['$q'];

    function notesService($q) {
        var svc = this;

        svc.getById = _getById;
        svc.getChildNotes = _getChildNotes;
        svc.saveNote = _saveNote;
        svc.deleteNote = _deleteNote;


        // ↑↑↑↑↑↑↑↑ PUBLIC INTERFACE

        // ↓↓↓↓↓↓↓↓ INTERNAL implementation details below

        var dbPromise = idb.open('user-data', 1, function (upgradeDb) {
            // This is the "database migration" portion:
            switch (upgradeDb.oldVersion) {
                case 0:
                    var store = upgradeDb.createObjectStore('notes', { keyPath: 'id', unique: true, autoIncrement: true });
                    store.createIndex('parents', 'parents', { unique: false, multiEntry: true });
            }
        });

        function _getById(id) {
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
            // validate that the note has either:
            // * one or more numbers in the "parents" array other than 0
            // * 0 in the "parents" array

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

            // assertion: at this point, we know this is a valid note

            var noteToSave = angular.fromJson(angular.toJson(note));

            var promise =
                dbPromise.then(db =>
                    db.transaction('notes', 'readwrite')
                        .objectStore('notes')
                        .put(noteToSave)
                        .then(newId => {
                            note.id = newId;
                            return newId;
                        }));

            return $q(function(resolve, reject){
                promise.then(resolve, reject);
            });
        }


        function _getChildNotes(parentId) {
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

        function _deleteNote(id){
            var promise =
                dbPromise.then(db =>
                    db.transaction('notes', 'readwrite')
                        .objectStore('notes')
                        .delete(id));

            return $q(function(resolve, reject){
                promise.then(resolve, reject);
            });
        }
    }
})();

(function(){
    'use strict';

    angular.module(APPNAME)
        .component('noteCard', {
            templateUrl: '/Scripts/components/note-card/main.html',
            controller: 'noteCardController',
            bindings: {
                note: '<', // one-way binding
                expanded: '=?', // optional, two-way binding
                onUnlink: '&' // callback binding
            }
        });


    angular.module(APPNAME)
        .controller('noteCardController', noteCardController);

    noteCardController.$inject = ['notesService', '$scope', '$q'];

    function noteCardController(notesService, $scope, $q){
        var vm = this;

        vm.$onInit = _onInit;
        vm.addChildNote = _addChildNote;
        vm.unlinkThisNote = _unlinkThisNote;
        vm.unlinkChildNote = _unlinkChildNote;
        vm.updateTags = _updateTags;

        // These are the helper functions that are passed to the
        // specific note-editor instance
        vm.noteControls = {
            save: _saveNote,
            addChildNote: _addChildNote
        };

        // Keep an eye on the "expanded" property. Load child notes when expanded.
        $scope.$watch(
            function(){ return vm.expanded },
            function(expanded){
                if (expanded){
                    expandChildNotes();
                }
                else {
                    vm.notes = null;
                }
            }
        );

        $scope.$watch(
            function(){ return vm.note.tags },
            function(tags){
                vm.tagsInput = (tags || []).join(' ');
            },
            true
        );


        function _onInit(){
            getChildCount();

            $scope.$on(
                'note:saved:' + vm.note.id,
                getChildCount
            );

            $scope.$on(
                'note:child-unlinked:' + vm.note.id,
                getChildCount
            );
        }

        function _updateTags(){
            vm.note.tags = vm.tagsInput.replace(/^\s+|\s+$/g, '').split(/\s+/);
            vm.tagsInput = vm.note.tags.join(' ');
            _saveNote();
        }

        function getChildCount(){
            notesService.getChildCount(vm.note.id)
                .then(_success, console.error);

            function _success(count){
                vm.childCount = count;
            }
        }

        function expandChildNotes(){
            if (vm.notes)
                return $q.resolve();
                
            return notesService.getChildNotes(vm.note.id)
                .then(_success, console.error);

            function _success(notes){
                vm.notes = notes;
                vm.childCount = notes.length;
            }
        }

        function _unlinkThisNote(){
            if (confirm('Delete this note?')){
                vm.onUnlink();
            }
        }

        function _unlinkChildNote(index, note){
            notesService.unlinkNotesFromParent(vm.note.id, [note.id])
                .then(_success, console.error);

            function _success(){
                vm.notes.splice(index, 1);
            }
        }

        function _addChildNote(note){
            if (!note){
                note = {
                    body: null,
                    type: 'text',
                    parents: [vm.note.id]
                };
            }

            return expandChildNotes()
                .then(function(){
                    notesService.saveNote(note)
                        .then(_success, _error);

                    function _success(){
                        vm.notes.push(note);
                        vm.expanded = true;
                        vm.childCount++;
                        return note;
                    }

                    function _error(err){
                        console.error(err);
                    }
                });
        }

        function _saveNote(){
            notesService.saveNote(vm.note)
                .then(null, _error);

            function _error(err){
                console.error(err);
            }
        }
    }
})();

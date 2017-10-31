(function(){
    'use strict';

    angular.module(APPNAME)
        .component('noteCard', {
            templateUrl: '/Scripts/components/note-card/main.html',
            controller: 'noteCardController',
            bindings: {
                note: '<', // one-way binding
                expanded: '=?', // optional, two-way binding
                onDeleted: '&' // callback binding
            }
        });


    angular.module(APPNAME)
        .controller('noteCardController', noteCardController);

    noteCardController.$inject = ['notesService', '$scope', '$q'];

    function noteCardController(notesService, $scope, $q){
        var vm = this;

        vm.addChildNote = _addChildNote;
        vm.deleteThisNote = _deleteThisNote;
        vm.childNoteDeleted = _childNoteDeleted;
        vm.saveNote = _saveNote;


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

        function expandChildNotes(){
            if (vm.notes)
                return $q.resolve();
                
            return notesService.getChildNotes(vm.note.id)
                .then(_success, console.error);

            function _success(notes){
                vm.notes = notes;
            }
        }

        function _deleteThisNote(){
            notesService.deleteNote(vm.note.id)
                .then(_success, _error);

            function _success(){
                vm.onDeleted();
            }

            function _error(err){
                console.error(err);
            }
        }

        function _childNoteDeleted(index){
            vm.notes.splice(index, 1);
        }

        function _addChildNote(){
            expandChildNotes()
                .then(function(){
                    var note = {
                        body: null,
                        parents: [vm.note.id]
                    };

                    notesService.saveNote(note)
                        .then(_success, _error);

                    function _success(){
                        vm.notes.push(note);
                        vm.expanded = true;
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

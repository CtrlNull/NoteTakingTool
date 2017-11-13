(function(){
    'use strict';

    angular.module('BananaPad')
        .component('noteTreeItem', {
            templateUrl: '/Scripts/components/note-tree-item/main.html',
            controller: 'NoteTreeItemController',
            bindings: {
                note: '<',
                remove: '&'
            }
        });

    
    angular.module('BananaPad')
        .controller('NoteTreeItemController', NoteTreeItemController);

    NoteTreeItemController.$inject = ['notesService', '$scope'];

    function NoteTreeItemController(notesService, $scope){
        var vm = this;

        vm.$onChanges = _onChanges;
        vm.getNoteTitle = _getNoteTitle;
        vm.toggle = _toggle;


        function _onChanges(){
            if (vm.note){
                _getChildCount();
            
                $scope.$on('note:saved:' + vm.note.id, function(e, note){
                    vm.note = angular.copy(note);
                });
            }
        }

        function _toggle(){
            if (!vm.expanded){
                notesService.getChildNotes(vm.note.id)
                    .then(_success, console.error);

                function _success(notes){
                    vm.notes = notes;
                }
            }
            else {
                vm.notes = null;
            }

            vm.expanded = !vm.expanded;
        }

        function _getNoteTitle(){
            return (vm.note && vm.note.title) ||
                   (vm.note && vm.note.body || '').split('\n', 2)[0] ||
                   '(untitled)';
        }

        function _getChildCount(){
            notesService.getChildCount(vm.note.id)
                .then(_success, console.error);

            function _success(count){
                vm.hasChildren = !!count;
            }
        }
    }
})();
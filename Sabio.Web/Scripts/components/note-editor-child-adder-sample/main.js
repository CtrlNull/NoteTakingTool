(function(){
    'use strict';

    angular.module(APPNAME)
        .component('noteEditorChildAdderSample', {
            templateUrl: '/Scripts/components/note-editor-child-adder-sample/main.html',
            controller: 'EditorChildAdderSampleController',
            bindings: {
                note: '<',
                noteControls: '<'
            }
        });

    angular.module(APPNAME)
        .controller('EditorChildAdderSampleController', EditorChildAdderSampleController);

    EditorChildAdderSampleController.$inject = ['notesService'];

    function EditorChildAdderSampleController(notesService){
        var vm = this;

        vm.addChildNote = _addChildNote;

        function _addChildNote(){
            var childNote = {
                type: 'text',
                body: vm.inputText,
                parents: [vm.note.id]
            };

            notesService.saveNote(childNote);
        }
    }
})();

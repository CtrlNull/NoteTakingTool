(function(){
    'use strict';

    angular.module(APPNAME)
        .component('noteEditorText', {
            templateUrl: '/Scripts/components/note-editor-text/main.html',
            controller: 'EditorTextController',
            bindings: {
                note: '<',
                noteControls: '<'
            }
        });

    angular.module(APPNAME)
        .controller('EditorTextController', EditorTextController);

    function EditorTextController(){
    }
})();

(function(){
    'use strict';

    angular.module(APPNAME)
        .component('noteEditorText', {
            templateUrl: '/Scripts/components/note-editor-text/main.html',
            controller: 'EditorTextPasterController',
            bindings: {
                note: '<',
                onSave: '&'
            }
        });

    angular.module(APPNAME)
        .controller('EditorTextPasterController', EditorTextController);

    function EditorTextController(){
    }
})();

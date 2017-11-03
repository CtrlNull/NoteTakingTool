(function(){
    'use strict';

    angular.module('BananaPad')
        .component('toolBar', {
            templateUrl: '/Scripts/components/tool-bar/main.html',
            controller: 'ToolBarController',
            bindings: {
                note: '<',
                remove: '&'
            }
        });

    
    angular.module('BananaPad')
        .controller('ToolBarController', ToolBarController);

    ToolBarController.$inject = ['notesService'];

    function ToolBarController(notesService){
    }
})();

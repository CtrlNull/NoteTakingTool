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
        var vm = this;

        vm.toggleLightTheme = _toggleLightTheme;
        vm.toggleDarkTheme = _toggleDarkTheme;

        function _toggleLightTheme() {
            console.log('_toggleLightTheme fired');
            document.getElementById('light-theme').removeAttribute('disabled');
            document.getElementById('dark-theme').setAttribute('disabled', '');
        }

        function _toggleDarkTheme() {
            console.log('_toggleDarkTheme fired');
            document.getElementById('dark-theme').removeAttribute('disabled');
            document.getElementById('light-theme').setAttribute('disabled', '');
        }
    }
})();

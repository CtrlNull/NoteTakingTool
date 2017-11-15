(function(){
    'use strict';

    angular.module(APPNAME)
        .component('notesDisplay', {
            templateUrl: '/Scripts/components/notes-display/main.html',
            controller: 'notesDisplayController'
        });


    angular.module(APPNAME)
        .controller('notesDisplayController', notesDisplayController);

    notesDisplayController.$inject = ['notesService', '$stateParams'];

    function notesDisplayController(notesService, $stateParams) {
        var vm = this;

        if ($stateParams.id){
            notesService.getById($stateParams.id)
                .then(_success, console.error);

            function _success(note){
                vm.rootNote = note;
            }
        }
        else {
            vm.rootNote = {
                id: "root"
            };
        }
    }
})();

(function () {
    'use strict'
    angular.module(APPNAME)
        .component('adminTokenController', {
        templateUrl: '/Scripts/components/token/main.html'
        , controller: 'adminTokenControllerLocal'
        });
    angular.module(APPNAME)
        .controller('adminTokenControllerLocal', adminTokenControllerLocal);

    adminTokenControllerLocal.$inject = ['$stateParams'];

    function adminTokenControllerLocal($stateParams) {
        var vm = this;
        vm.clickyGetAll = _clickyGetAll; // grabs getall button
        vm.clickyDelete = _clickyDelete; // grabs delete button
        vm.clickyUpdate = _clickyUpdate; // grabs update button

        function _clickyGetAll() {
            console.log("get all fire");
        }
        if ($stateParams.id) {
            vm.mode = 'edit';
        }
        else {
            vm.mode = 'create';
        }
        vm.id = $stateParams.id;
    };
})();
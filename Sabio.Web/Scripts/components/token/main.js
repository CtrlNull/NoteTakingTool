(function () {
    'use strict'
    angular.module(APPNAME)
        .component('adminTokenController', {
        templateUrl: '/Scripts/components/token/main.html'
        , controller: 'adminTokenControllerLocal'
        });
    angular.module(APPNAME)
        .controller('adminTokenControllerLocal', adminTokenControllerLocal);

    adminTokenControllerLocal.$inject = ['$stateParams', 'tokenService'];

    function adminTokenControllerLocal($stateParams, tokenService) {
        var vm = this;
        vm.tokenService = tokenService
        vm.item = null
        vm.items = [];
        // Buttons
        vm.clickyGetAll = _clickyGetAll; // grabs getall button
        vm.clickyDelete = _clickyDelete; // grabs delete button
        vm.clickyUpdate = _clickyUpdate; // grabs update button

        //--|Get All<Button>|--//
        function _clickyGetAll() {
            tokenService.getAll(vm.item)
                .then(_success, _error);
        }
        //----------------------
        if ($stateParams.id) {
            vm.mode = 'edit';
        }
        else {
            vm.mode = 'create';
        }
        vm.id = $stateParams.id;
        //----------------------
        // ==== Success/Error ====//
        //--|OnSuccess|--//
        function _success(data) {
            if (data && data.item) {
                vm.item.id == data.item;
                vm.items.push(vm.item);
            }
        }
        function _error() {
            console.log("Error");
        }

    };
})();
(function () {
    'use strict'
    angular.module(APPNAME)
        .component('adminTokenController', {
        templateUrl: '/Scripts/components/token/main.html'
        , controller: 'adminTokenControllerLocal'
        });
    angular.module(APPNAME)
        .controller('adminTokenControllerLocal', adminTokenControllerLocal);

    adminTokenControllerLocal.$inject = ['tokenService'];

    function adminTokenControllerLocal(tokenService) {
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
            console.log("GetAll Button");
            tokenService.getAll(vm.item)
                .then(_success, _error);
        }
        function _clickyDelete() {
            console.log("Delete Button");
        }
        function _clickyUpdate() {
            console.log("Update Button")
        }
        //----------------------
        //if ($stateParams.id) {
        //    vm.mode = 'edit';
        //}
        //else {
        //    //vm.mode = 'create';
        //}
        //vm.id = $stateParams.id;
        //----------------------

        // ==== Success/Error ====//
        //--|OnSuccess|--//
        function _success(response) {
            vm.items = response.data.items;

            //if (data && data.item) {
            //    vm.item.id == data.item;
            //    vm.items.push(vm.item);
            //    console.log("data worked");
            //    console.log(data);
            //}
        }
        function _error() {
            console.log("Error");
        }

    };
})();
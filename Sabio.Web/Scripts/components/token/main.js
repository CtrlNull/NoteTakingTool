(function () {
    'use strict'
    angular.module(APPNAME)
        .component('adminTokenController', {
        templateUrl: '/Scripts/components/token/main.html'
        , controller: 'adminTokenController'
        });
    angular.module(APPNAME)
        .controller('adminTokenController', adminTokenController);

    adminTokenController.$inject = ['tokenService', '$stateParams'];

    function adminTokenController(tokenService, $stateParams) {
        var vm = this;
        vm.tokenService = tokenService;
        vm.items = null
        vm.items = [];
        // Buttons
        vm.btnGetAll = _btnGetAll; // grabs getall button
        vm.btnDelete = _btnDelete; // grabs delete button
        vm.btnModify = _btnModify; // grabs local update
         
        //create loop for data to spill on page
        function _loopData() {
            console.log("dataLoop fire");
            tokenService.getAll(vm.item)
                .then(_success, _error);
        }
        //--|Get All<Button>|--//
        function _btnGetAll() {
            console.log("GetAll Button");
            tokenService.getAll(vm.item)
                .then(_success, _error);
        }
        //--|Delete<Button>--//
        function _btnDelete(index) {
            var data = vm.items[index];
            console.log(data.id);
            tokenService.delete(data.id)
                .then(_success, _error);
        }
        // Manupulate current button
        function _btnModify(index) {
            var data = vm.items[index];
            console.log(data.id);
            //tokenService.getById(data.id)
            //    .then(_success, _error);
        }
        // =========== Success/Error ============= //
        //--|OnSuccess(GetAll)|--//
        function _success(response) {
            vm.items = response.data.items;
            console.log(vm.items);
        }
        function _error() {
            console.log("Error");
        }
        //----------------------
        if ($stateParams.items) {
            vm.mode = 'edit-token';
        }
        else {
            //vm.mode = 'create';
        }
        vm.id = $stateParams.id;
    };
})();
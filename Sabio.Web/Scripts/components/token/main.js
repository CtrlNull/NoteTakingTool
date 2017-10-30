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
        vm.tokenService = tokenService
        vm.items = null
        vm.items = [];
        // Buttons
        vm.btnGetAll = _btnGetAll; // grabs getall button
        vm.btnDelete = _btnDelete; // grabs delete button
        vm.btnUpdate = _btnUpdate; // grabs update button
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
        function _btnModify(row) {
            vm.updateId = row.id;
            vm.serviceName = row.serviceName;
            vm.token = row.token
        }
        //--|Modify/Update<Button>|--//
        function _btnUpdate() {
            console.log("update works");
            console.log()
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
        //----Success Modify (changes button data) ---//
        function _successModify(response, userId) {
            console.log("modify");
            vm.items = response.data.items;
            var newId = userId;
            console.log(newId);
            for (var i = 0; i < vm.items.length; i++) {
            }
        }

        //----------------------
        if ($stateParams.items) {
            vm.mode = 'edit';
        }
        else {
            //vm.mode = 'create';
        }
        vm.id = $stateParams.id;
    };
})();
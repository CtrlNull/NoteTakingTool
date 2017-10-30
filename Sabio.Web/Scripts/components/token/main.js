(function () {
    'use strict'
    angular.module(APPNAME)
        .component('adminTokenController', {
        templateUrl: '/Scripts/components/token/main.html'
        , controller: 'adminTokenControllerLocal'
        });
    angular.module(APPNAME)
        .controller('adminTokenControllerLocal', adminTokenControllerLocal);

    adminTokenControllerLocal.$inject = ['tokenService', '$stateParams'];

    function adminTokenControllerLocal(tokenService, $stateParams) {
        var vm = this;
        vm.tokenService = tokenService
        vm.items = null
        vm.items = [];
        // Buttons
        vm.btnGetAll = _btnGetAll; // grabs getall button
        vm.btnDelete = _btnDelete; // grabs delete button
        vm.btnUpdate = _btnUpdate; // grabs update button
        vm.btnModify = _btnModify; // grabs local update
         
        // ==== Success/Error ====//me 
        //--|OnSuccess(GetAll)|--//
        function _success(response) {
            vm.items = response.data.items;
            console.log(vm.items);
        }
        function _error() {
            console.log("Error");
        }
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
            var id = vm.items[index];
            console.log(id);
            //tokenService.delete(id)
            //    .then(_success, _error);
        }
        //--|Modify/Update<Button>|--//
        function _btnUpdate() {
            console.log();
        }
        // Manupulate current button
        function _btnModify(id) {
            var userId = id;
            tokenService.getAll(vm.item)
                .then(_successModify, _error);
            _successModify(userId);
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
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
        vm.clickyGetAll = _clickyGetAll; // grabs getall button
        vm.clickyDelete = _clickyDelete; // grabs delete button
        vm.clickyUpdate = _clickyUpdate; // grabs update button
        vm.btnModify = _btnModify; // grabs local update
         
        //Loop
        //vm.repeatData = _repeatData;
        // ==== Success/Error ====//
        //--|OnSuccess|--//
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
        function _clickyGetAll() {
            console.log("GetAll Button");
            tokenService.getAll(vm.item)
                .then(_success, _error);
        }
        function _clickyDelete() {
            console.log("Delete Button");
            tokenService.Delete()
                .then(_success, _error);
        }
        function _clickyUpdate() {
            tokenService.Update()
                .then(_success, _error);
        }
        // Manupulate current button
        function _btnModify(id) {
            console.log("current click")
            console.log(id);
            

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
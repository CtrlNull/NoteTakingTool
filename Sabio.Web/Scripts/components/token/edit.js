(function () {
    'use strict'
    angular.module(APPNAME)
        .component('adminTokenEditController', {
            templateUrl: '/Scripts/components/token/modify.html'
            , controller: 'adminTokenEditController'
        });
    angular.module(APPNAME)
        .controller('adminTokenEditController', adminTokenEditController);

    adminTokenEditController.$inject = ['tokenService', '$stateParams', '$scope'];

    function adminTokenEditController(tokenService, $stateParams, $scope){
        var vm = this;
        vm.item = [];
        vm.btnGetAll = _btnGetAll;
        vm.btnUpdate = _btnUpdate;
        vm.btnCreate = _btnCreate

        if ($stateParams.id) {
            tokenService.getById($stateParams.id)
                .then(_getByIdSuccess, _Error)
            function _getByIdSuccess(response) {
                $scope.item = response;
                console.log($scope.item.data.id);
                vm.modId = $scope.item.data.id;
                vm.modServiceName = $scope.item.data.serviceName;
                vm.modToken = $scope.item.data.token;
            }
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~ //Buttons// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        //--|Get All<Button>|--//
        function _btnGetAll() {
            console.log("GetAll Button");
            tokenService.getAll(vm.item)
                .then(_success, _Error);
        }
        function _btnUpdate() {
            var updateItems = {
                id: vm.modId
                , serviceName: vm.modServiceName
                , token: vm.modToken
            };
            console.log(updateItems);
            tokenService.update(updateItems)
                .then(_success, Error);
        }
        function _btnCreate() {
            var updateItems = {
                    id: vm.modId
                    , serviceName: vm.modServiceName
                    , token: vm.modToken
            };
            console.log(updateItems);
            tokenService.create(updateItems)
                .then(_successCreate, Error);

        }
        // ~~~~~~~~~~~~~~~~~~~~~~~~~ Success/Error ~~~~~~~~~~~~~~~~~~~~~~~~~~ // 
        //--|OnSuccess(GetAll)|--//
        function _success(response) {
            vm.items = response.data.items;
            console.log(vm.items);
        }
        //--|CreateSucess|--//
        function _successCreate() {
            console.log("Create Worked");
        }
        //--|Error|--//
        function _Error() {
            console.log("Error");
        }





    }









})();
(function () {
    angular.module(TokenData)
        .component('admin', {
        templateUrl: '/Scripts/components/token/main.html'
        , controller: 'adminTokenController'
        });
    angular.module(TokenData)
        .component('adminTokenController', adminTokenController);

    adminTokenController.$inject = ['$stateParams'];
    adminTokenController.$inject = [tokenService];

    function adminTokenController(tokenService, $stateParams) {
        var vm = this;
        vm.clickyGetAll = _clickyGetAll; // grabs getall button
        vm.clickyDelete = _clickyDelete; // grabs delete button
        vm.clickyUpdate = _clickyUpdate; // grabs update button

        function _clickyGetAll(data) {
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
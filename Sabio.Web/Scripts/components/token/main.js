(function () {
    angular.module(APPNAME)
        .component('adminTokenController', {
        templateUrl: '/Scripts/components/token/main.html'
        , controller: 'adminTokenController'
        });
    angular.module(APPNAME)
        .component('adminTokenController', adminTokenController);

    adminTokenController.$inject = ['$stateParams'];

    function adminTokenController($stateParams) {
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
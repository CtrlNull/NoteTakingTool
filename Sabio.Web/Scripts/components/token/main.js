(function () {
    angular.module(APPNAME)
        .component('token-main-example', {
        templateUrl: '/Scripts/components/token'
        , controller: 'token-controller'
        });
    angular.module(APPNAME)
        .component('tokenGetAllController', tokenGetAllController);

    function tokenGetAllController() {

    };


})();
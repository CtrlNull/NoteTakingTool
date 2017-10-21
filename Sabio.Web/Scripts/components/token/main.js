(function () {
    angular.module(APPNAME)
        .component('tokenMainApp', {
        templateUrl: '/Scripts/components/token/main.html'
        , controller: 'tokenEditController'
        });
    angular.module(APPNAME)
        .component('tokenEditController', tokenEditController);

    function tokenEditController() {

    };


})();
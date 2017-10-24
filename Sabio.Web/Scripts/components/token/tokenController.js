(function () {
    angular.module(TokenData)
        .component('tokenMainApp', {
        templateUrl: '/Scripts/components/token/main.html'
        , controller: 'tokenEditController'
        });
    angular.module(TokenData)
        .component('tokenEditController', TokenController);

    function TokenController() {

    };


})();
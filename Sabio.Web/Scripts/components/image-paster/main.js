(function () {
    'use strict'
    angular.module(APPNAME)
        .component('adminImagePageController', {
            templateUrl: '/Scripts/components/image-paster/index.html'
            , controller: 'adminImagePageController'
        });
    angular.module(APPNAME)
        .controller('adminImagePageController', adminImagePageController);

    adminImagePageController.$inject = ['$stateParams'];

    function adminImagePageController($stateParams) {
        var vm = this
    }


})();
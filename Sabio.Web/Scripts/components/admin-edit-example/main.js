(function () {
    'use strict';

    angular.module(APPNAME)
        .component('adminEditExample', {
            templateUrl: '/Scripts/components/admin-edit-example',
            controller: 'adminEditExampleController'
        });

    angular.module(APPNAME)
        .controller('adminEditExampleController', adminEditExampleController);

    function adminEditExampleController() {
    }
})();

(function () {
    'use strict';

    angular.module(APPNAME)
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];

    function configRoutes($stateProvider) {
        // All route definitions go in this function here

        $stateProvider.state({
            name: 'edit-exampleentity',
            url: '/admin/entity/example',
            component: 'adminEditExample'
        });
    }
})();
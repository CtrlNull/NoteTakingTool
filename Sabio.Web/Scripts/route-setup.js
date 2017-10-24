(function () {
    'use strict';

    angular.module(APPNAME)
        .config(configRoutes);

    configRoutes.$inject = ['$stateProvider'];

    function configRoutes($stateProvider) {
        // All route definitions go in this function here

        /*
        Example URLs for entities:

        /admin/entity/tags (view all tags screen)
        /admin/entity/tags/123 (edit a specific tag, the route is actually defined as /admin/entity/tags/{id})
        /admin/entity/tags/new (screen to create a new tag)
        */
        // ---- <Example> ---- //
        $stateProvider.state({
            name: 'edit-exampleentity',
            url: '/admin/entity/example/{id:int}',
            component: 'adminEditExample'
        });

        $stateProvider.state({
            name: 'create-exampleentity',
            url: '/admin/entity/example/new',
            component: 'adminEditExample'
        });
        // ---- <Get All> ---- //
        $stateProvider.state({
            name: "token"
            , url: "/admin/entity/tokengetall"
            , component: "adminTokenGet"
        });
        // ---- <Create> ---- //
        $stateProvider.state({
            name: "tokenCreate"
            , url: "/admin/entity/tokenCreate"
            , component: "adminTokenCreate"
        });
        // ---- <GetById> ---- //
        $stateProvider.state({
            name: "tokenGetById"
            , url: "/admin/entity/tokenGetById"
            , component: "adminTokenGetById"
        });
        // ---- <Delete> ---- //
        $stateProvider.state({
            name: "tokenDelete"
            , url: "/admin/entity/tokenDelete"
            , component: "adminTokenDelete"
        });
        // ---- <Update> ---- //
        $stateProvider.state({
            name: "tokenUpdate"
            , url: "/admin/entity/tokenUpdate"
            , component: "adminTokenUpdate"
        });
    };
})();
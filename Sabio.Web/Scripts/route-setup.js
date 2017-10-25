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
            name: 'edit-token',
            url: '/admin/entity/token/{id:int}',
            component: 'adminEditToken'
        })
        $stateProvider.state({
            name: 'create-token',
            url: '/admin/entity/token/new',
            component: 'adminEditToken'
        })
        // ---- <Get All> ---- //
        $stateProvider.state({
            name: 'getAll-token'
            , url: "/admin/entity/token"
            , component: "adminTokenController"
        })
        //// ---- <Create> ---- //
        //$stateProvider.state({
        //    name: "tokenCreate"
        //    , url: "/admin/entity/token"
        //    , component: "adminTokenCreate"
        //});
        //// ---- <GetById> ---- //
        //$stateProvider.state({
        //    name: "tokenGetById"
        //    , url: "/admin/entity/token/{id}"
        //    , component: "adminTokenGetById"
        //});
        //// ---- <Delete> ---- //
        //$stateProvider.state({
        //    name: "tokenDelete"
        //    , url: "/admin/entity/token/{id}"
        //    , component: "adminTokenDelete"
        //});
        //// ---- <Update> ---- //
        //$stateProvider.state({
        //    name: "tokenUpdate"
        //    , url: "/admin/entity/token/{id}"
        //    , component: "adminTokenUpdate"
        //});
    };
})();
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
        // ---- <GetById> ---- //
        $stateProvider.state({
            name: "tokenGetById"
            , url: "/admin/entity/token/{id}"
            , component: "adminTokenGetById"
        });
        //// ---- <Create> ---- //
        //$stateProvider.state({
        //    name: "tokenCreate"
        //    , url: "/admin/entity/token"
        //    , component: "adminTokenCreate"
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
 	    $stateProvider.state({   
            name: 'create-exampleentity',
            url: '/admin/entity/example/new',
            component: 'adminEditExample'
        });

        /*
        URLS for cars:
        /admin/entity/cars   (views the table of all cars)
        /admin/entity/cars/123   (edit a specific car that already exists)
        /admin/entity/cars/new   (create a new car)
        */

        $stateProvider.state({
            name: 'view-cars',
            url: '/admin/entity/cars',
            component: 'adminViewCars'
        });

        $stateProvider.state({
            name: 'edit-cars',
            url: '/admin/entity/cars/{id:int}',
            component: 'adminEditCar'
        });

        $stateProvider.state({
            name: 'create-cars',
            url: '/admin/entity/cars/new',
            component: 'adminEditCar'
        });
    };
})();

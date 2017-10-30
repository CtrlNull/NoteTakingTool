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
        //=~~~~~~===<Ralph_Fonz>===~~~~~~~~~=//
        // ---- <Get All> ---- //
        $stateProvider.state({
            name: 'getAll-token'
            , url: "/admin/entity/token"
            , component: "adminTokenController"
        })
        //// ---- <Delete> ---- //
        $stateProvider.state({
            name: "tokenDelete"
            , url: "/admin/entity/token/{id:int}"
            , component: "adminTokenController"
        });
        // ---- <GetById> ---- //
        $stateProvider.state({
            name: "tokenGetById"
            , url: "/admin/entity/token/{id:int}"
            , component: "adminTokenEditController"
        });
        //// ---- <Update> ---- //
        $stateProvider.state({
            name: "tokenUpdate"
            , url: "/admin/entity/token/"
            , component: "adminTokenEditController"
        });
                //// ---- <Create> ---- //
        //$stateProvider.state({
        //    name: "tokenCreate"
        //    , url: "/admin/entity/token"
        //    , component: "adminTokenCreateController"
        //});

        /*
        URLS for cars:
        /admin/entity/cars   (views the table of all cars)
        /admin/entity/cars/123   (edit a specific car that already exists)
        /admin/entity/cars/new   (create a new car)
        */
        $stateProvider.state({
            name: 'create-exampleentity',
            url: '/admin/entity/example/new',
            component: 'adminEditExample'
        });

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

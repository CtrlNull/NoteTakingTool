﻿(function () {
    'use strict';

    window.APPNAME = 'BananaPad';
<<<<<<< HEAD
    angular.module(APPNAME, ['ui.router']);

=======

    var app = angular.module(APPNAME, ['ui.router']);

    // add X-Requested-With: XMLHttpRequest to all of our ajax calls (so that the server knows
    // to not redirect to the login page when unauthorized)
    app.config(ConfigureHttp);
    ConfigureHttp.$inject = ['$httpProvider'];
    function ConfigureHttp($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }

    // enable HTML5-compatible URLs
    app.config(ConfigureLocationProvider);
    ConfigureLocationProvider.$inject = ['$locationProvider'];
    function ConfigureLocationProvider($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
>>>>>>> origin/master
})();

(function () {
    'use strict'
    angular.module(APPNAME)
        .service('tokenService', tokenService);
   
    tokenService.$inject = ['$http'];
    
    function tokenService($http) {
        var svc = this;
        // Hoist //
        svc.getAll = _getAll;
        svc.getById = _getById;
        svc.delete = _delete;
        svc.create = _create;
        svc.update = _update;

        // ------- { Settings } ------- //
        //==| Get All |==//
        function _getAll() {
            return $http({
                method: "GET"
                , url: "/api/token/"
            });
        }
        //==| Get by id |==///
        function _getById(id) {
            return $http({
                method: "GET"
                , url: "/api/token/" + id
            })
        }
        //==| Delete |==//
        function _delete(id) {
            return $http({
                method: "DELETE"
                , url: "/api/token/" + id
            })
        }
        //==| Create |==//
        function _create() {
            return $http({
                method: "POST"
                , url: "api/token"
            })
        }
        //==| Update |==//
        function _update() {
            return $http({
                method: "PUT"
                , url: "api/token/"
            })
        }
    }
})();
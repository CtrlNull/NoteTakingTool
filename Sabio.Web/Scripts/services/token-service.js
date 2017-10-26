(function () {
    angular.module(APPNAME)
        .service('tokenService', tokenService);
   
    tokenService.$inject = ['$http', '$q'];
    
    function tokenService($http, $q) {
        var svc = this;
        // Hoist //
        svc.getAll = _getAll;
        svc.getById = _getByid;
        svc.Delete = _Delete;
        svc.Create = _Create;
        svc.Update = _Update;

        // ------- { Settings } ------- //
        //==| Get All |==//
        function _getAll() {
            return $http({
                method: "GET"
                , url: "api/token"
            });
        }
        //==| Get by id |==///
        function _getById() {
            return $http({
                method: "GET"
                ,url: "api/token/{id:int}"
            })
        //==| Delete |==//
        function _delete() {
            return $http({
                method: "DELETE"
                , url: "api/token/{id:int}"
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
                , url: "api/token/{id:int}"
            })
        }
    }
})();
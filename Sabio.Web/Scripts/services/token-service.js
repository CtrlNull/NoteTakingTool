(function () {
    angular.module(APPNAME)
        .service('tokenService', tokenService);
   
    tokenService.$inject = ['$http'];
    
    function tokenService($http) {
        var svc = this;
        svc.getAll = _getAll;
        svc.getById = _getByid;
        svc.Delete = _Delete;
        svc.Create = _Create;
        svc.Update = _Update;
        
        function _getAll() {
            return $http({
                method: "GET"
                , url: "api/token"
            });
        }
        function _getById() {
            return $http({
                method: "GET"
                ,url: "api/token/{id:int}"
            })
        //}
        //function _Delete() {
        //    return $http({
        //        method: "DELETE"
        //        , url: "api/token{"
        //    })
        //}
        //function _Create() {
        //    return $http({
        //        method: "POST"
        //        , url: "api/token"
        //    })
        //}
        //function _Update() {
        //    return $http({
        //        method: "PUT"
        //        , url: "api/token"
        //    })
        }
    }
})();
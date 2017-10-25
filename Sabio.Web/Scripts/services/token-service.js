(function () {
    angular.module(TokenData)
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
                , url: "api/third_party_token"
            });
        }
        function _getById() {
            return $http({
                method: "GET"
                ,url: "api/third_party_token_getbyid"
            })
        }
        function _Delete() {
            return $http({
                method: "DELETE"
                , url: "api/third_party_token_delete"
            })
        }
        function _Create() {
            return $http({
                method: "POST"
                , url: "api/third_party_token_create"
            })
        }
        function _Update() {
            return $http({
                method: "PUT"
                , url: "api/third_party_token_update"
            })
        }
    }
})();
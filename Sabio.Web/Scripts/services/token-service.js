(function () {
    angular.module(APPNAME)
        .service('tokenService', tokenService);
   
    tokenService.$inject = ['$http'];
    
    function tokenService($http) {
        var svc = this;
        svc.getAll = _getAll;
        
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
        function _delete() {
            return $http({
                method: "DELETE"
                , url: "api/third_party_token_delete"
            })
        }
        function _create() {
            return $http({
                method: "POST"
                , url: "api/third_party_token_create"
            })
        }
        function _update() {
            return $http({
                method: "PUT"
                , url: "api/third_party_token_update"
            })
        }
    }
})();
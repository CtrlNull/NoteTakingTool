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
    }
})();
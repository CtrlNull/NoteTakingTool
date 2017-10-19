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
                , url: "c44/third_party_token"
            });
        }
    }
})();
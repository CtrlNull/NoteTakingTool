(function () {
    'use strict'
    angular.module(APPNAME)
        .service('loginGitService', loginGitService);

    loginGitService.$inject = ['$http'];

    function loginGitService($http) {
        var svc = this;
        //==== Setting $httpProvider defaults ====//
        //$httpProvider.defaults.useXDomain = true;
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // hoist //
        svc.sendKey = _sendKey;

        //------ {Settings} ------ //
        //~~<Create>
        function _sendKey() {
            return $http({
                method: 'GET'
                , url: 'http://localhost:3024/Content/admin-index.html#!/admin/entity/loginGit'
                , data: { client_id: "df80bc5f88b4806c4269", client_secret: "0c79495a0554154bc09f3d95fd92220b35c86c2e" }
                , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                , headers: { "Access-Control-Allow-Origin": "http://github.com/login/oauth/authorize" }
            })
        }
    }
})();
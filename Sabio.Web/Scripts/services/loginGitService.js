(function () {
    'use strict'
    angular.module(APPNAME)
        .service('loginGitService', loginGitService);

    loginGitService.$inject = ['$httpProvider'];

    function loginGitService($httpProvider) {
        var svc = this;
        //==== Setting $httpProvider defaults ====//
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        // hoist //
        svc.sendKey = _sendKey;

        //------ {Settings} ------ //
        //~~<Create>
        function _sendKey() {
            return $httpProvider({
                method: 'GET'
                , url: 'http://github.com/login/oauth/authorize'
                , data: { client_id: "df80bc5f88b4806c4269", client_secret: "0c79495a0554154bc09f3d95fd92220b35c86c2e" }
                , header: "application/json"
                , header: "Access-Control-Allow-Origin"
                , header: "Access-Control-Allow-Headers"
            })
        }
    }
})();
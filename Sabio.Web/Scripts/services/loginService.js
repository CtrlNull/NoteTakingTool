(function () {
    'use strict'
    angular.module(APPNAME)
        .service('loginGitService', loginGitService);
    loginGitService.$inject = ['$http'];

    function loginGitService($http) {
        var svc = this;
        // hoist //
        svc.create = _create;

        //------ {Settings} ------ //
        //~~<Create>
        function _sendKey() {
            return $http({
                method: 'POST'
                , url: 'http://github.com/login/oauth/authorize' + 
            })
        }



    }


})();
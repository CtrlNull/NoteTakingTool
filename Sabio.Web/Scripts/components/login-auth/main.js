(function () {
    'use strict'
    angular.module(APPNAME)
        .component('adminLoginGitController', {
            templateUrl: '/Scripts/components/note-card/githubLogin.html'
            , controller: 'adminLoginGitController'
        });
    angular.module(APPNAME)
        .controller('adminLoginGitController', adminLoginGitController);
    adminLoginGitController.$inject = ['loginGitService', '$stateParams'];

    function adminLoginGitController(loginGitService, $stateParams) {
        var vm = this;
    }
})();
﻿(function () {
    'use strict'
    angular.module(APPNAME)
        .component('adminLoginGitController', {
            templateUrl: '/Scripts/components/login-auth/githubLogin.html'
            , controller: 'adminLoginGitController'
        });
    angular.module(APPNAME)
        .controller('adminLoginGitController', adminLoginGitController);

    adminLoginGitController.$inject = ['loginGitService', '$stateParams'];

    function adminLoginGitController(loginGitService, $stateParams) {
        var vm = this;
        vm.loginGitService = loginGitService;
        vm.items = null;
        vm.items = [];
        // Buttons
        vm.btnGithub = _btnGithub;
        vm.btnGoogle = _btnGoogle;
        vm.btnSlack = _btnSlack;

        // Creates call for github authentication
        function _btnGithub() {
            //loginGitService.sendKey();

            console.log("this is Github button firing");
            var w = 600;
            var h = 600;
            var left = (screen.width / 2) - (w / 2);
            var top = (screen.height / 2) - (h / 2);
            return window.open(loginGitService.sendKey(), "Github", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            //window.addEventListener("DOMContentLoaded", function () {
            //    if (gBrowser.currentURI.spec.indexOf("http://github.com/login/oauth/authorize") != -1) {
            //        console.log("data passing")
            //        console.log(data);
            //    }
            //});
        };
        function _btnGoogle() {
            console.log("this is the Google button firing");
        };
        function _btnSlack() {
            console.log("this is the Slack button firing");
        }



    }
})();
(function () {
    angular(APPNAME)
        .config(configRoutes);
    configRoutes.$inject = ['$stateProvider'];
    function configRoutes($stateProvider) {
        // All definitions go in this function here
        $stateProvider.state({
            name: 'third_party_token_getall'
            , url: '/c44/third_party_token'
            , component: 'replaceThis' // replace this line !!!
        });
    }
})();
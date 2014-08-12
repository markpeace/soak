brewbox.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('inactive', {
                url:"/",
                templateUrl: 'pages/inactive.html',
                //controller: 'Home'
        })
        
        $urlRouterProvider.otherwise("/");

})
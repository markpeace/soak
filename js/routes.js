brewbox.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('home', {
                url:"/",
                templateUrl: 'pages/home.html',
                //controller: 'Home'
        })
        
        $urlRouterProvider.otherwise("/");

})
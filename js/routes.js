soak.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('inactive', {
                url: "/inactive",    
                templateUrl: "pages/inactive.html", 
                controller: "Inactive" 
        })
        .state('active', {
                url: "/active",    
                templateUrl: "pages/active.html", 
                controller: "Active" 
        })

        $urlRouterProvider.otherwise("/inactive");

})
soak.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
        
        .state('initialising', {
                url: "/initialising",    
                templateUrl: "pages/initialising.html", 
                controller: "Intialising" 
        })        
        
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
        .state('filling', {
                url: "/filling",    
                templateUrl: "pages/filling.html", 
                controller: "Filling" 
        })

        $urlRouterProvider.otherwise("/initialising");

})
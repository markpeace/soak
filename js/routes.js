brewbox.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  
  .state('splash', {
    url: "/splash",    
    templateUrl: "pages/splash.html",    
    controller: "Splash"
  })

  
  $urlRouterProvider.otherwise("/splash");
  
})
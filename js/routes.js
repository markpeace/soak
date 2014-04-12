bbb.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
  
  .state('login', {
    url: "/login",    
    templateUrl: "pages/user/login.html", 
    controller: "Login" 
  })
  .state('register', {
    url: "/register",    
    templateUrl: "pages/user/register.html",    
    controller: "Register"
  })
  
  .state('tabs', {
    url: "/tab",
    abstract: true,
    controller: 'Tab',
    templateUrl: "pages/tabs.html"
  })
  .state('tabs.schedule', {
    url: "/schedule",
    views: {
      'schedule-tab': {
        templateUrl: "pages/schedule/list.html",
        controller: 'ListEvents'          
      }
    }
  })
  .state('tabs.schedule_booked', {
    url: "/schedule/booked",
    views: {
      'schedule-tab': {
        templateUrl: "pages/schedule/list.html",
        controller: 'ListEvents'          
      }
    }
  })
  .state('viewEvent', {
    url: "/schedule/view/{id}",    
    templateUrl: "pages/schedule/viewEvent.html",    
    controller: "ViewEvent"
  })
  
  .state('addEvent', {
    url: "/schedule/add.html",    
    templateUrl: "pages/schedule/addEvent.html",    
    controller: "AddEvent"
  })
  
  .state('tabs.hunt', {
    url: "/hunt",
    views: {
      'hunt-tab': {
        templateUrl: "pages/hunt/listHuntItems.html",
        controller: 'ListHuntItems'          
      }
    }})
  
  .state('tabs.badges', {
    url: "/badges",
    views: {
      'badges-tab': {
        templateUrl: "pages/badges/listBadges.html",
        controller: 'ListBadges'          
      }
    }})
  
  .state('checkin', {
    url: "/checkIn.html",    
    templateUrl: "pages/checkin/checkin.html",    
    controller: "CheckIn"
  })

  
  $urlRouterProvider.otherwise("/tab/schedule");
  
})

.run(function ($rootScope, $location) {
  
  $rootScope.$on('$stateChangeStart', function (event, next, current) {
    
    if($rootScope.currentUser) {
      if(!$rootScope.currentUser.get('emailVerified') && ($rootScope.currentUser.updatedAt / 1000)<((new Date() / 1000)-43200)) {
        alert ("You need to confirm your email address before you can fully use the app - please check your mmu account");
        $rootScope.currentUser.set("email", $rootScope.currentUser.get("email"))
        $rootScope.currentUser.save()
      }
    } else {
      if(['/login','/register'].indexOf($location.url())==-1) {      
        return $location.path('/login');
      } 
    }
    
    
  });
  
})  
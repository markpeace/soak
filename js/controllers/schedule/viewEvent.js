bbb.controller('ViewEvent', function($scope, ParseService, $rootScope, $ionicModal, $stateParams) { 
  
  $scope.moment=moment
  $scope.attending={toggle:false};
  $scope.bookings=0
  
  $ionicModal.fromTemplateUrl('pages/schedule/viewEvent_locationinfo.html', function($ionicModal) {
    $scope.locationinfoModal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
    
  $ionicModal.fromTemplateUrl('pages/schedule/viewEvent_personInfo.html', function($ionicModal) {
    $scope.personinfoModal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  
  
  var getEventDetails = function () {
    
    var Event = Parse.Object.extend("Event");
    var query = new Parse.Query(Event);
    query.include("series").include("host").include("location");
    query.get($stateParams.id, {})
    .then(function (results) {
      $scope.event=results
      
      $scope.booking={
        user: Parse.User.current(),
        event: results,
        attending: null
      }
      
    }).then (getUserBooking);
  }
  
  var getUserBooking = function () {
    $scope.event.relation("bookings").query().equalTo("user",Parse.User.current()).count().then(function(c) {
      if (c>0) { $scope.booking.attending=true; }     
    }).then(getCountofBookings);    
  }
  
  var getCountofBookings = function () {
    $scope.event.relation("bookings").query().count().then(function(c) {
      $scope.bookings=c      
      $scope.$apply();
    })
  }
  
  var setupWatchBookingToggle = function() {
    $scope.$watch('booking.attending', function (newVal, oldVal) {
      if (newVal!=oldVal) {
        console.log("changed")
        $scope.event.relation("bookings").query().equalTo("user", Parse.User.current()).find().then(function (result) {
          for (r in result) { result[r].destroy() }
        }).then(getCountofBookings).then(function() {
          if (newVal==true) {
            var newBooking=new (Parse.Object.extend("Booking"))
            newBooking.save($scope.booking, {}).then(function(result) {
              
              $scope.event.relation("bookings").add(result)
              $scope.event.save().then(function() {                 
                Parse.User.current().relation("bookings").add(result)
                Parse.User.current().save()
              }).then(function() {}).then(getCountofBookings)
              
            })
          }
        })
        
      }
    })
    
  }  
  
  getEventDetails();
  setupWatchBookingToggle();
  
  
});

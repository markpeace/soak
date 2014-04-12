bbb.controller('ListEvents', function($state, $scope, ParseService, $rootScope) { 
  
  $scope.moment=moment
  $scope.securityLevel=$rootScope.currentUser.get('securityLevel')
  
  $scope.changeDate=function(increment) {
    $scope.selectedDate=$scope.selectedDate+increment;
  }
  
  var getAllEvents = function () {
    var Event = Parse.Object.extend("Event");
    var query = new Parse.Query(Event);
    query.ascending("time").include("series").include("host").find().then(function(results) {
      $scope.events=results
      findDates();
    });
    
  }
  
  var getBookedEvents = function () {
    $scope.events=[]
    var User=$rootScope.currentUser
    User.relation("bookings").query().include("event").include("event.host").include("event.series").find().then(function(result) {
      eventIds=[]
      for (r in result) { $scope.events.push(result[r].get("event")) }
      findDates();
    })
  }
  
  var findDates = function () {
    $scope.dates=[];
    
    t=""
    for (r in $scope.events) {
      proposed=moment($scope.events[r].get("time")).format("dddd, Do MMMM")
      if (proposed!=t) { $scope.dates.push(proposed) }
      t=proposed
    }
    
    $scope.selectedDate=0;
    
    $scope.$apply();  
  }
  
  if ($state.current.name=="tabs.schedule") { 
    $scope.scheduleTabColour='rgba(247, 200, 0, 0.5)'
    getAllEvents()
  } else if($state.current.name=="tabs.schedule_booked") {
    $scope.bookedTabColour='rgba(247, 200, 0, 0.5)'
    getBookedEvents()
  }
 
  
  
});
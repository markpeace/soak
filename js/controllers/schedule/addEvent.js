bbb.controller('AddEvent', function($scope, $ionicModal,  $state, $ionicLoading, ParseService) { 
  
  $scope.seriesLabel = "Series"
  $scope.tutorLabel = "Host"
  $scope.locationLabel = "Location"
  
  $scope.timeholder = { date: null, time:null }
  
  $scope.newEvent = {
    series:null,
    title:null,
    capacity: null,
    time:new Date(),
    description: null,
    location:null,
    host:null
  }
  
  $scope.availableDates=[new Date("22 Sept 2014 10:00")]  
  $scope.availableTimes=[$scope.availableDates[0]]  
  
  for (x=1; x<5; x++) {
    $scope.availableDates.push(new Date(new Date($scope.availableDates[x-1]).getTime() + 86400000))
  }
  
  for (x=1; x<21; x++) {
    $scope.availableTimes.push(new Date(new Date($scope.availableTimes[x-1]).getTime() + 1200000))
  }  
  
  var User = Parse.Object.extend("User");
  var query = new Parse.Query(User);
  query.lessThan("securityLevel",3);
  query.ascending("surname");
  query.find({
    success:function(result) {
      $scope.tutors=result
    }
  })
  
  var Location= Parse.Object.extend("Location");
  var locquery = new Parse.Query(Location);
  
  locquery.find({
    success:function(result) {
      $scope.locations=result
    }
  })
  
  var Series= Parse.Object.extend("Series");
  var seriesquery = new Parse.Query(Series);
  
  seriesquery.find({
    success:function(result) {
      $scope.series=result
    }
  })
  
  $ionicModal.fromTemplateUrl('pages/schedule/addEvent_tutorlist.html', function($ionicModal) {
    $scope.tutorlistModal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });  
  
  $ionicModal.fromTemplateUrl('pages/schedule/addEvent_location.html', function($ionicModal) {
    $scope.locationModal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  $ionicModal.fromTemplateUrl('pages/schedule/addEvent_series.html', function($ionicModal) {
    $scope.seriesModal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  
  $scope.$watch('newEvent.host',function(){      
    if ($scope.newEvent.host) { $scope.tutorLabel = $scope.newEvent.host.get('forename') + " " + $scope.newEvent.host.get('surname')} 
  })  
  $scope.$watch('newEvent.location',function(){      
    if ($scope.newEvent.location) { $scope.locationLabel = $scope.newEvent.location.get('label') } 
  })   
  $scope.$watch('newEvent.series',function(){      
    if ($scope.newEvent.series) { $scope.seriesLabel = $scope.newEvent.series.get('label')} 
  })    
  $scope.$watchCollection('[timeholder.date, timeholder.time]',function(){      
    $scope.newEvent.time=new Date($scope.timeholder.date + " " + $scope.timeholder.time)
  }) 
  
  $scope.saveEvent = function () {
    
    $scope.saving = $ionicLoading.show({
      content: 'Saving',
    });
    
    var event = new (Parse.Object.extend("Event")); 
    event.save($scope.newEvent, {
      success: function() {
        $scope.saving.hide();
        $state.go("tabs.schedule");
      },
      error: function(event, error) {
        $scope.saving.hide();
        alert("Error: " + error.message);
      }
      
    })
    
  }
  
})
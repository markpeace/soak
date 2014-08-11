brewbox.controller('ListSchedule', function($scope, ParseService) { 

        $scope.brewdays=[]

        new Parse.Query(Parse.Object.extend("Brewday"))
        .ascending("date")
        .include("recipe")
        .find()
        .then(function(result) {
		$scope.brewdays=result
        })
        
});
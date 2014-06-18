brewbox.controller('ListInventory', function($scope, HardwareInterface, $stateParams, $state, RecipeScraper, $ionicListDelegate) { 
       
        var getInventory = function () {
		(new Parse.Query("Inventory"))
                .equalTo("typeOf", null)
                .ascending("label")
                .find().then(function (result) {
                        $scope.inventory = result
                        
                        $scope.types = []
                        angular.forEach($scope.inventory, function(i) {
                                var exists=false
                                angular.forEach($scope.types, function (t) {
                                        if(t==i.get('type')) { exists=true }                                        
                                })
                                if (!exists) { $scope.types.push(i.get("type")) }
                        })
                        
                        console.log($scope.types)
                        
                })
        }
        getInventory();


});
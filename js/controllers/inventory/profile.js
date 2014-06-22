brewbox.controller('IngredientProfile', function($scope, $stateParams) { 

        getIngredient = function() {
				$scope.selectedID=$stateParams.ingredient_id;
           
                new Parse.Query(Parse.Object.extend("Inventory"))
                .get($scope.selectedID).then(function(result) {
                        $scope.ingredient = result
                		$scope.$apply()
                })

        }
		getIngredient();
		
				
});
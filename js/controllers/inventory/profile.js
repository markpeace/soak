brewbox.controller('IngredientProfile', function($scope, $stateParams) { 

        getIngredient = function() {
        	
                new Parse.Query(Parse.Object.extend("Inventory"))
                .get($scope.selectedID).then(function(result) {
                        $scope.ingredient = result
                		getAllIngredients()
                })

        }
        
        getAllIngredients = function () {
        	new Parse.Query(Parse.Object.extend("Inventory"))
        		.equalTo("type", $scope.ingredient.get("type"))
        		.notEqualTo("label", $scope.ingredient.get("label"))
        		.ascending("label")
                .find().then(function(result) {
                        $scope.ingredients = result
                		$scope.$apply()
                })
        }
        
        
        if($stateParams.ingredient_id) {
				$scope.selectedID=$stateParams.ingredient_id;
			getIngredient();
		}
		
		$scope.addIngredient = function () {
			alert("add ingredient")
		}
		
		$scope.setEquivalent = function (equivalentID) {
			console.log(equivalentID)
		}
				
});
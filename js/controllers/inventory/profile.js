brewbox.controller('IngredientProfile', function($scope, $state, ParseService, $stateParams) { 

        getIngredient = function() {

                new Parse.Query(Parse.Object.extend("Inventory"))
                .include("equivalent")
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

        $scope.setEquivalent = function (equivalent) {            

                if (equivalent=="addone") {
                        if (newIngredient=prompt("Name of New Ingredient")) {
                                (new (Parse.Object.extend("Inventory")))
                                .save({ 
                                        label: newIngredient,
                                        type: $scope.ingredient.get('type')
                                }).then(function(result){
                                        dummyIngredient = new (Parse.Object.extend("Inventory"))
                                        dummyIngredient.set("objectId", result.id)

                                        $scope.ingredient.set("equivalent", dummyIngredient).save().then(function() {
                                               $state.go($state.$current, null, { reload: true });
                                        })
                                })
                        }                                
                } else if (equivalent==null) {
                        $scope.ingredient.set("equivalent", null).save()
                } else {  
                        dummyIngredient = new (Parse.Object.extend("Inventory"))
                        dummyIngredient.set("objectId",$scope.selectedIngredient)

                        $scope.ingredient.set("equivalent", dummyIngredient).save().then(getIngredient)
                }
        }

});
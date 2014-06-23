brewbox.controller('IngredientProfile', function($scope, $state, ParseService, $stateParams) { 

        getIngredient = function() {

                new Parse.Query(Parse.Object.extend("Inventory"))
                .include("parent")
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

        $scope.setParent = function (parent) {            

                if (parent=="addone") {
                        if (newIngredient=prompt("Name of New Ingredient")) {
                                (new (Parse.Object.extend("Inventory")))
                                .save({ label: newIngredient, type: $scope.ingredient.get('type')
                                      }).then(function(result){

                                        result.relation("children").add($scope.ingredient)
                                        result.set("childCount", 1)
                                        result.save()

                                        $scope.ingredient.set("parent", result).save().then(function() {
                                                $state.go($state.$current, null, { reload: true });
                                        })
                                })
                        }                                
                } else if (parent==null) {

                        $scope.ingredient.get('parent').relation("children").remove($scope.ingredient)
                        $scope.ingredient.get('parent').set("childCount", $scope.ingredient.get('parent').get("childCount")-1)
                        $scope.ingredient.get('parent').save()
                        $scope.ingredient.set("parent", null).save()

                } else {  

                        new Parse.Query(Parse.Object.extend("Inventory"))
                        .get(parent).then(function (parent) {
                                parent.relation("children").add($scope.ingredient)
                                parent.set("childCount", 1 + (parent.get("childCount") || 0))
                                console.log( parent.get("childCount"))
                                parent.save()
                                $scope.ingredient.set("parent", parent).save().then(getIngredient)
                        })

                }
        }

}) 
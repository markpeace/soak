brewbox.controller('ListRecipes', function($scope, ParseService, $ionicSideMenuDelegate, $stateParams, $q, RecipeScraper) { 

        retrieveRecipes = function() {
                new Parse.Query(Parse.Object.extend("Recipe"))
                .ascending("name")
                .find().then(function(result) {
                        $scope.recipes = result   
                        
                        angular.forEach(result,function(r) { 
                        
                                r.ingredientsOnHand=0
                                
                        	RecipeScraper.regulariseRecipe(r.get('profile')).then(function(regularisedRecipe){
                                        r.ingredientsOnHand=1
                                        angular.forEach(regularisedRecipe, function(i) {
                                                if((i.get("onHand")||0)-(i.get("amount")||0)<0) r.ingredientsOnHand=-1
                                        })
                                })
                        })
                        
                        $scope.$apply();

                })
        };
        retrieveRecipes()

        if ($stateParams.recipe_id) { 
                $scope.selectedID=$stateParams.recipe_id; 
                $ionicSideMenuDelegate.toggleRight();           //      <-- This was causing problems, probably an Ionic version bug
        }         

        $scope.refreshRecipes=function () {RecipeScraper.retrieveBrewtoadRecipeList()}

});
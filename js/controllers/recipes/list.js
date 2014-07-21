brewbox.controller('ListRecipes', function($scope, ParseService, $ionicSideMenuDelegate, $stateParams,RecipeScraper) { 

        retrieveRecipes = function() {
                new Parse.Query(Parse.Object.extend("Recipe"))
                .ascending("name")
                .find().then(function(result) {
                        $scope.recipes = result
                        $scope.$apply()
                })
        };
        retrieveRecipes()

        if ($stateParams.recipe_id) { 
                $scope.selectedID=$stateParams.recipe_id; 
                $ionicSideMenuDelegate.toggleRight();           //      <-- This was causing problems, probably an Ionic version bug
        }         

        $scope.refreshRecipes=function () {RecipeScraper.retrieveBrewtoadRecipeList()}

});
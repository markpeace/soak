brewbox.controller('RecipeProfile', function($scope, $stateParams) { 

        if ($stateParams.recipe_id) {
                $scope.selectedID=$stateParams.recipe_id
                new Parse.Query(Parse.Object.extend("Recipe"))
                .get($scope.selectedID).then(function(result) {
                        $scope.recipe = result
                        $scope.$apply()
                })
        }

});
brewbox.controller('RecipeProfile', function($scope, $stateParams, $ionicModal) { 

        if ($stateParams.recipe_id) {
                $scope.selectedID=$stateParams.recipe_id
                new Parse.Query(Parse.Object.extend("Recipe"))
                .get($scope.selectedID).then(function(result) {
                        $scope.recipe = result
                        $scope.$apply()
                })
        }


        $ionicModal.fromTemplateUrl('pages/schedule/new.html', function($ionicModal) {
                $scope.newBrewday = $ionicModal;
        }, {
                scope: $scope,
                animation: 'slide-in-up'
        });   
        
        $scope.newBrewdayDate = moment(new Date()).add('days', 1).utc().hour(10).minute(00);     


});
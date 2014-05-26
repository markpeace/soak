brewbox.controller('Recipes', function($scope, $http, ParseService, $ionicSideMenuDelegate, $stateParams) { 

        new Parse.Query(Parse.Object.extend("Recipe"))
        .find().then(function(result) {
                $scope.recipes = result
                $scope.$apply()
        })
        
        if ($stateParams.recipe_id) { $scope.selectedID=$stateParams.recipe_id; $ionicSideMenuDelegate.toggleRight(); }       




        /*    
        $http({method: 'GET', url: 'http://ordeal-dromic.codio.io:3000/scrape/https/www.brewtoad.com/users/39308/recipes/' })
        .success(function(result) {        
           		console.log ("done")
                console.log (decodeURIComponent(result.result.replace(/\+/g, ' ')))
        }).
        error(function(data, status, headers, config) {
            console.log("error")
                console.log(status)
        });*/

});
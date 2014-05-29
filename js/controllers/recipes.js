brewbox.controller('Recipes', function($scope, $http, ParseService, $ionicSideMenuDelegate, $stateParams, $ionicLoading) { 

        retrieveRecipes = function() {
                new Parse.Query(Parse.Object.extend("Recipe"))
                .ascending("name")
                .find().then(function(result) {
                        $scope.recipes = result
                        $scope.$apply()
                })
        };
        retrieveRecipes()

        if ($stateParams.recipe_id) { $scope.selectedID=$stateParams.recipe_id; $ionicSideMenuDelegate.toggleRight(); }       


        $scope.refreshRecipes = function () {

                $ionicLoading.show({
                        template: 'Loading...'
                });


                btrecipes = []
                btrecipeCount=0
                scrapeCount=0

                getRecipes = function () {
                        $http({method: 'GET', url: 'http://telnetservice.herokuapp.com/scrape/https/www.brewtoad.com/users/39308/recipes/' }).success(function(result) {                               
                                scrapeCount=scrapeCount+1;
                                parseRecipes(result)
                                if (btrecipes.length<btrecipeCount) { getRecipes() } else  processRecipes()                                 //CHANGE THIS TO INCREASE THE NUMBER OF SCRAPES OF BREWTOAD
                                        }).error(function() {
                                getRecipes()
                        })
                }

                parseRecipes = function(result) {

                        result=decodeURIComponent(result.result.replace(/\+/g, ' '))                    

                        btrecipeCount=result.substring(0, result.indexOf(" Recipes</strong></li>"))
                        btrecipeCount=btrecipeCount.substring(btrecipeCount.lastIndexOf(">")+1)
                        btrecipeCount=parseInt(btrecipeCount)

                        result = result.substring(result.indexOf('<div class="recipe">'))
                        result = result.substring(0,result.indexOf('</ol>'))

                        result = result.split('<div class="recipe">')                        

                        angular.forEach(result, function (recipe) {

                                reference=recipe.substring(recipe.indexOf('/recipes/')+9)
                                reference=reference.substring(0, reference.indexOf('"'))

                                name=recipe.substring(recipe.indexOf('"name">')+7)
                                name=name.substring(0, name.indexOf('</span>'))

                                style=recipe.substring(recipe.indexOf('"style">')+8        )
                                style=style.substring(0, style.indexOf('</span>'))                                

                                if (name!="") { 
                                        exists = false;

                                        angular.forEach(btrecipes, function (btrecipe) {
                                                if (btrecipe.reference==reference) { exists=true }
                                        })

                                        if (!exists) { btrecipes.push({reference: reference, name:name, style:style}) }                                                                                
                                }

                        })
                }

                processRecipes = function () {
                        $ionicLoading.hide();
                        
                        highestAdd=0
                        
                        angular.forEach(btrecipes, function(btrecipe,index) {

                                doesRecipeExist=false
                                angular.forEach($scope.recipes, function(recipe) {
                                        if(recipe.get('reference')==btrecipe.reference) { doesRecipeExist=true }
                                })
                                if (!doesRecipeExist) {  
                                        highestAdd = btrecipe.reference;
                                        (new (Parse.Object.extend("Recipe"))).save(btrecipe).then(function(result) {
                                                if(result.get("reference")==highestAdd) { console.log("ping"); retrieveRecipes(); }
                                        })                                     
                                }
                        })

                }

                getRecipes();

        }

});
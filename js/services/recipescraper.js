brewbox.factory ('RecipeScraper', function($http, ParseService, $ionicLoading ) {

        var BrewtoadID = "39308"

        var _retrieveBrewtoadRecipeList = function() { 

                recipesToAdd = []
                brewtoadRecipeCount = 0

                getBrewtoadList = function () {     

                        $ionicLoading.show({ template: 'Retrieving List of Brewtoad Recipes' })

                        $http({method: 'GET', url: "http://telnetservice.herokuapp.com/scrape/https/www.brewtoad.com/users/" + BrewtoadID+ "/recipes" })
                        .error(function() { getBrewtoadList() })
                        .success(function(r) {                                                                                
                                count = decodeURI(r.result)
                                count = count.substr(0, count.indexOf(' Recipes</strong></li>'))
                                count = count.substr(count.lastIndexOf(">")+1)
                                count.to_i

                                if(count>brewtoadRecipeCount) { brewtoadRecipeCount=count }

                                recipesOnPage=decodeURI(r.result)
                                recipesOnPage=recipesOnPage.substr(recipesOnPage.indexOf('<li class="recipe-container">'))

                                angular.forEach(recipesOnPage.split('<li class="recipe-container">'), function(recipe) {
                                        newRecipe={}
                                        newRecipe.reference = recipe.substring(recipe.indexOf('recipes/')+8)
                                        newRecipe.reference = newRecipe.reference.substring(0, newRecipe.reference.indexOf('" class'))

                                        newRecipe.name = recipe.substring(recipe.indexOf('class="name">')+13)
                                        newRecipe.name = newRecipe.name.substring(0, newRecipe.name.indexOf("</span>"))

                                        newRecipe.style = recipe.substring(recipe.indexOf('class="style">')+14)
                                        newRecipe.style = newRecipe.style.substring(0, newRecipe.style.indexOf("</span>"))

                                        exists=false
                                        angular.forEach(recipesToAdd, function(toAdd) {
                                                if (toAdd.reference == newRecipe.reference) { exists=true}
                                        })

                                        if (!exists && newRecipe.reference!="") { recipesToAdd.push(newRecipe) }
                                })

                                console.log(recipesToAdd.length + " recipes found")

                                if (recipesToAdd.length == brewtoadRecipeCount) {                                                
                                        $ionicLoading.hide();
                                        _updateParseRecipes(recipesToAdd)
                                } else {
                                        getBrewtoadList();
                                }                                         

                        })

                }


                getBrewtoadList();

        }

        var _updateParseRecipes = function (recipesToAdd) {

                $ionicLoading.show({ template: 'Updating Parse Database' })

                parseRecipes=[]
                var getParseRecipes=function() {
                        (new Parse.Query("Recipe"))
                        .find().then(function(r) {
                                parseRecipes=r;
                                deleteRemovedRecipes()
                        })
                }

                var deleteRemovedRecipes = function () {
                        
                        angular.forEach(parseRecipes, function(parseRecipe) {
                                
                                isFound=false
                                
                                angular.forEach(recipesToAdd, function (recipeToAdd) {
                                        if (parseRecipe.get("reference")==recipeToAdd.reference) { isFound=true }
                                })
                                
                                if (!isFound) { 
                                        console.log("Removed " + parseRecipe.get("name"))
                                        parseRecipe.destroy() 
                                }
                                                                
                        })
                        
                        findAddedRecipes()
                }

                recipesToScrape = []
                var findAddedRecipes = function () {
                        angular.forEach(recipesToAdd,function(recipeToAdd) {

                                alreadyExists=false

                                angular.forEach(parseRecipes, function(parseRecipe) {
                                        if(parseRecipe.get("reference") == recipeToAdd.reference) { alreadyExists=true }
                                })

                                if (!alreadyExists) { recipesToScrape.push(recipeToAdd) }

                        }) 

                        insertAddedRecipes()

                }

                addedRecipeIndex=-1
                var insertAddedRecipes = function() {
                        
                        addedRecipeIndex++

                        if (addedRecipeIndex==recipesToScrape.length) {
                                $ionicLoading.hide()
                                console.log("done")
                                return _retrieveRecipeDetails(recipesToScrape);
                        } else {
                                 (new (Parse.Object.extend("Recipe")))
                                .save({ 
                                        reference: recipesToScrape[addedRecipeIndex].reference,
                                        name: recipesToScrape[addedRecipeIndex].name,
                                        style: recipesToScrape[addedRecipeIndex].style
                                }).then(function(r) {
                                        console.log("added " + recipesToScrape[addedRecipeIndex].name)
                                        recipesToScrape[addedRecipeIndex]=r
                                        insertAddedRecipes()                                        
                                }) 
                        }

                }

                getParseRecipes()                

        }

        var _retrieveRecipeDetails = function (recipesToScrape) {
                
                $ionicLoading.show({ template: 'Scraping Recipe Details' })
                recipeIndex=-1
                
                var scrapeRecipe=function() {                                                
                        
                        recipeIndex++
                        
                        if (recipeIndex==recipesToScrape.length) {
                                $ionicLoading.hide()
                                console.log("done")
                                return
                        }

                        $http({method: 'GET', url: "http://telnetservice.herokuapp.com/scrape/https/www.brewtoad.com/recipes/" + recipesToScrape[recipeIndex].get("reference")  })
                        .error(function() { scrapeRecipe() })
                        .success(function (result) {
                                
                                recipeProfile={
                                        fermentables:[],
                                        total_fermentables:0,
                                        fermentables_in_mash:0
                                }
	                                
                                result = decodeURI(result.result).replace(/(\r\n|\n|\r)/gm,"")                              
                                
                                //GET BATCH SIZE
                                recipeProfile.batchSize = result.substring(result.indexOf("Batch size:")+19)
                                recipeProfile.batchSize = parseFloat(recipeProfile.batchSize.substring(0, recipeProfile.batchSize.indexOf("L</strong>")))
                                
                                
                                //GET FERMENTABLES
                                fermentables=result.substring(result.indexOf("<th>Fermentable</th>"))
                                fermentables=fermentables.substring(fermentables.indexOf("<tr>"))
                                fermentables=fermentables.substring(0, fermentables.indexOf("</tbody>"))
                                fermentables=fermentables.substring(0, fermentables.lastIndexOf("</tr>"))
                                
                                fermentables=fermentables.split("</tr>")
                                
                                angular.forEach(fermentables, function(fermentable) {
                                        fermentable=fermentable.split("</td>")
                                       
                                        newFermentable = {}
                                        newFermentable.name=fermentable[0].substring(fermentable[0].indexOf("</div>")+6)
                                        if (newFermentable.name.indexOf("a href")>0) {
	                                        newFermentable.name=newFermentable.name.substring(newFermentable.name.indexOf('">')+2)                                               
                                                newFermentable.name=newFermentable.name.substring(0,newFermentable.name.indexOf('</a>'))                                               
                                        }
                                        
                                        newFermentable.amount=fermentable[1].substring(fermentable[1].indexOf("nowrap'>")+8)
                                        
                                        amount=newFermentable.amount.split(" ")
                                        newFermentable.amount=parseFloat(amount[0])
                                        if (amount[1]=="kg") { newFermentable.amount=newFermentable.amount * 1000}
                                                                                
                                        newFermentable.use = fermentable[3].substring(fermentable[3].indexOf(">")+1)                                                                                

                                  	recipeProfile.total_fermentables=recipeProfile.total_fermentables+newFermentable.amount
                                        if (newFermentable.use=="Mash") {recipeProfile.fermentables_in_mash=recipeProfile.fermentables_in_mashT+newFermentable.amount}                                        
                                                                                
                                        recipeProfile.fermentables.push(newFermentable)
                                })
                                
                                
                                
                                //GET HOPS
                                //GET YEASTS
                                //GET MASH STEPS
                                
                                console.log(recipeProfile)
                                scrapeRecipe();
                        })
                        
                        
                }
                   
                scrapeRecipe();
                
        }

        return {

                retrieveBrewtoadRecipeList: function() { _retrieveBrewtoadRecipeList() },
                retrieveRecipeDetails: function(recipesToScrape) { _retrieveRecipeDetails(recipesToScrape) }

        }

});

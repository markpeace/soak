brewbox.factory('RecipeScraper', function($http, ParseService, $ionicLoading) {

        String.prototype.toTitleCase = function(){
                var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

                return this.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
                        if (index > 0 && index + match.length !== title.length &&
                            match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
                            (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
                            title.charAt(index - 1).search(/[^\s-]/) < 0) {
                                return match.toLowerCase();
                        }

                        if (match.substr(1).search(/[A-Z]|\../) > -1) {
                                return match;
                        }

                        return match.charAt(0).toUpperCase() + match.substr(1);
                });
        };


        var storeIngredients=function(ingredients) {

                toAdd = []

                angular.forEach(['fermentable','hop', 'yeast'], function(ingredientType) {
                        angular.forEach(ingredients[ingredientType+"s"],function(ingredient) {
                                toAdd.push({type: ingredientType, label: ingredient.label})
                        })
                })

                i=-1;

                var addIngredient = function() {
                        i=i+1;
                        if (i<toAdd.length) {
                                ingredientQuery = new Parse.Query("Inventory")
                                .equalTo("type", toAdd[i].type)
                                .equalTo("label", toAdd[i].label)
                                .count().then(function(r) {

                                        if (r==0) {
                                                ingredient = new (Parse.Object.extend("Inventory"))
                                                ingredient.save(toAdd[i]).then(addIngredient)
                                        } else {
                                                addIngredient();
                                        }

                                })
                        } else {
                        	    $ionicLoading.hide()
                        	
                        }
                }
                addIngredient();        

        }


        return {
                updateRecipeXML: function (recipe) {
                        console.log("Updating Recipe XML")
                            $ionicLoading.show({
      							template: 'Updating Ingredients...'
      							})
                        $http({method: 'GET', url: "http://telnetservice.herokuapp.com/scrape/https/www.brewtoad.com/recipes/"+recipe.get('reference')+".xml" }).success(function(result) {                               
                                result=decodeURIComponent(result.result.replace(/\+/g, ' ')).toLowerCase().replace("yeast", "yeasts")             

                                var r = {
                                        ingredients:{
                                                total_fermentables:0,
                                                fermentables: [],
                                                total_hops: 0,
                                                hops:[]
                                        }
                                }                                

                                angular.forEach(['fermentable','hop', 'yeast'],function(ingredientType) {

                                        r.ingredients[ingredientType+"s"]=[]
                                        r.ingredients["total_"+ingredientType+"s"]=0                                                                                

                                        ingredients=result.substr(result.indexOf("<" + ingredientType + ">")+13)                                
                                        ingredients=ingredients.substr(0,ingredients.indexOf("</" + ingredientType + "s>"))
                                        ingredients=ingredients.split("<"+ingredientType+">")

                                        angular.forEach(ingredients, function(ingredient) {

                                                label=ingredient.substr(ingredient.indexOf("<name>")+6)
                                                label=label.substr(0,label.indexOf("</name>"))

                                                amount=ingredient.substr(ingredient.indexOf("<amount>")+8)
                                                amount=parseFloat(amount.substr(0,amount.indexOf("</amount>")))

                                                if (isNaN(amount)) { amount = 1}

                                                r.ingredients[ingredientType+"s"].push({label: label.toTitleCase(), amount: amount})
                                                r.ingredients['total_'+ingredientType+"s"]=r.ingredients['total_'+ingredientType+"s"]+amount

                                        })        
                                })                               

                                boiltime=result.substr(result.indexOf("<boil_time>")+11)                                
                                boiltime=boiltime.substr(0,boiltime.indexOf("</"))

                                r.boiltime=parseInt(boiltime)

                                storeIngredients(r.ingredients)

                                recipe.set("xml", r)
                                recipe.save();

                        })
                }
        }


});
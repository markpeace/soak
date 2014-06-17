brewbox.factory('RecipeScraper', function($http, ParseService) {

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


        var storeIngredients=function(recipe) {
                
                /*ingredient = new (Parse.Object.extend("Ingredient"))
                ingredient.save({type:ingredientType, label: ingredientLabel}).then(function(newIngredient) {
                        
                        new Parse.Query("Ingredient")
                        .equalTo("label", newIngredient.get('label'))
                        .find().then(function(c) {
                                console.log(newIngredient.get('label'))	
                                console.log(c.length)
                        })
                        

                })*/                

        }


        return {
                updateRecipeXML: function (recipe) {
                        console.log("Updating Recipe XML")
                        console.log(recipe)
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

                                                name=ingredient.substr(ingredient.indexOf("<name>")+6)
                                                name=name.substr(0,name.indexOf("</name>"))

                                                amount=ingredient.substr(ingredient.indexOf("<amount>")+8)
                                                amount=parseFloat(amount.substr(0,amount.indexOf("</amount>")))

                                                if (isNaN(amount)) { amount = 1}

                                                r.ingredients[ingredientType+"s"].push({name: name.toTitleCase(), amount: amount})
                                                r.ingredients['total_'+ingredientType+"s"]=r.ingredients['total_'+ingredientType+"s"]+amount

                                                //storeIngredient(ingredientType.toTitleCase(), name.toTitleCase())

                                        })        
                                })                               

                                boiltime=result.substr(result.indexOf("<boil_time>")+11)                                
                                boiltime=boiltime.substr(0,boiltime.indexOf("</"))

                                r.boiltime=parseInt(boiltime)

                                recipe.set("xml", r)
                                recipe.save();

                        })
                }
        }


});
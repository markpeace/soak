brewbox.factory('RecipeScraper', function($http) {

        return {
                updateRecipeXML: function (recipe) {
                        console.log("Updating Recipe XML")
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
                                                
                                                r.ingredients[ingredientType+"s"].push({name: name, amount: amount})
                                                r.ingredients['total_'+ingredientType+"s"]=r.ingredients['total_'+ingredientType+"s"]+amount

                                                
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
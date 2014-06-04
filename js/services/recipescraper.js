brewbox.factory('RecipeScraper', function($http) {
      
        return {
                updateRecipeXML: function (recipe) {
                        console.log("Updating Recipe XML")
                        $http({method: 'GET', url: "http://telnetservice.herokuapp.com/scrape/https/www.brewtoad.com/recipes/"+recipe.get('reference')+".xml" }).success(function(result) {                               
                                result=decodeURIComponent(result.result.replace(/\+/g, ' '))                    
                                
                                var r = {
                                        ingredients:{
                                                total_fermentables:0,
                                                fermentables: [],
                                                total_hops: 0,
                                                hops:[]
                                        }
                                }
                                
                                fermentables=result.substr(result.indexOf("<FERMENTABLE>")+13)                                
                                fermentables=fermentables.substr(0,fermentables.indexOf("</FERMENTABLES>"))
                                fermentables=fermentables.split("<FERMENTABLE>")
                                
                                angular.forEach(fermentables, function(fermentable) {
                                        name=fermentable.substr(fermentable.indexOf("<NAME>")+6)
                                        name=name.substr(0,name.indexOf("</NAME>"))
                                        
                                        amount=fermentable.substr(fermentable.indexOf("<AMOUNT>")+8)
                                        amount=parseFloat(amount.substr(0,amount.indexOf("</AMOUNT>")))
                                        
                                        r.ingredients.fermentables.push({name: name, amount: amount})
                                        r.ingredients.total_fermentables=r.ingredients.total_fermentables+amount

                                })
                                                                
                        })
                }
        }


});
brewbox.controller('Recipes', function($scope, $http) { 
        console.log("recipes");        

    	//http://ordeal-dromic.codio.io:3000/scrape/https/www.brewtoad.com/users/39308/recipes/
    
        $http({method: 'GET', url: 'http://ordeal-dromic.codio.io:3000/scrape/https/www.brewtoad.com/users/39308/recipes/' })
        .success(function(result) {        
           		console.log ("done")
                console.log (decodeURIComponent(result.result.replace(/\+/g, ' ')))
        }).
        error(function(data, status, headers, config) {
            console.log("error")
                console.log(status)
        });

});
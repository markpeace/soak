brewbox.controller('Recipes', function($scope, $http) { 
        console.log("recipes");        

    	$scope.recipes = [
            { id: 1, name: 'Plekk', style: 'Imperial IPA'  },
            { id: 1, name: 'Nimbus Imperius', style: 'Russian Imperial Stout'  },
            { id: 1, name: 'Stratus', style: 'Pale Ale'  },
            { id: 1, name: 'Arcus', style: 'Vienna Lager'  },
            { id: 1, name: 'Lenticular', style: 'India Pale Ale'  }
        ]




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
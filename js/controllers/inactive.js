soak.controller('Inactive', function($scope, $state) { 
        console.info("controller handed over to: inactive.js")
        
        $scope.activate = function () {
                console.warn("need to write a function which sends the activate message, and redirects only once this is acknowledged")
                $state.go("active")
        }
        
});
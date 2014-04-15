brewbox.directive('brewMonitorComponent', function() {
    return {
        restrict: 'E',
        templateUrl: 'pages/_directives/brewMonitorComponent.html',
        controller:'BrewMonitorComponent'
    }
});

brewbox.controller('BrewMonitorComponent', function($scope, ParseService, $ionicSideMenuDelegate) { 
    console.log("hp")
});
brewbox.controller('MainUI', function($scope, ParseService, $ionicSideMenuDelegate) { 
        $scope.showLeft = function() {
                $ionicSideMenuDelegate.toggleLeft();
        };
        $scope.showRight = function() {
                $ionicSideMenuDelegate.toggleRight();
        };

});
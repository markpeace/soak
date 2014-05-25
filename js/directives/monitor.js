brewbox.directive('brewMonitorComponent', function() {
        return {
                restrict: 'E',
                scope: {
                        component: "="                        
                },
                templateUrl: 'pages/_directives/brewMonitorComponent.html',
                controller:'BrewMonitorComponent'
        }
});


brewbox.controller('BrewMonitorComponent', function($scope, $ionicSideMenuDelegate, HardwareInterface) { 

        $scope.hardwareReadings = HardwareInterface.hardwareReadings();
        
        var polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
                var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

                return {
                        x: centerX + (radius * Math.cos(angleInRadians)),
                        y: centerY + (radius * Math.sin(angleInRadians))
                };
        }

        $scope.describeArc = function(x, y, radius, startAngle, endAngle){

                var start = polarToCartesian(x, y, radius, endAngle);
                var end = polarToCartesian(x, y, radius, startAngle);

                var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

                var d = [
                        "M", start.x, start.y, 
                        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
                ].join(" ");

                return d;       
        }        

        
});
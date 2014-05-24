brewbox.controller('Monitor', function($scope, ParseService, $ionicSideMenuDelegate, $http, HardwareInterface) { 

        $scope.components=[{
                title: 'Hot Liquor Tun',
                hardwareReference: 'HLT',                             
                indicators: { 
                        level: { colour: 'CornflowerBlue', capacity: 100 } 
                }
        },{
                title: 'Mash Tun',
                hardwareReference: 'MSH',
                indicators: { 
                        level: { colour: 'GoldenRod', capacity: 38 } 
                }
        },{
                title: 'Copper',
                hardwareReference: 'CPR',
                indicators: { 
                        level: { colour: 'GoldenRod', capacity: 50 } 
                }
        }] 
   
        $scope.HardwareInterface=HardwareInterface;

});
brewbox.controller('Monitor', function($scope, HardwareInterface) { 

        $scope.requestsMade = HardwareInterface.requestsMade;

        $scope.components=[{
                title: 'Hot Liquor Tun',
                hardwareReference: 'HLT',                             
                indicators: { 
                        level: { colour: 'CornflowerBlue', capacity: 100 }
                        temperature: { watchVariable: 'HardwareInterface.hardwareReadings.HLT.temp' }
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

});
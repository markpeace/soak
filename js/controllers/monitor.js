brewbox.controller('Monitor', function($scope) { 

        $scope.components=[{
                title: 'Hot Liquor Tun',      
                hardwareReference: 'hlt',
                indicators: { 
                        level: { colour: 'CornflowerBlue', capacity: 100 },
                        temperature: { readingVariable: 'temp' }
                }
        }/*,{
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
        }*/]   
        
});
brewbox.controller('Monitor', function($scope, ParseService, $ionicSideMenuDelegate, $http) { 

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



        $http({method: 'GET', url: 'http://telnetservice.herokuapp.com/bowerfold.dlinkddns.com/200/HLT%20GET%20VOL'}).
        success(function(data, status, headers, config) {
                console.log(data)
                // this callback will be called asynchronously
                // when the response is available
        }).
        error(function(data, status, headers, config) {
                console.log("nope")
                // called asynchronously if an error occurs
                // or server returns response with an error status.
        });        

});
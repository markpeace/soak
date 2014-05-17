brewbox.factory('HardwareInterface', function($http, $interval) {
        var data = { pulseInterval: 5000, requests: 0, server:"http://telnetservice.herokuapp.com/bowerfold.dlinkddns.com"  };
        var pollhardware = function() {




                angular.forEach([{
                        variable: 'HLT TEMP',
                        port: 200,
                        command: 'HLT GET TEMP'
                },{
                        variable: 'HLT VOL',
                        port: 200,
                        command: 'HLT GET VOL'
                }],function(val) {
                        $http({method: 'GET', url: data.server+"/"+val.port+"/"+val.command})
                        .success(function(data, status, headers, config) {
                                data.latestData = data;
                                data.calls++;
                        })                 
                })



        };

        $interval(pollhardware, data.pulseInterval)

        return {
                data: data
        };
});
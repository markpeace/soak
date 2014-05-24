brewbox.factory('HardwareInterface', function($http, $interval) {
        var data = { pulseInterval: 5000, requests: 0, server:"http://telnetservice.herokuapp.com/bowerfold.dlinkddns.com/200/PING"  };
        var pollhardware = function() {

                $http({method: 'GET', url: data.server })
                .success(function(data, status, headers, config) {
                        data.latestData = data;
                        data.calls++;
                        console.log(data);
                })                 
                

        };

        $interval(pollhardware, data.pulseInterval)

        return {
                data: data
        };
});
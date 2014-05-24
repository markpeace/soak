brewbox.factory('HardwareInterface', function($http, $interval) {
        var data = { pulseInterval: 5000, requests: 0, server:"http://telnetservice.herokuapp.com/bowerfold.dlinkddns.com/200/HLT PING",
                    /*HLT: {
                            VOL: 0,
                            TEMP: 0
                    }*/        
                   
                   };
        
        var pollhardware = function() {

                $http({method: 'GET', url: data.server })
                .success(function(result, status, headers, config) {
                        data.latestData = result;
                        data.requests++;
                        
                        $interval(pollhardware, data.pulseInterval)

                })                 
                

        }();

        return {
                data: data
        };
});
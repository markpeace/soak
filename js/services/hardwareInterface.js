brewbox.factory('HardwareInterface', function($http, $interval) {
        
        var setting = {
                activated: false,
                pulseInterval: 5000,
                requestsMade: 0,
                server: 'http://telnetservice.herokuapp.com/bowerfold.dlinkddns.com'
        }
        
        var hardwareReadings= {}
        
        var requestQueue = [{
                port: 200,
                command: "HLT PING",
                assignResponseTo: "hardwareReadings",
                requeueAfterProcessing: true,
        }]
        
        processRequest = function () {
                setting.requestsMade++;
                console.log(setting.requestsMade)
        }
        if (!setting.activated) { setting.activated=true; $interval(processRequest, setting.pulseInterval)}        
        
        return {
                requestQueue: requestQueue,
                hardwareReadings: hardwareReadings
        }
        
        
        
        /*
        
        
        var data = { pulseInterval: 5000, active: false, requests: 0, server:"http://telnetservice.herokuapp.com/bowerfold.dlinkddns.com/200/HLT PING"};
                
        var pollhardware = function() {
                
                data.active=true

                $http({method: 'GET', url: data.server })
                .success(function(result, status, headers, config) {
                        data.latestData = result;
                        data.requests++;                       
                        
                        $interval(pollhardware, data.pulseInterval)

                        console.log(result)
                })                 
                

        }
        
        console.log("included");
        if (!data.active) { pollhardware(); console.log("activate!"); };

        return {
                data: data
        };*/
        
});
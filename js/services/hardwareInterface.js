soak.factory('HardwareInterface', function($http, $q) {

        var settings = {
                server: 'http://mptoolbox.herokuapp.com/telnet/bowerfold.dlinkddns.com/',
                port: 200
        }


        return {

                ping: function () {
                        return $q.all(
                                $http({method: 'GET', url: settings.server+"/"+settings.port+"/p" })
                        )

                },
                toggleActivation:function() {
                        return $q.all(
                                $http({method: 'GET', url: settings.server+"/"+settings.port+"/a" })
                        )
                },
                setParameters:function(waitTime, hotTime, coldTime) {
                        return $q.all(                                                               
                                $http({method: 'GET', url: settings.server+"/"+settings.port+"/"+waitTime+";"+hotTime+";"+coldTime })
                        )
                }

        }


        /*
        var settings = {
                activated: false,
                pulseInterval: 1000,
                requestsMade: 0,
                server: 'http://mptoolbox.herokuapp.com/telnet/bowerfold.dlinkddns.com'
        }

        var hardwareReadings= {
                hlt: {parameters:{}, readings: {}},
                msh: {parameters:{}, readings: {}}
        }

        var requestQueue = [{
                port: 200,
                command: "HLT PARAMETERS",
                assignResponseTo: "hardwareReadings.hlt.parameters",
                requeueAfterProcessing: false,
        },{
                port: 200,
                command: "HLT PING",
                assignResponseTo: "hardwareReadings.hlt.readings",
                requeueAfterProcessing: true,
        },{
                port: 200,
                command: "MSH PING",
                assignResponseTo: "hardwareReadings.msh.readings",
                requeueAfterProcessing: true,
        }]

        processRequest = function () {
                settings.requestsMade++;        

                if (requestQueue.length==0) { return; }

                var currentRequest = requestQueue[0];
                requestQueue.splice(0,1)


                $http({method: 'GET', url: settings.server+"/"+currentRequest.port+"/"+currentRequest.command })
                .success(function(result) {                        
                        eval(currentRequest.assignResponseTo + "=" + JSON.stringify(result))                        
                        if (currentRequest.requeueAfterProcessing) requestQueue.push(currentRequest);
                })          

        }
        if (!settings.activated) { settings.activated=true; $interval(processRequest, settings.pulseInterval)}        

        return {
                settings: settings,
                requestQueue: requestQueue,
                hardwareReadings: function() { return hardwareReadings }
        }
*/
});
soak.controller('Active', function($scope, $state, HardwareInterface) { 
        console.info("controller handed over to: active.js")

        console.warn("this page needs reformatting to be driven by a drag-and-drop graphical interface")

        $scope.params = [
                { hint: 'Time until bath (mins)', value: null },             
                { hint: 'Desired Temperature (degC)', value: null },                
                { hint: 'Depth (litres)', value: null }                
        ]

        $scope.submit = function () {

                p = {
                        target: {
                                time: parseInt($scope.params[0].value),
                                temp: parseInt($scope.params[1].value),
                                depth: parseInt($scope.params[2].value),      
                        },
                        
                        send: {
                                wait:1000,
                                hot:1000,
                                cold:1000
                        },

                        cold: {
                                litresPerMin: 2,
                                averageTemp: 5,                                
                        },

                        hot: {
                                litresPerMin: 2,
                                averageTemp: 50
                        },

                        limit: {
                                temperature: 50,
                                depth: 50
                        } 

                }

                if (p.target.depth>p.limit.depth) p.target.depth=p.limit.depth
                if (p.target.temp>p.limit.temperature) p.target.temp=p.limit.temperature

                p.target.coldRatio = p.hot.averageTemp - p.target.temp
                p.target.hotRatio = p.target.temp - p.cold.averageTemp
                
                p.target.totalRatio = p.target.hotRatio + p.target.coldRatio
                p.target.coldRatio = p.target.coldRatio / p.target.totalRatio
                p.target.hotRatio = p.target.hotRatio / p.target.totalRatio
                
                p.target.hotWater = p.target.depth * p.target.hotRatio                
                p.target.coldWater = p.target.depth * p.target.coldRatio
                
                p.send.hot = Math.round((p.target.hotWater / p.hot.litresPerMin) * 60000)
                p.send.cold = Math.round((p.target.coldWater / p.cold.litresPerMin) * 60000)
                
                p.send.wait = (p.target.time * 60000) - (p.send.hot+p.send.cold)
                if (p.send.wait<0) p.send.wait=0
                
                console.log(p)


                
                HardwareInterface.setParameters(p.send.wait, p.send.hot, p.send.cold)
                .then(function(result) {
                        $state.go("filling")
                })

        }

        $scope.deactivate=function() {
                HardwareInterface.toggleActivation().then(function(result) {
                        if(result.data==0) {
                                $state.go("inactive")                        
                        } 
                })
        }

});
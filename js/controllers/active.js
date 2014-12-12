soak.controller('Active', function($scope, $state, HardwareInterface) { 
        console.info("controller handed over to: active.js")

        $scope.params={
                temperature:41,
                fullness:80,
                delay:0
        }
        $scope.buttonText = "Run Me A Bath"

        doCalculation = function () {                

                p = {
                        target: {},

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


                p.depth=($scope.params.fullness/100) * p.limit.depth   

                p.target.coldRatio = p.hot.averageTemp - $scope.params.temperature
                p.target.hotRatio = $scope.params.temperature - p.cold.averageTemp

                p.target.totalRatio = p.target.hotRatio + p.target.coldRatio
                p.target.coldRatio = p.target.coldRatio / p.target.totalRatio
                p.target.hotRatio = p.target.hotRatio / p.target.totalRatio

                p.target.hotWater = p.depth * p.target.hotRatio                
                p.target.coldWater = p.depth * p.target.coldRatio

                p.send.hot = Math.round((p.target.hotWater / p.hot.litresPerMin) * 60000)
                p.send.cold = Math.round((p.target.coldWater / p.cold.litresPerMin) * 60000)

                p.send.wait = $scope.params.delay * 60000
                if (p.send.wait<0) p.send.wait=0

                $scope.finishTime=moment().add((p.send.hot+p.send.cold+p.send.wait)/60000, 'minutes').format("HH:mm");   
                $scope.sendParams = p.send;

        }

        doCalculation();

        $scope.$watchCollection('params', doCalculation);

        $scope.send = function () {
                $scope.buttonText = "SENDING REQUEST..."
                HardwareInterface.setParameters($scope.sendParams)
                .then(function(result) {
                        $state.go("filling")
                })
        }

        
        $scope.deactivate=function() {
                console.info("deactivating...")
                HardwareInterface.toggleActivation().then(function(result) {
                        if(result.data==0) {
                                $state.go("inactive")                        
                        } 
                })
        }        

});
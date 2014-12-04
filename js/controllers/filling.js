soak.controller('Filling', function($scope, $state,$interval, HardwareInterface) { 
        console.info("controller handed over to: filling.js")       

        $scope.params = {
                waitendPercentage:0
        }

        HardwareInterface.ping().then(function(r) {
                r=r.data.split(";")
                $scope.params = {
                        startTime:parseInt(r[3]),
                        currentTime:parseInt(r[3]),
                        waitendTime:parseInt(r[4]),
                        hotendTime:parseInt(r[5]),
                        coldendTime:parseInt(r[6])
                }

                refreshParams()

        })

        refreshParams=function () {

                prevendTime=$scope.params.startTime;
                
                ['wait','hot','cold'].forEach(function(p) {

                        if($scope.params.currentTime>$scope.params[p+"endTime"]) {
                                $scope.params[p+"endPercentage"]=100
                        } else {
                                $scope.params[p+"endPercentage"]=Math.round(100 * (($scope.params.currentTime-prevendTime)/
                                                                        ($scope.params[p+"endTime"]-prevendTime)))
                                
                                if($scope.params[p+"endPercentage"]<0) { $scope.params[p+"endPercentage"]=0 }
                        }
                        
                        prevendTime=$scope.params[p+"endTime"]

                })

                console.log($scope.params)
        }

        interval=$interval(function(){
                $scope.params.currentTime=$scope.params.currentTime+1000
                refreshParams();
        },1000)
        
        $scope.$on("$destroy", function(){
                $interval.cancel(interval);
        });


});
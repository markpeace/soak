soak.controller('Active', function($scope, $state, HardwareInterface) { 
        console.info("controller handed over to: active.js")

        console.warn("this page needs rewriting to be based on autocalculation of timings based on desired depth and temperature")
        console.warn("this page needs reformatting to be driven by a drag-and-drop graphical interface")

        $scope.params = [
                { hint: 'Wait Time (mins)', value: null },             
                { hint: 'Hot Time (mins)', value: null },                
                { hint: 'Cold Time (mins)', value: null }                
        ]

        $scope.submit = function () {
                console.warn("autocalculations need to happen here")

                HardwareInterface.setParameters($scope.params[0].value,$scope.params[1].value, $scope.params[2].value)
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
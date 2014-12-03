soak.controller('Active', function($scope, $state) { 
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
                console.warn("Need to send new parameters, and only redirect on receipt of acknowledgement which should send to...")
                $state.go("filling")
        }
        
        $scope.deactivate=function() {
                console.warn("needs to send deactivation ping, and only when this is acknowledged, redirect to...")
                $state.go("inactive")
        }
        
});
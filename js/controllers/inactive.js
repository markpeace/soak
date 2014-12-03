soak.controller('Inactive', function($scope, $state, HardwareInterface) { 
        console.info("controller handed over to: inactive.js")
        
        $scope.buttonText="[ACTIVATE SYSTEM]"
        
        $scope.activate = function () {
               
                $scope.buttonText="Activating..."
                
                HardwareInterface.toggleActivation().then(function(result) {
                        if(result.data==1) {
                                $scope.buttonText="Activated"
                                $state.go("active")                        
                        } else {
                                $scope.buttonText="[ACTIVATE SYSTEM]"                                
                        }
                })

        }
        
});
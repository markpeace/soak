soak.controller('Inactive', function($scope, $state, HardwareInterface) { 
        console.info("controller handed over to: inactive.js")

        $scope.buttonText="Connecting to System..."


        HardwareInterface.ping().then(function(r) {
                r=r.data.split(";")
                if(parseInt(r[0])==1) {
                        
                        if(parseInt(r[3])<parseInt(r[6])) {
                                $state.go("filling")
                        } else {
                                $state.go("active")
                        }
                        
                          
                } else {
                        $scope.buttonText="[ACTIVATE SYSTEM]"
                }
        })



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
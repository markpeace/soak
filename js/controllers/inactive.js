soak.controller('Inactive', function($scope, $state, HardwareInterface) { 
        console.info("controller handed over to: inactive.js")

        $scope.message="Connecting to System..."


        HardwareInterface.ping().then(function(r) {
                r=r.data.split(";")
                if(parseInt(r[0])==1) {
                        
                        if(parseInt(r[3])<parseInt(r[6])) {
                                $state.go("filling")
                        } else {
                                $state.go("active")
                        }
                        
                          
                } else {
                        $scope.message="CLICK ICON AT THE TOP LEFT TO ACTIVATE"
                }
        })



        $scope.activate = function () {

                $scope.message="Activating System..."

                HardwareInterface.toggleActivation().then(function(result) {
                        if(result.data==1) {
                                $scope.message="Activated"
                                $state.go("active")                        
                        } else {
                                $scope.message="CLICK ICON AT THE TOP LEFT TO ACTIVATE"                               
                        }
                })

        }

});
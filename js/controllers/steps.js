brewbox.controller('Steps', function($scope, ParseService, $ionicSideMenuDelegate) { 

        brewParameters={
             
                // VARIABLES WHICH CHANGE DEPENDING ON THE RECIPE
                MSH_grain_weight: 5,       //in kg
                MSH_temperature: 68,       // in C
                MSH_thickness: 2.7,        // in l/kg
                MSH_time: 60,              // in mins
                MSH_mashout_temp: 75,      // in C
                CPR_boiltime:60,           // in mins
                FMT_volumne: 21,           // in l

                // EQUIPMENT PROFILE
                MSH_deadspace: 2,          // in l
                CPR_deadspace: 2,          // in l
                CPR_evaporationrate: 16,   // in %


                //AUTOCALCULATIONS
                self: this,
                calculate: function () {
                        self.CPR_preboil_volume = 10
                }

        }
        brewParameters.calculate();

        $scope.currentStep=1;        

        $scope.brewSteps=[{

                title: "Fill HLT",
                subtitle: "50 litres / 50 litres",
                percentageComplete: 100

        },{

                title: "Heat Strike Water",
                subtitle: "32&deg;C / 86&deg;C",
                percentageComplete: 37

        },{

                title: "Transfer Strike Water",
                subtitle: "0 litres / 19 litres",
                percentageComplete: 0

        }]
     

});
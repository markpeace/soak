brewbox.controller('Steps', function($scope, $ionicSideMenuDelegate) { 

        
        brewParameters={

                        // VARIABLES WHICH CHANGE DEPENDING ON THE RECIPE
                        MSH_grain_weight: 7,       // in kg
                        MSH_temperature: 68,       // in C
                        MSH_thickness: 2.75,       // in l/kg
                        MSH_time: 60,              // in mins
                        MSH_mashout_temp: 75,      // in C

                        CPR_hop_weight: 300,       // in g
                        CPR_boiltime:60,           // in mins


                        // EQUIPMENT PROFILE
                        HLT_deadspace: 1,          // in l
                        HLT_groundwater_temp:10,   // in c
                        HLT_minimum_volume: 20,    // in l - without this, the heat coil wouldn't work
                        MSH_deadspace: 2,          // in l
                        MSH_ambient_temp: 15,      // in c
                        CPR_deadspace: 2,          // in l
                        CPR_evaporationrate: 20,   // in %
                        CPR_shrinkage: 4,          // in %


                        //AUTOCALCULATIONS
                        calculate: function () {

                                me = brewParameters

                                //CALCULATE BOIL VOLUME

                                me.CPR_preboil_volume =
                                        me.FMT_volume +
                                        ((me.FMT_volume * (me.CPR_evaporationrate/100)) * (me.CPR_boiltime/60)) +
                                        ((me.CPR_hop_weight/100)*1.5) +               
                                        (me.FMT_volume * (me.CPR_shrinkage/100)) + 
                                        me.CPR_deadspace                                 


                                //CALCULATE MASH VOLUMES                
                                me.MSH_first_water_volume = 
                                        me.MSH_grain_weight * me.MSH_thickness +
                                        me.MSH_deadspace

                                me.MSH_first_runoff_volume =
                                        me.MSH_first_water_volume - me.MSH_grain_weight

                                me.MSH_third_water_volume = me.CPR_preboil_volume - me.MSH_first_runoff_volume

                                me.MSH_second_water_volume = (me.MSH_third_water_volume-me.MSH_first_runoff_volume)/2

                                me.MSH_third_water_volume = me.MSH_third_water_volume - me.MSH_second_water_volume

                                me.MSH_first_runoff_volume = me.MSH_first_runoff_volume + me.MSH_second_water_volume


                                //CALCULATE MASH TEMPERATURES
                                me.MSH_first_water_temperature = (.41/me.MSH_thickness) * (me.MSH_temperature-me.MSH_ambient_temp) + me.MSH_temperature
                                me.MSH_second_water_temperature = me.MSH_mashout_temp                
                                me.MSH_third_water_temperature = me.MSH_mashout_temp

                                //CALCULATE HLT VOLUMES - UP TO HERE...

                                me.HLT_total_water_needed = me.MSH_first_water_volume + me.MSH_second_water_volume + me.MSH_third_water_volume

                                me.HLT_first_water_volume = me.HLT_total_water_needed * .95

                                if (me.HLT_first_water_volume - me.MSH_first_water_volume < me.HLT_minimum_volume ) {
                                        me.HLT_first_water_volume=me.HLT_first_water_volume + (me.HLT_minimum_volume-(me.HLT_first_water_volume - me.MSH_first_water_volume))
                                }

                                me.HLT_volume_after_strike = me.HLT_first_water_volume - me.MSH_first_water_volume

                                me.HLT_second_water_volume = 
                                        (me.MSH_first_water_temperature-me.MSH_temperature)/
                                        (me.MSH_first_water_temperature-((me.HLT_volume_after_strike * me.MSH_first_water_temperature) + (1 * me.HLT_groundwater_temp)) / 
                                         (me.HLT_volume_after_strike+1))


                                me.HLT_volume_after_second_addition = me.HLT_volume_after_strike + me.HLT_second_water_volume

                                me.HLT_temperature_after_second_addition =
                                        ((me.HLT_volume_after_strike * me.MSH_first_water_temperature) + 
                                         (me.HLT_second_water_volume * me.HLT_groundwater_temp)) / 
                                        (me.HLT_volume_after_strike+me.HLT_second_water_volume)

                                me.HLT_waste_water = me.HLT_volume_after_second_addition - (me.MSH_second_water_volume + me.MSH_third_water_volume)                        

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
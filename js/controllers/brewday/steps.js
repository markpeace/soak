brewbox.controller('Steps', function($scope, HardwareInterface, $stateParams, $state, RecipeScraper) { 


        var getRecipe = function () {
                (new Parse.Query("Brewday"))
                .equalTo("objectId", $stateParams.id)
                .include("recipe")          
                .find().then(function(result) {
                        if(result.length==0) {$state.go("ui.splash")}
                        $state.brewday=result[0]
                        if(result[0].get("steps")) { resumeBrewday(); } else { compileBrewParameters(); }
                        compileBrewParameters();
                })

        }
        getRecipe();


        var compileBrewParameters = function () {
                RecipeScraper.updateRecipeXML($state.brewday.get("recipe"))

                $scope.$watch('$state.brewday.get("recipe").get("xml")', function(val){
                        recipeParameters = $state.brewday.get("recipe").get("xml")

                        brewParameters={

                                // VARIABLES WHICH CHANGE DEPENDING ON THE RECIPE
                                MSH_grain_weight: recipeParameters.ingredients.total_fermentables,       // in kg
                                MSH_temperature: 68,       // in C
                                MSH_thickness: 2.75,       // in l/kg
                                MSH_time: 60,              // in mins
                                MSH_mashout_temp: 75,      // in C
                                FMT_volume: 21,            // in l

                                CPR_hop_weight: recipeParameters.ingredients.total_hops,       // in g
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
                        }

                        calculateParameters(brewParameters)                       

                }, true);

        }

        calculateParameters=function(brewParameters) {
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

                calculateBrewSteps(me)


        }

        calculateBrewSteps = function (brewParameters) {
                steps=[]

                stepTemplate =function () {

                        st=this
                        
                        st.isActive=false;

                        st.currentValue = 12.23

                        st.updateProgress = function () {

                                st.currentValue = HardwareInterface.hardwareReadings()[st.hardwareReference].readings[st.hardwareVariable]

                                st.percentageComplete = (st.currentValue / st.targetValue) * 100                                
                                st.subtitle = st.currentValue + " / " + st.targetValue + st.targetValueUnit

                                if (st.percentageComplete>99) clearInterval(st.ping)                                                             

                                        }


                        this.initialise = function () {

                                HardwareInterface.requestQueue.push({ port: st.commandPort, command: st.command })

                                st.ping = setInterval(st.updateProgress,HardwareInterface.settings.pulseInterval);                                                              
                        }
                }


                me = brewParameters;

                angular.forEach([
                        { 
                                title: "Prefill HLT",
                                trigger: "user",
                                commandPort: 200,
                                command: "HLT SET VOL " + me.HLT_first_water_volume,
                                targetValue: me.HLT_first_water_volume,
                                targetValueUnit: "l",
                                hardwareReference: "hlt",
                                hardwareVariable: "vol"
                        }
                ], function (step) {
                        newStep = new stepTemplate
                        angular.forEach(step, function(value,key) { newStep[key]=value })
                        steps.push(newStep);        
                })


                $state.brewday.set("steps", steps).save().then(resumeBrewday)

        }


        resumeBrewday=function () {
                $scope.brewSteps=$state.brewday.get('steps')                   
                console.log("resumed")
        }

});
brewbox.controller('Steps', function($scope, ParseService, $ionicSideMenuDelegate) { 

        $brewParamaters={
                HLT_initialVolume:40,
                HLT_strikeTemp: 86,
                HLT_topupVolume:10,
                MSH_targetTemperature: 68,
                MSH_strikeVolume:18
                MSH_mashoutTemperature:75,
                MSH_firstSparge=3,
                MSH_secondSparge=15
        }


        $scope.brewSteps=[{

                title: 'Part Fill HLT',             
                subtitle: '{{HLT_initialVolume}}l',

                dependentOnPriorStep: false,
                startOn: 'MANUAL',
                startCommands: [
                        'set_HLT_volume: {{ HLT_initialVolume }}',                        
                ],                

                finishOn: 'READING',
                finishReadingStatement: '<<HLT_Volume>> == {{ HLT_initialVolume }}',
                finishCommands: [],

                canInterrupt: true

        },{

                title: 'Preheat HLT',             
                subtitle: '{{HLT_strikeTemp}}&deg;C',

                dependentOnPriorStep: true,
                startOn: 'AUTO',
                startCommands: [
                        'set_HLT_temperature: {{ HLT_strikeTemp }}',                        
                ],                

                finishOn: 'READING',
                finishReadingStatement: '<<HLT_temperature>> == {{ HLT_strikeTemp }}',
                finishCommands: [],

                canInterrupt: true

        },{
                
                title: 'Transfer Strike Water',             
                subtitle: '{{MSH_strikeVolume}}l',
                
                dependentOnPriorStep: true,
                startOn: 'MANUAL',
                startCommands: [
                        'unfill_HLT {{ MSH_strikeVolume }}',
                ],                
                
                finishOn: 'NULL',
                finishReadingStatement: null,
                finishCommands: [],
                
                canInterrupt: false

        },{
                
                title: 'Set Mash Temperature',             
                subtitle: '{{MSH_targetTemperature}}&deg;C',
                
                dependentOnPriorStep: true,
                startOn: 'AUTO',
                startCommands: [
                        'set_HLT_temperature: {{ MSH_targetTemperature }}',                        
                ],                
                
                finishOn: 'NULL',
                finishReadingStatement: null,
                finishCommands: [],
                
                canInterrupt: false

        }]
});
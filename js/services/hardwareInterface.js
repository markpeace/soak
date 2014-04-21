brewbox.service('HardwareInterface', [function() {

        HLT_Temp=Math.round(Math.random()*100)
        MSH_Temp=Math.round(Math.random()*100)
        CPR_Temp=Math.round(Math.random()*100)        


        return {
                HLT: {
                        temperature: HLT_Temp
                }, 
                MSH: {
                        temperature: MSH_Temp
                },
                CPR: {
                        temperature: CPR_Temp
                }
        }   
}]);        
soak.controller('Intialising', function($state) { 
        
        console.info("initialising") 
        console.warn("need to write a function which pings for current hardware state")
        
        //PING THE HARDWARE
        //IF INACTIVE, REDIRECT TO INACTIVE
        //IF ACTIVE, BUT NO PARAMETERS REDIRECT TO ACTIVE
        //IF ACTIVE WITH PARAMETERS, REDIRECT TO FILLING 
        
        $state.go("inactive")
       
});
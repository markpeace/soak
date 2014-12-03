soak.controller('Intialising', function($state) { 
        
        console.info("controller handed over to: initialising.js")
        console.warn("need to write a function which pings for current hardware state and redirects appropriately. For now, autodirecting to...")
                
        $state.go("inactive")
       
});
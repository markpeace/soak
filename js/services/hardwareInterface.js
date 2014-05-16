brewbox.service('HardwareInterface', [function() {

        return {
                HLT: {
                        capacity: 100,
                        content: Math.round(Math.random()*100), 
                        fullness: function() { return self.content/self.capacity * 100 },
                        temperature: Math.round(Math.random()*100)
                }, 
                MSH: {
                        capacity: 37,
                        content: Math.round(Math.random()*37),                         
                        fullness: self.content/self.capacity * 100,
                        temperature: Math.round(Math.random()*100)
                },
                CPR: {
                        capacity: 50,
                        content: Math.round(Math.random()*50),     
                        fullness: self.content/self.capacity * 100,                        
                        temperature: Math.round(Math.random()*100)
                }
        }   
}]);        
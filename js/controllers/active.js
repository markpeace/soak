soak.controller('Active', function($scope) { 
        console.info("controller handed over to: inactive.js")
        
        console.warn("this page needs rewriting to be based on autocalculation of timings based on desired depth and temperature")
        console.warn("this page needs reformatting to be driven by a drag-and-drop graphical interface")

        $scope.params = [
                { hint: 'Wait Time (mins)', value: null },             
                { hint: 'Hot Time (mins)', value: null },                
                { hint: 'Cold Time (mins)', value: null }                
        ]
        
        $scope.submit = function () {
                console.log($scope.params)
        }
});
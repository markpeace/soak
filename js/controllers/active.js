soak.controller('Active', function($scope) { 
        console.log("active")
        $scope.params = [
                { hint: 'Wait Time (mins)', value: null },             
                { hint: 'Hot Time (mins)', value: null },                
                { hint: 'Cold Time (mins)', value: null }                
        ]
        
        $scope.submit = function () {
                console.log($scope.params)
        }
});
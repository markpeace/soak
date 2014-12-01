soak.controller('Active', function($scope) { 

        $scope.controlRect = {
                x: -40,
                y: -40,
                width: 80,
                height: 80,
                color: 'rgb(0,0,255)'
        }

        controlBoundaries = {}
        controlBoundaries.width=$("#controlBoundaries").width()
        controlBoundaries.left=$("#controlBoundaries").offset().left
        controlBoundaries.right=$("#controlBoundaries").offset().right           

        controlBoundaries.height=$("#controlBoundaries").height()
        controlBoundaries.top=$("#controlBoundaries").offset().top
        controlBoundaries.bottom=$("#controlBoundaries").offset().bottom



        $scope.controlValues = {
                temperature: 0,
                fullness:0,
                actTemp:0,
                actDepth:0
        }
        
        $scope.maximum = {
                temperature: 50,
                fullness: 30,
        }

        $scope.$watchCollection('controlValues', function () {
                $scope.controlRect.width= $scope.controlValues.temperature
                $scope.controlRect.x = 0 - ($scope.controlRect.width/2)
                $scope.controlRect.height= $scope.controlValues.fullness
                $scope.controlRect.y = 0 - ($scope.controlRect.height/2)
                
                $scope.controlRect.color="rgb("+ Math.round(255 * ($scope.controlValues.temperature/100)) +",0,"+ Math.round(255 * ((100-$scope.controlValues.temperature)/100)) +")"                
                
        })
        
        
        $('#controlBoundaries').bind('touchmove',function(e){

                e.preventDefault();                       

                if (e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {

                        with ($scope.controlValues) {

                                temperature = e.originalEvent.touches[0].pageX
                                if (temperature<controlBoundaries.left) { temperature=controlBoundaries.left } 
                                if (temperature>controlBoundaries.right) { temperature=controlBoundaries.right } 
                                temperature=temperature-controlBoundaries.left
                                temperature=temperature/controlBoundaries.width
                                temperature=Math.round(temperature*100)
                                if(temperature>100) {temperature=100}
                                
                                actTemp = Math.round($scope.maximum.temperature * (temperature/100))

                                fullness = e.originalEvent.touches[0].pageY
                                if (fullness<controlBoundaries.top) { fullness=controlBoundaries.top } 
                                if (fullness>controlBoundaries.bottom) { fullness=controlBoundaries.bottom } 
                                fullness=fullness-controlBoundaries.top
                                fullness=fullness/controlBoundaries.height
                                fullness=Math.round(fullness*100)
                                if(fullness>100) {fullness=100}
                                
                                actDepth = Math.round($scope.maximum.fullness * (fullness/100))

                        }                               

                        $scope.$apply()        
                }

        });




});
bbb.controller('Login', function($scope, $ionicLoading, ParseService, $rootScope, $state, $location) { 
  $scope.userCount = "45"
  var User = Parse.Object.extend("User");
  var query = new Parse.Query(User);
  query.count({
    success: function(count) {      
      $scope.userCount = count    
      $scope.$apply();      
    }
  });
  
  
  $scope.loginUser = { username: '', password: ''}
  
  $scope.signIn = function () {
    
    $scope.loading = $ionicLoading.show({
      content: 'Loading',
    });
    
    Parse.User.logIn($scope.loginUser.username, $scope.loginUser.password, {
      success: function(user) {
        
        $rootScope.currentUser = user;
        
        $scope.loading.hide();
      
        $state.go("tabs.schedule");
      },
      error: function(user, error) {
        $scope.loading.hide();
        alert("Unable to sign in:  "  + error.message);      }
    });
    
  }
  
});
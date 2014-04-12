bbb.controller('Register', function($scope, $ionicModal,  $ionicLoading, ParseService, $state, $rootScope) { 
  
  $scope.programmes=[];
  
  $scope.programmeLabel="Programme";
  
  $scope.newUser = {
    email: '',
    password: '',
    confirm_password: '',
    programme: ''    
  }
  
  
  var Programme = Parse.Object.extend("Programme");
  var query = new Parse.Query(Programme);
  query.ascending("label");
  query.find({
    success: function(results) {
      $scope.programmes=results;  
    }
  });
  
  $ionicModal.fromTemplateUrl('pages/user/register_programmelist.html', function($ionicModal) {
    $scope.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });  
  
  
  $scope.$watch('newUser.programme',function(){      
    if ($scope.newUser.programme) { $scope.programmeLabel = $scope.newUser.programme.get('label') } 
  })  
  
  $scope.evaluate = {
    email: function() {
      if (new RegExp(".*@.*mmu.ac.uk").exec($scope.newUser.email)) { return true; } else { return false; }      
    },
    programme: function() {
      if ($scope.newUser.programme!='') { return true; } else { return false; }      
    },
    password: function() {
      if ($scope.newUser.password.length>5) { return true; } else { return false; }      
    },
    confirm_password: function() {
      if ($scope.newUser.confirm_password.length>0 && $scope.newUser.password==$scope.newUser.confirm_password) { return true; } else { return false; }      
    }
  }
  
  $scope.signup = function () {
    
    errors=''
    
    if (!$scope.evaluate.email()) { errors=errors + "- You must register with a valid MMU Email Address \n" }
    if (!$scope.evaluate.programme()) { errors=errors + "- You must choose an MMU programme of study \n" }    
    if (!$scope.evaluate.password()) { errors=errors + "- You must choose a password longer than five characters \n" }    
    if (!$scope.evaluate.confirm_password()) { errors=errors + "- Your password and confirmation should match \n" }
    
    if (errors!='') {
      alert(errors);
      return false;
    }
    
    $scope.loading = $ionicLoading.show({
      content: 'Loading',
    });
    
    var user = new Parse.User();
    user.set("email",$scope.newUser.email)
    user.set("username",$scope.newUser.email)
    user.set("password",$scope.newUser.password)
    
    user.signUp(null, {
      success: function(user) {        
        $rootScope.currentUser = user;
        $scope.$apply(); // Notify AngularJS to sync currentUser
        alert('You can now access the Birley Big Bang app, but you will also need to verify your email to use it fully')
        $state.go('tabs.schedule')
        $scope.loading.hide();
      },
      error: function(user, error) {
        $scope.loading.hide();
        alert("Unable to sign up:  " + error.code + " " + error.message);
      }
    });    
    
  }
  
});
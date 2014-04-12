bbb.controller('Tab', function($scope, ParseService, $ionicModal, $state, $rootScope) { 
  $ionicModal.fromTemplateUrl('pages/settings.html', function($ionicModal) {
    $scope.settingsModal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });  
  
  $scope.signOut = function () {
    Parse.User.logOut();
    $scope.settingsModal.hide();
    $rootScope.currentUser=null;
    $state.go("login");
  }
  
});
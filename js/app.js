var bbb = angular.module('bbb', ['ionic'])
.run(function($rootScope, ParseService, $location, $state) {
  
  $rootScope.currentUser = Parse.User.current();
   
});
app.controller('AppCtrl', function ($scope, $state, AuthService, AUTH_EVENTS) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.view = 'list';

  $scope.username = AuthService.username();
  $scope.role = AuthService.role();

  $scope.auth = {};
  $scope.auth = AuthService.role();


  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    console.log("User Unauthorized!");
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    console.log("User Not Authenticated!");
    AuthService.logout();
    $state.go('app.login');
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('app.login');
  };

});

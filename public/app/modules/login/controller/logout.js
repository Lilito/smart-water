app.controller('LogoutCtrl', function ($rootScope, $scope,$log,$state,$stateParams, $http, AuthService) {
		    AuthService.logout();
				console.log("logout");
				$state.go('login');


});

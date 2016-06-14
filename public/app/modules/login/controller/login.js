app.controller('LoginCtrl', function ($rootScope, $scope,$log,$state,$stateParams, $http, AuthService) {
	$scope.credentials = {username: "",password: ""};
	$scope.loginErrorMsg = $stateParams.loginErrorMsg;

	//Prefill the username
	$scope.credentials.username = window.localStorage.getItem("username");
	$scope.credentials.ecampus = window.localStorage.getItem("ecampus");
	/**
	* Handles the login button click.  It will direct to the home view if the user is already authenticated in the
	* ServicesRealm, otherwise it will attempt to submit the login credentials to the ibm-auth module via a resolve() on the
	* deferred that is available on the root scope @see app/home/AppCtrl.js
	*/
	function clickLogin(){

		if ($scope.loginForm.$valid) {
			$log.debug("Submitting login");

			//Store the username in local storage so that it can be pre-filled on subsequent attempts
			if($scope.credentials.username){
				window.localStorage.setItem("username",$scope.credentials.username);
			}//end if


			$scope.spinner = true;

			AuthService.login($scope.credentials.username, $scope.credentials.password).then(function(authenticated) {
				
					$scope.spinner = false;
				$state.go('app.home', {}, {reload: true});
			}, function(err) {
				$scope.spinner = false;
					$scope.loginErrorMsg = err;

			});

		}
	}

	//Connect the action handlers to view
	$scope.clickLogin = clickLogin;



});

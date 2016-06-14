
angular.module('starter')

.service('AuthService', function($q, $http, USER_ROLES) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var NAME = 'yourNAME';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;
  var name='';
  var isApproved=false;

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    var employee = window.localStorage.getItem(NAME);
    if (token) {
      useCredentials(token, employee);
    }
  }

  function storeUserCredentials(token,employee) {
    console.log(token);
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    window.localStorage.setItem(NAME, employee);
    useCredentials(token,employee);
  }

  function useCredentials(token, employee) {
    username = token.split(',')[0];
    userAccess = token.split(',')[1];
    isAuthenticated = true;
    authToken = token;
    name=employee;

    if (userAccess == 'Administrador') {
      role = USER_ROLES.admin;
    }
    if (userAccess == 'Consultor') {
      role = USER_ROLES.consultor;
    }
    if (userAccess == 'Evaluador') {
      role = USER_ROLES.evaluator;
    }
    if (userAccess === undefined) {
      role='';
    }


    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var login = function(username, password) {
    return $q(function(resolve, reject) {
      var post= {
        username: username,
        password: password
      };

      $http.post('/api/auth/login', post).success(function(data, status, headers, config) {

        if(data && data.hasAccess){
          storeUserCredentials(data);
          resolve('Login success.');
        }
        else {
          reject('Acces Denied: Wrong username or password.');
        }

      }).error(function(data, status, headers, config) {
        reject( data);
      });
    });
  };


  var logout = function() {
    destroyUserCredentials();
  };

  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };

  var setApproved = function(flag) {
    isApproved=flag;
  };

  loadUserCredentials();

  return {
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    setApproved: setApproved,
    isAuthenticated: function() {return isAuthenticated;},
    isApproved: function() {return isApproved;},
    username: function() {return username;},
    name: function() {return name;},
    role: function() {return role;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});

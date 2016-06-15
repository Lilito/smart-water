var app = angular.module('starter', [
  "ui.router",
  "ngAnimate",
  "ui.bootstrap",
  "ngToast",
  "angular.filter",
  "ngTable",
  "angularjs-datetime-picker",
  "MassAutoComplete"
]);

app.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
  admin: 'admin',
  public: 'public'
});

app.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/modules/common/view/template.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'header': {
        templateUrl: 'app/modules/common/view/header.html'
      },
      'footer': {
        templateUrl: 'app/modules/common/view/footer.html'
      },
      'content': {
        templateUrl: 'app/modules/home/view/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.admin', {
   url: '/admin',
   views: {
     'header': {
       templateUrl: 'app/modules/common/view/header.html'
     },
     'footer': {
       templateUrl: 'app/modules/common/view/footer.html'
     },
     'content': {
       templateUrl: 'app/modules/admin/view/users.html',
       controller: 'UserCtrl'
     }
   }
 })
 .state('login', {
    url: '/login',
    templateUrl: 'app/modules/login/view/login.html',
    controller: 'LoginCtrl'


  })

  .state('logout', {
    url: '/logout',
    templateUrl: 'app/modules/login/view/login.html',
    controller: 'LogoutCtrl'


  })
  ;

  //$urlRouterProvider.otherwise('/app/login');
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("login");
  });

});


app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
    var isNavigatingToAuth = toState.name === "login";

    if(isNavigatingToAuth){
       return; // no need to redirect
    }

    if (!AuthService.isAuthenticated()) {
      e.preventDefault();
      $state.go("login");
      // if (next.name !== 'login') {
      //   event.preventDefault();
      //   $state.go('login');
      // }
    }
  });
});

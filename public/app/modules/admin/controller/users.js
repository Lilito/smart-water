app.controller('UserCtrl', function ($scope, $http, ngToast) {


  $scope.user= {};
  $scope.view = "list";
  $scope.auth = {};
  $scope.spinner = {};
  $scope.lg = 3;

  $scope.users = [];


 function listUsers(){

   $http.get('/api/user/' ).success(function(data, status, headers, config) {
       $scope.usersList = data.body.rows;
     }).error(function(data, status, headers, config) {
       $scope.spinner.usersList = false;
     });
 }

 $scope.newUser = function(){
  $scope.user = {};
  $scope.questionView = 'manage';
};



$scope.saveUser = function(){
  console.log("Saving User");
  //add current date and username to store in database
  $scope.spinner.user = true;

    var post = {
      user: $scope.user
    };

  $http.post('/api/user/', post).success(function(data, status, headers, config) {
    $scope.spinner.user = false;
    $scope.user={};
    $scope.view = "list";
      listUsers();

      ngToast.create({
         className: 'success',
         content: '<i class="fa fa-check"></i>  User was created',
         animation: 'slide'
       });

  }).error(function(data, status, headers, config) {
    $scope.spinner.user = false;

    ngToast.create({
       className: 'warning',
       content: '<i class="fa fa-check"></i>  An error has ocurred',
       animation: 'slide'
     });

  });

};

$scope.selectUser = function(user){
  $scope.user = angular.copy(user);
  };

  $scope.removeUser = function(user){
    $scope.spinner.user = true;
    $http.delete('/api/user/'+ $scope.user._id + '/'+ $scope.user._rev).success(function(data, status, headers, config) {
      $scope.spinner.user = false;
      $scope.user = {};
      listUsers();

      ngToast.create({
         className: 'success',
         content: '<i class="fa fa-check"></i> User was deleted',
         animation: 'slide'
       });

    }).error(function(data, status, headers, config) {
      $scope.spinner.user = false;
    });
    };


    $scope.selectEmployee = function(employee){

      //cleanFields();

      if (employee){
        var newEmployee = {name: "", user: ""};

        if (employee.person){
          newEmployee.name = employee.person.name; //$sanitize(employee.person.name);
          newEmployee.user = employee.person.email;
        }

        else{
          newEmployee.has_assistant=0;
          newEmployee.assistant_user="";
        }
        $scope.user=newEmployee;

      }

    };

    $scope.showUser = function(doc){
      $scope.user = angular.copy(doc);
    };

  listUsers();


  });

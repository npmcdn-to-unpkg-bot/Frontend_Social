angular.module('MyApp')
  .controller('SignupCtrl', function($scope, $location, $auth, toastr) {
     
      
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function() {
          $location.path('/login');
          toastr.info('You have successfully created a new account');
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };
       $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider);
          $location.path('/');
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };
    
//    $("#datemask").inputmask("dd/mm/yyyy", {"placeholder": "dd/mm/yyyy"});
  });
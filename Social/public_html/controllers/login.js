angular.module('MyApp')
  .controller('LoginCtrl', function($scope, $location, $auth, toastr, $rootScope, Account) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          toastr.success('You have successfully signed in');
       
          $location.path('/profile');
        })
        .catch(function(response) {
//          toastr.error(response.data.message, response.status);
            toastr.error('The user name or password is incorrect');
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          toastr.success('You have successfully signed in with ' + provider);
          $location.path('/profile');
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };
  });
angular.module('MyApp')
  .controller('LoginCtrl', function($scope, $location, $auth, toastr, $rootScope, Account) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          toastr.success('You have successfully signed in');
           //here the api call to get user profile
            $scope.getProfile = function () {
             Account.getProfile()
              .then(function (response) {
               $rootScope.user = response.data;
                console.log($rootScope.user);
                 })
                .catch(function (response) {
                 toastr.error(response.data.message, response.status);
                 });
                 };
          $location.path('/');
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
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
  });
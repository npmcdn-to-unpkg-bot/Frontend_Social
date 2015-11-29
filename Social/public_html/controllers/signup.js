var app = angular.module('MyApp')
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
          $location.path('/profile');
        })
        .catch(function(response) {
          toastr.error(response.data.message);
        });
    };
    


  });
  app.run(function($rootScope){
     $rootScope.tempYear = new Date().getFullYear();
     $rootScope.tempDate = new Date().getDate();
     $rootScope.tempMonth = new Date().getMonth();
 
     $rootScope.minDate = $rootScope.tempYear-18 + "-" + $rootScope.tempMonth + "-" + $rootScope.tempDate;
     $rootScope.maxDate = $rootScope.tempYear-120 + "-" + $rootScope.tempMonth + "-" + $rootScope.tempDate;
});

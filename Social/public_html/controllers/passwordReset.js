var app =angular.module('MyApp')
        .controller('PasswordResetCtrl', function ($rootScope,$scope,$location, toastr,$scope,Account) {
            $rootScope.resetPassword = true;
    
        
         $scope.passwordReset= function () {
                $rootScope.resetPassword = false;
                Account.passwordReset($scope.emailAddress)
                        .then(function () {
                            $rootScope.emailDiv = false;
                            $location.path('/login');
                            $rootScope.emailSentMessage=true;
                            $rootScope.emailAddress= $scope.emailAddress;
                            toastr.success('Password reset link sent to ' + $scope.emailAddress);
                        })
                        .catch(function (response) {
                            $location.path('/login');
                            $rootScope.emailNotSentMessage=true;
                            $rootScope.emailAddress= $scope.emailAddress;
                            //toastr.error(response.data.message, response.status);
                        });
            };
       
        $scope.changePassword =function(){
              Account.newPassword($scope.emailAddress,$scope.password)
                        .then(function () {
                            $rootScope.emailDiv = false;
                            $location.path('/login');
                            toastr.success('Password reset successful to' + $scope.emailAddress);
                        })
                        .catch(function (response) {
                            toastr.error(response.data.message, response.status);
                        });
        };
       });
angular.module('MyApp')
        .controller('PasswordResetCtrl', function ($location, toastr,$scope,Account) {
            //resend email verification 
            $scope.resetPassword= function () {
                $rootScope.resetPassword = true;
                Account.passwordReset($scope.email)
                        .then(function () {
                            $rootScope.emailDiv = false;
                            $location.path('/login');
                            toastr.success('Password changed to account ' + $scope.email);

                        })
                        .catch(function (response) {
                            toastr.error(response.data.message, response.status);
                        });
            };

        });
        
             //resend email verification 
            $scope.resendEmail = function () {
                $rootScope.emailDiv = true;
                Account.resendEmail($scope.email)
                        .then(function () {
                            $rootScope.emailDiv = false;
                            $location.path('/login');
                            toastr.success('verification email request has been sent to ' + $scope.email);

                        })
                        .catch(function (response) {
                            toastr.error(response.data.message, response.status);
                        });
            };


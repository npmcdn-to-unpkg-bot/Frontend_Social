var app = angular.module('MyApp')
        .controller('PasswordResetCtrl', function ($rootScope, $scope, $location, toastr, $scope, Account) {
            $scope.resetPassword = true;
            $scope.emailSentMessage = false;
            $rootScope.emailNotSentMessage = false;
            $rootScope.emailAddress = "";
            $scope.confirmPassword = "";
            $scope.resetBtnLoading = false;

            $scope.passwordReset = function (email) {
                $scope.resetBtnLoading = true;
                Account.passwordReset(email)
                        .then(function () {

                            $location.path('/passwordReset');
                            $scope.emailSentMessage = true;
                            $scope.emailAddress = email;
                            $scope.resetBtnLoading = false;
                            toastr.success('Success! password reset link sent to ' + $scope.emailAddress);
                        })
                        .catch(function (response) {
                            $scope.resetBtnLoading = false;
                            $location.path('/signup');
                            $rootScope.emailNotSentMessage = true;
                            $rootScope.emailAddress = email;
                            //toastr.error(response.data.message, response.status);
                        });
            };

            $scope.changePassword = function () {
                $scope.resetBtnLoading = true;
                Account.newPassword($scope.emailAddress, $scope.confirmPassword)
                        .then(function () {
                            $scope.resetBtnLoading = false;
                            $location.path('/login');
                            toastr.success('Password reset successful to ' + $scope.emailAddress);
                        })
                        .catch(function (response) {
                            $scope.resetBtnLoading = false;
                            toastr.error(response.data.message, response.status);
                        });
            };
        });
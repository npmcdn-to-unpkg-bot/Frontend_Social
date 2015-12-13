angular.module('MyApp')
        .controller('LoginCtrl', function ($scope, $location, $auth, toastr, $rootScope, Account) {
            $scope.email = "";
         
            $scope.login = function () {
                $auth.login($scope.user)
                        .then(function (response) {
                            console.log(response.valueOf("emailVerifyStatus"));
                    console.log(response.config.headers['emailVerification']);
//                    console.log(response.emailVerifyStatus['emailVerification']);
//                    console.log(response.emailVerifyStatus.valueOf('emailVerification'));
                     response.valueOf("emailVerifyStatus");
             
                            toastr.success('You have successfully signed in');

                            $location.path('/profile');
                        })
                        .catch(function (response) {
                            //toastr.error(response.data.message, response.status);
                            toastr.error('The user name or password is incorrect');

                        });
            };
            $scope.authenticate = function (provider) {
                $auth.authenticate(provider)
                        .then(function () {
                            //toastr.success('You have successfully signed in with ' + provider);
                            $location.path('/profile');
                        })
                        .catch(function (response) {
                            toastr.error(response.data.message);
                        });
            };
            //resend email verification 
            $scope.resendEmail = function () {
                  $rootScope.emailDiv=true;
                Account.resendEmail($scope.email)
                        .then(function () {
                            $rootScope.emailDiv=false;
                            $location.path('/login');
                           toastr.success('verification email request has been sent to '+$scope.email);

                        })
                        .catch(function (response) {
                            toastr.error(response.data.message, response.status);
                        });
            };
        });
angular.module('MyApp')
        .controller('LoginCtrl', function ($scope, $location, $auth, toastr, $rootScope, Account) {
            $scope.email = "";
            $scope.login = function () {
                $auth.login($scope.user)
                        .then(function (response) {
                      //toastr.success('You have successfully signed in');
                            if (!response.data.emailVerified) {
                                $scope.verifyEmail();
                            } else {
                                $location.path('/profile');
                                toastr.success('You have successfully signed in');
                            }
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

            //to verify check user email is verifyed or not
            $scope.verifyEmail = function () {
                $auth.logout()
                        .then(function () {
                            toastr.error('Please verify your email');
                            $location.path('/login');
                        });

                $rootScope.emailDiv = true;
                //Here it send notification messge on user profile page 
//                setTimeout(function () {
////                    tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p style="color:red; text-align: center"> Please verify your email. Click <a style="color: blue" href="">Here</a> to resend email verification</p></div>');
//                    tjq(".notification-area").append('<div class="info-box block "><span class="close "></span><p style="color:red; text-align: center"> Please verify your email.</p><div class="row "><div class=" form-inline  col-sms-6"><input class="form-control col-sms-4" type="email"  ng-model="email" required placeholder="enter your email"><button class="btn-medium col-sms-2" ng-click="resendEmail()">Resend Email</button></div></div></div>');
//
//                }, 0);

            };
        });
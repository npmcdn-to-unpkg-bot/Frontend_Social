var app = angular.module('MyApp')
        .controller('SignupCtrl', function ($scope, $location, $auth, toastr) {
            $scope.birthMonth = "";
            $scope.birthDay = "";
            $scope.birthYear = "";
            $scope.birthDate = new Date();
            $scope.dateOfBirthrequired = false;
            $scope.checkDate = function () {
                if ($scope.birthYear !== "" && $scope.birthDay !== "" && $scope.birthMonth !== "") {
                    $scope.dateOfBirthrequired = false;
                    $scope.birthDate.setFullYear($scope.birthYear);
                    $scope.birthDate.setDate($scope.birthDay);
                    $scope.birthDate.setMonth($scope.birthMonth);

                } else {
                    $scope.dateOfBirthrequired = true;
                }
            };
            $scope.facebookBtnLoading = false; // stop facebook loading
            $scope.googeBtnLoading = false; // stop google loading
            $scope.loginBtnLoading = false; // stop login loading
            $scope.disabledFacebookBtn = false;
            $scope.disabledGoogleBtn = false;

            $scope.swapSocialLoginLoading = function (provider, loading) {
                if (provider === "facebook") {
                    $scope.facebookBtnLoading = loading;// start/stop loading

                    $scope.disabledGoogleBtn = true;
                } else if (provider === "google") {
                    $scope.googeBtnLoading = loading;// start/stop loading
                    $scope.disabledFacebookBtn = true;

                }
            };
            $scope.signup = function () {
                $scope.loginBtnLoading = true; // start loading
                $scope.disabledFacebookBtn = true;
                $scope.disabledGoogleBtn = true;
                $scope.checkDate();
                if (!$scope.dateOfBirthrequired) {
                    $scope.user.dateOfBirth = $scope.birthDate;
                    $auth.signup($scope.user)
                            .then(function () {
                                $location.path('/login');
                                toastr.info('You have successfully created a new account');
                                $scope.loginBtnLoading = false; // stop loading
                                $scope.disabledFacebookBtn = false;
                                $scope.disabledGoogleBtn = false;
                            })
                            .catch(function (response) {
                                $scope.loginBtnLoading = false; // stop loading
                                $scope.disabledFacebookBtn = false;
                                $scope.disabledGoogleBtn = false;
                                if (response.data.fieldErrors.length > 0) {
                                    for (var i = 0; i < response.data.fieldErrors.length; i++) {
                                        toastr.error(response.data.fieldErrors[i].message);
                                    }
                                } else {

                                    toastr.error(response.data.message);
                                }
                            });
                }


            };
            $scope.authenticate = function (provider) {
                $scope.swapSocialLoginLoading(provider, true);
                $auth.authenticate(provider)
                        .then(function () {
                            toastr.success('You have successfully signed in with ' + provider);
                            $location.path('/profile');
                            $scope.swapSocialLoginLoading(provider, false);
                        })
                        .catch(function (response) {
                            $scope.swapSocialLoginLoading(provider, false);
                            toastr.error(response.data.message);
                        });
            };

            //to populate the year values on singup form
            $scope.tempYear = new Date().getFullYear();
            $scope.minYear = $scope.tempYear - 18;
            $scope.maxYear = $scope.minYear - 120;

            $scope.years = [];
            $scope.generateYears = function () {
                $scope.yearOptions = [];
                for (var i = $scope.minYear; i >= $scope.maxYear; i--) {
                    $scope.yearOptions.push(i);
                }
                $scope.years = $scope.yearOptions;
            };
            $scope.generateYears();

        });
app.run(function ($rootScope) {
//    $scope.tempYear = new Date().getFullYear();
//    $scope.minYear = $scope.tempYear - 18;
//    $scope.maxYear = $scope.minDate - 120;
//
//    $scope.years = [];
//    $scope.generateOptions();
//    $scope.generateOptions = function () {
//        $scope.yearOptions = [];
//        for (var i = $scope.minYear; i <= $scope.maxYear; i++) {
//            $scope.yearOptions.push(i);
//        }
//        $scope.years = $scope.newOptions;
//    };
});

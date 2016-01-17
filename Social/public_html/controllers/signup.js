var app = angular.module('MyApp')
        .controller('SignupCtrl', function ($scope, $location, $auth, toastr,$rootScope) {
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
            $scope.signup = function () {
                $scope.checkDate();
                if (!$scope.dateOfBirthrequired) {
                    $scope.user.dateOfBirth = $scope.birthDate;
                    $auth.signup($scope.user)
                            .then(function () {
                                $location.path('/login');
                                 $rootScope.emailNotSentMessage=false;
                                 $rootScope.emailSentMessage=false;
                                toastr.success('You have successfully created a new account');
                            })
                            .catch(function (response) {
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
                $auth.authenticate(provider)
                        .then(function () {
                            toastr.success('You have successfully signed in with ' + provider);
                            $location.path('/profile');
                        })
                        .catch(function (response) {
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

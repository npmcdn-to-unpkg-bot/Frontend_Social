var app = angular.module('MyApp')
        .controller('SignupCtrl', function ($scope, $location, $auth, toastr, $rootScope,$modal,Account,$stateParams) {
              //Home page content is display only for home page 
            $rootScope.homePageContent = false;
            $scope.active = true;
            $scope.birthMonth = "";
            $scope.birthDay = "";
            $scope.birthYear = "";
            $scope.birthDate = new Date();
            $scope.dateOfBirthrequired = false;
            $scope.tourguide = $stateParams.tourguide;
            $scope.checkDate = function () {
                if ($scope.birthYear !== "" && $scope.birthDay !== "" && $scope.birthMonth !== "") {
                    $scope.dateOfBirthrequired = false;
                    $scope.birthDate.setFullYear($scope.birthYear);
                    $scope.birthDate.setDate($scope.birthDay);
                    $scope.birthDate.setMonth($scope.birthMonth);

                } else {
                    $scope.dateOfBirthrequired = true;
                    $scope.loginBtnLoading = false;
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

                    $scope.disabledGoogleBtn = loading;
                } else if (provider === "google") {
                    $scope.googeBtnLoading = loading;// start/stop loading
                    $scope.disabledFacebookBtn = loading;

                }
            };
            $scope.signup = function () {
                $scope.loginBtnLoading = true; // start loading
                $scope.disabledFacebookBtn = true;
                $scope.disabledGoogleBtn = true;
                $scope.checkDate();
                if (!$scope.dateOfBirthrequired) {
                   if($scope.tourguide){
                     $scope.user.userRole="tour_guide";          
                    }
                    $scope.user.dateOfBirth = $scope.birthDate;
                    $auth.signup($scope.user)
                            .then(function () {
                                $location.path('/login');


                                toastr.info('You have successfully created a new account and please check your email to verify');
                                $scope.loginBtnLoading = false; // stop loading
                                $scope.disabledFacebookBtn = false;
                                $scope.disabledGoogleBtn = false;

                                $rootScope.emailNotSentMessage = false;
                                $rootScope.emailSentMessage = false;

//                                toastr.success('You have successfully created a new account');

                            })
                            .catch(function (response) {
                                $scope.loginBtnLoading = false; // stop loading
                                $scope.disabledFacebookBtn = false;
                                $scope.disabledGoogleBtn = false;
                                if (response.statusText!== "Method Not Allowed" && response.data.fieldErrors.length !== undefined && response.data.fieldErrors.length > 0) {
                                    //TODO make different message for different errors and fix duplicated code  
                                    for (var i = 0; i < response.data.fieldErrors.length; i++) {
                                        if ("UniqueEmail.user.email" === response.data.fieldErrors[i].message) {
                                            toastr.error("Email address already in use");
                                        } else {
                                            toastr.error(response.data.fieldErrors[i].message);
                                        }
//                                        
                                    }
                                } else {
                                    //TODO make different message for different errors 
                                    if ("UniqueEmail.user.email" === response.data.message) {
                                        toastr.error("Email address already in use");
                                    } else {
                                        toastr.error(response.data.message);
                                    }

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
                            if(!response.data.active){
                                $scope.inactiveUser = response.data;
                                $scope.active = false;
                             }else{
                               toastr.error(response.data.message);  
                             }
                            $scope.swapSocialLoginLoading(provider, false);
                        });
            };
            //to populate the year values on singup form
            $scope.tempYear = new Date().getFullYear();
            $scope.minYear = $scope.tempYear - 18;
            $scope.maxYear = $scope.minYear - 80;

            $scope.years = [];
            $scope.generateYears = function () {
                $scope.yearOptions = [];
                for (var i = $scope.minYear; i >= $scope.maxYear; i--) {
                    $scope.yearOptions.push(i);
                }
                $scope.years = $scope.yearOptions;
            };
            $scope.generateYears();

      
   $scope.openContactForm = function() {
    $rootScope.emailAddress=$scope.inactiveUser.emailAddress;
   var modalInstance = $modal.open({
      templateUrl: 'pages/activationRequest.html',
     controller:function($modalInstance ,$scope){
     $scope.close = function () {
            $modalInstance.dismiss('cancel');
         };
         $scope.submit = function (params) {
                    Account.sendMessage(Account.getCurrentUrl(),$scope.emailAddress,params.subject,params.message)
                        .then(function () {
                            toastr.success('Account activation request sent, support team will contact you!');
                              $location.path('/');
                        })
                        .catch(function (response) {
                             $location.path('/');
                            toastr.error(response.data, response.status);
                        });
                        $modalInstance.dismiss('cancel');
                };

    }
    });
  }; 
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
;
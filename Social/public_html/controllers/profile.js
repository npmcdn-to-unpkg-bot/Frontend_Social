var app = angular.module('MyApp')
        .controller('ProfileCtrl', function ($scope, $auth, toastr, Account, $rootScope, $location, $http) {

            $scope.getProfile = function () {
                Account.getProfile()
                        .then(function (response) {
                            $rootScope.user = response.data;
                            $rootScope.emailDiv = false;
                            //set date for profile edit page 
                            $scope.fillDate($rootScope.user.dateOfBirth);
                            //Here is to concat the lunguge list before display on profile page
                            $scope.languge = "";
                            for (var i = 0; i < $scope.user.languages.length; i++) {
                                if (i === 0) {
                                    $scope.languge = $scope.languge + $scope.user.languages[i].language;
                                } else if (i === 3) {
                                    $scope.languge = $scope.languge + "... ";
                                    break;
                                }
                                else {
                                    $scope.languge = $scope.languge + ", " + $scope.user.languages[i].language;
                                }
                            }
                            
                                  //Cities having experiance
                            $scope.knownCities = "";
                            for (var i = 0; i < $scope.user.knownCities.length; i++) {
                                if (i === 0) {
                                    $scope.knownCities = $scope.knownCities + $scope.user.knownCities[i].knownCity;
                                } else if (i === 1) {
                                    $scope.knownCities = $scope.knownCities + "... ";
                                    break;
                                }
                            }

                            //Mode of transportation display 
                            $scope.modeoftransportation = "";
                            for (var i = 0; i < $scope.user.modeOfTransportation.length; i++) {
                                if (i === 0) {
                                    $scope.modeoftransportation = $scope.modeoftransportation + $scope.user.modeOfTransportation[i].mode;
                                } else if (i === 3) {
                                    $scope.modeoftransportation = $scope.modeoftransportation + "... ";
                                    break;
                                }
                                else {
                                    $scope.modeoftransportation = $scope.modeoftransportation + ", " + $scope.user.modeOfTransportation[i].mode;
                                }
                            }
                            
                            //Here disable three fields if the user is facebook or google 
                            $scope.facebookOrGoogleDOB = false;
                            $scope.facebookOrGoogleEmail = false;
                            $scope.facebookOrGoogleGender = false;
                            if ($scope.user.userType === "facebook" || $scope.user.userType === "google") {
                                if ($scope.user.dateOfBirth !== null) {
                                    $scope.facebookOrGoogleDOB = true;
                                }
                                if ($scope.user.gender !== null) {
                                    $scope.facebookOrGoogleGender = true;
                                }
                                if ($scope.user.email !== null) {
                                    $scope.facebookOrGoogleEmail = true;
                                }

                            }
                            //Here it send notification messge on user profile page 
                            setTimeout(function () {
                                if(!$scope.user.isProfileComplete){
                                tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p style="color:red">Welcome to your profile page. It looks like one or more of your profile information is incomplete. Please go to “EDIT PROFILE” page to complete.</p></div>');
                             
                                } 
                            }, 1000);
                            console.log($rootScope.user);

                        })
                        .catch(function (response) {
                            toastr.error(response.data.message, response.status);
                        });
            };
            $scope.updateProfile = function () {
                $scope.checkDate();
                $scope.user.dateOfBirth = $scope.birthDate;
                Account.updateProfile($scope.user)
                        .then(function () {
                            $location.path('/profile');
                            toastr.success('Profile has been updated');
                            //update the data 
                            $scope.getProfile();
                            //show veri profile and hiden edit profile jqury method
                            tjq(".view-profile").fadeIn();
                            tjq(".edit-profile").fadeOut();

                        })
                        .catch(function (response) {
                            toastr.error(response.data.message, response.status);
                        });
            };
            $scope.updateProfilePic = function () {

                Account.updateProfilePic($scope.user)
                        .then(function () {
                            $location.path('/profile');
                            toastr.success('Profile has been updated');

                        })
                        .catch(function (response) {
                            toastr.error(response.data.message, response.status);
                        });
            };
            $scope.link = function (provider) {
                $auth.link(provider)
                        .then(function () {
                            toastr.success('You have successfully linked a ' + provider + ' account');
                            $scope.getProfile();
                        })
                        .catch(function (response) {
                            toastr.error(response.data.message, response.status);
                        });
            };
            $scope.unlink = function (provider) {
                $auth.unlink(provider)
                        .then(function () {
                            toastr.info('You have unlinked a ' + provider + ' account');
                            $scope.getProfile();
                        })
                        .catch(function (response) {
                            toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
                        });
            };


            //image upload for profile    
//            $scope.stepsModel = [];
//            var profImg = {
//                imges: []
//            };
//
//            $scope.imageUpload = function (element) {
//                for (var i = 0; i < element.files.length; i++) {
//                    var reader = new FileReader();
//                    reader.onload = $scope.imageIsLoaded;
//                    reader.readAsDataURL(element.files[i]);
//                    profImg.imges.push({
//                        "fileName": element.files[i].name,
//                        "image": element.files[i].target.result,
//                        "mimeType": element.files[i].type
//                    });
//
//                }
//
//            };
//
//            $scope.imageIsLoaded = function (e) {
//                $scope.$apply(function () {
//                    $scope.stepsModel.push(e.target.result);
//
//                });
//                console.log(profImg);
//            };
            //to dynamically add other state filed 

            $scope.addNewChoice = function (value) {

                if (value === "Other") {

                    $scope.user.address.other = true;
                    $scope.user.address.states = value;

                } else {
                    $scope.user.address.other = false;
                    $scope.user.address.Otherstate = "";
                }
            };
            $scope.changeValue = function (val) {
                if ($scope.user.address.states === true && val !== "") {

                    $scope.user.address.Otherstate = val;
                }
            };

            //for languge add and removed 
            function Model() {
                this.language = null;
                this.proficiency = null;
            }

            $scope.userLanguage = {
                userLanguages: [new Model()]
            };
            $scope.add = function () {
                $scope.user.languages.push(new Model());
            };

            $scope.remove = function (userLanguage) {
                var index = $scope.user.languages.indexOf(userLanguage);
                if (index >= 0)
                    $scope.user.languages.splice(index, 1);
            };
            //for known city add and removed 
            function ModelCity() {
                this.knownCity = null;
                this.knownCityNoOfYears = null;
            }
             $scope.userKnownCity = {
                userKnownCities: [new ModelCity()]
            };

            $scope.addKnownCity = function () {
                $scope.user.knownCities.push(new ModelCity());
            };

            $scope.removeKnownCity = function (userKnownCity) {
                var index = $scope.user.knownCities.indexOf(userKnownCity);
                if (index >= 0)
                    $scope.user.knownCities.splice(index, 1);
            };

            //to redirect  user with unverifyed email 
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
            //to hundel with date 
            $scope.birthMonth = "";
            $scope.birthDay = "";
            $scope.birthYear = "";
            $scope.birthDate = new Date();
            $scope.dateOfBirthrequired = false;
            $scope.checkDate = function () {
                if ($scope.birthYear !== "" && $scope.birthDay !== "" && $scope.birthMonth !== "") {
                    if ($scope.checkDOBEerror($scope.birthDay, $scope.birthMonth)) {
                        $scope.dateOfBirthrequired = false;
                        $scope.birthDate.setFullYear($scope.birthYear);
                        $scope.birthDate.setDate($scope.birthDay);
                        $scope.birthDate.setMonth($scope.birthMonth);
                    }

                } else {
                    $scope.dateOfBirthrequired = true;
                }
            };
            $scope.fillDate = function (dateValue) {
                if (dateValue !== null) {
                    $scope.date = dateValue.split('-');
                    $scope.tempMonth = parseInt($scope.date[1], 10) - 1;
                    if ($scope.tempMonth < 10) {
                        $scope.birthMonth = "0" + $scope.tempMonth.toString();
                    } else {
                        $scope.birthMonth = $scope.tempMonth.toString();
                    }

                    $scope.birthDay = $scope.date[2];
                    $scope.birthYear = $scope.date[0];
                }
            };
            $scope.returnDateUpdate = function (dateValue) {
                $scope.fillDate(dateValue);
                $scope.checkDate();

                return $scope.birthDate;

            };
            $scope.checkDOBEerror = function (day, month) {

                return true;
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
            //call generate year list
            $scope.generateYears();
            //to generate list of months 
            $scope.listOfMonth = [];
            $scope.generateListOfMonth = function () {
                $scope.monthOptions = [];
                for (var i = 1; i <= 31; i++) {
                    $scope.monthOptions.push(i);
                }
                $scope.listOfMonth = $scope.monthOptions;
            };

            // mode of transportation
            $scope.loadModeOfTransportation = function ($query) {
                return Account.loadJsonFile('/Social/data/modeOfTransportation.json', {cache: true}).then(function (response) {

                    var modeofTrans = response.data;
                    return modeofTrans;
                    return modeofTrans.filter(function (data) {
                        return data.mode.toLowerCase().indexOf($query.toLowerCase()) !== -1;
                    });
                });
            };
            // reas do you have strong knowledges on this place
            $scope.loadKnowledgesOfArea = function ($query) {
                return Account.loadJsonFile('/Social/data/knowledgesOfArea.json', {cache: true}).then(function (response) {
                    var knowledgesOfArea = response.data;
                    return knowledgesOfArea;
                    return knowledgesOfArea.filter(function (data) {
                        return data.name.toLowerCase().indexOf($query.toLowerCase()) !== -1;
                    });
                });
            };

            $scope.generateListOfMonth();

            //call get profile api
            $scope.getProfile();
            //for toggle from profile to profile edit page
            tjq(document).ready(function () {
                tjq("#profile .edit-profile-btn").click(function (e) {
                    e.preventDefault();
                    tjq(".view-profile").fadeOut();
                    tjq(".edit-profile").fadeIn();
                });

//            setTimeout(function() {
//                tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ab quis a dolorem, placeat eos doloribus esse repellendus quasi libero illum dolore. Esse minima voluptas magni impedit, iusto, obcaecati dignissimos.</p></div>');
//            }, 10000);
            });
            //for toggle from profile edit to profile page
            tjq(document).ready(function () {
                tjq("#cancel").click(function (e) {
                    e.preventDefault();
                    tjq(".view-profile").fadeIn();
                    tjq(".edit-profile").fadeOut();
                });

//            setTimeout(function() {
//                tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ab quis a dolorem, placeat eos doloribus esse repellendus quasi libero illum dolore. Esse minima voluptas magni impedit, iusto, obcaecati dignissimos.</p></div>');
//            }, 10000);
            });
            tjq('a[href="#profile"]').on('shown.bs.tab', function (e) {
                tjq(".view-profile").show();
                tjq(".edit-profile").hide();
            });


        });

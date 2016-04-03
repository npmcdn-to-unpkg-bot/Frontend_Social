var app = angular.module('MyApp')
        .controller('ProfileCtrl', function ($scope, $auth, toastr, Account, $rootScope, $location, $http) {
            //Home page content is display only for home page 
//            $rootScope.homePageContent = false;
            //user profile pictuer and user name global var
            $rootScope.userPictuer = "";
            $rootScope.userName = "";
            $scope.getProfile = function () {
                Account.getProfile()
                        .then(function (response) {
                            $scope.user = response.data;
                            $rootScope.emailDiv = false;
                            //set global user profile pic and name 
                            $rootScope.userPictuer = $scope.user.picture;
                            $rootScope.userName = $scope.user.firstName;
                            //set date for profile edit page 
                            $scope.fillDate($scope.user.dateOfBirth);
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
                            $scope.googleOrfacebookUser = false;
                            if ($scope.user.userType === "facebook" || $scope.user.userType === "google") {
                                $scope.googleOrfacebookUser = true;
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

                            $scope.notification = "";

                            $scope.required = [{"key": "firstName", "value": "First name"}, {"key": "lastName", "value": "Last name"}, {"key": "dateOfBirth", "value": "Date of birth"}, {"key": "email", "value": "Email"}, {"key": "gender", "value": "Gender"}, {"key": "languages", "value": "Languages"}, {"key": "aboutYou", "value": "About you"}, {"key": "address", "value": "Address"}, {"key": "areasOfStrongKnowledges", "value": "Areas of strong knowledges"}, {"key": "knownCities", "value": "known cities"}, {"key": "modeOfTransportation", "value": "Mode of transportation"}];
                            $scope.requiredArr = ["knownCities", "areasOfStrongKnowledges", "languages", "modeOfTransportation"];
                            for (var i = 0; i < $scope.required.length; i++) {
                                var tempVal = $scope.required[i].key;
                                var testVal = $scope.user[tempVal];

                                if (testVal === null || testVal.length === 0) {
                                    if ($scope.notification === "") {
                                        $scope.notification = $scope.required[i].value;
                                    } else {
                                        $scope.notification = $scope.notification + ", " + $scope.required[i].value;
                                    }

                                }
                            }

                            $scope.incompleteProfile = false;
                            if ($scope.notification !== "") {
                                $scope.incompleteProfile = true;
                            }

//                            setTimeout(function () {
////                                if (!$scope.user.isProfileComplete) {
//                                      if (true) {
//
//                                    tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p style="color:red">Welcome to your profile page. It looks like one or more of your profile information is incomplete. Please go to “EDIT PROFILE” page to complete.</p>\n\<ul style="color:red">'
//
//                                            + localFeild + '</ul></div>');
//
//                                }
//                            }, 10);
//                            


                            console.log($scope.user);

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
                $scope.jsonUrl = "";
                if (window.location.host === 'localhost:8383') {
                    $scope.jsonUrl = "http://localhost:8383/data/modeOfTransportation.json";
                } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                    $scope.jsonUrl = "http://app-tourgoat.rhcloud.com/data/modeOfTransportation.json";
                }else if(window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                    $scope.jsonUrl = "http://tourgoat.com.s3-website-us-west-2.amazonaws.com/data/modeOfTransportation.json";
                }
                
                return Account.loadJsonFile($scope.jsonUrl, {cache: true}).then(function (response) {

                    var modeofTrans = response.data;
                    return modeofTrans;
                    return modeofTrans.filter(function (data) {
                        return data.mode.toLowerCase().indexOf($query.toLowerCase()) !== -1;
                    });
                });
            };
            // reas do you have strong knowledges on this place
            $scope.loadKnowledgesOfArea = function ($query) {
                $scope.jsonUrl = "";
                if (window.location.host === 'localhost:8383') {
                    $scope.jsonUrl = "http://localhost:8383/data/knowledgesOfArea.json";
                } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                    $scope.jsonUrl = "http://app-tourgoat.rhcloud.com/data/knowledgesOfArea.json";
                } else if(window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com'){
                    $scope.jsonUrl = "http://tourgoat.com.s3-website-us-west-2.amazonaws.com/data/knowledgesOfArea.json";
                }
                return Account.loadJsonFile($scope.jsonUrl, {cache: true}).then(function (response) {
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
//                    tjq("#setting_tab").
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
            //togel between profile and setteing tab
            tjq(document).ready(function () {
                tjq("#settings_profile").click(function (e) {
                    e.preventDefault();

                    tjq("#profile_tab").removeClass("active");
                    tjq("#setting_tab").addClass("active");
                    tjq("#settings").addClass("in active");

                    tjq("#settings").show();
                    tjq(".view-profile").hide();
                    tjq(".edit-profile").hide();
                });

//            setTimeout(function() {
//                tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ab quis a dolorem, placeat eos doloribus esse repellendus quasi libero illum dolore. Esse minima voluptas magni impedit, iusto, obcaecati dignissimos.</p></div>');
//            }, 10000);
            });

            $scope.passwordUpdate = function () {
                Account.passwordUpdate($scope.user.email, $scope.oldPassword, $scope.confirmNewPassword)
                        .then(function () {
                            $location.path('/profile');
                            $scope.getProfile();
                            //show veri profile and hiden edit profile jqury method
                            tjq(".view-profile").fadeIn();
                            tjq(".edit-profile").fadeOut();
                            toastr.success('Your password has been changed successfully : ' + $scope.user.email);
                        })
                        .catch(function (response) {
                            $scope.errorType = response.data;
//                            toastr.error('Updating the password failed. Incorrect old password to' + $scope.emailAddress);
//                            toastr.error(response.data.message, response.status);
                        });
            };

            $scope.emailUpdate = function () {
                $scope.noChange = false;
                $scope.oldEmailModified = false;
                if ($scope.newEmail === $scope.oldEmail) {
                    $scope.noChange = true;
                    return;
                }
                if ($scope.user.email !== $scope.oldEmail) {
                    $scope.oldEmailModified = true;
                    return;
                } else {
                    Account.emailUpdate($scope.oldEmail, $scope.newEmail)
                            .then(function () {
                                $location.path('/profile');
                                $scope.getProfile();
                                //show veri profile and hiden edit profile jqury method
                                tjq(".view-profile").fadeIn();
                                tjq(".edit-profile").fadeOut();
                                toastr.success('Your Email has been changed successfully from: ' + $scope.user.email + ' to: ' + $scope.newEmail);
                            })
                            .catch(function (response) {
                                $rootScope.errorType = response.data;
                                $scope.resetBtnLoading = false;
//                            toastr.error(response.data.message, response.status);
                            });
                }

            };

        });

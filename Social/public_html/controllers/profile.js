angular.module('MyApp')
        .controller('ProfileCtrl', function ($scope, $auth, toastr, Account, $rootScope, $location) {
            $scope.getProfile = function () {
                Account.getProfile()
                        .then(function (response) {

                            $rootScope.user = response.data;

                            //call email verification method
                            if ($rootScope.user.emailVerification === "PENDING") {
                                $scope.verifyEmail();
                            } else {
                                  $rootScope.emailDiv=false;
                                //if email is verified then allow the user to see his profile
                                $auth.isAuthenticated()

//                                toastr.success('You have successfully signed in with ' + $scope.user.userType);

                                $rootScope.user.dateOfBirth = new Date($rootScope.user.dateOfBirth);

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
                                //Here disable three fields if user is facebook or google user
                                $scope.facebookOrGoogleDOB = false;
                                $scope.facebookOrGoogleEmail = false;
                                $scope.facebookOrGoogleDOBGender = false;
                                if ($scope.user.userType === "facebook" || $scope.user.userType === "google") {
                                    if ($scope.user.dateOfBirth !== null) {
                                        $scope.facebookOrGoogleDOB = true;
                                    }
                                    if ($scope.user.gender !== null) {
                                        $scope.facebookOrGoogleDOBGender = true;
                                    }
                                    if ($scope.user.email !== null) {
                                        $scope.facebookOrGoogleEmail = true;
                                    }

                                }

                                //Here it send notification messge on user profile page 
                                setTimeout(function () {
                                    tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p style="color:red">Welcome to your profile page. It looks like one or more of your profile information is incomplete. Please go to “EDIT PROFILE” page to complete.</p></div>');
                                }, 1000);
                                console.log($rootScope.user);
                            }
                        })
                        .catch(function (response) {
                            toastr.error(response.data.message, response.status);
                        });
            };
            $scope.updateProfile = function () {
                Account.updateProfile($scope.user)
                        .then(function () {
                            $location.path('/profile');
                            toastr.success('Profile has been updated');
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


            //image upload for profile    
            $scope.stepsModel = [];
            var profImg = {
                imges: []
            };

            $scope.imageUpload = function (element) {
                for (var i = 0; i < element.files.length; i++) {
                    var reader = new FileReader();
                    reader.onload = $scope.imageIsLoaded;
                    reader.readAsDataURL(element.files[i]);



                    profImg.imges.push({
                        "fileName": element.files[i].name,
                        "image": element.files[i].target.result,
                        "mimeType": element.files[i].type
                    });

                }

            };

            $scope.imageIsLoaded = function (e) {
                $scope.$apply(function () {
                    $scope.stepsModel.push(e.target.result);

                });
                console.log(profImg);
            };
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
            //to verify check user email is verifyed or not
            $scope.verifyEmail = function () {
                $auth.logout()
                        .then(function () {
                            toastr.error('Please verify your email');
                            $location.path('/login');
                        });

                $rootScope.emailDiv=true;
                //Here it send notification messge on user profile page 
//                setTimeout(function () {
////                    tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p style="color:red; text-align: center"> Please verify your email. Click <a style="color: blue" href="">Here</a> to resend email verification</p></div>');
//                    tjq(".notification-area").append('<div class="info-box block "><span class="close "></span><p style="color:red; text-align: center"> Please verify your email.</p><div class="row "><div class=" form-inline  col-sms-6"><input class="form-control col-sms-4" type="email"  ng-model="email" required placeholder="enter your email"><button class="btn-medium col-sms-2" ng-click="resendEmail()">Resend Email</button></div></div></div>');
//
//                }, 0);

            };


        });
    

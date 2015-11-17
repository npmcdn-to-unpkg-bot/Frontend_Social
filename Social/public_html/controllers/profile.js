angular.module('MyApp')
  .controller('ProfileCtrl', function($scope, $auth, toastr, Account,$rootScope, $location) {
    $scope.getProfile = function() {
      Account.getProfile()
        .then(function(response) {
           $rootScope.user = response.data;
           $rootScope.user.dateOfBirth  =  new Date($rootScope.user.dateOfBirth);
           //Here it send notification messge on user profile page 
           setTimeout(function() {
                tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p style="color:red">Welcome to your profile page. It looks like one or more of your profile information is incomplete. Please go to “EDIT PROFILE” page to complete.</p></div>');
                    }, 1000);
            console.log($rootScope.user);
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };
    $scope.updateProfile = function() {
      Account.updateProfile($scope.user)
        .then(function() {
            $location.path('/profile');
                toastr.success('Profile has been updated');
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };
    
     $scope.updateProfilePic = function() {
//          $scope.processQueue();
//         ---------

//--------------
      Account.updateProfilePic($scope.user)
        .then(function() {
            $location.path('/profile');
            toastr.success('Profile has been updated');
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };
    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          toastr.success('You have successfully linked a ' + provider + ' account');
          $scope.getProfile();
        })
        .catch(function(response) {
          toastr.error(response.data.message, response.status);
        });
    };
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          toastr.info('You have unlinked a ' + provider + ' account');
          $scope.getProfile();
        })
        .catch(function(response) {
          toastr.error(response.data ? response.data.message : 'Could not unlink ' + provider + ' account', response.status);
        });
    };

    $scope.getProfile();
    //for toggle from profile to profile edit page
    tjq(document).ready(function() {
            tjq("#profile .edit-profile-btn").click(function(e) {
                e.preventDefault();
                tjq(".view-profile").fadeOut();
                tjq(".edit-profile").fadeIn();
            });

//            setTimeout(function() {
//                tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ab quis a dolorem, placeat eos doloribus esse repellendus quasi libero illum dolore. Esse minima voluptas magni impedit, iusto, obcaecati dignissimos.</p></div>');
//            }, 10000);
        });
      //for toggle from profile edit to profile page
         tjq(document).ready(function() {
            tjq("#cancel").click(function(e) {
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
  

                    
          angular.module('MyApp').controller('FileCtrl', ['scope',
                function ($scope) {

                    $scope.partialDownloadLink = 'http://localhost:8080/download?filename=';
                    $scope.filename = '';

                    $scope.uploadFile = function() {
                        $scope.processQueue();
                    };

                    $scope.reset = function() {
                        $scope.resetDropzone();
                    };
                }

            ]);
            
            
            var fileAppDirectives = angular.module('fileAppDirectives', []);

            angular.module('MyApp').directive('dropzone', function() {
                return {
                    restrict: 'C',
                    link: function(scope, element, attrs) {

                        var config = {
                            url: 'http://localhost:8080/upload',
                            maxFilesize: 100,
                            paramName: "uploadfile",
                            maxThumbnailFilesize: 10,
                            parallelUploads: 1,
                            autoProcessQueue: false
                        };

                        var eventHandlers = {
                            'addedfile': function(file) {
                                scope.file = file;
                                if (this.files[1]!=null) {
                                    this.removeFile(this.files[0]);
                                }
                                scope.$apply(function() {
                                    scope.fileAdded = true;
                                });
                            },

                            'success': function (file, response) {
                            }

                        };

                        dropzone = new Dropzone(element[0], config);

                        angular.forEach(eventHandlers, function(handler, event) {
                            dropzone.on(event, handler);
                        });

                        scope.processDropzone = function() {
                            dropzone.processQueue();
                        };

                        scope.resetDropzone = function() {
                            dropzone.removeAllFiles();
                        }
                    }
                }
            });
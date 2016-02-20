angular.module('MyApp')
        .factory('Account', function ($http) {
            return {
                getProfile: function () {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.get('http://localhost:8080/profile');
                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                        //for cloud
                        return $http.get('http://tourgoat.cfapps.io/profile');
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                        //for cloud
                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/profile');
                    }

                },
                updateProfile: function (profileData) {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.put('http://localhost:8080/updateProfile', profileData);
                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                        //for cloud
                        return $http.put('http://app-tourgoat.rhcloud.com/updateProfile', profileData);
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                        //for cloud
                        return $http.put('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/updateProfile', profileData);
                    }

                },
                updateProfilePic: function (profileData) {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.put('http://localhost:8080/uploadProfilPic', profileData);
                    } else {
                        //for cloud
                        return $http.put('http://tourgoat.cfapps.io/uploadProfilPic', profileData);
                    }

                },
                resendEmail: function (email) {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.get('http://localhost:8080/resend/verificationId?email=' + email);

                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                        //for cloud
                        return $http.get('http://tourgoat.cfapps.io/resend/verificationId?email=' + email);
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                        //for cloud
                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/resend/verificationId?email=' + email);
                    }

                },
                passwordReset: function (emailAddress) {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.get('http://localhost:8080/passwordReset?emailAddress=' + emailAddress);

                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                        //for cloud
                        return $http.get('http://tourgoat.cfapps.io/passwordReset?emailAddress=' + emailAddress);
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                        //for cloud
                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/passwordReset?emailAddress=' + emailAddress);
                    }

                },
                newPassword: function (emailAddress, password) {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.get('http://localhost:8080/newPassword?emailAddress=' + emailAddress + '&password=' + password);

                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                        //for cloud
                        return $http.get('http://tourgoat.cfapps.io/newPassword?emailAddress=' + emailAddress + '&password=' + password);
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                        //for cloud
                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/newPassword?emailAddress=' + emailAddress + '&password=' + password);
                    }

                },
                loadJsonFile: function (filepath, cache) {
                    return $http.get(filepath, cache);

                },
                oldPasswordCheck: function (emailAddress, oldPassword) {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.get('http://localhost:8080/user/validpassword?email=' + emailAddress + '&value=' + oldPassword);

                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                        //for cloud
                        return $http.get('http://tourgoat.cfapps.io/user/validpassword?email=' + emailAddress + '&value=' + oldPassword);
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                        //for cloud
                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/user/validpassword?email=' + emailAddress + '&value=' + oldPassword);
                    }

                }, passwordUpdate: function (emailAddress, oldPassword, password) {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.get('http://localhost:8080/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);

                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                        //for cloud
                        return $http.get('http://tourgoat.cfapps.io/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                        //for cloud
                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);
                    }

                }, emailUpdate: function (oldEmail, newEmail) {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.get('http://localhost:8080/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);

                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                        //for cloud
                        return $http.get('http://tourgoat.cfapps.io/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                        //for cloud
                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);
                    }

                }




            };
        });


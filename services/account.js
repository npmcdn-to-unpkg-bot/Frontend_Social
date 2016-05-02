angular.module('MyApp')
        .factory('Account', function ($http) {
            return {
                getCurrentUrl: function () {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return 'http://localhost:8080';
                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                        //for cloud
                        return 'http://tourgoat.cfapps.io';
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                        //for cloud
                        return 'http://tourgoatapp-env.us-west-2.elasticbeanstalk.com';
                    }

                },
                getProfile: function (url) {
                    return $http.get(url + '/profile');

//                    if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/profile');
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/profile');
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/profile');
//                    }

                },
                updateProfile: function (url, profileData) {

                    return $http.put(url + '/updateProfile', profileData);
//                    
//                    if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.put('http://localhost:8080/updateProfile', profileData);
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.put('http://app-tourgoat.rhcloud.com/updateProfile', profileData);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.put('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/updateProfile', profileData);
//                    }

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
                resendEmail: function (url, email) {
                    return $http.get(url + '/resend/verificationId?email=' + email);
//                    if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/resend/verificationId?email=' + email);
//
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/resend/verificationId?email=' + email);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/resend/verificationId?email=' + email);
//                    }

                },
                passwordReset: function (url, emailAddress) {
                    return $http.get(url + '/passwordReset?emailAddress=' + emailAddress);
//                    if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/passwordReset?emailAddress=' + emailAddress);
//
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/passwordReset?emailAddress=' + emailAddress);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/passwordReset?emailAddress=' + emailAddress);
//                    }

                },
                newPassword: function (url, emailAddress, password) {

                    return $http.get(url + '/newPassword?emailAddress=' + emailAddress + '&password=' + password);
//                    if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/newPassword?emailAddress=' + emailAddress + '&password=' + password);
//
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/newPassword?emailAddress=' + emailAddress + '&password=' + password);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/newPassword?emailAddress=' + emailAddress + '&password=' + password);
//                    }

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
//
//<<<<<<< bad6b7bb24ad6295527b9852beae8058aeca7597
//                }, passwordUpdate: function (emailAddress, oldPassword, password) {
//                    if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);
//
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);
//                    }
//
//                }, emailUpdate: function (oldEmail, newEmail) {
//                    if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);
//
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);
//                    }
//
//                },sendMessage:function(emailAddress,subject,message){
//                   if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/sendEmail?from=' + emailAddress + '&subject=' + subject+'&message='+message);
//
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/sendEmail?from=' + emailAddress + '&subject=' + subject+'&message='+message);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/sendEmail?from=' + emailAddress + '&subject=' + subject+'&message='+message);
//                    } 
//                },sendRequest:function(firstName,lastName,emailAddress,subject,message){
//                   if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/contactRequest?firstName=' + firstName +'&lastName='+lastName+ '&emailAddress='+emailAddress+'&subject=' + subject+'&message='+message);
//
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/contactRequest?firstName=' + firstName +'&lastName='+lastName+ '&emailAddress='+emailAddress+'&subject=' + subject+'&message='+message);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/contactRequest?firstName=' + firstName +'&lastName='+lastName+ '&emailAddress='+emailAddress+'&subject=' + subject+'&message='+message);
//                    } 
//=======
                }, passwordUpdate: function (url, emailAddress, oldPassword, password) {

                    return $http.get(url + '/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);
//                    if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);
//
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);
//                    }

                }, emailUpdate: function (url, oldEmail, newEmail) {
                    return $http.get(url + '/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);
//                    if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);
//
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);
//                    }

                }, sendMessage: function (url, emailAddress, subject, message) {
                    return $http.get(url + '/sendEmail?from=' + emailAddress + '&subject=' + subject + '&message=' + message);
//                   if (window.location.host === 'localhost:8383') {
//                        //for local
//                        return $http.get('http://localhost:8080/sendEmail?from=' + emailAddress + '&subject=' + subject+'&message='+message);
//
//                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
//                        //for cloud
//                        return $http.get('http://tourgoat.cfapps.io/sendEmail?from=' + emailAddress + '&subject=' + subject+'&message='+message);
//                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
//                        //for cloud
//                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/sendEmail?from=' + emailAddress + '&subject=' + subject+'&message='+message);
//                    } 
                }, sendRequest: function (firstName, lastName, emailAddress, subject, message) {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.get('http://localhost:8080/contactRequest?firstName=' + firstName + '&lastName=' + lastName + '&emailAddress=' + emailAddress + '&subject=' + subject + '&message=' + message);

                    } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
                        //for cloud
                        return $http.get('http://tourgoat.cfapps.io/contactRequest?firstName=' + firstName + '&lastName=' + lastName + '&emailAddress=' + emailAddress + '&subject=' + subject + '&message=' + message);
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' || window.location.host === 'http://tourgoat.com' || window.location.host === 'http://www.tourgoat.com') {
                        //for cloud
                        return $http.get('http://tourgoatapp-env.us-west-2.elasticbeanstalk.com/contactRequest?firstName=' + firstName + '&lastName=' + lastName + '&emailAddress=' + emailAddress + '&subject=' + subject + '&message=' + message);
                    }
                }, getUserList: function (url) {
                    return $http.get(url + '/getUser');
                }, getUserCount: function (url) {
                    return $http.get(url + '/getUserCount');
                }, updateUserRole: function (url, id, role) {
                    return  $http.get(url + '/updateUserRole' + '?id=' + id + '&role=' + role);
                }, updateUserAccount: function (url, id) {
                    return  $http.get(url + '/updateAccountStatus' + '?id=' + id);

                }

            };


        });


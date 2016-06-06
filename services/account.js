angular.module('MyApp')
        .factory('Account', function ($http) {
            return {
                getCurrentUrl: function () {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return 'http://localhost:8080';
                    } else if (window.location.host === 'qa-tourgoat.rhcloud.com') {
                        //for cloud
                        return 'http://qatourgoat.cfapps.io';
                    } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com') {
                        //for cloud
                        return 'http://tourgoatapp-env.us-west-2.elasticbeanstalk.com';
                    } else if ( window.location.origin === 'https://www.tourgoat.com' || window.location.host === 'www.tourgoat.com') {
                        //for cloud
                        return 'https://afro-mart.com';
                    }

                },
                getProfile: function (url) {
                    return $http.get(url + '/profile');
                },
                updateProfile: function (url, profileData) {

                    return $http.put(url + '/updateProfile', profileData);
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
                },
                passwordReset: function (url, emailAddress) {
                    return $http.get(url + '/passwordReset?emailAddress=' + emailAddress);
                },
                newPassword: function (url, emailAddress, password) {
                    return $http.get(url + '/newPassword?emailAddress=' + emailAddress + '&password=' + password);
                },
                loadJsonFile: function (filepath, cache) {
                    return $http.get(filepath, cache);
                },
                oldPasswordCheck: function (url, emailAddress, oldPassword) {
                    return $http.get(url + '/user/validpassword?email=' + emailAddress + '&value=' + oldPassword);
                }, passwordUpdate: function (url, emailAddress, oldPassword, password) {
                    return $http.get(url + '/passwordUpdate?emailAddress=' + emailAddress + '&oldPassword=' + oldPassword + '&password=' + password);
                }, emailUpdate: function (url, oldEmail, newEmail) {
                    return $http.get(url + '/emailUpdate?oldEmail=' + oldEmail + '&newEmail=' + newEmail);
                }, sendMessage: function (url, emailAddress, subject, message) {
                    return $http.get(url + '/sendEmail?from=' + emailAddress + '&subject=' + subject + '&message=' + message);
                }, sendRequest: function (url, firstName, lastName, emailAddress, subject, message) {
                    return $http.get(url + '/contactRequest?firstName=' + firstName + '&lastName=' + lastName + '&emailAddress=' + emailAddress + '&subject=' + subject + '&message=' + message);
                }, getUserList: function (url) {
                    return $http.get(url + '/getUser');
                }, getUserCount: function (url) {
                    return $http.get(url + '/getUserCount');
                }, updateUserRole: function (url, id, role) {
                    return  $http.get(url + '/updateUserRole' + '?id=' + id + '&role=' + role);
                }, updateUserAccount: function (url, id) {
                    return  $http.get(url + '/updateAccountStatus' + '?id=' + id);

                }, updateUserRole: function (url) {
                   return $http.get(url + '/updateUserRoleTourguide');

                }

            };


        });


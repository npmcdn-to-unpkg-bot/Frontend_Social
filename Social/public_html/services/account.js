angular.module('MyApp')
        .factory('Account', function ($http) {
            return {
                getProfile: function () {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.get('http://localhost:8080/profile');
                    } else {
                        //for cloud
                        return $http.get('http://tourgoat.cfapps.io/profile');
                    }



                },
                updateProfile: function (profileData) {
                    if (window.location.host === 'localhost:8383') {
                        //for local
                        return $http.put('http://localhost:8080/updateProfile', profileData);
                    } else {
                        //for cloud
                        return $http.put('http://tourgoat.cfapps.io/updateProfile', profileData);
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

                    } else {
                        //for cloud
                        return $http.get('http://tourgoat.cfapps.io/resend/verificationId?email=' + email);
                    }

                },
                loadJson: function (filepath) {
                    return $http.get(filepath);

                }


            };
        });


angular.module('MyApp')
        .factory('Account', function ($http) {
            return {
                getProfile: function () {
                    if (window.location.host === 'localhost:8383') {
                      //for local
                    return $http.get('http://localhost:8080/profile');  
                    }else{
                           //for cloud
                    return $http.get('http://tourgoat.cfapps.io/profile');
                    }
                    
                 

                },
                updateProfile: function (profileData) {
                       if (window.location.host === 'localhost:8383') {
                      //for local
                    return $http.get('http://localhost:8080/updateProfile', profileData);  
                    }else{
                           //for cloud
                    return $http.get('http://tourgoat.cfapps.io/updateProfile', profileData);
                    }
                    
                    
//                    return $http.put('http://localhost:8080/updateProfile', profileData);
                }
            };
        });


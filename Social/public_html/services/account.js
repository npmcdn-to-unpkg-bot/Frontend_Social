angular.module('MyApp')
  .factory('Account', function($http) {
    return {
      getProfile: function() {
        return $http.get('http://localhost:8080/profile');
      },
      updateProfile: function(profileData) {
        return $http.put('/api/me', profileData);
      }
    };
  });


//angular.module('MyApp')
//        .factory('Account', function ($http, $auth) {
//            return {
//                getProfile: function () {
//                    return $http({method: 'GET', url: 'http://localhost:8080/profile', headers: {
//                            'Authorization': $auth.getToken(),}
//                    });
//                },
//                updateProfile: function (profileData) {
//                    return $http.put('/api/me', profileData);
//                }
//            };
//        });


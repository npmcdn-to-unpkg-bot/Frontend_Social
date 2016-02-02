/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('MyApp')
  .directive('oldPasswordValidate', function($q,Account) {
   return {
    require : 'ngModel',
    link : function($scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.oldPasswordMatch = function(viewValue) {
          $scope.oldPassword=ngModel.$viewValue;
           Account.oldPasswordCheck($scope.user.email,viewValue)
                        .then(function () {
                          return true;  
                        })
                        .catch(function (response) {
                            return $q.reject(response.data.errorMessage);
//                            $scope.errorType = response.data;
                        });
//          
        
//        return $http.get('/user/validpassword?email='+ user.email+'&&oldPassword='+oldPassword);
      };
    }
  };
  });

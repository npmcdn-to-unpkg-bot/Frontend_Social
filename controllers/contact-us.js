
angular.module('MyApp')
  .controller('contactCtrl', function ($scope, toastr, $rootScope,Account,$location) {
         //this is make display on home page content 
            $rootScope.homePageContent = false;
            $scope.sendMessage = function () {   
                Account.sendRequest($scope.firstName,$scope.lastName,$scope.emailAddress,$scope.subject,$scope.message)
                        .then(function () {
                            toastr.success('Message Sent, we will reach you soon!');
                              $location.path('/');
                        })
                        .catch(function (response) {
                             $location.path('/');
                            toastr.error(response.data, response.status);
                        });
                    }; 
            
});

/* global angular */

angular.module('MyApp').controller('VerifiedCtrl', function($scope, $modal,  $rootScope) {
       //this is make display on home page content 
            $rootScope.homePageContent = false;
   $scope.openDemoModal = function() {
   var modalInstance = $modal.open({
      templateUrl: 'pages/model.html',
      backdrop: true,
      keyboard: true,
      modalFade: true,
      scope: $scope,
     controller:function($modalInstance ,$scope){
     $scope.close = function () {
            $modalInstance.dismiss('cancel');
         };

    }
    });
  };
    $scope.openDemoModal();
    
  
  });

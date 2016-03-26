/* global angular */

angular.module('MyApp').controller('VerifiedCtrl', function($scope, $modal) {
    
   $scope.openDemoModal = function() {
   $modal.open({
      templateUrl: 'pages/model.html',
      controller: 'LoginCtrl',
      backdrop: true,
      keyboard: true,
      modalFade: true,
      scope: $scope
    });
  };
    $scope.openDemoModal();
  
  });


angular.module('MyApp')
  .controller('becomeTourguideCtrl', function ($scope, $sce, $rootScope,$state) {
//         //this is make display on home page content 
            $rootScope.homePageContent = false;
            $scope.signUpTourGuide= function () {
                $state.go('signup',{tourguide:'true'});
            }
//    $scope.config = {
//      sources: [
//          {src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4'), type: 'video/mp4'}
//      ],
//      useNativeControls: true,
//      posterImage: 'http://www.videogular.com/assets/images/videogular.png',
//      style:'http://www.videogular.com/styles/themes/default/latest/videogular.css'
//    };
});




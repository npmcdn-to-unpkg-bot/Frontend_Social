
angular.module('MyApp')
  .controller('aboutusCtrl', function ($scope, $sce, $rootScope) {
         //this is make display on home page content 
            $rootScope.homePageContent = false;
    $scope.config = {
      sources: [
          {
              src: $sce.trustAsResourceUrl('https://s3.amazonaws.com/tourgoat-about-us/tourgoatmusic.mp4'), type: 'video/mp4'
//              src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4'), type: 'video/mp4'
          }
      ],
      useNativeControls: true,
//      posterImage: 'http://www.videogular.com/assets/images/videogular.png',
//      style:'http://www.videogular.com/styles/themes/default/latest/videogular.css'
    };
});


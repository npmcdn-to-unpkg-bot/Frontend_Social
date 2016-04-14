
angular.module('MyApp')
  .controller('becomeTourguideCtrl', function ($scope, $sce) {
    $scope.config = {
      sources: [
          {src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4'), type: 'video/mp4'}
      ],
      useNativeControls: true,
      posterImage: 'http://www.videogular.com/assets/images/videogular.png',
      style:'http://www.videogular.com/styles/themes/default/latest/videogular.css'
    };
});




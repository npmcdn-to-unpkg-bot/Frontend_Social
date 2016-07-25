//
//angular.module('MyApp')
//  .controller('aboutusCtrl', function ($scope, $sce, $rootScope) {
//         //this is make display on home page content 
//            $rootScope.homePageContent = false;
//    $scope.config = {
//      sources: [
//          {
//              src: $sce.trustAsResourceUrl('https://s3.amazonaws.com/tourgoat-about-us/tourgoatmusic.mp4'), type: 'video/mp4'
////              src: $sce.trustAsResourceUrl('http://static.videogular.com/assets/videos/videogular.mp4'), type: 'video/mp4'
//          }
//      ],
//      useNativeControls: true,
////      posterImage: 'http://www.videogular.com/assets/images/videogular.png',
////      style:'http://www.videogular.com/styles/themes/default/latest/videogular.css'
//    };
//});

var app = angular.module('MyApp')
        .controller('aboutusCtrl',
                ["$sce", function ($sce) {
                        //Home page content is display only for home page 


                        this.config = {
                            preload: "none",
                            sources: [
                                {src: "https://www.youtube.com/watch?v=rpPXx_c-DcU"},
                                {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                                {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
                            ],
                            theme: {
                                url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                            },
                            plugins: {
                                controls: {
                                    autoHide: true,
                                    autoHideTime: 5000
                                }
                            }
                        };
                    }]
                );
app.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
        $rootScope.$on('$stateChangeSuccess',
                function (event) {
                    $rootScope.homePageContent = false;
                });
    }]);

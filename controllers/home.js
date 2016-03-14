
angular.module('MyApp')
        .controller('homeCtrl', function ($scope, $rootScope, $window, $http, $rootScope) {
            //this is make display on home page content 
//            $rootScope.homePageContent = true;
            //This script run home page slider
            tjq(document).ready(function () {
                tjq('.revolution-slider').revolution(
                        {
                            dottedOverlay: "none",
                            delay: 8000,
                            startwidth: 1170,
                            startheight: 550,
                            onHoverStop: "on",
                            hideThumbs: 10,
                            fullWidth: "on",
                            forceFullWidth: "on",
                            navigationType: "none",
                            shadow: 0,
                            spinner: "spinner4",
                            hideTimerBar: "off"
//                             fullScreen:"on"
                        });
            });


        });
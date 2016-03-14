
angular.module('MyApp')
        .controller('listViewCtrl', function ($scope, $rootScope, $window, $http, $rootScope) {
            //this is make display on home page content 
//            $rootScope.homePageContent = false;
            //This script run home page slider

            tjq(document).ready(function () {
                tjq("#price-range").slider({
                    range: true,
                    min: 0,
                    max: 1000,
                    values: [100, 800],
                    slide: function (event, ui) {
                        tjq(".min-price-label").html("$" + ui.values[ 0 ]);
                        tjq(".max-price-label").html("$" + ui.values[ 1 ]);
                    }
                });
                tjq(".min-price-label").html("$" + tjq("#price-range").slider("values", 0));
                tjq(".max-price-label").html("$" + tjq("#price-range").slider("values", 1));

                tjq("#cruise-length-range").slider({
                    range: "min",
                    min: 0,
                    max: 12,
                    value: 10,
                    slide: function (event, ui) {
                        tjq(".max-cruise-length").html(ui.value + " NIGHTS");
                    }
                });
                tjq(".max-cruise-length").html(tjq("#cruise-length-range").slider("value") + " NIGHTS");

                tjq("#rating").slider({
                    range: "min",
                    value: 40,
                    min: 0,
                    max: 50,
                    slide: function (event, ui) {

                    }
                });
            });



        });
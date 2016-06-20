
angular.module('MyApp')
        .controller('homeCtrl', function (SearchData, $scope, Account, $location, toastr, $rootScope, $window, $http, $rootScope) {
            //this is make display on home page content 
            $rootScope.homePageContent = true;
            //This script run home page slider
            //this reset common share search data to null 

            $scope.result1 = '';
            $scope.options1 = null;
            $scope.details1 = '';

            SearchData.setSearchData(null);
            $scope.searchVal = null;
            $scope.Adderss = {city: "", states: ""};
            $scope.searchTourguide = function () {

                var array = $scope.searchVal.split(',');
                if (array !== null && array.length === 3) {
                    $scope.Adderss.city = array[0];
                    $scope.Adderss.states = array[1];
                    $scope.Adderss.country = array[2];
                } else if (array !== null && array.length === 2) {
                    $scope.Adderss.city = array[0];
                    $scope.Adderss.country = array[1];
                }

//                 $scope.Adderss.city = $scope.searchVal;
//                   $scope.Adderss.states = "";
                Account.getTourguideList(Account.getCurrentUrl(), $scope.Adderss)
                        .then(function (response) {
//                          
                            SearchData.setSearchData(response.data);
                            $location.path('/list');
//                            toastr.success('Success! user list  ');
                        }).catch(function (response) {

                    toastr.error('Error! Please try again');
                });

            };



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
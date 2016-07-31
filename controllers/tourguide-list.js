
angular.module('MyApp')
        .controller('listViewCtrl', function (SearchData , $scope, $location, $rootScope, $window, $http, $rootScope, Account, toastr) {
//            this is make display on home page content 
            $rootScope.homePageContent = false;
            //This script run home page slider
            $scope.tourguideSeachList = SearchData.getSearchData();
            $scope.infiniteList = $scope.tourguideSeachList.slice(0, 2);;
    $scope.loadMore = function(){
        $scope.infiniteList = $scope.tourguideSeachList.slice(0, $scope.infiniteList.length + 2);
    };
    
      $scope.sortValue = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
            
//             $scope.tourguideUserList =  null;
//            $scope.tourguideList = function () {
//                Account.getTourguideList(Account.getCurrentUrl())
//                        .then(function (response) {
//                            $scope.tourguideUserList = response.data;
//                            $location.path('/list');
////                    toastr.success('Success! you have successfully update user role');
//                        }).catch(function (response) {
//
//                    toastr.error('Error! Please try again');
//                });
////
//            };

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
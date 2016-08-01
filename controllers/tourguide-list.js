
angular.module('MyApp')
        .controller('listViewCtrl', function (SearchData , $scope, $location, $rootScope, $http, $rootScope, Account, toastr) {
//            this is make display on home page content 
            $rootScope.homePageContent = false;
            //This script run home page slider
            $scope.tourguideSeachList = SearchData.getSearchData();
            $scope.infiniteList = $scope.tourguideSeachList.slice(0, 6);;
    $scope.loadMore = function(){
        $scope.infiniteList = $scope.tourguideSeachList.slice(0, $scope.infiniteList.length + 6);
    };
    
      $scope.sortValue = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    
     $scope.gridView = function(){
        $location.path('/grid');
    }
       $scope.listView = function(){
        $location.path('/list');
    }
    $scope.blockView = function(){
        $location.path('/block');
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

              
                   //toggle for price 
                tjq("#price-filters").click(function (e) {
                    e.preventDefault();
                   
                    tjq("#price-filter").toggle();
                    if(tjq("#price-filters").hasClass('collapsed')){
                         tjq("#price-filters").removeClass('collapsed');
                         tjq("#price-filters").addClass('collapse');
                    }else{
                      tjq("#price-filters").removeClass('collapse');
                         tjq("#price-filters").addClass('collapsed');  
                    }
  
                });
                //toggle for user rating
                     tjq("#rating-filters").click(function (e) {
                    e.preventDefault();
                   
                    tjq("#rating-filter").toggle();
                    if(tjq("#rating-filters").hasClass('collapsed')){
                         tjq("#rating-filters").removeClass('collapsed');
                         tjq("#rating-filters").addClass('collapse');
                    }else{
                      tjq("#rating-filters").removeClass('collapse');
                         tjq("#rating-filters").addClass('collapsed');  
                    }
  
                });
                //toggle for Cruises Length
                     tjq("#cruise-length-filters").click(function (e) {
                    e.preventDefault();
                   
                    tjq("#cruise-length-filter").toggle();
                    if(tjq("#cruise-length-filters").hasClass('collapsed')){
                         tjq("#cruise-length-filters").removeClass('collapsed');
                         tjq("#cruise-length-filters").addClass('collapse');
                    }else{
                      tjq("#cruise-length-filters").removeClass('collapse');
                         tjq("#cruise-length-filters").addClass('collapsed');  
                    }
  
                });
           //toggle for Cruises line
                     tjq("#cruise-line-filters").click(function (e) {
                    e.preventDefault();
                   
                    tjq("#cruise-line-filter").toggle();
                    if(tjq("#cruise-line-filters").hasClass('collapsed')){
                         tjq("#cruise-line-filters").removeClass('collapsed');
                         tjq("#cruise-line-filters").addClass('collapse');
                    }else{
                      tjq("#cruise-line-filters").removeClass('collapse');
                         tjq("#cruise-line-filters").addClass('collapsed');  
                    }
  
                });
                  //toggle for Cruises preference
                     tjq("#cruise-preference-filters").click(function (e) {
                    e.preventDefault();
                   
                    tjq("#cruise-preference-filter").toggle();
                    if(tjq("#cruise-preference-filters").hasClass('collapsed')){
                         tjq("#cruise-preference-filters").removeClass('collapsed');
                         tjq("#cruise-preference-filters").addClass('collapse');
                    }else{
                      tjq("#cruise-preference-filters").removeClass('collapse');
                         tjq("#cruise-preference-filters").addClass('collapsed');  
                    }
  
                });
                        //toggle for Cruises type
                     tjq("#cruise-cabin-type-filters").click(function (e) {
                    e.preventDefault();
                   
                    tjq("#cruise-cabin-type-filter").toggle();
                    if(tjq("#cruise-cabin-type-filters").hasClass('collapsed')){
                         tjq("#cruise-cabin-type-filters").removeClass('collapsed');
                         tjq("#cruise-cabin-type-filters").addClass('collapse');
                    }else{
                      tjq("#cruise-cabin-type-filters").removeClass('collapse');
                         tjq("#cruise-cabin-type-filters").addClass('collapsed');  
                    }
  
                });
                                 //toggle for modify search
                  tjq("#modify-search-panels").click(function (e) {
                    e.preventDefault();
                   
                    tjq("#modify-search-panel").toggle();
                    if(tjq("#modify-search-panels").hasClass('collapsed')){
                         tjq("#modify-search-panels").removeClass('collapsed');
                         tjq("#modify-search-panels").addClass('collapse');
                    }else{
                      tjq("#modify-search-panels").removeClass('collapse');
                         tjq("#modify-search-panels").addClass('collapsed');  
                    }
  
                });
     
            });

        });
var app = angular.module('MyApp');
app.controller('AngularWayChangeDataCtrl', AngularWayChangeDataCtrl);

function AngularWayChangeDataCtrl($auth, Account, $rootScope, $location, Account, toastr, $scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {
    //this is make display on home page content 
    $rootScope.homePageContent = false;
    $scope.spinner = true;
    var vm = this;
    $scope.userList = null;

    $scope.userRole = "";
    $scope.tourGuideCount = 0;

    $scope.optionList = [{
            val: "admin",
            show: 'Admin',
            Selected: false
        }, {
            val: "super_admin",
            show: 'Super Admin',
            Selected: false
        }, {
            val: "tour_guide",
            show: 'Tour Guide',
            Selected: false
        }, {
            val: "tourist",
            show: 'Tourist',
            Selected: false
        }];


    var optionList_admin = [{
            val: "tour_guide",
            show: 'Tour Guide',
            Selected: false
        }, {
            val: "tourist",
            show: 'Tourist',
            Selected: false
        }];



    var getCurrentUrl = function () {
        if (window.location.host === 'localhost:8383') {
            //for local
            return 'http://localhost:8080';
        } else if (window.location.host === 'app-tourgoat.rhcloud.com') {
            //for cloud
            return 'http://tourgoat.cfapps.io';
        } else if (window.location.host === 'tourgoat.com.s3-website-us-west-2.amazonaws.com' ) {
            //for cloud
            return 'http://tourgoatapp-env.us-west-2.elasticbeanstalk.com';
        }
        else if ( window.location.origin === 'https://tourgoat.com' || window.location.host === 'https://www.tourgoat.com') {
            //for cloud
            return 'https://afro-mart.com';
        }
    };

    Account.getProfile(Account.getCurrentUrl())
            .then(function (response) {
                $scope.user = response.data;
                if ($scope.user.userRole === "admin" || $scope.user.userRole === "super_admin") {
                    //get users  list
                    Account.getUserList(Account.getCurrentUrl())
                            .then(function (response) {
                                $scope.filtered = [];
                                vm.users = response.data;
                                $scope.userList = response.data;
                                $scope.spinner = false;
                                if ($scope.user.userRole === "admin") {
                                    $scope.optionList = optionList_admin;
                                    angular.forEach($scope.userList, function (item) {
                                        if (item.userRole === 'super_admin' || item.userRole === 'admin') {

                                        } else {
                                            $scope.filtered.push(item);
                                        }
                                        if ($scope.filtered.length !== 0) {
                                            vm.users = $scope.filtered;
                                            $scope.userList = $scope.filtered;
                                        }
                                    });
                                }

                            }).catch(function (response) {
                        toastr.error('Unable to get Users list');
                    });
                    //get users count
                    Account.getUserCount(Account.getCurrentUrl())
                            .then(function (response) {
                                $scope.tourGuideCount = Number(response.data);
                            }).catch(function (response) {
                        toastr.error('Unable to get Tou Guide List');
                    });
                } else {
                    $auth.logout();
                    $location.path('/user_admin');
                }
                $rootScope.userName = $scope.user.firstName;
            }).catch(function (response) {
        toastr.error('The user name or password is incorrect');
    });

    $scope.updateUserRole = function (id, role) {

        Account.updateUserRole(Account.getCurrentUrl(), id, role)
                .then(function (response) {
                    toastr.success('Success! you have successfully update user role');
                }).catch(function (response) {
            $scope.disableBtn = false;
            toastr.error('Error! Update was not made');
        });

    };

    $scope.updateUserAccount = function (id) {

        Account.updateUserAccount(Account.getCurrentUrl(), id)
                .then(function (response) {
                    toastr.success('Success! you have successfully update user account status');
                }).catch(function (response) {
            $scope.disableBtn = false;
            toastr.error('Error! Update was not made');
        });

    };

    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6),
        DTColumnDefBuilder.newColumnDef(7),
        DTColumnDefBuilder.newColumnDef(8)
    ];

    vm.modifyPerson = modifyPerson;
    vm.removePerson = removePerson;
    vm.changeUserRole = changeUserRole;
    vm.updateUserAccount = updateUserAccount;

    function modifyPerson(index) {
        $scope.updateUserRole(index);

    }

    function changeUserRole(index, userRole) {

        $scope.updateUserRole(vm.users[index].id, userRole);

    }
    function removePerson(index) {
        vm.users.splice(index, 1);
    }
    function updateUserAccount(index) {
        vm.users[index].isAccountActive = !vm.users[index].isAccountActive;
        $scope.updateUserAccount(vm.users[index].id);
    }


    ///////


    tjq(document).ready(function () {
        tjq("#cancel").click(function (e) {
            e.preventDefault();
            tjq(".view-profile").fadeIn();
            tjq(".edit-profile").fadeOut();
        });

//            setTimeout(function() {
//                tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ab quis a dolorem, placeat eos doloribus esse repellendus quasi libero illum dolore. Esse minima voluptas magni impedit, iusto, obcaecati dignissimos.</p></div>');
//            }, 10000);
    });
    tjq('a[href="#profiletab"]').on('shown.bs.tab', function (e) {
        tjq(".view-profile").show();
        tjq(".edit-profile").hide();
    });

    //togel between profile and dashboard tab
    tjq(document).ready(function () {
        tjq("#dashboard_profile").click(function (e) {
            e.preventDefault();

            tjq("#profile_tab").removeClass("active");
            tjq("#dashboard_tab").addClass("active");
            tjq("#dashboard").addClass("in active");

            tjq("#dashboard").show();
            tjq(".view-profile").hide();
            tjq(".edit-profile").hide();
        });

//            setTimeout(function() {
//                tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ab quis a dolorem, placeat eos doloribus esse repellendus quasi libero illum dolore. Esse minima voluptas magni impedit, iusto, obcaecati dignissimos.</p></div>');
//            }, 10000);
    });

    //togel between profile and dashboard tab
    tjq(document).ready(function () {
        tjq("#profile_profile").click(function (e) {
            e.preventDefault();

            tjq("#dashboard_tab").removeClass("active");
            tjq("#profile_tab").addClass("active");
            tjq("#profile").addClass("in active");

            tjq("#profile").show();
            tjq(".view-profile").show();
            tjq(".edit-profile").hide();
            tjq("#dashboard").hide();
        });

//            setTimeout(function() {
//                tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ab quis a dolorem, placeat eos doloribus esse repellendus quasi libero illum dolore. Esse minima voluptas magni impedit, iusto, obcaecati dignissimos.</p></div>');
//            }, 10000);
    });
    tjq(document).ready(function () {
        tjq("#profile .edit-profile-btn").click(function (e) {
            e.preventDefault();
            tjq(".view-profile").fadeOut();
            tjq(".edit-profile").fadeIn();
//                    tjq("#setting_tab").
        });

//            setTimeout(function() {
//                tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus ab quis a dolorem, placeat eos doloribus esse repellendus quasi libero illum dolore. Esse minima voluptas magni impedit, iusto, obcaecati dignissimos.</p></div>');
//            }, 10000);
    });



}

//app.controller('ctrlRead', function ($scope, $filter) {
//
//    // init
//    $scope.sort = {       
//                sortingOrder : 'id',
//                reverse : false
//            };
//    
//    $scope.gap = 5;
//    
//    $scope.filteredItems = [];
//    $scope.groupedItems = [];
//    $scope.itemsPerPage = 5;
//    $scope.pagedItems = [];
//    $scope.currentPage = 0;
//    $scope.items = [
//        {"id":1,"name":"name 1","description":"description 1","field3":"field3 1","field4":"field4 1","field5 ":"field5 1"}, 
//        {"id":2,"name":"name 2","description":"description 1","field3":"field3 2","field4":"field4 2","field5 ":"field5 2"}, 
//        {"id":3,"name":"name 3","description":"description 1","field3":"field3 3","field4":"field4 3","field5 ":"field5 3"}, 
//        {"id":4,"name":"name 4","description":"description 1","field3":"field3 4","field4":"field4 4","field5 ":"field5 4"}, 
//        {"id":5,"name":"name 5","description":"description 1","field3":"field3 5","field4":"field4 5","field5 ":"field5 5"}, 
//        {"id":6,"name":"name 6","description":"description 1","field3":"field3 6","field4":"field4 6","field5 ":"field5 6"}, 
//        {"id":7,"name":"name 7","description":"description 1","field3":"field3 7","field4":"field4 7","field5 ":"field5 7"}, 
//        {"id":8,"name":"name 8","description":"description 1","field3":"field3 8","field4":"field4 8","field5 ":"field5 8"}, 
//        {"id":9,"name":"name 9","description":"description 1","field3":"field3 9","field4":"field4 9","field5 ":"field5 9"}, 
//        {"id":10,"name":"name 10","description":"description 1","field3":"field3 10","field4":"field4 10","field5 ":"field5 10"}, 
//        {"id":11,"name":"name 11","description":"description 1","field3":"field3 11","field4":"field4 11","field5 ":"field5 11"}, 
//        {"id":12,"name":"name 12","description":"description 1","field3":"field3 12","field4":"field4 12","field5 ":"field5 12"}, 
//        {"id":13,"name":"name 13","description":"description 1","field3":"field3 13","field4":"field4 13","field5 ":"field5 13"}, 
//        {"id":14,"name":"name 14","description":"description 1","field3":"field3 14","field4":"field4 14","field5 ":"field5 14"}, 
//        {"id":15,"name":"name 15","description":"description 1","field3":"field3 15","field4":"field4 15","field5 ":"field5 15"}, 
//        {"id":16,"name":"name 16","description":"description 1","field3":"field3 16","field4":"field4 16","field5 ":"field5 16"}, 
//        {"id":17,"name":"name 17","description":"description 1","field3":"field3 17","field4":"field4 17","field5 ":"field5 17"}, 
//        {"id":18,"name":"name 18","description":"description 1","field3":"field3 18","field4":"field4 18","field5 ":"field5 18"}, 
//        {"id":19,"name":"name 19","description":"description 1","field3":"field3 19","field4":"field4 19","field5 ":"field5 19"}, 
//        {"id":20,"name":"name 5","description":"description 1","field3":"field3 5","field4":"field4 5","field5 ":"field5 5"}, 
//        {"id":21,"name":"name 6","description":"description 1","field3":"field3 6","field4":"field4 6","field5 ":"field5 6"}, 
//        {"id":22,"name":"name 7","description":"description 1","field3":"field3 7","field4":"field4 7","field5 ":"field5 7"}, 
//        {"id":23,"name":"name 8","description":"description 1","field3":"field3 8","field4":"field4 8","field5 ":"field5 8"}, 
//        {"id":24,"name":"name 9","description":"description 1","field3":"field3 9","field4":"field4 9","field5 ":"field5 9"}, 
//        {"id":25,"name":"name 10","description":"description 1","field3":"field3 10","field4":"field4 10","field5 ":"field5 10"}, 
//        {"id":26,"name":"name 11","description":"description 1","field3":"field3 11","field4":"field4 11","field5 ":"field5 11"}, 
//        {"id":27,"name":"name 12","description":"description 1","field3":"field3 12","field4":"field4 12","field5 ":"field5 12"}, 
//        {"id":28,"name":"name 13","description":"description 1","field3":"field3 13","field4":"field4 13","field5 ":"field5 13"}, 
//        {"id":29,"name":"name 14","description":"description 1","field3":"field3 14","field4":"field4 14","field5 ":"field5 14"}, 
//        {"id":30,"name":"name 15","description":"description 1","field3":"field3 15","field4":"field4 15","field5 ":"field5 15"}, 
//        {"id":31,"name":"name 16","description":"description 1","field3":"field3 16","field4":"field4 16","field5 ":"field5 16"}, 
//        {"id":32,"name":"name 17","description":"description 1","field3":"field3 17","field4":"field4 17","field5 ":"field5 17"}, 
//        {"id":33,"name":"name 18","description":"description 1","field3":"field3 18","field4":"field4 18","field5 ":"field5 18"}, 
//        {"id":34,"name":"name 19","description":"description 1","field3":"field3 19","field4":"field4 19","field5 ":"field5 19"}, 
//        {"id":35,"name":"name 5","description":"description 1","field3":"field3 5","field4":"field4 5","field5 ":"field5 5"}, 
//        {"id":36,"name":"name 6","description":"description 1","field3":"field3 6","field4":"field4 6","field5 ":"field5 6"}, 
//        {"id":37,"name":"name 7","description":"description 1","field3":"field3 7","field4":"field4 7","field5 ":"field5 7"}, 
//        {"id":38,"name":"name 8","description":"description 1","field3":"field3 8","field4":"field4 8","field5 ":"field5 8"}, 
//        {"id":39,"name":"name 9","description":"description 1","field3":"field3 9","field4":"field4 9","field5 ":"field5 9"}, 
//        {"id":40,"name":"name 10","description":"description 1","field3":"field3 10","field4":"field4 10","field5 ":"field5 10"}, 
//        {"id":41,"name":"name 11","description":"description 1","field3":"field3 11","field4":"field4 11","field5 ":"field5 11"}, 
//        {"id":42,"name":"name 12","description":"description 1","field3":"field3 12","field4":"field4 12","field5 ":"field5 12"}, 
//        {"id":43,"name":"name 13","description":"description 1","field3":"field3 13","field4":"field4 13","field5 ":"field5 13"}, 
//        {"id":44,"name":"name 14","description":"description 1","field3":"field3 14","field4":"field4 14","field5 ":"field5 14"}, 
//        {"id":45,"name":"name 15","description":"description 1","field3":"field3 15","field4":"field4 15","field5 ":"field5 15"}, 
//        {"id":46,"name":"name 16","description":"description 1","field3":"field3 16","field4":"field4 16","field5 ":"field5 16"}, 
//        {"id":47,"name":"name 17","description":"description 1","field3":"field3 17","field4":"field4 17","field5 ":"field5 17"}, 
//        {"id":48,"name":"name 18","description":"description 1","field3":"field3 18","field4":"field4 18","field5 ":"field5 18"}, 
//        {"id":49,"name":"name 19","description":"description 1","field3":"field3 19","field4":"field4 19","field5 ":"field5 19"}, 
//        {"id":50,"name":"name 5","description":"description 1","field3":"field3 5","field4":"field4 5","field5 ":"field5 5"}, 
//        {"id":51,"name":"name 6","description":"description 1","field3":"field3 6","field4":"field4 6","field5 ":"field5 6"}, 
//        {"id":52,"name":"name 7","description":"description 1","field3":"field3 7","field4":"field4 7","field5 ":"field5 7"}, 
//        {"id":53,"name":"name 8","description":"description 1","field3":"field3 8","field4":"field4 8","field5 ":"field5 8"}, 
//        {"id":54,"name":"name 9","description":"description 1","field3":"field3 9","field4":"field4 9","field5 ":"field5 9"}, 
//        {"id":55,"name":"name 10","description":"description 1","field3":"field3 10","field4":"field4 10","field5 ":"field5 10"}, 
//        {"id":56,"name":"name 11","description":"description 1","field3":"field3 11","field4":"field4 11","field5 ":"field5 11"}, 
//        {"id":57,"name":"name 12","description":"description 1","field3":"field3 12","field4":"field4 12","field5 ":"field5 12"}, 
//        {"id":58,"name":"name 13","description":"description 1","field3":"field3 13","field4":"field4 13","field5 ":"field5 13"}, 
//        {"id":59,"name":"name 14","description":"description 1","field3":"field3 14","field4":"field4 14","field5 ":"field5 14"}, 
//        {"id":60,"name":"name 15","description":"description 1","field3":"field3 15","field4":"field4 15","field5 ":"field5 15"}, 
//        {"id":61,"name":"name 16","description":"description 1","field3":"field3 16","field4":"field4 16","field5 ":"field5 16"}, 
//        {"id":62,"name":"name 17","description":"description 1","field3":"field3 17","field4":"field4 17","field5 ":"field5 17"}, 
//        {"id":63,"name":"name 18","description":"description 1","field3":"field3 18","field4":"field4 18","field5 ":"field5 18"}, 
//        {"id":64,"name":"name 19","description":"description 1","field3":"field3 19","field4":"field4 19","field5 ":"field5 19"}, 
//        {"id":65,"name":"name 20","description":"description 1","field3":"field3 20","field4":"field4 20","field5 ":"field5 20"}
//    ];
//
//    var searchMatch = function (haystack, needle) {
//        if (!needle) {
//            return true;
//        }
//        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
//    };
//
//    // init the filtered items
//    $scope.search = function () {
//        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
//            for(var attr in item) {
//                if (searchMatch(item[attr], $scope.query))
//                    return true;
//            }
//            return false;
//        });
//        // take care of the sorting order
//        if ($scope.sort.sortingOrder !== '') {
//            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
//        }
//        $scope.currentPage = 0;
//        // now group by pages
//        $scope.groupToPages();
//    };
//    
//  
//    // calculate page in place
//    $scope.groupToPages = function () {
//        $scope.pagedItems = [];
//        
//        for (var i = 0; i < $scope.filteredItems.length; i++) {
//            if (i % $scope.itemsPerPage === 0) {
//                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
//            } else {
//                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
//            }
//        }
//    };
//    
//    $scope.range = function (size,start, end) {
//        var ret = [];        
//        console.log(size,start, end);
//                      
//        if (size < end) {
//            end = size;
//            start = size-$scope.gap;
//        }
//        for (var i = start; i < end; i++) {
//            ret.push(i);
//        }        
//         console.log(ret);        
//        return ret;
//    };
//    
//    $scope.prevPage = function () {
//        if ($scope.currentPage > 0) {
//            $scope.currentPage--;
//        }
//    };
//    
//    $scope.nextPage = function () {
//        if ($scope.currentPage < $scope.pagedItems.length - 1) {
//            $scope.currentPage++;
//        }
//    };
//    
//    $scope.setPage = function () {
//        $scope.currentPage = this.n;
//    };
//
//    // functions have been describe process the data for display
//    $scope.search();
//
//   
//
//});
//
//
//app.$inject = ['$scope', '$filter'];
//
//app.directive("customSort", function() {
//return {
//    restrict: 'A',
//    transclude: true,    
//    scope: {
//      order: '=',
//      sort: '='
//    },
//    template : 
//      ' <a ng-click="sort_by(order)" style="color: #555555;">'+
//      '    <span ng-transclude></span>'+
//      '    <i ng-class="selectedCls(order)"></i>'+
//      '</a>',
//    link: function(scope) {
//                
//    // change sorting order
//    scope.sort_by = function(newSortingOrder) {       
//        var sort = scope.sort;
//        
//        if (sort.sortingOrder == newSortingOrder){
//            sort.reverse = !sort.reverse;
//        }                    
//
//        sort.sortingOrder = newSortingOrder;        
//    };
//    
//   
//    scope.selectedCls = function(column) {
//        if(column == scope.sort.sortingOrder){
//            return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
//        }
//        else{            
//            return'icon-sort' 
//        } 
//    };      
//  }// end link
//}
//});


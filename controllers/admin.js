var app = angular.module('MyApp');
app.controller('AngularWayChangeDataCtrl', AngularWayChangeDataCtrl);

function AngularWayChangeDataCtrl($resource,$http, DTOptionsBuilder, DTColumnDefBuilder) {
    var vm = this;
    
// 
    $http.get('/sampleData/data.json').success(function(data) {
    vm.persons = data.results;
    
  }).error(function(data, status) {
    alert('get data error!');
  });
   
    
//    vm.persons = $resource('sampleData/data.json').query();
//    vm.persons = $resource('sampleData/data.json').query();
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];
    vm.person2Add = _buildPerson2Add(1);
    vm.addPerson = addPerson;
    vm.modifyPerson = modifyPerson;
    vm.removePerson = removePerson;

    function _buildPerson2Add(id) {
        return {
            id: id,
            firstName: 'Foo' + id,
            lastName: 'Bar' + id
        };
    }
    function addPerson() {
        vm.persons.push(angular.copy(vm.person2Add));
        vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
    }
    function modifyPerson(index) {
        vm.persons.splice(index, 1, angular.copy(vm.person2Add));
        vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
    }
    function removePerson(index) {
        vm.persons.splice(index, 1);
    }
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



  app.controller('adminCtrl', function ($http , $scope, $location, $auth, toastr, $rootScope, Account, $interval) {
            //Home page content is display only for home page 
             $rootScope.homePageContent = false;
//             
//             var $table = tjq('#table'),
//        $remove = tjq('#remove'),
//        selections = [];
//    function initTable() {
//        $table.bootstrapTable({
//            height: getHeight(),
//            columns: [
//                [
//                    {
//                        field: 'state',
//                        checkbox: true,
//                        rowspan: 2,
//                        align: 'center',
//                        valign: 'middle'
//                    }, {
//                        title: 'Item ID',
//                        field: 'id',
//                        rowspan: 2,
//                        align: 'center',
//                        valign: 'middle',
//                        sortable: true,
//                        footerFormatter: totalTextFormatter
//                    }, {
//                        title: 'Item Detail',
//                        colspan: 3,
//                        align: 'center'
//                    }
//                ],
//                [
//                    {
//                        field: 'name',
//                        title: 'Item Name',
//                        sortable: true,
//                        editable: true,
//                        footerFormatter: totalNameFormatter,
//                        align: 'center'
//                    }, {
//                        field: 'price',
//                        title: 'Item Price',
//                        sortable: true,
//                        align: 'center',
//                        editable: {
//                            type: 'text',
//                            title: 'Item Price',
//                            validate: function (value) {
//                                value = $.trim(value);
//                                if (!value) {
//                                    return 'This field is required';
//                                }
//                                if (!/^$/.test(value)) {
//                                    return 'This field needs to start width $.'
//                                }
//                                var data = $table.bootstrapTable('getData'),
//                                    index = $(this).parents('tr').data('index');
//                                console.log(data[index]);
//                                return '';
//                            }
//                        },
//                        footerFormatter: totalPriceFormatter
//                    }, {
//                        field: 'operate',
//                        title: 'Item Operate',
//                        align: 'center',
//                        events: operateEvents,
//                        formatter: operateFormatter
//                    }
//                ]
//            ]
//        });
//        // sometimes footer render error.
//        setTimeout(function () {
//            $table.bootstrapTable('resetView');
//        }, 200);
//        $table.on('check.bs.table uncheck.bs.table ' +
//                'check-all.bs.table uncheck-all.bs.table', function () {
//            $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);
//            // save your data, here just save the current page
//            selections = getIdSelections();
//            // push or splice the selections if you want to save all data selections
//        });
//        $table.on('expand-row.bs.table', function (e, index, row, $detail) {
//            if (index % 2 == 1) {
//                $detail.html('Loading from ajax request...');
//                $.get('LICENSE', function (res) {
//                    $detail.html(res.replace(/\n/g, '<br>'));
//                });
//            }
//        });
//        $table.on('all.bs.table', function (e, name, args) {
//            console.log(name, args);
//        });
//        $remove.click(function () {
//            var ids = getIdSelections();
//            $table.bootstrapTable('remove', {
//                field: 'id',
//                values: ids
//            });
//            $remove.prop('disabled', true);
//        });
//        $(window).resize(function () {
//            $table.bootstrapTable('resetView', {
//                height: getHeight()
//            });
//        });
//    }
//    function getIdSelections() {
//        return $.map($table.bootstrapTable('getSelections'), function (row) {
//            return row.id
//        });
//    }
//    function responseHandler(res) {
//        $.each(res.rows, function (i, row) {
//            row.state = $.inArray(row.id, selections) !== -1;
//        });
//        return res;
//    }
//    function detailFormatter(index, row) {
//        var html = [];
//        $.each(row, function (key, value) {
//            html.push('<p><b>' + key + ':</b> ' + value + '</p>');
//        });
//        return html.join('');
//    }
//    function operateFormatter(value, row, index) {
//        return [
//            '<a class="like" href="javascript:void(0)" title="Like">',
//            '<i class="glyphicon glyphicon-heart"></i>',
//            '</a>  ',
//            '<a class="remove" href="javascript:void(0)" title="Remove">',
//            '<i class="glyphicon glyphicon-remove"></i>',
//            '</a>'
//        ].join('');
//    }
//    window.operateEvents = {
//        'click .like': function (e, value, row, index) {
//            alert('You click like action, row: ' + JSON.stringify(row));
//        },
//        'click .remove': function (e, value, row, index) {
//            $table.bootstrapTable('remove', {
//                field: 'id',
//                values: [row.id]
//            });
//        }
//    };
//    function totalTextFormatter(data) {
//        return 'Total';
//    }
//    function totalNameFormatter(data) {
//        return data.length;
//    }
//    function totalPriceFormatter(data) {
//        var total = 0;
//        $.each(data, function (i, row) {
//            total += +(row.price.substring(1));
//        });
//        return '$' + total;
//    }
//    function getHeight() {
//        return $(window).height() - $('h1').outerHeight(true);
//    }
//    $(function () {
//        var scripts = [
//                location.search.substring(1) || 'assets/bootstrap-table/src/bootstrap-table.js',
//                'assets/bootstrap-table/src/extensions/export/bootstrap-table-export.js',
//                'http://rawgit.com/hhurz/tableExport.jquery.plugin/master/tableExport.js',
//                'assets/bootstrap-table/src/extensions/editable/bootstrap-table-editable.js',
//                'http://rawgit.com/vitalets/x-editable/master/dist/bootstrap3-editable/js/bootstrap-editable.js'
//            ],
//            eachSeries = function (arr, iterator, callback) {
//                callback = callback || function () {};
//                if (!arr.length) {
//                    return callback();
//                }
//                var completed = 0;
//                var iterate = function () {
//                    iterator(arr[completed], function (err) {
//                        if (err) {
//                            callback(err);
//                            callback = function () {};
//                        }
//                        else {
//                            completed += 1;
//                            if (completed >= arr.length) {
//                                callback(null);
//                            }
//                            else {
//                                iterate();
//                            }
//                        }
//                    });
//                };
//                iterate();
//            };
//        eachSeries(scripts, getScript, initTable);
//    });
//    function getScript(url, callback) {
//        var head = document.getElementsByTagName('head')[0];
//        var script = document.createElement('script');
//        script.src = url;
//        var done = false;
//        // Attach handlers for all browsers
//        script.onload = script.onreadystatechange = function() {
//            if (!done && (!this.readyState ||
//                    this.readyState == 'loaded' || this.readyState == 'complete')) {
//                done = true;
//                if (callback)
//                    callback();
//                // Handle memory leak in IE
//                script.onload = script.onreadystatechange = null;
//            }
//        };
//        head.appendChild(script);
//        // We handle everything using the script element injection
//        return undefined;
//    }
//                     var data = [{
//    "name": "bootstrap-table",
//        "stargazers_count": "10",
//        "forks_count": "122",
//        "description": "An extended Bootstrap table"
//}, {
//    "name": "multiple-select",
//        "stargazers_count": "288",
//        "forks_count": "20",
//        "description": "A jQuery plugin to select multiple elements with checkboxes :)"
//}, {
//    "name": "bootstrap-table",
//        "stargazers_count": "32",
//        "forks_count": "11",
//        "description": "Show/hide password plugin for twitter bootstrap."
//}, {
//    "name": "bootstrap-table",
//        "stargazers_count": "1",
//        "forks_count": "4",
//        "description": "my blog"
//}, {
//    "name": "scutech-redmine 1",
//        "stargazers_count": "50",
//        "forks_count": "3",
//        "description": "Redmine notification tools for chrome extension."
//}];
//
//tjq(function () {
//    tjq('#table').bootstrapTable({
//        data: data
//    });
//
//    tjq(".mybtn-top").click(function () {
//        tjq('#table').bootstrapTable('scrollTo', 0);
//    });
//    
//    tjq(".mybtn-row").click(function () {
//        var index = +$('.row-index').val(),
//            top = 0;
//        tjq('#table').find('tbody tr').each(function (i) {
//        	if (i < index) {
//            	top += $(this).height();
//            }
//        });
//        tjq('#table').bootstrapTable('scrollTo', top);
//    });
//    
//    tjq(".mybtn-btm").click(function () {
//        tjq('#table').bootstrapTable('scrollTo', 'bottom');
//    });
//
//});
             
//             
//             var data = [{
//    "name": "bootstrap-table",
//        "stargazers_count": "10",
//        "forks_count": "122",
//        "description": "An extended Bootstrap table"
//}, {
//    "name": "multiple-select",
//        "stargazers_count": "288",
//        "forks_count": "20",
//        "description": "A jQuery plugin to select multiple elements with checkboxes :)"
//}, {
//    "name": "bootstrap-table",
//        "stargazers_count": "32",
//        "forks_count": "11",
//        "description": "Show/hide password plugin for twitter bootstrap."
//}, {
//    "name": "bootstrap-table",
//        "stargazers_count": "1",
//        "forks_count": "4",
//        "description": "my blog"
//}, {
//    "name": "scutech-redmine 1",
//        "stargazers_count": "50",
//        "forks_count": "3",
//        "description": "Redmine notification tools for chrome extension."
//}];
//
//$(function () {
//    $('#table').bootstrapTable({
//        data: data
//    });
//
//    $(".mybtn-top").click(function () {
//        $('#table').bootstrapTable('scrollTo', 0);
//    });
//    
//    $(".mybtn-row").click(function () {
//        var index = +$('.row-index').val(),
//            top = 0;
//        $('#table').find('tbody tr').each(function (i) {
//        	if (i < index) {
//            	top += $(this).height();
//            }
//        });
//        $('#table').bootstrapTable('scrollTo', top);
//    });
//    
//    $(".mybtn-btm").click(function () {
//        $('#table').bootstrapTable('scrollTo', 'bottom');
//    });
//
//});

//
////  $http.get('http://api.randomuser.me/0.6/?results=20').success(function(data) {
//      $http.get('/controllers/data.json').success(function(data) {
//    $scope.users1 = data.results;
//    tjq('#userloader').hide();
//     tjq('#userList').show();
//  }).error(function(data, status) {
//    alert('get data error!');
//  });
//  
//  $scope.showDetail = function (u) {
//    if($scope.active==="undefined"||$scope.active===""){
//       $scope.active = u.username; 
//    }else{
//       $scope.active = "";  
//    }
//   
//  };
//  
//  $scope.doPost = function() {
//  
//    $http.get('http://api.randomuser.me/0.4/').success(function(data) {
//      
//      var newUser = data.results[0];
//      newUser.user.text = $('#inputText').val();
//      newUser.date = new Date();
//      $scope.users1.push(newUser);
//   
//    }).error(function(data, status) {
//      
//      alert('get data error!');
//      
//    });
//    
//  };
// 
//




            $scope.adminlogin = function () {
                $scope.loginBtnLoading = true; // start loading
                $scope.disabledFacebookBtn = true;
                $scope.disabledGoogleBtn = true;
                $auth.login($scope.user)
                        .then(function (response) {
                            $scope.loginBtnLoading = false; // stop loading
                            $scope.disabledFacebookBtn = false;
                            $scope.disabledGoogleBtn = false;
                            //toastr.success('You have successfully signed in');
                            if (!response.data.emailVerified) {
                                $scope.verifyEmail();
                            } else {
                                $location.path('/profile');
                                toastr.success('You have successfully signed in');
                            }
                        })
                        .catch(function (response) {
                            $scope.loginBtnLoading = false;
                            $scope.disabledFacebookBtn = false;
                            $scope.disabledGoogleBtn = false;
                            //toastr.error(response.data.message, response.status);
                            toastr.error('The user name or password is incorrect');

                        });
            };
//            $scope.authenticate = function (provider) {
//                $scope.swapSocialLoginLoading(provider, true);
//                $auth.authenticate(provider)
//                        .then(function () {
//
//                            //toastr.success('You have successfully signed in with ' + provider);
//                            $location.path('/profile');
//                            $scope.swapSocialLoginLoading(provider, false);
//                        })
//                        .catch(function (response) {
//                            $scope.swapSocialLoginLoading(provider, false);
//                            toastr.error(response.data.message);
//                        });
//            };
            //resend email verification 
//            $scope.resendEmail = function () {
//                $rootScope.emailDiv = true;
//                Account.resendEmail($scope.email)
//                        .then(function () {
//                            $rootScope.emailDiv = false;
//                            $location.path('/login');
//                            toastr.success('verification email request has been sent to ' + $scope.email);
//
//                        })
//                        .catch(function (response) {
//                            $scope.resetBtnLoading = false;
//                            $location.path('/signup');
//                            $rootScope.emailNotSentMessage = true;
//                            $rootScope.emailAddress = $scope.email;
//                            //toastr.error(response.data.message, response.status);
//                        });
//            };

            //to verify check user email is verifyed or not
//            $scope.verifyEmail = function () {
//                $auth.logout()
//                        .then(function () {
//                            toastr.error('Please verify your email');
//                            $location.path('/login');
//                        });
//
//                $rootScope.emailDiv = true;
//                //Here it send notification messge on user profile page 
////                setTimeout(function () {
//////                    tjq(".notification-area").append('<div class="info-box block"><span class="close"></span><p style="color:red; text-align: center"> Please verify your email. Click <a style="color: blue" href="">Here</a> to resend email verification</p></div>');
////                    tjq(".notification-area").append('<div class="info-box block "><span class="close "></span><p style="color:red; text-align: center"> Please verify your email.</p><div class="row "><div class=" form-inline  col-sms-6"><input class="form-control col-sms-4" type="email"  ng-model="email" required placeholder="enter your email"><button class="btn-medium col-sms-2" ng-click="resendEmail()">Resend Email</button></div></div></div>');
////
////                }, 0);
//
//            };
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
        });
var app = angular.module('MyAppSearch',['datatables', 'ngResource']);

app.controller('AngularWayChangeDataCtrl', AngularWayChangeDataCtrl);

function AngularWayChangeDataCtrl($http,$scope,toastr, DTOptionsBuilder, DTColumnDefBuilder) {
        var vm = this;
//        vm.persons = null;
    
        $scope.showFileUploadDiv = true;
        $scope.wellLogJobsList = null;
        $scope.disableInput = false;
        $scope.disableBtn = true;
        $scope.partialDownloadLink = null;
        $scope.showSingleJobDeatil = false;
    $scope.searchJobsList = function () {

//            $http.post("http://localhost:8080/search", $scope.wellLog)
             $http.post("http://well.run.aws-usw02-pr.ice.predix.io/search", $scope.wellLog)
                    .then(function (response) {
//                        $scope.wellLogJobsList = response.data;
                 $scope.wellLogJobsListOnScope = response.data;
                       
                        vm.wellLogJobLists = response.data;

                    }).catch(function (response) {
                toastr.error("Something went wrong. Please try again");
            });
        };
         $scope.getJobDetails = function (jobId) {
               
//            $scope.partialDownloadLink = "http://localhost:8080/download?";
             $scope.partialDownloadLink = "http://well.run.aws-usw02-pr.ice.predix.io/download?";
//            $http.get("http://localhost:8080/jobDetails?jobId=" + jobId)
             $http.get("http://well.run.aws-usw02-pr.ice.predix.io/jobDetails?jobId=" + jobId)
                    .then(function (response) {
                        $scope.wellLogSingleJobonScope =  response.data;
                        $scope.partialDownloadLink =   $scope.partialDownloadLink + "wellLogId=" + $scope.wellLogSingleJobonScope.id + "&fileId="; 
                        vm.wellLogSingleJob = response.data;
                        $scope.showSingleJobDeatil = true;
                       
                    }).catch(function (response) {
                        $scope.showSingleJobDeatil = false;
                toastr.error("Something went wrong. Please try again");
            });
        };
        
        $scope.fileToDelete =null;
            $scope.deleteFile = function (fileId) {
            $scope.wellLog.jobDate;
//            $scope.wellLog.jobDate = $scope.wellLog.jobDate.toISOString();
//             $scope.wellLog.jobDateTo = $scope.wellLog.jobDateTo.toISOString();
//            $http.delete("http://localhost:8080/delete" + "?fileId=" + fileId + "&wellLogId=" + $scope.wellLogSingleJobonScope.id)
             $http.delete("http://well.run.aws-usw02-pr.ice.predix.io/delete"+ "?fileId=" + fileId + "&wellLogId=" + $scope.wellLogSingleJobonScope.id)
                .then(function (response) {
                    vm.wellLogSingleJob = response.data;
             $scope.wellLogSingleJobonScope =  response.data;
            
//                    $scope.wellLog = response.data;
//                    vm.wellLogFileList = $scope.wellLog.fileData;

//                    $scope.wellLog.jobDate = new Date($scope.wellLog.jobDate);
//                    $scope.wellLog.jobDateTo = new Date($scope.wellLog.jobDateTo);
//                    $scope.disableInput = true;
//                    $scope.disableBtn = false;
//                    $scope.showFileUploadDiv = false;
//                    $scope.data = $scope.wellLog.fileData;
                    toastr.success('Success! you have successfully removed file');
                }).catch(function (response) {
            $scope.disableBtn = false;
            toastr.error("Something went wrong. Please try again");
        });
        };
        $scope.downloadFile = function (fileId) {
//            $scope.wellLog.jobDate;
//            $scope.wellLog.jobDate = $scope.wellLog.jobDate.toISOString();
//             $scope.wellLog.jobDateTo = $scope.wellLog.jobDateTo.toISOString();
//            $http.get("http://localhost:8080/download" + "?fileId=" + fileId + "&wellLogId=" + $scope.wellLog.id)
             $http.get("http://well.run.aws-usw02-pr.ice.predix.io/download"+ "?fileId=" + fileId + "&wellLogId=" + $scope.wellLog.id)
                .then(function (response) {
//                    $scope.wellLog = response.data;
//                    vm.wellLogFileList = $scope.wellLog.fileData;
//
//                    $scope.wellLog.jobDate = new Date($scope.wellLog.jobDate);
//                    $scope.wellLog.jobDateTo = new Date($scope.wellLog.jobDateTo);
//                    $scope.disableInput = true;
//                    $scope.disableBtn = false;
//                    $scope.showFileUploadDiv = false;
//                    $scope.data = $scope.wellLog.fileData;
//                    toastr.success('Success! you have successfully removed file');
                }).catch(function (response) {
            $scope.disableBtn = false;
            toastr.error("Something went wrong. Please try again");
        });
        };
         $scope.updateMetaData = function () {
             toastr.success(':) comming soon');
//            $scope.wellLog.jobDate;
//            $scope.value = "";
//            $scope.wellLog.jobDate = $scope.wellLog.jobDate.toISOString();
//             $scope.wellLog.jobDateTo = $scope.wellLog.jobDateTo.toISOString();
//            $http.post("http://localhost:8080/search", $scope.wellLog)
////             $http.post("http://well.run.aws-usw02-pr.ice.predix.io/uploadMetaData", $scope.wellLog)
//                    .then(function (response) {
//                        $scope.wellLog = response.data;
//                        vm.wellLogFileList = $scope.wellLog.fileData;
//                
//                        $scope.wellLog.jobDate = new Date($scope.wellLog.jobDate);
//                        $scope.wellLog.jobDateTo = new Date($scope.wellLog.jobDateTo);
//                        $scope.disableInput = true;
//                        $scope.disableBtn = false;
//                        $scope.showFileUploadDiv = false;
//                        $scope.data = $scope.wellLog.fileData;
//                        toastr.success('Success! you have successfully created metadata. Please upload files');
//                    }).catch(function (response) {
//                $scope.disableBtn = false;
//                toastr.error("Something went wrong. Please try again");
//            });
        };
        
        
         $scope.backSeachPage = function () {

          $scope.showSingleJobDeatil = false;

        };
        
        
  $scope.searchFormRest = function () {
//            $scope.disableInput = false;
//            $scope.disableBtn = true;
//            uploader.clearQueue();
            $scope.wellLog = null;
            $scope.showFileUploadDiv = true;

        };
    vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    vm.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3).notSortable(),
        DTColumnDefBuilder.newColumnDef(3).notSortable()
    ];

    vm.downloadFile = downloadWellLogFile;
    vm.removeFile = removeWellLogFile;
        vm.getJobdetail = getJobdetail;
    

    function downloadWellLogFile(index) {
        var file = $scope.wellLogJobsListOnScope.fileData[index];
        $scope.downloadFile(file.id);
//        vm.persons.splice(index, 1, angular.copy(vm.person2Add));
//        vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
    }
    function removeWellLogFile(index) {
        var file = $scope.wellLogSingleJobonScope.fileData[index].id;
//$scope.fileToDelete = $scope.wellLog.fileData[index];
//$scope.fileToDelete.fileName = file.fileName;
//$scope.fileToDelete.mimeType = file.mimeType;
$scope.deleteFile(file);
//         vm.wellLogFileList.splice(index, 1);
    }
        function getJobdetail(index) {
        var jobId =  $scope.wellLogJobsListOnScope[index].id;
//$scope.fileToDelete = $scope.wellLog.fileData[index];
//$scope.fileToDelete.fileName = file.fileName;
//$scope.fileToDelete.mimeType = file.mimeType;
//$scope.showSingleJobDeatil = true;
$scope.getJobDetails(jobId);

//         vm.wellLogFileList.splice(index, 1);
    }
}
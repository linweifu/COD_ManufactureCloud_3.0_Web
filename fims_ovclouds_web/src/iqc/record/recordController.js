FIMS.controller('recordController',['$scope','recordService', '$rootScope','$q',
	function($scope,recordService, $rootScope, $q) {
		$scope.getRecordList = function(page,companyid){
		recordService.getRecordList(page,companyid).then(function(data) {
            // $rootScope.operate1 = ""; 
            // $rootScope.operate2 = ""; 
            // $rootScope.operate3 = ""; 
            $rootScope.data = data.array;
        });
	}
	recordService.localTo();
	// $scope.getRecordList();
      $scope.getSingleRecord = recordService.getSingleRecord;
      
	// $scope.toLocalStorage = recordService.toLocalStorage;

}])


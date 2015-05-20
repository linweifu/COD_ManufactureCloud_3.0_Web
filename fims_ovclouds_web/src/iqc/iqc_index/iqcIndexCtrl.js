FIMS.controller('iqcIndexCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		$scope.curCompanyName = localStorage.getItem("curCompanyName");
		$scope.applyJoinCompanyNumber = localStorage.getItem("applyJoinCompanyNumber");
}])

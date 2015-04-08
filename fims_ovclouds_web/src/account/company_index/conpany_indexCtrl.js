FIMS.controller('company_indexCtrl', ['$scope', function($scope){
	$scope.curCompanyName = localStorage.getItem("curCompanyName");
	$scope.applyJoinCompanyNumber = localStorage.getItem("applyJoinCompanyNumber");
}])
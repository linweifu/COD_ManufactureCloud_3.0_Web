FIMS.controller('chooseModuleCtrl',['$scope', '$rootScope','$q',
	function($scope, $rootScope, $q) {
		// $scope.userName = localStorage.getItem("userName");
		$scope.curCompanyName = localStorage.getItem("curCompanyName");
		$scope.applyJoinCompanyNumber = localStorage.getItem("applyJoinCompanyNumber");
}])

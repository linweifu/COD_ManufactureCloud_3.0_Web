FIMS.controller('loginController',['$scope','loginService', '$rootScope','$q',
	function($scope,loginService, $rootScope, $q) {
		$scope.user = loginService.user;
		$scope.response = loginService.response;
		$scope.subData = loginService.subData;
}])

FIMS.controller('sigupController',['$scope','sigupService', '$rootScope','$q',
	function($scope,sigupService, $rootScope, $q) {
		$scope.user = sigupService.user;
		$scope.response = sigupService.response;
		$scope.subData = sigupService.subData;
}])

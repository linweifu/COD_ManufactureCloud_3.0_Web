FIMS.controller('loginController',['$scope','loginService', '$rootScope','$q',
	function($scope,loginService, $rootScope, $q) {
		$scope.user = loginService.user;
		$scope.response = loginService.response;
		$scope.subData = loginService.subData;
}])

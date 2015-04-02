FIMS.controller('sigupController',['$scope','sigupService', '$rootScope','$q',
	function($scope,sigupService, $rootScope, $q) {
		$scope.user = sigupService.user;
		$scope.response = sigupService.response;
		$scope.subData = sigupService.subData;
}])

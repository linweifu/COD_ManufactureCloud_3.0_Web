FIMS.controller('indexController',['$scope','indexService', '$rootScope','$q',
	function ($scope,indexService,$rootScope,$q) {	
		$scope.user = indexService.user;
		$scope.subData = indexService.subData;
		window.localStorage.clear();
}])


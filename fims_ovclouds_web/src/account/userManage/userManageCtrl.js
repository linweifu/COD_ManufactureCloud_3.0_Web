FIMS.controller('userManageCtrl', ['$scope','$location','userManageService',
	function($scope,$location,userManageService){
	$scope.genLink = userManageService.genLink;
	$scope.userManageBack = function(){
		$location.path("account_index/chooseModule").replace();
	}
}])
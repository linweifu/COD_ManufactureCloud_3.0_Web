FIMS.controller('userSettingCtrl',['$scope','userSettingService', '$rootScope','$q',
	function($scope,userSettingService, $rootScope, $q) {
		// $rootScope.userName = localStorage.getItem("userName");
		$scope.usersetting = userSettingService.user;
		$scope.subData = userSettingService.subData;
		$scope.updateUserId = userSettingService.updateUserId;
		$scope.updateUserName = userSettingService.updateUserName;
		$scope.http = localStorage.getItem('http');
		userSettingService.queryUserExtendInfo();

	  //var wxActive=localStorage.getItem('wxActive');
	    $scope.wxActive = localStorage.getItem("wxActive");
        //console.log(wxActive);

		
}])

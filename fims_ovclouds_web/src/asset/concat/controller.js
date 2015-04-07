FIMS.controller('loginController',['$location','$scope','loginService', '$rootScope','$q',
	function($location,$scope,loginService, $rootScope, $q) {
		if (localStorage.getItem('sid')&&localStorage.getItem('userName')&&localStorage.getItem('email')) {
			$location.path("account_index/chooseTeam").replace();
		}else{
			localStorage.clear();
			$scope.user = loginService.user;
			$scope.response = loginService.response;
			$scope.subData = loginService.subData;
		}	
}])

FIMS.controller('sigupController',['$scope','sigupService', '$rootScope','$q',
	function($scope,sigupService, $rootScope, $q) {
		$scope.user = sigupService.user;
		$scope.response = sigupService.response;
		$scope.subData = sigupService.subData;
}])

FIMS.controller('account_indexCtrl',['$scope','account_indexService', '$rootScope','$q',
	function($scope,account_indexService, $rootScope, $q) {
		// $scope.userName = localStorage.getItem("userName");
		$scope.exitSystem = account_indexService.exitSystem;
		$scope.switchCom= account_indexService.switchCom;
		account_indexService.getUserName();
}])

FIMS.controller('userSettingCtrl',['$scope','userSettingService', '$rootScope','$q',
	function($scope,userSettingService, $rootScope, $q) {
		// $rootScope.userName = localStorage.getItem("userName");
		$scope.usersetting = userSettingService.user;
		$scope.subData = userSettingService.subData;
}])

FIMS.controller('chooseTeamController',['$scope','chooseTeamService', '$rootScope','$q',
	function($scope,chooseTeamService, $rootScope, $q) {
     	$scope.subData = chooseTeamService.subData;
		$scope.createCom = chooseTeamService.createCom;
		chooseTeamService.queryJoinedCompanies();
		// $scope.companyList = chooseTeamService.queryJoinedCompanies();
		$scope.joinedCompanies = chooseTeamService.joinedCompanies;
		$scope.setWorkingCompany = chooseTeamService.setWorkingCompany;
}])

FIMS.controller('chooseModuleCtrl',['$scope', '$rootScope','$q',
	function($scope, $rootScope, $q) {
		// $scope.userName = localStorage.getItem("userName");
		$scope.curCompanyName = localStorage.getItem("curCompanyName");
		$scope.applyJoinCompanyNumber = localStorage.getItem("applyJoinCompanyNumber");
}])

FIMS.controller('chooseTeamController',['$scope','chooseTeamService', '$rootScope','$q',
	function($scope,chooseTeamService, $rootScope, $q) {
     	$scope.subData = chooseTeamService.subData;
		$scope.createCom = chooseTeamService.createCom;
		chooseTeamService.queryJoinedCompanies();
		// $scope.companyList = chooseTeamService.queryJoinedCompanies();
		$scope.joinedCompanies = chooseTeamService.joinedCompanies;
		$scope.setWorkingCompany = chooseTeamService.setWorkingCompany;
}])

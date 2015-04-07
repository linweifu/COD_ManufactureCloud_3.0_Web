FIMS.controller('chooseTeamController',['$scope','chooseTeamService', '$rootScope','$q',
	function($scope,chooseTeamService, $rootScope, $q) {
      $scope.subData = chooseTeamService.subData;
	$scope.createCom = chooseTeamService.createCom;
}])

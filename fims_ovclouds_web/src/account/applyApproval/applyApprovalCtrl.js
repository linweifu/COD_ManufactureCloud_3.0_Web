FIMS.controller('applyApprovalCtrl', ['$scope', function($scope){
	$scope.applyInfo = JSON.parse(localStorage.getItem('applyJoin'));
}])
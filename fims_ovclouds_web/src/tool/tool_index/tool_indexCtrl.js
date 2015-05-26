FIMS.controller('tool_indexCtrl', ['$scope','$location','$http','$q',function($scope,$location,$http,$q){
	$scope.curCompanyName = localStorage.getItem("curCompanyName");
}])
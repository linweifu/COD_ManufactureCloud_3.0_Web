FIMS.controller('monthlyDetailsCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		$scope.companyShortName = localStorage.getItem("curCompanyName");
		
		$scope.monthlyDetailsBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}
}])
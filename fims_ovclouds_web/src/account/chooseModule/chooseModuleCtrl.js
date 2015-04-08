FIMS.controller('chooseModuleCtrl',['$scope', '$rootScope','$q','$location',"$http",
	function($scope, $rootScope, $q,$location,$http) {
		// $scope.userName = localStorage.getItem("userName");
		$scope.curCompanyName = localStorage.getItem("curCompanyName");
		$scope.applyJoinCompanyNumber = localStorage.getItem("applyJoinCompanyNumber");

		$scope.getApplies = function(){
			 $http({
	            method: 'post',
	            // url: config.HOST + '/api/2.0/bp/account/user/exitSystem',
	            url: 'account/chooseModule/getAppliesJoinCompany.json',
	            headers:  {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	            data: {
	                "sid": localStorage.getItem('sid'),
	                 "contents": {
				        "companySid": localStorage.getItem("cSid")
				    }
	            }
	        }).success(function(data){
	            if (data.code == 'N01') {
	                localStorage.setItem('applyJoin', JSON.stringify(data.contents));
	                $location.path("account_index/applyApproval");
	            }else{alert("退出系统失败！")}
	        })
		}
}])

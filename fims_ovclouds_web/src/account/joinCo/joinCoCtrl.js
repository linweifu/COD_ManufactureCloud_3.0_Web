FIMS.controller('joinCoCtrl', ['$scope', '$http', function ($scope,$http) {
	var joinCo = {
			companySid: '',
			invitePeopleSid: '',
			userJobNumber: "",
			notes: "我是"+localStorage.getItem('userName')
	};

	$scope.applyJoinCompany = function(){
		$http({
			method: "POST",
			url: "account/joinCo/joinCo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"contents": $scope.joinCo
			}
		})
		.success(function(data) {
			if (data.code == 'N01') {
				
			}
			console.log(userManage.companyMem.array);
		})
	}

	$scope.joinCo = joinCo;
}])
FIMS.controller('joinCoCtrl', ['$scope','$http', '$state',function ($scope,$http,$state) {
	var joinCo = {
			paramObj: {},
			userJobNumber: "",
			notes: "我是"+localStorage.getItem('userName')
	};

	// function(){
	// 	var url = window.location.search; 
	// 	console.log(url);
	// }();
	function init(){
		// console.log($stateParams.companyShortName);
		var url = location.href;
		var param = url.substring(url.indexOf("?")+1, url.length).split("&");
		var paramObj = {};
		for (var i=0;i< param.length;i++) {
			joinCo.paramObj[param[i].substring(0,param[i].indexOf("="))] = param[i].substring(param[i].indexOf("=")+1)
		}
	}
	init();

	$scope.applyJoinCompany = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/account/relation/applyJoinCompany",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"contents": {
				 	"companySid": joinCo.paramObj.companySid,
			        "invitePeopleSid": joinCo.paramObj.invitePeopleSid,
			        "userJobNumber":joinCo.userJobNumber,
			        "notes":joinCo.notes
				}
			}
		})
		.success(function(data) {
			if (data.code == 'N01') {
				alert("完成申请!");
				$state.go('account_index.chooseTeam');
			}

		})
	}

	$scope.joinCo = joinCo;
}])
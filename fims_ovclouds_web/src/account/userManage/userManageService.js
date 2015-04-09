FIMS.factory('userManageService', ['$location','$http', function($location,$http){
	var userManage = {};
	userManage.companyMem = {
		"array": []
	};
	
	userManage.genLink = function(){
		$http({
			method: 'POST',
		 // url: config.HOST+'/api/2.0/bp/account/mailbox_link/generateInvitationLink',
            url: "account/userManage/generateInvitationLink.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"contents": {
					"companySid": localStorage.getItem("cSid")
				}
			}
		})
		.success(function(data) {
			if (data.code == 'N01') {
				$location.path('account_index/agreeMem');
				localStorage.setItem('inlink',data.contents);	
			}
		})
	}

	userManage.queryMember = function(){
		$http({
			method: 'POST',
		 // url: config.HOST+'/api/2.0/bp//account/company/queryCompanyMember',
            url: "account/userManage/queryCompanyMember.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"contents": {
					"companySid": localStorage.getItem("cSid")
				}
			}
		})
		.success(function(data) {
			if (data.code == 'N01') {
				userManage.companyMem.array = data.contents;
				for(var i=0;i<userManage.companyMem.array.length;i++) {
					switch(userManage.companyMem.array[i].userPurview) {
						case '0' : 
							userManage.companyMem.array[i].userPurview = "超级管理员";
							break;
						case '1' : 
							userManage.companyMem.array[i].userPurview = "公司管理员";
							break;
						case '2' :
							userManage.companyMem.array[i].userPurview = "普通成员";
							break;
					}
				}
			}
			console.log(userManage.companyMem.array);
		})
	}

	return userManage;
}])
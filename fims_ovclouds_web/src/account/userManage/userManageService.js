FIMS.factory('userManageService', ['$location','$http', function($location,$http){
	var userManage = {};
	userManage.genLink = function(){
		$http({
			method: 'POST',
		 // url: config.HOST+'/api/2.0/bp/account//mailbox_link/generateInvitationLink',
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
	return userManage;
}])
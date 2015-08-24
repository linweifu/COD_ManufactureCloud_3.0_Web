FIMS.controller('userSettingCtrl',['$scope','userSettingService', '$rootScope','$q',
	function($scope,userSettingService, $rootScope, $q) {
		// $rootScope.userName = localStorage.getItem("userName");
		$scope.usersetting = userSettingService.user;
		$scope.subData = userSettingService.subData;
		$scope.updateUserId = userSettingService.updateUserId;
		$scope.updateUserName = userSettingService.updateUserName;
		$scope.unbindWechat = userSettingService.unbindWechat;
		$scope.http = localStorage.getItem('http');
		//$scope.userName = localStorage.getItem('userName');
		userSettingService.queryUserExtendInfo();

	  var wxActive=localStorage.getItem('wxActive');
	    //$scope.wxActive = localStorage.getItem("wxActive");
        //console.log(wxActive);

//var a = localStorage.getItem("mailActive");
/*************************************************************
**************************************************************
//绑定与解绑切换
**************************************************************
*************************************************************/ 
function init(){
    if(wxActive==1)
        {
           var tar = document.getElementById('tar');
           var bd = document.getElementById('bd');
           var spanid = document.getElementById('spanid');
           var wx = document.getElementById('wx');
           tar.style.display = tar.style.display=='block' ? '' : 'none';
           bd.style.display = bd.style.display=='block' ? 'block' : 'none';
           spanid.style.display = spanid.style.display=='block' ? '' : '';
           wx.style.display = wx.style.display=='block' ? 'none' : '';

        }
        else if(wxActive==0)
        {
           var tar = document.getElementById('tar');
           var bd = document.getElementById('bd');
           var spanid = document.getElementById('spanid');
           var wx = document.getElementById('wx');
           tar.style.display = tar.style.display=='block' ? 'none' : '';
           bd.style.display = bd.style.display=='block' ? 'none' : '';
           spanid.style.display = spanid.style.display=='block' ? '' : 'none';
           wx.style.display = wx.style.display=='block' ? '' : 'none';

          
        }

 
 }

 init();
		
}])

FIMS.controller('loginController',['$location','$scope','loginService', '$rootScope','$q',
	function($location,$scope,loginService, $rootScope, $q) {
		if (localStorage.getItem('sid')&&localStorage.getItem('userName')&&localStorage.getItem('email')) {
			$location.path("account_index/chooseTeam").replace();
		}else{
			$scope.user = loginService.user;
			$scope.response = loginService.response;
			$scope.subData = loginService.subData;
		}

		

/*************************************************************
**************************************************************
//绑定与解绑切换
**************************************************************
*************************************************************/ 
// function init(){
//     if(wxActive==1)
//         {
//            var tar = document.getElementById('tar');
//            var bd = document.getElementById('bd');
//            var spanid = document.getElementById('spanid');
//            var wx = document.getElementById('wx');
//            tar.style.display = tar.style.display=='block' ? '' : 'none';
//            bd.style.display = bd.style.display=='block' ? 'block' : 'none';
//            spanid.style.display = spanid.style.display=='block' ? '' : '';
//            wx.style.display = wx.style.display=='block' ? 'none' : '';

//         }
//         else if(wxActive==0)
//         {
//            var tar = document.getElementById('tar');
//            var bd = document.getElementById('bd');
//            var spanid = document.getElementById('spanid');
//            var wx = document.getElementById('wx');
//            tar.style.display = tar.style.display=='block' ? 'none' : '';
//            bd.style.display = bd.style.display=='block' ? 'none' : '';
//            spanid.style.display = spanid.style.display=='block' ? '' : 'none';
//            wx.style.display = wx.style.display=='block' ? '' : 'none';


//         }

 
//  }

//  init();

}])

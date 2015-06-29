FIMS.controller('chooseModuleCtrl',['$scope', '$rootScope','$q','$location',"$http",
	function($scope, $rootScope, $q,$location,$http) {
		// $scope.userName = localStorage.getItem("userName");
		$scope.curCompanyName = localStorage.getItem("curCompanyName");
		$scope.applyJoinCompanyNumber = localStorage.getItem("applyJoinCompanyNumber");

		// 将所有当前改为1
		localStorage.setItem("page",1);
		var a = localStorage.getItem("userPurview");
		// console.log(a);

  
/**********************************************
***********************************************
判断是否为超级管理员
***********************************************
**********************************************/	

 function init(){
 	if(a==1)
		{
			$("#warning-block").hide();
		}
	else if(a==0)
	{
        $("#warning-block").show();
	}

 // $("#warning-block").show();
 }

 init();
/**********************************************
***********************************************

***********************************************
**********************************************/		

		
}])

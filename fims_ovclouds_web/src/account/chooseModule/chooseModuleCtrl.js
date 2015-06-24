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
// $scope.queryJoinedCompanies = function(){
//             $http({
//                 method: 'POST',
//                 url: config.HOST+'/api/2.0/bp/account/relation/queryJoinedCompanies',
//                 // url: "account/chooseTeam/queryJoinedCompanies.json",
//                 headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
//                 data: {
//                     "sid": localStorage.getItem("sid"),
//                 }
//             }).success(function (data){
//                 chooseTeam.companyList=[];
//                 if (data.code == 'N01') {
//                     chooseTeam.companyList = data.contents;
//                     for(var i=0;i<chooseTeam.companyList.length;i++){
//                         chooseTeam.companyList[i].userApplyStatus = (chooseTeam.companyList[i].userApplyStatus==1)?'':'disabled';
//                     }
//                     $rootScope.companyList  =chooseTeam.companyList;
//                 }
//                 else if(data.code=="E00"){
//                     alert(data.message+",请重新登陆");
//                     localStorage.clear();
//                     $location.path('login').replace();
//                 }else {
//                     console.log(data.message);
//                 }  
                
//             }).error(function (data){
                
//             });
//         }
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

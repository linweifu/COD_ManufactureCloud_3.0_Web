FIMS.controller('chooseTeamController',['$scope','chooseTeamService', '$rootScope','$q',
	function($scope,chooseTeamService, $rootScope, $q) {
     	$scope.subData = chooseTeamService.subData;
		$scope.createCom = chooseTeamService.createCom;
		chooseTeamService.queryJoinedCompanies();
		//email:localStorage.getItem("email");
		$scope.email = localStorage.getItem("email");
		// $scope.companyList = chooseTeamService.queryJoinedCompanies();
		$scope.joinedCompanies = chooseTeamService.joinedCompanies;
		$scope.setWorkingCompany = chooseTeamService.setWorkingCompany;
		$scope.sentUserActivateEmail = chooseTeamService.sentUserActivateEmail;

        var joinCo = {
			paramObj: {},
			// applicantJobNumber: "",
			// notes: "我是"+localStorage.getItem('userName')
	};





/*********************************************************
 判断是否给出激活提示
*********************************************************/

 var a = localStorage.getItem("mailActive");
 
function init(){
    if(a==1)
        {
            $("#warning-block").hide();
        }
        else if(a==0)
        {
           $("#warning-block").show();
        }

 
 }

 init();

/*********************************************************
*********************************************************/
function init(){
		// console.log($stateParams.companyShortName);
		var url = location.href;
		var param = url.substring(url.indexOf("?")+1, url.length).split("&");
		for (var i=0;i< param.length;i++) {
			joinCo.paramObj[param[i].substring(0,param[i].indexOf("="))] = param[i].substring(param[i].indexOf("=")+1)
		}
		if (joinCo.paramObj!=null){
			
				localStorage.setItem("code",JSON.stringify(joinCo.paramObj.code));
			

		}
	}
	
	init();


/*********************************************************
*********************************************************/
}])

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

 //        var joinCo = {
	// 		paramObj: {},
	// 		// applicantJobNumber: "",
	// 		// notes: "我是"+localStorage.getItem('userName')
	// };





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


}])

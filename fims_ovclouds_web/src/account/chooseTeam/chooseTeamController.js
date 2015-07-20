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

/*********************************************************
**********************************************************
loginSystemByWechat 微信直接登录
**********************************************************
*********************************************************/
$scope.loginSystemByWechat = function(){
	  $http({
           //http://ovclouds.com/api/2.0/bp/account/user/loginSystemByWechat
            url: config.HOST+"/api/2.0/bp/account/user/loginSystemByWechat",
            method: 'POST',
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
            	
            	  "code": localStorage.getItem('code'),
                 // "code": joinCo.paramObj.code,
            }
        }).success(function(data){
        	if(data.code == "N01") {
        	 var storage = window.localStorage;
             var localData = data.contents;

             if(storage){
                    storage.setItem('sid',localData.sid);    
                    storage.setItem('webName',localData.userName);    
                    storage.setItem('websid',localData.userSid);  
                    //storage.setItem('password',login.user.password); 
                    storage.setItem('mailActive',localData.mailActive); 
                     storage.setItem('wxActive',localData.mailActive);  
                }else{
                    // $.cookie('email',localData);
                }
                
                alert(data.message);
               $location.path("account_index/chooseTeam").replace();  
        	}else {

        		alert(data.message);
        	}

        })

}

 $scope.loginSystemByWechat();
/*********************************************************
**********************************************************
**********************************************************
*********************************************************/
}])

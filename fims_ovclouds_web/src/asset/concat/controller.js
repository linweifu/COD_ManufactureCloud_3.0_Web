FIMS.controller('loginController',['$location','$scope','loginService', '$rootScope','$q',
	function($location,$scope,loginService, $rootScope, $q) {
		if (localStorage.getItem('sid')&&localStorage.getItem('userName')&&localStorage.getItem('email')) {
			$location.path("account_index/chooseTeam").replace();
		}else{
			$scope.user = loginService.user;
			$scope.response = loginService.response;
			$scope.subData = loginService.subData;
		}	
}])

FIMS.controller('sigupController',['$scope','sigupService', '$rootScope','$q',
	function($scope,sigupService, $rootScope, $q) {
		$scope.user = sigupService.user;
		$scope.response = sigupService.response;
		$scope.subData = sigupService.subData;
}])

FIMS.controller('account_indexCtrl',['$scope','account_indexService', '$rootScope','$q',
	function($scope,account_indexService, $rootScope, $q) {
		// $scope.userName = localStorage.getItem("userName");
		$scope.exitSystem = account_indexService.exitSystem;
		$scope.switchCom= account_indexService.switchCom;
		account_indexService.getUserName();
}])

FIMS.controller('userSettingCtrl',['$scope','userSettingService', '$rootScope','$q',
	function($scope,userSettingService, $rootScope, $q) {
		// $rootScope.userName = localStorage.getItem("userName");
		$scope.usersetting = userSettingService.user;
		$scope.subData = userSettingService.subData;
		userSettingService.queryUserExtendInfo();
}])

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
}])

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

FIMS.controller('userManageCtrl', ['$scope','$location','userManageService',
	function($scope,$location,userManageService){
	$scope.genLink = userManageService.genLink;
	$scope.companyName = localStorage.getItem("curCompanyName");

	$scope.userManageBack = function(){
		$location.path("account_index/chooseModule").replace();
	}
	userManageService.queryMember();
	$scope.companyMem =  userManageService.companyMem;
	// console.log(userManageService.companyMem);
}])
FIMS.controller('agreeMemCtrl', ['$scope','$location','$http',
	function($scope,$location,$http){
	$scope.invitLink = localStorage.getItem('inlink');
	$scope.agreeMemBack = function(){
		$location.path('account_index/userManage');
		localStorage.removeItem('inlink');
	};
	$scope.regenLink = function(){
		$http({
            method: 'post',
            url: config.HOST + '/api/2.0/bp/account/mailbox_link/regenerateInvitationLink',
            // url: 'account/agreeMem/regenerateInvitationLink.json',
            headers:  {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "contents": {
                	"companySid": localStorage.getItem('cSid')
                }
            }
        }).success(function(data){
            if (data.code == 'N01') {
                $scope.invitLink = data.contents;
                console.log(data.contents);
                localStorage.setItem('inlink',data.contents);
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                console.log(data.message);
            }  

        })
	};
}])
FIMS.controller('applyApprovalCtrl', ['$scope', '$location','$http',function($scope,$location,$http){
	// $scope.applyInfo =  = JSON.parse(localStorage.getItem('applyJoin'));

    $scope.getApplies = function(){
         $http({
            method: 'post',
            url: config.HOST + '/api/2.0/bp/account/relation/getAppliesJoinCompany',
            // url: 'account/chooseModule/getAppliesJoinCompany.json',
            headers:  {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                 "contents": {
                    "companySid": localStorage.getItem("cSid")
                }
            }
        }).success(function(data){
            if (data.code == 'N01') {
                $scope.applyInfo = data.contents;
                $location.path("account_index/applyApproval");
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
    }

    $scope.getApplies();

	$scope.agreeJoin = function(){
		var subContent = [];
		var subContentBody = {};

		for(var i =0;i<$scope.applyInfo.length;i++){
			subContentBody = {
				"applyJoinSid":($scope.applyInfo)[i].applyJoinSid,
				"userApplyStatus":($scope.applyInfo)[i].userApplyStatus
			}
			subContent.push(subContentBody);
		}
		$http({
            method: 'POST',
			url: config.HOST+"/api/2.0/bp/account/relation/ratifyJoinCompany",
            // url: "account/applyApproval/applyApproval.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "contents": subContent
            }
        }).success(function (data) {
            if(data.code == "N01"){
            	console.log($scope.applyInfo);
            	localStorage.setItem("applyJoin",JSON.stringify($scope.applyInfo));
            	$location.path('account_index/chooseModule').replace();
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                console.log(data.message);
            }  
        }).error(function(){
            console.log('http error')
        });
	}

	$scope.applyApprovalBack = function(){
		localStorage.removeItem('applyJoin');
		$location.path("account_index/chooseModule").replace();
	}

	$scope.refuseJoin = function(index,aid){
	 	$http({
            method: 'POST',
			url: config.HOST+"/api/2.0/bp/account/relation/ratifyJoinCompany",
            // url: "account/applyApproval/applyApproval.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "contents": [
                	{
                		"applyJoinSid": aid,
                		"userApplyStatus": "2"
                	}
                ]
            }
        }).success(function (data) {
            if(data.code == "N01"){
            	$scope.applyInfo.splice(index,1);
            	console.log($scope.applyInfo);

            	localStorage.setItem("applyJoin",JSON.stringify($scope.applyInfo));
            	console.log(index);
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                console.log(data.message);
            }  

        }).error(function(){
            console.log('http error')
        });
	}
}])
FIMS.controller('joinCoCtrl', ['$scope','$rootScope','$http', '$state','$location',function ($scope,$rootScope,$http,$state,$location) {
	var joinCo = {
			paramObj: {},
			applicantJobNumber: "",
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
		for (var i=0;i< param.length;i++) {
			joinCo.paramObj[param[i].substring(0,param[i].indexOf("="))] = param[i].substring(param[i].indexOf("=")+1)
		}
		if (joinCo.paramObj!=null){
			if (localStorage.getItem('sid')&&localStorage.getItem('userName')&&localStorage.getItem('email')) {
				localStorage.setItem("apj",JSON.stringify(joinCo.paramObj));
			}else {
				localStorage.setItem("apj",JSON.stringify(joinCo.paramObj));
				alert("您还未登录");
				$location.path("login");
			}
		}
	}
	
	init();
/************************************************
************************************************/
// var pages=[],j=2；
// for (var i=1;i<data.totalpage;i++)
// {
// 	pages.push(j);
// 	j++;
// 	$rootScope.pages = pages;

// }
// console.log(pages);
/************************************************
************************************************/
	$scope.applyJoinCompany = function(){
		var paramObj = JSON.parse(localStorage.getItem('apj'));
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/account/relation/applyJoinCompany",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"contents": {
				 	"companySid": paramObj.companySid,
			        "invitePeopleSid":paramObj.invitePeopleSid,
			        "applicantJobNumber":joinCo.applicantJobNumber,
			        "notes":joinCo.notes,
			        "inviteString": location.href
				}
			}
		})
		.success(function(data) {
			if (data.code=='N01') {
				alert("完成申请!");
				localStorage.removeItem('apj');
				$state.go('account_index.chooseTeam');
			}
		    else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
		})
	}

	$scope.joinCo = joinCo;

    $scope.back = function(){

       $location.path("account_index/chooseModule");
    }

}])
FIMS.controller('comSettingCtrl', ['$scope','$location','$http','$q',function($scope,$location,$http,$q){
	var comSetting = {
		shortName: localStorage.getItem('curCompanyName'),
		name: '',
		comCode: '',
		comTel: '',
		comWeb: '',
		dictionary: {
			// country: [],
			province: [],
			city: [],
			iType: [],
			iInfo: [],
			input_way: [
				{
					input_way_code: "CE",
					input_way_name: "复杂录入"
				},
				{
					input_way_code: "SE",
					input_way_name: "简单录入"
				}
			]
		},

		input_way: {},
		
		iType: {},
		iInfo: {},

		aPro: {},
		aCity: {},
	};

	$scope.back = function(){
		var a = confirm("您确定要退出吗？退出将丢失填写数据!")
		if (a) {
			history.go(-1);
		}
	}



	// 完善公司信息
	comSetting.improveComInfo = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/company/improveCompanyInfo",
			// url: "account/comSetting/improveComInfo.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				 "contents": {
			        "companySid": localStorage.getItem("cSid"),
			        "companyShortName": comSetting.shortName,
			        "companyFullName": comSetting.name,
			        "companyRegionCode": "86#",
			        "companyRegion": "中国",
			        "companyProvinceCode": comSetting.aPro.provinceCode,
			        "companyProvince": comSetting.aPro.provinceName,
			        "companyCityCode": comSetting.aCity.cityCode,
			        "companyCity": comSetting.aCity.cityName,
			        "companyIndustryCode": comSetting.iInfo.companyIndustryCode,
			        "companyIndustry": comSetting.iInfo.companyIndustry,
			        "companyZipCode": comSetting.comCode,
			        "companyPhone": comSetting.comTel,
			        "companyWebsite": comSetting.comWeb
			    }
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	alert("公司信息更新成功");
            	$location.path("account_index/chooseModule");
            }
            else if(data.code=="E00"){
            	alert(data.message+"（获取省份）,请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('improveComInfo'+data.message);
        });
	}

	comSetting.getCity = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCity",
			// url: "account/comSetting/City.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"provinceCode": comSetting.aPro.provinceCode
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.city = [];
                comSetting.dictionary.city = data.contents;
            }
         	else if(data.code=="E00"){
            	alert(data.message+",请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }        
        }).error(function () {
            console.log('error');
        });
	}


	comSetting.queryInfo = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCompanyIndustry",
			// url: "account/comSetting/Industry.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companyIndustryCode": comSetting.iType.companyIndustryCode
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.iInfo = [];
                // comSetting.iInfo = {};
                comSetting.dictionary.iInfo = data.contents;
                // for (var i=0;i < data.contents.length;i++){
                //     comSetting.dictionary.iInfo.push({
                //         "code": data.contents[i].companyIndustryCode,
                //         "name" : data.contents[i].companyIndustry
                //     });
                // }   
            }
            else if(data.code=="E00"){
            	alert(data.message+",请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }        
            
        }).error(function () {
            console.log('error');
        });

	}

	
	// 使用Promise规范

	comSetting.getProvince = function(){
		var deferred = $q.defer();
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicProvince",
			// url: "account/comSetting/Province.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid')
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.province = data.contents;
                deferred.resolve(data.contents);
            }
            else if(data.code=="E00"){
            	alert(data.message+"（获取省份）,请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('data.message');
        });
        return deferred.promise;
	}

	// 获取行业类型
	comSetting.queryType = function(){
		var deferred = $q.defer();
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCompanyIndustryType",
			// url: "account/comSetting/Industry.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid')
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                // comSetting.dictionary.iType = [];
                deferred.resolve(data.contents);
                comSetting.dictionary.iType = data.contents;
            }
            else {
                console.log(data.message);
            }
        }).error(function () {
            console.log('error');
        });

        return deferred.promise;
	}

	//Promise规范
	var promises = [];
	var deferred = $q.defer();

	var dicPro = comSetting.getProvince();
	var dicType = comSetting.queryType();

	promises.push(dicPro);
	promises.push(dicType);

	$q.all(promises).then(function(prodata){
        // comSetting.dictionary.province = prodata[0];
        // comSetting.dictionary.iType = prodata[1];

		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/company/queryCompanyExtendInfo",
			// url: "account/comSetting/queryCompanyExtendInfo.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem("cSid")
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	comSetting.shortName = data.contents.companyShortName ;
		        comSetting.name = data.contents.companyFullName;
		        comSetting.dictionary.city = data.contents.companyCityDic;
		        comSetting.aCity = (comSetting.dictionary.city)[data.contents.companyCityDisplay];
		        comSetting.aPro = prodata[0][data.contents.companyProvinceDisplay];
		        comSetting.iType = prodata[1][data.contents.industryTypeDisplay];
		        comSetting.dictionary.iInfo = data.contents.industryDic;
		        comSetting.iInfo = comSetting.dictionary.iInfo[data.contents.industryDisplay];
			    comSetting.comCode = data.contents.companyZipCode;
			    comSetting.comTel = data.contents.companyPhone;
			    comSetting.comWeb = data.contents.companyWebsite;
            }
            else if(data.code=="E00"){
            	alert(data.message+",请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('improveComInfo'+data.message);
        });

	});

	var queryCompanySite = function() {
		var i = (localStorage.getItem("input_way_code")=="CE")?0:1;
        comSetting.input_way = comSetting.dictionary.input_way[i];
		// $http({
		// 	method: "POST",
		// 	// url: config.HOST + "/api/2.0/bp/account/company/queryCompanySite",
		// 	url: "account/comSetting/queryCompanySite.json",
  //           headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
		// 	data: {
		// 		"sid": localStorage.getItem('sid'),
		// 		"companySid": localStorage.getItem('cSid')
		// 	}
		// })
		// .success(function(data){
  //           if (data.code=="N01"){
  //               var i = (data.contents.checkoutRecordInputWayCode=="CE")?0:1;
  //               comSetting.input_way = comSetting.dictionary.input_way[i];
  //           }
  //           else if(data.code=="E00"){
  //           	alert(data.message+",请重新登陆");
  //           	localStorage.clear();
  //           	$location.path('login');
  //           }else {
  //           	console.log(data.message);
  //           }        
            
  //       }).error(function () {
  //           console.log('error');
  //       });
	}
	queryCompanySite();

	$scope.updateCompanySite = function() {
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/account/company/updateCompanySite",
			url: "account/comSetting/updateCompanySite.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"checkoutRecordInputWayCode": comSetting.input_way.input_way_code
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                localStorage.setItem("input_way_code",comSetting.input_way.input_way_code);
                alert(data.message);
            }
            else if(data.code=="E00"){
            	alert(data.message+",请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }        
            
        }).error(function () {
            console.log('error');
        });
	}
	$scope.comSetting = comSetting;


}])
FIMS.controller('materialCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var material = {
			materialNo: "",
			materialVersion: "",
			materialShortName: "",
			materialFullName: "",
			notes:""
		};
		$scope.material = material;

		$scope.materialBack = function(){
			localStorage.removeItem('curM');
			$location.path('account_index/materiallist').replace();
		}


		// $scope.updateMaterial = updateMaterial;

		$scope.querySingleMaterial = function(msid){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				url: config.HOST + "/api/2.0/bp/engineering/materials/querySingleMaterialsInfo",
				// url: "manage/engineer/material/querySingleMaterial.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"materialSid": msid
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                $scope.material = data.contents;
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.querySingleMaterial(localStorage.getItem('curM'));

		$scope.addOrUpdateMaterials = function(){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				url: config.HOST + "/api/2.0/bp/engineering/materials/addOrUpdateMaterialsInfo",
				// url: "manage/engineer/material/addOrUpdateMaterials.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					
				    "operateStatus": 1,
				    "materialSid": localStorage.getItem('curM'),
				    "materialNo": $scope.material.materialNo,
				    "materialShortName": $scope.material.materialShortName,
				    "materialVersion": $scope.material.materialVersion,
				    "materialFullName": $scope.material.materialFullName,
				    "companySid":localStorage.getItem('cSid'),
				    "companyShortName": $scope.material.companyShortName,
				    "notes": $scope.material.notes,
				    "sid": localStorage.getItem('sid')
				        
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                alert(data.message);
	                $scope.materialBack();
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}
}])
FIMS.controller('materialListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var newMaterial = {
		"materialNo": "",
        "materialShortName": "",
        "materialVersion": "",
        "materialFullName": "",
        "notes": ""
	};

	$scope.newMaterial= newMaterial;
	$scope.companyShortName = localStorage.getItem('curCompanyName');
	$scope.materiallistBack = function(){
		localStorage.removeItem('singlematerial');
		$location.path('account_index/chooseModule').replace();
	}
	$scope.queryMaterialsInfo = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
			// url: "manage/engineer/material/queryMaterialsInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid')
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
                $scope.listdata = data.contents;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	$scope.queryMaterialsInfo();

	$scope.querySingleMaterial = function(msid){
		localStorage.setItem('curM',msid);
 		$location.path('account_index/material');     
	}
	// $scope.querySingleMaterial = function(msid){
	// 	$http({
	// 		method: "POST",
	// 		// url: "account/joinCo/joinCo.json",
	// 		url: config.HOST + "/api/2.0/bp/engineering/materials/querySingleMaterialsInfo",
	// 		// url: "manage/engineer/material/querySingleMaterial.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"materialSid": msid
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {
 //                $scope.singlematerial = data.contents;
 //                localStorage.setItem('singlematerial',JSON.stringify(data.contents));
 //                $location.path('account_index/material');
 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }

	$scope.addOrUpdateMaterials = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/engineering/materials/addOrUpdateMaterialsInfo",
			// url: "manage/engineer/material/addOrUpdateMaterials.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
			    "operateStatus": 0,
			    "materialNo":newMaterial.materialNo,
			    "materialShortName":newMaterial.materialShortName,
			    "materialVersion":newMaterial.materialVersion,
			    "materialFullName":newMaterial.materialFullName,
			    "companySid": localStorage.getItem('cSid'),
			    "companyShortName":newMaterial.materialShortName,
			    "notes":newMaterial.notes
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	$scope.queryMaterialsInfo();
                alert(data.message);
                newMaterial = {
                	"materialNo": "",
			        "materialShortName": "",
			        "materialVersion": "",
			        "materialFullName": "",
			        "notes": ""
                }
                $scope.newMaterial = newMaterial;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

}])
FIMS.controller('customerCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var customer = {
			"customerNo":"",
		    "customerShortName":"",
		    "customerFullName":"",
		    "companySid":"",
		    "companyShortName":"",
		    "contactPhone":"",
		    "contactAddress":"",
		    "notes":"",
		    "zipCode":""			
		};

		// var customer = {
		// 	"customerNo": customer.customerNo,
  //           "customerShortName": customer.customerShortName,
  //           "customerFullName": customer.customerFullName,
  //           "contactPhone": customer.contactPhone,
  //           "contactAddress": customer.contactAddress,
		//     "zipCode": customer.zipCode,
  //           "notes": customer.notes
		// };

		//数据绑定以及准备
		$scope.customer= customer;


		//方法定义区
		$scope.customerBack = function(){
			localStorage.removeItem('curC');
			$location.path('account_index/customerlist').replace();
		}

		$scope.querySingleCustomerInfo = function(msid){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/customer/customer/querySingleCustomerInfo",
				// url: "manage/customer/customer/querySingleCustomerInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"customerSid": msid
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                $scope.customer = data.contents;
	                console.log($scope.customer);
	                
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.addOrUpdateCustomerInfo = function(){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				url: config.HOST + "/api/2.0/bp/customer/customer/addOrUpdateCustomerInfo",
				// url: "manage/customer/customer/addOrUpdateCustomerInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				    "operateStatus": 1,
				    // "customerNo":$scope.customer.customerNo,
				    "customerSid":$scope.customer.customerSid,
				    "customerShortName":$scope.customer.customerShortName,
				    "customerFullName":$scope.customer.customerFullName,
				    "companySid": localStorage.getItem('cSid'),
				    "companyShortName":localStorage.getItem('curCompanyName'),
				    "contactPhone": $scope.customer.contactPhone,
				    "contactAddress": $scope.customer.contactAddress,
		    		"zipCode": $scope.customer.zipCode,
				    "notes": $scope.customer.notes
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	console.log(customer);
	                alert(data.message);
	                $scope.customerBack();
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		//*********初始化调用区域
		$scope.querySingleCustomerInfo(localStorage.getItem("curC"));

}])
FIMS.controller('customerListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
	$scope.companyShortName = localStorage.getItem('curCompanyName');
	$scope.customerlistBack = function(){
		localStorage.removeItem('singlecustomer');
		$location.path('account_index/chooseModule').replace();
	}
	$scope.queryCustomerInfo = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/customer/customer/queryCustomerInfo",
			// url: "manage/customer/customer/queryCustomerInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid')
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
                $scope.listdata = data.contents;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	$scope.queryCustomerInfo();

	$scope.querySingleCustomerInfo = function(msid){
        localStorage.setItem('curC',msid);
 		$location.path('account_index/customer');        

		// $http({
		// 	method: "POST",
		// 	url: config.HOST + "/api/2.0/bp/customer/customer/querySingleCustomerInfo",
		// 	// url: "manage/customer/customer/querySingleCustomerInfo.json",
		// 	header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
		// 	data: {
		// 		"sid": localStorage.getItem('sid'),
		// 		"customerSid": msid
		// 	}
		// })
		// .success(function(data){
  //           if (data.code == 'N01') {
  //               // $scope.singlecustomer = data.contents;
  //               localStorage.setItem('singlecustomer',JSON.stringify(data.contents));
  //               localStorage.setItem('singlecustomer',JSON.stringify(data.contents));
  //               $location.path('account_index/customer');
  //           }
  //           // else if(data.code=="E00"){
  //           //     alert(data.message+",请重新登陆");
  //           //     localStorage.clear();
  //           //     $location.path('login').replace();
  //           // }else {
  //           //     alert(data.message);
  //           // }  
  //       })
	}

	var newcustomer = {
	    "customerNo":"",
	    "customerShortName":"",
	    "customerFullName":"",
	    "companySid":"",
	    "companyShortName":"",
	    "contactPhone":"",
	    "contactAddress":"",
	    "notes":"",
	    "zipCode":""
	};

	$scope.newcustomer= newcustomer;

	$scope.addOrUpdateCustomers = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/customer/customer/addOrUpdateCustomerInfo",
			// url: "manage/customer/customer/addOrUpdateCustomerInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
			    "status": 0,
			    "customerNo":newcustomer.customerNo,
			    "customerShortName":newcustomer.customerShortName,
			    "customerFullName":newcustomer.customerFullName,
			    "companySid": localStorage.getItem('cSid'),
			    "companyShortName":localStorage.getItem('curCompanyName'),
			    "contactPhone":newcustomer.contactPhone,
	    		"contactAddress":newcustomer.contactAddress,
			    "zipCode": newcustomer.zipCode,
			    "notes":newcustomer.notes
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	$scope.queryCustomerInfo();
                alert(data.message);
                newcustomer = {
                	"customerNo":"",
				    "customerShortName":"",
				    "customerFullName":"",
				    "companySid":"",
				    "companyShortName":"",
				    "contactPhone":"",
				    "contactAddress":"",
				    "notes":"",
				    "zipCode":""
                }
                $scope.newcustomer = newcustomer;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

}])
FIMS.controller('vendorCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var vendor = {
			"vendorNo":"",
		    "vendorShortName":"",
		    "vendorFullName":"",
		    "companySid":"",
		    "companyShortName":"",
		    "contactPhone":"",
		    "contactAddress":"",
		    "notes":"",
		    "zipCode":""
		};

		//数据绑定以及准备
		$scope.vendor= vendor;


		// $scope.updatevendor= updatevendor;

		$scope.vendorBack = function(){
			localStorage.removeItem('curV');
			$location.path('account_index/vendorlist').replace();
		}

		// $scope.updatevendor = updatevendor;


		$scope.querySingleVendorInfo = function(msid){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/vendor/vendor/querySingleVendorInfo",
				// url: "manage/vendor/vendor/querySingleVendorInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"vendorSid": msid
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                $scope.vendor = data.contents;
	                $location.path('account_index/vendor');
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}
		$scope.querySingleVendorInfo(localStorage.getItem("curV"));

		$scope.addOrUpdateVendorInfo = function(){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				url: config.HOST + "/api/2.0/bp/vendor/vendor/addOrUpdateVendorInfo",
				// url: "manage/vendor/vendor/addOrUpdatevendorInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				    "vendorSid": localStorage.getItem("curV"),
				    "operateStatus": 1,
				    "vendorNo": $scope.vendor.vendorNo,
				    "vendorShortName": $scope.vendor.vendorShortName,
				    "vendorFullName": $scope.vendor.vendorFullName,
				    "companySid": localStorage.getItem('cSid'),
				    "companyShortName": localStorage.getItem('curCompanyName'),
				    "contactPhone": $scope.vendor.contactPhone,
				    "contactAddress": $scope.vendor.contactAddress,
		    		"zipCode": $scope.vendor.zipCode,
				    "notes": $scope.vendor.notes
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                alert(data.message);
	                $scope.vendorBack();
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}
}])
FIMS.controller('vendorListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
	$scope.companyShortName = localStorage.getItem('curCompanyName');
	$scope.vendorlistBack = function(){
		localStorage.removeItem('singlevendor');
		$location.path('account_index/chooseModule').replace();
	}
	$scope.queryVendorInfo = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/vendor/vendor/queryVendorInfo",
			// url: "manage/vendor/vendor/queryVendorInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid')
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
                $scope.listdata = data.contents;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	$scope.queryVendorInfo();

	$scope.querySingleVendorInfo = function(msid){
		localStorage.setItem('curV',msid);
 		$location.path('account_index/vendor');
	}

	// $scope.querySingleVendorInfo = function(msid){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/vendor/vendor/querySingleVendorInfo",
	// 		// url: "manage/vendor/vendor/querySingleVendorInfo.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"vendorSid": msid
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {
 //                // $scope.singlevendor = data.contents;
 //                localStorage.setItem('singlevendor',JSON.stringify(data.contents));
 //                $location.path('account_index/vendor');
 //            }
 //            // else if(data.code=="E00"){
 //            //     alert(data.message+",请重新登陆");
 //            //     localStorage.clear();
 //            //     $location.path('login').replace();
 //            // }else {
 //            //     alert(data.message);
 //            // }  
 //        })
	// }



	var newvendor = {
	    "vendorNo":"",
	    "vendorShortName":"",
	    "vendorFullName":"",
	    "companySid":"",
	    "companyShortName":"",
	    "contactPhone":"",
	    "contactAddress":"",
	    "notes":"",
	    "zipCode":""
	};

	$scope.newvendor= newvendor;

	$scope.addOrUpdateVendors = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/vendor/vendor/addOrUpdateVendorInfo",
			// url: "manage/vendor/vendor/addOrUpdateVendorInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
			    "status": 0,
			    "vendorNo":newvendor.vendorNo,
			    "vendorShortName":newvendor.vendorShortName,
			    "vendorFullName":newvendor.vendorFullName,
			    "companySid": localStorage.getItem('cSid'),
			    "companyShortName":localStorage.getItem('curCompanyName'),
			    "contactPhone":newvendor.contactPhone,
	    		"contactAddress":newvendor.contactAddress,
			    "zipCode": newvendor.zipCode,
			    "notes":newvendor.notes
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	$scope.queryVendorInfo();
                alert(data.message);
                newvendor = {
                	"vendorNo":"",
				    "vendorShortName":"",
				    "vendorFullName":"",
				    "companySid":"",
				    "companyShortName":"",
				    "contactPhone":"",
				    "contactAddress":"",
				    "notes":"",
				    "zipCode":""
                }
                $scope.newvendor = newvendor;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

}])
FIMS.controller('planListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){


/*************************************************
*************************************************/

// $scope.itemsPerPage = 5;
// $scope.currentPage = 0; $scope.items = [];
// for (var i=0; i<50; i++) {
// $scope.items.push({
// id: i, name: "name "+ i, description: "description " + i });

// $scope.prevPage = function() { 
// if ($scope.currentPage > 0) {
// $scope.currentPage--; }
// };


// $scope.prevPageDisabled = function() {
// return $scope.currentPage === 0 ? "disabled" : "";
// };


// $scope.pageCount = function() {
// return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
// };


// $scope.nextPage = function() {
// if ($scope.currentPage < $scope.pageCount()) {
// $scope.currentPage++; }
// };

// $scope.nextPageDisabled = function() {
// return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
//    };
// }

/*************************************************
**************************************************/
		var planlist = {
			dictionary: {
				QCPType: [],
				materialName: [],
				materialVersion: []
			},
			
			Selected : {
				QCPType: {},
				materialName : {},
				// materialVersion : {},
				// materialNo: "",
				materialVersion: ""
			},
			QCPSelected :[],
			display: "",
			
			//page: localStorage.getItem("page")
			page:"2"


		};

		$scope.companyShortName = localStorage.getItem('curCompanyName');
		//makeJobNumber : localStorage.getItem("userJobNumber");
		$scope.planlist = planlist;

		//页面初始化
		(function(){
			localStorage.removeItem("checkoutPlanSid");
		})()

		$scope.planlistBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/chooseModule').replace();
		}

		//  /api/2.0/bp/qcp/qcp
/******************************************************
******************************************************/


/*******************************************************
******************************************************/
		$scope.querySingleplanInfo =function(planSid,checkoutPlanStatusCode){
			if (checkoutPlanStatusCode=="cps001") {
				localStorage.setItem("checkoutPlanSid",planSid);
				$location.path("account_index/planCheck");
			}else if(checkoutPlanStatusCode=="cps002") {
				localStorage.setItem("checkoutPlanSid",planSid);
				$location.path("account_index/planRevise");
			}else {
				alert("不是“查看/修订”状态");
			}
		}
		
		$scope.queryDicQCPType = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
				// url: "plan/queryDicQCPType.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	 				planlist.dictionary.QCPType = [];
	                for (var i=0; i < data.contents.length;i++) {
	                	planlist.dictionary.QCPType.push({
	                		"name": data.contents[i].checkoutPlanType,
	                		"code": data.contents[i].checkoutPlanTypeCode
	                	});
	                }
            		planlist.Selected.QCPType = (planlist.dictionary.QCPType)[0];
            		$scope.queryQCPByType(planlist.Selected.QCPType.code);

	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.queryDicQCPType();

/*********************************************************
*********************************************************/
		// 上一页
		// $scope.previous = function(){
		// 	if (planlist.page==1) {
		// 		alert("当前是第1页...")
		// 	} 
			
		// }

		$scope.previous = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByType",
				// url: "plan/queryQCPByType.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"checkoutPlanTypeCode": planlist.Selected.QCPType.code,
					"page": localStorage.getItem('page')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	planlist.dictionary.materialVersion = [];
	            	planlist.Selected.materialName = {};
	                planlist.display = "display:block"; 
	 				//localStorage.setItem('page',2);	
	                planlist.QCPSelected = data.contents;
	                 // localStorage.setItem("makeJobNumber",planCheck.makeJobNumber);
	                //localStorage.setItem("makeJobNumber",planHistoryListCopy.singleQCP.materialSid);
	                // console.log(planlist.QCPSelected.length);

	                for(var i=0,len=(planlist.QCPSelected).length;i<len;i++){
	                	(planlist.QCPSelected)[i].makeTime = (new Date((planlist.QCPSelected)[i].makeTime*1000)).format();
	                	(planlist.QCPSelected)[i].entryTime = (new Date((planlist.QCPSelected)[i].entryTime*1000)).format();
	                	// console.log((planlist.QCPSelected)[i])
	                }
	                // console.log(planlist.QCPSelected);
 
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	            	planlist.QCPSelected= [];  
	            	planlist.dictionary.materialVersion = [];
	            	planlist.Selected.materialName = {};
	                alert(data.message);
	            }  
	        })
		}
/*********************************************************
*********************************************************/
		//时间戳格式转化
		Date.prototype.format = function() {
	   		var year = this.getFullYear().toString();
	   		var month = (this.getMonth()+1).toString();
	   		var day = this.getDate().toString();
	   		// console.log(year);

			if (month<10) {
				month = "0" + month;
			}

			if (day<10) {
				day = "0" + day;
			}

		 	return (year + "-" + month + "-" +day );
		}
/*********************************************************
*********************************************************/
		//根据检验计划类型获取检验计划
		$scope.queryQCPByType = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByType",
				// url: "plan/queryQCPByType.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"checkoutPlanTypeCode": planlist.Selected.QCPType.code,
					"page": localStorage.getItem('page')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	planlist.dictionary.materialVersion = [];
	            	planlist.Selected.materialName = {};
	                planlist.display = "display:block"; 
	 				localStorage.setItem('page',1);	
	                planlist.QCPSelected = data.contents;
	                 // localStorage.setItem("makeJobNumber",planCheck.makeJobNumber);
	                //localStorage.setItem("makeJobNumber",planHistoryListCopy.singleQCP.materialSid);
	                // console.log(planlist.QCPSelected.length);

	                for(var i=0,len=(planlist.QCPSelected).length;i<len;i++){
	                	(planlist.QCPSelected)[i].makeTime = (new Date((planlist.QCPSelected)[i].makeTime*1000)).format();
	                	(planlist.QCPSelected)[i].entryTime = (new Date((planlist.QCPSelected)[i].entryTime*1000)).format();
	                	// console.log((planlist.QCPSelected)[i])
	                }
	                // console.log(planlist.QCPSelected);
 
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	            	planlist.QCPSelected= [];  
	            	planlist.dictionary.materialVersion = [];
	            	planlist.Selected.materialName = {};
	                alert(data.message);
	            }  
	        })
		}
		
/**********************************************************
**********************************************************/
 //$scope.nextPage = function(){

  $scope.nextPage = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByType",
				// url: "plan/queryQCPByType.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"checkoutPlanTypeCode": planlist.Selected.QCPType.code,
					"page": planlist.page
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	planlist.dictionary.materialVersion = [];
	            	planlist.Selected.materialName = {};
	                planlist.display = "display:block"; 
	 				localStorage.setItem('page',1);	
	                planlist.QCPSelected = data.contents;
	                 // localStorage.setItem("makeJobNumber",planCheck.makeJobNumber);
	                //localStorage.setItem("makeJobNumber",planHistoryListCopy.singleQCP.materialSid);
	                // console.log(planlist.QCPSelected.length);

	                for(var i=0,len=(planlist.QCPSelected).length;i<len;i++){
	                	(planlist.QCPSelected)[i].makeTime = (new Date((planlist.QCPSelected)[i].makeTime*1000)).format();
	                	(planlist.QCPSelected)[i].entryTime = (new Date((planlist.QCPSelected)[i].entryTime*1000)).format();
	                	// console.log((planlist.QCPSelected)[i])
	                }
	                // console.log(planlist.QCPSelected);
 
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	            	planlist.QCPSelected= [];  
	            	planlist.dictionary.materialVersion = [];
	            	planlist.Selected.materialName = {};
	                alert(data.message);
	            }  
	        })
		}
 //}

/**********************************************************
**********************************************************/
		// 查询检验计划
		// $scope.queryQCP = function(){
		// 	$http({
		// 		method: "POST",
		// 		// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCP",
		// 		url: "plan/queryQCP.json",
		// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
		// 		data: {
		// 			"sid": localStorage.getItem('sid'),
		// 			"companySid": localStorage.getItem('cSid'),
		// 			"page": localStorage.getItem('page')
		// 		}
		// 	})
		// 	.success(function(data){
	 //            if (data.code == 'N01') {
	 //                // planlist.dictionary.materialName = data.contents;
	 //                planlist.QCPSelected = data.contents;          
	 //            }
	 //            else if(data.code=="E00"){
	 //                alert(data.message+",请重新登陆");
	 //                localStorage.clear();
	 //                $location.path('login').replace();
	 //            }else {
	 //                alert(data.message);
	 //            }  
	 //        })
		// }

		// $scope.queryQCP();

		//获取物料字典
		$scope.queryMaterialsInfo = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
				// url: "manage/engineer/material/queryMaterialsInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	planlist.dictionary.materialName = data.contents;

	            	 for(var i=0,len=(planlist.QCPSelected).length;i<len;i++){
	                	(planlist.QCPSelected)[i].makeTime = (new Date((planlist.QCPSelected)[i].makeTime*1000)).format();
	                	(planlist.QCPSelected)[i].entryTime = (new Date((planlist.QCPSelected)[i].entryTime*1000)).format();
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

	$scope.queryMaterialsInfo();




		//根据物料编号获取物料版本
		$scope.queryMaterialVersionByMaterialNo = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
				// url: "plan/queryMaterialVersionByMaterialNo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"materialNo": planlist.Selected.materialName.materialNo 
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {           	
	                planlist.display = "display:none"; 
	                planlist.dictionary.materialVersion = [];
	            	planlist.Selected.materialVersion = "";
	                planlist.dictionary.materialVersion = data.contents;

	                //  for(var i=0,len=(planlist.QCPSelected).length;i<len;i++){
	                // 	(planlist.QCPSelected)[i].makeTime = (new Date((planlist.QCPSelected)[i].makeTime*1000)).format();
	                // 	(planlist.QCPSelected)[i].entryTime = (new Date((planlist.QCPSelected)[i].entryTime*1000)).format();
	                // 	// console.log((planlist.QCPSelected)[i])
	                // }

	                 //planlist.QCPSelected = data.contents;
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		//根据物料ID和物料版本获取检验计划
		$scope.queryQCPByMaterial = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByMaterial",
				// url: "plan/queryQCPByMaterial.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"materialNo": planlist.Selected.materialName.materialNo ,
					"materialVersion": planlist.Selected.materialVersion
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {           	
	 				localStorage.setItem('page',1);
	                planlist.QCPSelected = data.contents;
	                 for(var i=0,len=(planlist.QCPSelected).length;i<len;i++){
	                	(planlist.QCPSelected)[i].makeTime = (new Date((planlist.QCPSelected)[i].makeTime*1000)).format();
	                	(planlist.QCPSelected)[i].entryTime = (new Date((planlist.QCPSelected)[i].entryTime*1000)).format();
	                	// console.log((planlist.QCPSelected)[i])
	                }

	            	// comsole.log()
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	            	planlist.QCPSelected = [];
	                alert(data.message);
	            }  
	        })
		}

}])
FIMS.controller('planCheckCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var planCheck = {
	};

		//调整时间格式
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		// console.log(year);

		if (month<10) {
			month = "0" + month;
		}

		if (day<10) {
			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}

	// 自执行函数，删除相关本地存储
	function init(){
		localStorage.removeItem('materialSid');
	}

	init();

	

	// $scope.makeTime = time.format();
	// $scope.entryTime = time.format();

	$scope.planCheckBack = function(){
		history.go(-1);

	}

	$scope.querySingleQCP = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleQCP",
			// url: "plan/querySingleQCP.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutPlanSid": localStorage.getItem('checkoutPlanSid'),
				"companySid": localStorage.getItem('companySid')
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	$scope.planCheck = data.contents;
            	// console.log($scope.planCheck);
            	var entrytime = new Date($scope.planCheck.entryTime*1000),
            		maketime = new Date($scope.planCheck.makeTime*1000);		
            	// console.log(entrytime);
              	$scope.planCheck.entryTime = entrytime.format();
              	$scope.planCheck.makeTime = maketime.format();
              	localStorage.setItem("materialSid",$scope.planCheck.materialSid);
              	//localStorage.setItem("makeJobNumber",$scope.planCheck.makeJobNumber);
              	// console.log($scope.planCheck.entryTime)

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('querySingleQCP'+data.message);
        });
	}

	$scope.querySingleQCP();



	var time  = new Date();
	// function toTime(date) {
	// 	return date.toLocaleDateString().split('/').join('-');	
	// }
	// $scope.makeTime = toTime(time);
	// console.log($scope.makeTime);





	// $scope.queryDicQCPType = function(){
	// 	$http({
	// 		url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
	// 		// url: "plan/queryDicQCPType.json",
	// 		method: "POST",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid')
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {
 				
 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }

	// $scope.queryDicQCPType();

	// //获取物料字典
	// $scope.queryMaterialsInfo = function(){
	// 	$http({
	// 		method: "POST",
	// 		// url: "account/joinCo/joinCo.json",
	// 		url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
	// 		// url: "manage/engineer/material/queryMaterialsInfo.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"companySid": localStorage.getItem('cSid')
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {
 //            	$scope.dictionary.materialNo = data.contents;
 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }

	// $scope.queryMaterialsInfo();

	// $scope.planCheck = planCheck;


	// //根据物料编号获取物料版本
	// $scope.queryMaterialVersionByMaterialNo = function(){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
	// 		// url: "plan/queryMaterialVersionByMaterialNo.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"companySid": localStorage.getItem('cSid'),
	// 			"materialNo": $scope.Selected.materialNo.materialNo 
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
 //                $scope.dictionary.materialVersion = [];
 //            	$scope.Selected.materialVersion = "";
 //                $scope.dictionary.materialVersion = data.contents;
 //                $scope.checkoutPlanNo = '';
 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }

	// //获取物料简称
	// $scope.queryMaterialShortName = function(){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialShortName",
	// 		// url: "plan/queryMaterialShortName.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"materialNo": $scope.Selected.materialNo.materialNo,
	// 			"materialVersion": $scope.Selected.materialVersion 
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
 //            	$scope.materialShortName = data.contents.materialShortName;
 //            	$scope.checkoutPlanNo = $scope.Selected.QCPType.code+"-"+$scope.Selected.materialNo.materialNo+"-"+$scope.Selected.materialVersion ;

 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }


	// /*********************************************************
	// *  
	// */

	// $scope.addQCP = function(){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCP",
	// 		// url: "plan/addQCP.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	//             "checkoutPlanNo":$scope.checkoutPlanNo,
	//             "checkoutPlanVersion":$scope.checkoutPlanVersion,
	//             "checkoutPlanTypeCode":$scope.Selected.QCPType.code,
	//             "checkoutPlanType":$scope.Selected.QCPType.name,
	//             "companySid":localStorage.getItem('cSid'),
	//             "companyShortName":localStorage.getItem('curCompanyName'),
	//             "materialSid":$scope.Selected.materialNo.materialSid,
	//             "materialNo":$scope.Selected.materialNo.materialNo,
	//             "materialVersion":$scope.Selected.materialVersion,
	//             "materialShortName":$scope.materialShortName,
	//             "aql":$scope.aql,
	//             // "entrySid":$scope. 1,
	//             "entryId":localStorage.getItem('email'),
	//             "entryJobNumber":localStorage.getItem('userJobNumber'),
	//             "entryName":$scope.entryName,
	//             "entryTime":((new Date($scope.entryTime)).valueOf())/1000,
	//             "makeJobNumber":localStorage.getItem('userJobNumber'),
	//             "makeName":$scope.makeName,
	//             "makeTime":((new Date($scope.makeTime)).valueOf())/1000,
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
	// 	     	alert(data.message);
	// 	     	$location.path('account_index/planList');       	
 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }

	// $scope.backQCP = function(){
	// 	var a = confirm("您确定要退出吗？退出将丢失填写数据!")
	// 	if (a) {
	// 		$location.path("account_index/planList");
	// 	}
	// }
	
}])
FIMS.controller('planReviseCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var planRevise = {

		keyCheckoutPlan:{
                  sid:"",
                  checkoutPlanSid: 1,
                  checkoutPlanNo: "",
                  checkoutPlanVersion: "",
                  checkoutPlanTypeCode: "",
                  checkoutPlanType: "",
                  companySid: 1,
                  companyShortName: "",
                  materialSid: 1,
                  materialNo: "",
                  materialVersion: "",
                  materialShortName: "",
                  aql: "",
                  entrySid: 1,
                  entrySidHash: 1,
                  entryId: "",
                  entryJobNumber: "",
                  entryName: "",
                  entryTime: "",
                  makeJobNumber: "",
                  makeName: "",
                  makeTime: "",
                  operateStatusCode: "1",
                  operateStatus: "1",
                  checkoutPlanStatusCode: "1",
                  checkoutPlanStatus: "1",
                  notes: "1",
                  page:"2"
		},

		auxCheckoutPlan:{
                  checkoutPlanSid: 1,
                  checkoutPlanSidHash: 1,
                  checkoutPlanNo: "20140420",
                  checkoutPlanVersion: "A",
                  checkoutPlanTypeCode: "A",
                  checkoutPlanType: "A",
                  companySid: 1,
                  companySidHash: 1,
                  companyShortName: "极创",
                  materialSid: 1,
                  materialSidHash: 1,
                  materialNo: "1",
                  materialVersion: "A",
                  materialShortName: "A",
                  aql: 5,
                  entrySid: 1,
                  entrySidHash: 1,
                  entryId: "1",
                  entryJobNumber: "123",
                  entryName: "123",
                  entryTime: 123,
                  makeJobNumber: "2014",
                  makeName: "123",
                  makeTime: 123,
                  operateStatusCode: "1",
                  operateStatus: "1",
                  checkoutPlanStatusCode: "1",
                  checkoutPlanStatus: "1",
                  notes: "1"

      		},

      		selectedCheckoutPlanSid: 0


      	};
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/
	var dataTransfer = function(oObj,iObj){

            oObj.sid                  = iObj.sid;
            oObj.checkoutPlanSid      = iObj.checkoutPlanSid;
            oObj.checkoutPlanNo       =	iObj.checkoutPlanNo;
            oObj.checkoutPlanVersion  =	iObj.checkoutPlanVersion;
            oObj.checkoutPlanTypeCode =	iObj.checkoutPlanTypeCode;
            oObj.checkoutPlanType     =	iObj.checkoutPlanType;
            oObj.companySid           =	iObj.companySid;
            oObj.companyShortName     =	iObj.companyShortName;
            oObj.materialSid          =	iObj.materialSid;
            oObj.materialNo           =	iObj.materialNo;
            oObj.materialVersion      =	iObj.materialVersion;
            oObj.materialShortName    =	iObj.materialShortName;
            oObj.aql                  =	iObj.aql;
            oObj.entrySid             =	iObj.entrySid;
            oObj.entrySidHash         =	iObj.entrySidHash;
            oObj.entryId              =	iObj.entryId;
            oObj.entryJobNumber       =	iObj.entryJobNumber;
            oObj.entryName            =	iObj.entryName;
            oObj.entryTime            =	iObj.entryTime;
            oObj.makeJobNumber        =	iObj.makeJobNumber;
            oObj.makeName             =	iObj.makeName;
            oObj.makeTime             =	iObj.makeTime;
            oObj.operateStatusCode    =	iObj.operateStatusCode;
            oObj.operateStatus        =	iObj.operateStatus;
            oObj.checkoutPlanStatusCode = iObj.checkoutPlanStatusCode;
            oObj.checkoutPlanStatus   =	iObj.checkoutPlanStatus;
            oObj.notes                =	iObj.notes;
            oObj.page                 =	iObj.page;

	}
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/
      //时间格式转换函数
      Date.prototype.format = function() {
            var year = this.getFullYear().toString();
            var month = (this.getMonth()+1).toString();
            var day = this.getDate().toString();

            if (month<10) {
                  month = "0" + month;
            }

            if (day<10) {
                  day = "0" + day;
            }

            return (year + "-" + month + "-" +day );
      }

	planRevise.querySingleQCP = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleQCP",
			 // url: "plan/querySingleQCP.json",
                   headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutPlanSid": localStorage.getItem('checkoutPlanSid'),
                        "companySid": localStorage.getItem('companySid')
 
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	//alert("公司信息更新成功");
            	//$location.path("account_index/chooseModule");
            	planRevise.auxCheckoutPlan = data.contents;

            	// console.log(planRevise.auxCheckoutPlan);
            	dataTransfer(planRevise.keyCheckoutPlan,planRevise.auxCheckoutPlan);
                  var maketime = new Date(planRevise.auxCheckoutPlan.makeTime*1000),
                      entrytime = new Date(planRevise.auxCheckoutPlan.entryTime*1000);
                  planRevise.keyCheckoutPlan.makeTime = maketime.format();
                  planRevise.keyCheckoutPlan.entryTime = entrytime.format();

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('querySingleQCP'+data.message);
        });
	}

/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

	planRevise.updateQCP = function(){

		// 准备参数
		var assemblyObj = function(){
			var o = {};

			o.sid		                = planRevise.keyCheckoutPlan.sid,
                  o.checkoutPlanSid		    = planRevise.keyCheckoutPlan.checkoutPlanSid,
                  o.aql		                = planRevise.keyCheckoutPlan.aql,
                  o.entryId		            = planRevise.keyCheckoutPlan.entryId,
                  o.entryJobNumber		    = planRevise.keyCheckoutPlan.entryJobNumber,
                  o.entryName		            = planRevise.keyCheckoutPlan.entryName,
                  o.entryTime		            = planRevise.keyCheckoutPlan.entryTime,
                  o.makeJobNumber		        = planRevise.keyCheckoutPlan.makeJobNumber,
                  o.makeName		            = planRevise.keyCheckoutPlan.makeName,
                  o.makeTime		            = planRevise.keyCheckoutPlan.makeTime,
                  o.notes		                = planRevise.keyCheckoutPlan.notes

			return o;
		}

		var entry = assemblyObj();

		 // alert("set11");
        // console.log(entry);
	 	//  alert("set11");

		//
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/updateQCP",
			// url: "plan/updateQCP.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					sid		                    : localStorage.getItem('sid'),
		            checkoutPlanSid		        : localStorage.getItem("checkoutPlanSid"),
		            aql		                    : entry.aql,
		            entryId		                : localStorage.getItem("email"),
		            entryJobNumber		        : localStorage.getItem("userJobNumber"),
		            entryName		            : localStorage.getItem("userName"),
		            entryTime		            : parseInt((new Date().valueOf())/1000),
		            makeName		            : entry.makeName,
                        makeJobNumber                 : entry.makeJobNumber,
		            makeTime		            : parseInt((new Date(entry.makeTime)).valueOf()/1000),
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	alert(data.message);
                  $location.path('account_index/planList');
                  planRevise.querySingleQCP();
            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else if(data.code=="E01"){
                alert(data.message+",AQL格式不正确");
            
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('updateQCP'+data.message);
        });
	}

      planRevise.activateQCP = function(){
            $http({
                  method: "POST",
                  url: config.HOST + "/api/2.0/bp/qcp/qcp/activateQCP",
                  // url: "plan/activateQCP.json",
                  headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                  data: {
                        sid                             : localStorage.getItem('sid'),
                        checkoutPlanSid                 : localStorage.getItem("checkoutPlanSid")
                  }
            })
            .success(function(data){
            if (data.code=="N01"){
                  alert(data.message);
                  $location.path('account_index/planList');
            }
            else if(data.code=="E00"){
                  alert(data.message+"，请重新登录");
                  localStorage.clear();
                  $location.path('login');
            }else {
                  console.log(data.message);
            }
        }).error(function () {
            console.log('updateQCP'+data.message);
        });
      }

     planRevise.back = function(){
            $location.path("account_index/planList");
      }
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/





/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

	$scope.planRevise = planRevise;
	planRevise.querySingleQCP();

}])


FIMS.controller('planAddCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var planAdd = {
		dictionary: {
			QCPType: [],
			materialNo: [],
			materialVersion: []
		},
		
		Selected : {
			QCPType: {},
			materialNo : {},
			// materialVersion : {},
			// materialNo: "",
			materialVersion: ""
		},

		materialShortName : "",
		checkoutPlanNo: "",
		checkoutPlanVersion : "",
		aql: "",
		makeName : localStorage.getItem("userName"),
		makeTime: "",
		entryName: localStorage.getItem("userName"),
		makeJobNumber : localStorage.getItem("userJobNumber"),
		 //"makeJobNumber":localStorage.getItem('userJobNumber'),
		entryTime: ""


	};

	var time  = new Date();
	// function toTime(date) {
	// 	return date.toLocaleDateString().split('/').join('-');	
	// }
	// planAdd.makeTime = toTime(time);
	// console.log(planAdd.makeTime);

	//调整时间格式
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		//console.log(year);

		if (month<10) {
			month = "0" + month;
		}

		if (day<10) {
			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}

	planAdd.makeTime = time.format();
	planAdd.entryTime = time.format();



	$scope.queryDicQCPType = function(){
		$http({
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
			// url: "plan/queryDicQCPType.json",
			method: "POST",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid')
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
 				planAdd.dictionary.QCPType = [];
                for (var i=0; i < data.contents.length;i++) {
                	planAdd.dictionary.QCPType.push({
                		"name": data.contents[i].checkoutPlanType,
                		"code": data.contents[i].checkoutPlanTypeCode
                	});
                }
        		planAdd.Selected.QCPType = (planAdd.dictionary.QCPType)[0];
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }
                else if(data.code=="E01"){
                alert(data.message+",AQL格式不正确");
               }     else {
                alert(data.message);
               }  
        })
	}

	$scope.queryDicQCPType();

	//获取物料字典
	$scope.queryMaterialsInfo = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
			// url: "manage/engineer/material/queryMaterialsInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid')
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	planAdd.dictionary.materialNo = data.contents;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	$scope.queryMaterialsInfo();

	$scope.planAdd = planAdd;


	//根据物料编号获取物料版本
	$scope.queryMaterialVersionByMaterialNo = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
			// url: "plan/queryMaterialVersionByMaterialNo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"materialNo": planAdd.Selected.materialNo.materialNo 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                planAdd.dictionary.materialVersion = [];
            	planAdd.Selected.materialVersion = "";
                planAdd.dictionary.materialVersion = data.contents;
                planAdd.checkoutPlanNo = '';
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	//获取物料简称
	$scope.queryMaterialShortName = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialShortName",
			// url: "plan/queryMaterialShortName.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"materialNo": planAdd.Selected.materialNo.materialNo,
				"materialVersion": planAdd.Selected.materialVersion 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
            	planAdd.materialShortName = data.contents.materialShortName;
            	planAdd.checkoutPlanNo = planAdd.Selected.QCPType.code+"-"+planAdd.Selected.materialNo.materialNo;
            	//planAdd.checkoutPlanNo = planAdd.Selected.QCPType.code+"-"+planAdd.Selected.materialNo.materialNo+"-"+planAdd.Selected.materialVersion ;

            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}


	/*********************************************************
	*  
	*/

	$scope.addQCP = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCP",
			// url: "plan/addQCP.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
	            "checkoutPlanNo":planAdd.checkoutPlanNo,
	            "checkoutPlanVersion":planAdd.checkoutPlanVersion,
	            "checkoutPlanTypeCode":planAdd.Selected.QCPType.code,
	            "checkoutPlanType":planAdd.Selected.QCPType.name,
	            "companySid":localStorage.getItem('cSid'),
	            "companyShortName":localStorage.getItem('curCompanyName'),
	            "materialSid":planAdd.Selected.materialNo.materialSid,
	            "materialNo":planAdd.Selected.materialNo.materialNo,
	            "materialVersion":planAdd.Selected.materialVersion,
	            "materialShortName":planAdd.materialShortName,
	            "aql":planAdd.aql,
	            // "entrySid":planAdd. 1,
	            "entryId":localStorage.getItem('email'),
	            "entryJobNumber":localStorage.getItem('userJobNumber'),
	            "entryName":planAdd.entryName,
	            "entryTime":((new Date(planAdd.entryTime)).valueOf())/1000,
	            "makeJobNumber":planAdd.makeJobNumber,
	            "makeName":planAdd.makeName,
	            "makeTime":((new Date(planAdd.makeTime)).valueOf())/1000,
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
		     	alert(data.message);
		     	$location.path('account_index/planList');       	
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}
/************************************************************
*************************************************************
只能输入数字和小数点的限制
*************************************************************
************************************************************/
function check(e) { 
    var re = /^\d+(?=\.{0,1}\d+$|$)/ 
    if (e.value != "") { 
        if (!re.test(e.value)) { 
            alert("请输入正确的数字"); 
            e.value = ""; 
            e.focus(); 
        } 
    } 
} 

/************************************************************
*************************************************************
*************************************************************
************************************************************/


	$scope.backQCP = function(){
		var a = confirm("您确定要退出吗？退出将丢失填写数据!")
		if (a) {
			$location.path("account_index/planList");
		}
	}
	
}])
FIMS.controller('planMetricListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planMetricList = {
			
			viewSelectedCheckoutPlanSid: 0,

			viewSelectedCheckoutMetricSid: 0,

			DXCheckoutMetricList:[],

			DLCheckoutMetricList:[],

			dictionary: {
				checkoutTool: [],
				checkoutMetricClassify: []
			},

			Selected: {
				dxCheckoutTool:{},
				dxCheckoutMetricClassify:{},
				dlCheckoutTool:{},
				dlCheckoutMetricClassify:{},
				dxReviseTool: {},
				dlReviseTool: {},	
				dxReviseClassify: {},
				dlReviseClassify: {}			
			},

        	addDX: {
	            "checkoutPlanSid": localStorage.getItem('checkoutPlanSid'),
	            "checkoutMetricName": "",
	            "checkoutMetricDescription": "",
	            "checkoutToolCode": "",
	            "checkoutToolName": "",
	            "checkoutMetricTypeCode": "DX",
	            "checkoutMetricType": "定性检验",
	            "checkoutMetricClassifyCode": "",
	            "checkoutMetricClassify": "",
	            "processName": "",
	            "metricUnit": "",
	            "referenceStandard": "",
	            "underTolerance": "",
	            "upTolerance": "",
	            "mapPosition": "",
	            "threeDimensionalRogramNo": "",
	            "fixtureId": "",
	            "checkoutMetricNo": ""
        	},

        	reviseDX: {
	            "checkoutPlanSid": localStorage.getItem('checkoutPlanSid'),
	            "checkoutMetricName": "",
	            "checkoutMetricDescription": "",
	            "checkoutToolCode": "",
	            "checkoutToolName": "",
	            "checkoutMetricTypeCode": "DX",
	            "checkoutMetricType": "定性检验",
	            "checkoutMetricClassifyCode": "",
	            "checkoutMetricClassify": "",
	            "processName": "",
	            "metricUnit": "",
	            "referenceStandard": "",
	            "underTolerance": "",
	            "upTolerance": "",
	            "mapPosition": "",
	            "threeDimensionalRogramNo": "",
	            "fixtureId": "",
	            "checkoutMetricNo": "",
	            "checkoutToolDisplay":""
        	},

        	addDL: {
	            "checkoutPlanSid": localStorage.getItem('checkoutPlanSid'),
	            "checkoutMetricName": "",
	            "checkoutMetricDescription": "",
	            "checkoutToolCode": "",
	            "checkoutToolName": "",
	            "checkoutMetricTypeCode": "DL",
	            "checkoutMetricType": "定量检验",
	            "checkoutMetricClassifyCode": "",
	            "checkoutMetricClassify": "",
	            "processName": "",
	            "metricUnit": "",
	            "referenceStandard": "",
	            "underTolerance": "",
	            "upTolerance": "",
	            "mapPosition": "",
	            "threeDimensionalRogramNo": "",
	            "fixtureId": "",
	            "checkoutMetricNo": ""
        	},

        	reviseDL: {
	            "checkoutPlanSid": localStorage.getItem('checkoutPlanSid'),
	            "checkoutMetricName": "",
	            "checkoutMetricDescription": "",
	            "checkoutToolCode": "",
	            "checkoutToolName": "",
	            "checkoutMetricTypeCode": "DL",
	            "checkoutMetricType": "定量检验",
	            "checkoutMetricClassifyCode": "",
	            "checkoutMetricClassify": "",
	            "processName": "",
	            "metricUnit": "",
	            "referenceStandard": "",
	            "underTolerance": "",
	            "upTolerance": "",
	            "mapPosition": "",
	            "threeDimensionalRogramNo": "",
	            "fixtureId": "",
	            "checkoutMetricNo": "",
	            "checkoutToolDisplay": ""

        	}

	};
	// 获取要修改的定量检验项目
	$scope.reviseDLItem = function(obj){
        planMetricList.reviseDL.checkoutPlanSid = localStorage.getItem('checkoutPlanSid'),
        planMetricList.reviseDL.checkoutMetricSid = obj.checkoutMetricSid;
        planMetricList.reviseDL.checkoutMetricName = obj.checkoutMetricName;
        planMetricList.reviseDL.checkoutMetricDescription =  obj.checkoutMetricDescription;

		planMetricList.reviseDL.checkoutToolDisplay = obj.checkoutToolDisplay;
        planMetricList.reviseDL.checkoutMetricClassifyDisplay = obj.checkoutMetricClassifyDisplay;

        planMetricList.Selected.dlReviseTool =  planMetricList.dictionary.checkoutTool[planMetricList.reviseDL.checkoutToolDisplay];
        planMetricList.Selected.dlReviseClassify =  planMetricList.dictionary.checkoutMetricClassify[planMetricList.reviseDL.checkoutMetricClassifyDisplay];
        
        planMetricList.reviseDL.processName =  obj.processName;
        planMetricList.reviseDL.metricUnit = obj.metricUnit;
        planMetricList.reviseDL.referenceStandard = obj.referenceStandard ;
        planMetricList.reviseDL.underTolerance = obj.underTolerance ;
        planMetricList.reviseDL.upTolerance = obj.upTolerance ;
        planMetricList.reviseDL.mapPosition = obj.mapPosition ;
        planMetricList.reviseDL.threeDimensionalRogramNo = obj.threeDimensionalRogramNo ;
        planMetricList.reviseDL.fixtureId = obj.fixtureId;
        planMetricList.reviseDL.checkoutMetricNo =  obj.checkoutMetricNo;

	}
	// 提交修改的定量检验项目
	$scope.updateDLItem = function(){
		console.log('ss');
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/updateQCPItems",
			// url: "plan/updateQCPItems.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutMetrics": [{
					'checkoutPlanSid': localStorage.getItem('checkoutPlanSid'),
					'checkoutMetricSid': planMetricList.reviseDL.checkoutMetricSid,
			       	'checkoutMetricName': planMetricList.reviseDL.checkoutMetricName,
			       	'checkoutMetricDescription':  planMetricList.reviseDL.checkoutMetricDescription,
			       	'checkoutToolCode': planMetricList.Selected.dlReviseTool.checkoutToolCode,
			       	'checkoutToolName': planMetricList.Selected.dlReviseTool.checkoutToolName,
			       	"checkoutMetricType": "定量检验",
			       	"checkoutMetricTypeCode": "DL",
	            	"checkoutMetricClassifyCode": planMetricList.Selected.dlReviseClassify.checkoutMetricClassifyCode,
		            "checkoutMetricClassify": planMetricList.Selected.dlReviseClassify.checkoutMetricClassify,
			       	'processName':  planMetricList.reviseDL.processName,
		       	  	"metricUnit": planMetricList.reviseDL.metricUnit,
		            "referenceStandard": planMetricList.reviseDL.referenceStandard,
		            "underTolerance": planMetricList.reviseDL.underTolerance,
		            "upTolerance": planMetricList.reviseDL.upTolerance,
		            "mapPosition": planMetricList.reviseDL.mapPosition,
		            "threeDimensionalRogramNo": planMetricList.reviseDL.threeDimensionalRogramNo,
		            "fixtureId": planMetricList.reviseDL.fixtureId,
			       	'checkoutMetricNo':  planMetricList.reviseDL.checkoutMetricNo
				}]
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
 				alert("定量项目更新成功");
 				planMetricList.queryQCPItems();
 				// console.log(planMetricList.dictionary.checkoutTool);
        		// planMetricList.Selected.CheckoutTool = (planMetricList.dictionary.CheckoutTool)[0];
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}





	// 获取修改检验项目
	$scope.reviseDXItem = function(obj){
        planMetricList.reviseDX.checkoutPlanSid = localStorage.getItem('checkoutPlanSid'),
        planMetricList.reviseDX.checkoutMetricSid = obj.checkoutMetricSid;
        planMetricList.reviseDX.checkoutMetricName = obj.checkoutMetricName;
        planMetricList.reviseDX.checkoutMetricDescription =  obj.checkoutMetricDescription;

        planMetricList.reviseDX.checkoutToolDisplay = obj.checkoutToolDisplay;
        planMetricList.reviseDX.checkoutMetricClassifyDisplay = obj.checkoutMetricClassifyDisplay;


        planMetricList.Selected.dxReviseTool =  planMetricList.dictionary.checkoutTool[planMetricList.reviseDX.checkoutToolDisplay];
        planMetricList.Selected.dxReviseClassify =  planMetricList.dictionary.checkoutMetricClassify[planMetricList.reviseDX.checkoutMetricClassifyDisplay];
        planMetricList.reviseDX.processName =  obj.processName;
        planMetricList.reviseDX.checkoutMetricNo =  obj.checkoutMetricNo;
	}

	//提交定性检验项目
	$scope.updateDXItem = function(){
		console.log('ss');
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/updateQCPItems",
			// url: "plan/updateQCPItems.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutMetrics": [{
					'checkoutPlanSid': localStorage.getItem('checkoutPlanSid'),
					'checkoutMetricSid': planMetricList.reviseDX.checkoutMetricSid,
			       	'checkoutMetricName': planMetricList.reviseDX.checkoutMetricName,
			       	'checkoutMetricDescription':  planMetricList.reviseDX.checkoutMetricDescription,
			       	'checkoutToolCode': planMetricList.Selected.dxReviseTool.checkoutToolCode,
			       	'checkoutToolName': planMetricList.Selected.dxReviseTool.checkoutToolName,
			       	"checkoutMetricType": "定性检验",
			       	"checkoutMetricTypeCode": "DX",
	            	"checkoutMetricClassifyCode": planMetricList.Selected.dxReviseClassify.checkoutMetricClassifyCode,
		            "checkoutMetricClassify": planMetricList.Selected.dxReviseClassify.checkoutMetricClassify,
			       	'processName':  planMetricList.reviseDX.processName,
			       	'checkoutMetricNo':  planMetricList.reviseDX.checkoutMetricNo
				}]
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
 				alert("更新成功");
 				planMetricList.queryQCPItems();
 				// console.log(planMetricList.dictionary.checkoutTool);
        		// planMetricList.Selected.CheckoutTool = (planMetricList.dictionary.CheckoutTool)[0];
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}


	// 获取检验工具字典
	$scope.queryDicCheckoutMetricClassify = function(){
		$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/account/dic/queryDicCheckoutMetricClassify",
				// url: "plan/queryDicCheckoutMetricClassify.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	 				planMetricList.dictionary.checkoutMetricClassify = data.contents;
	 				// console.log(planMetricList.dictionary.checkoutTool);
            		// planMetricList.Selected.CheckoutTool = (planMetricList.dictionary.CheckoutTool)[0];
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
	}

	$scope.queryDicCheckoutMetricClassify();


	// 获取检验工具字典
	$scope.queryDicCheckoutTool = function(){
		$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/account/dic/queryDicCheckoutTool",
				// url: "plan/queryDicCheckoutTool.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid')					
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	 				planMetricList.dictionary.checkoutTool = data.contents;
	 				// console.log(planMetricList.dictionary.checkoutTool);
            		// planMetricList.Selected.CheckoutTool = (planMetricList.dictionary.CheckoutTool)[0];
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
	}

	$scope.queryDicCheckoutTool();


	// 	//  /api/2.0/bp/qcp/qcp
		
	// 	$scope.queryDicQCPType = function(){
	// 		$http({
	// 			method: "POST",
	// 			// url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
	// 			url: "plan/queryDicQCPType.json",
	// 			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 			data: {
	// 				"sid": localStorage.getItem('sid'),
	// 			}
	// 		})
	// 		.success(function(data){
	//             if (data.code == 'N01') {
	//  				planMetricList.dictionary.QCPType = [];
	//                 for (var i=0; i < data.contents.length;i++) {
	//                 	planMetricList.dictionary.QCPType.push({
	//                 		"name": data.contents[i].checkoutPlanType,
	//                 		"code": data.contents[i].checkoutPlanTypeCode
	//                 	});
	//                 }
 //            		planMetricList.Selected.QCPType = (planMetricList.dictionary.QCPType)[0];
 //            		$scope.queryQCPByType(planMetricList.Selected.QCPType.code);

	//             }
	//             else if(data.code=="E00"){
	//                 alert(data.message+",请重新登陆");
	//                 localStorage.clear();
	//                 $location.path('login').replace();
	//             }else {
	//                 alert(data.message);
	//             }  
	//         })
	// 	}

/*
***************************************************
***************************************************
queryQCPItems
***************************************************
***************************************************
*/

	var parseQueryData = function(array){

		var dx =[];
		var dl =[];

		// 肯定又数据的情况；
		for (var i=0;i<array.length;i++){
			checkoutMetrics = array[i];
			if (checkoutMetrics.checkoutMetricTypeCode ==="DX")
				dx.push(checkoutMetrics);
			else if (checkoutMetrics.checkoutMetricTypeCode ==="DL")
				dl.push(checkoutMetrics);
			else
				alert("检验指标类型既不非定性，也非定量")
		}

		planMetricList.DXCheckoutMetricList = dx;
		planMetricList.DLCheckoutMetricList = dl;
	}

	planMetricList.queryQCPItems = function(){

		// 准备参数
		var assemblyObj = function(){
			var o = {};

			o.sid		                = localStorage.getItem('sid');

            o.checkoutPlanSid		    = localStorage.getItem('checkoutPlanSid');

            // localStorage.removeItem("checkoutPlanSid");

            // console.log(localStorage.getItem('checkoutPlanSid'));

			return o;
		}

		var entry = assemblyObj();
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPItems",
			// url: "plan/queryQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					sid		                    : entry.sid,
		            checkoutPlanSid		        : entry.checkoutPlanSid,
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	//alert("检验计划信息更新成功");
            	//$location.path("account_index/chooseModule");
            	// console.log(data.contents);
            	//绑定数据
            	parseQueryData(data.contents);

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('queryQCPItems'+data.message);
        });
	}

	//将定性和定量分开保存
	var parseQueryData = function(array){

		var dx =[];
		var dl =[];

		// 肯定又数据的情况；
		for (var i=0;i<array.length;i++){
			checkoutMetrics = array[i];
			if (checkoutMetrics.checkoutMetricTypeCode ==="DX")
				dx.push(checkoutMetrics);
			else if (checkoutMetrics.checkoutMetricTypeCode ==="DL")
				dl.push(checkoutMetrics);
			else
				alert("检验指标类型既不非定性，也非定量")
		}

		planMetricList.DXCheckoutMetricList = dx;
		planMetricList.DLCheckoutMetricList = dl;
	}


// ***************************************************
// ***************************************************
// addQCPItems  (parseAddData)
// ***************************************************
// ***************************************************

	$scope.addDXQCPItems = function(type){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCPItems",
			// url: "plan/addDXQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
    			"checkoutMetrics": [{
    				// "checkoutMetricSid": "",
		            "checkoutPlanSid":planMetricList.addDX.checkoutPlanSid,
		            "checkoutMetricName":planMetricList.addDX.checkoutMetricName,
		            "checkoutMetricDescription":planMetricList.addDX.checkoutMetricDescription,
	                "checkoutToolCode": planMetricList.Selected.dxCheckoutTool.checkoutToolCode,
	           		"checkoutToolName": planMetricList.Selected.dxCheckoutTool.checkoutToolName,
	            	"checkoutMetricTypeCode": "DX",
	                "checkoutMetricType": "定性检验",
	            	"checkoutMetricClassifyCode": planMetricList.Selected.dxCheckoutMetricClassify.checkoutMetricClassifyCode,
	            	"checkoutMetricClassify": planMetricList.Selected.dxCheckoutMetricClassify.checkoutMetricClassify,
		            "processName":planMetricList.addDX.processName,
		            "metricUnit":planMetricList.addDX.metricUnit,
		            // "referenceStandard":planMetricList.addDX.referenceStandard,
		            // "underTolerance":planMetricList.addDX.underTolerance,
		            // "upTolerance":planMetricList.addDX.upTolerance,
		            "mapPosition":planMetricList.addDX.mapPosition,
		            "threeDimensionalRogramNo":planMetricList.addDX.threeDimensionalRogramNo,
		            "fixtureId":planMetricList.addDX.fixtureId,
		            "checkoutMetricNo":planMetricList.addDX.checkoutMetricNo

	  	        }]
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	alert("检验项目信息添加成功");
            	planMetricList.queryQCPItems();
            	planMetricList.addDX = {
		            "checkoutPlanSid": localStorage.getItem('checkoutPlanSid'),
		            "checkoutMetricName": "",
		            "checkoutMetricDescription": "",
		            "checkoutToolCode": "",
		            "checkoutToolName": "",
		            "checkoutMetricTypeCode": "DX",
		            "checkoutMetricType": "定性检验",
		            "checkoutMetricClassifyCode": "",
		            "checkoutMetricClassify": "",
		            "processName": "",
		            "metricUnit": "",
		            "referenceStandard": "",
		            "underTolerance": "",
		            "upTolerance": "",
		            "mapPosition": "",
		            "threeDimensionalRogramNo": "",
		            "fixtureId": "",
		            "checkoutMetricNo": ""
        		};
        		planMetricList.Selected.dxCheckoutTool = {};
	        	planMetricList.Selected.dxCheckoutMetricClassify = {};

          //  	//$location.path("account_index/chooseModule");

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('updateQCP'+data.message);
        });
	}


	$scope.addDLQCPItems = function(type){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCPItems",
			// url: "plan/addDLQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
    			"checkoutMetrics": [{
    				// "checkoutMetricSid": "",
		            "checkoutPlanSid":planMetricList.addDL.checkoutPlanSid,
		            "checkoutMetricName":planMetricList.addDL.checkoutMetricName,
		            "checkoutMetricDescription":planMetricList.addDL.checkoutMetricDescription,
	                "checkoutToolCode": planMetricList.Selected.dlCheckoutTool.checkoutToolCode,
	           		"checkoutToolName": planMetricList.Selected.dlCheckoutTool.checkoutToolName,
	            	"checkoutMetricTypeCode": "DL",
	                "checkoutMetricType": "定量检验",
	            	"checkoutMetricClassifyCode": planMetricList.Selected.dlCheckoutMetricClassify.checkoutMetricClassifyCode,
	            	"checkoutMetricClassify": planMetricList.Selected.dlCheckoutMetricClassify.checkoutMetricClassify,
		            "processName":planMetricList.addDL.processName,
		            "metricUnit":planMetricList.addDL.metricUnit,
		            "referenceStandard":planMetricList.addDL.referenceStandard,
		            "underTolerance":planMetricList.addDL.underTolerance,
		            "upTolerance":planMetricList.addDL.upTolerance,
		            "mapPosition":planMetricList.addDL.mapPosition,
		            "threeDimensionalRogramNo":planMetricList.addDL.threeDimensionalRogramNo,
		            "fixtureId":planMetricList.addDL.fixtureId,
		            "checkoutMetricNo":planMetricList.addDL.checkoutMetricNo

	  	        }]
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	alert("检验项目信息添加成功");
            	planMetricList.queryQCPItems();

	        	planMetricList.addDL = {
		            "checkoutPlanSid": localStorage.getItem('checkoutPlanSid'),
		            "checkoutMetricName": "",
		            "checkoutMetricDescription": "",
		            "checkoutToolCode": "",
		            "checkoutToolName": "",
		            "checkoutMetricTypeCode": "DL",
		            "checkoutMetricType": "定量检验",
		            "checkoutMetricClassifyCode": "",
		            "checkoutMetricClassify": "",
		            "processName": "",
		            "metricUnit": "",
		            "referenceStandard": "",
		            "underTolerance": "",
		            "upTolerance": "",
		            "mapPosition": "",
		            "threeDimensionalRogramNo": "",
		            "fixtureId": "",
		            "checkoutMetricNo": ""
	        	};

	        	planMetricList.Selected.dlCheckoutTool = {};
	        	planMetricList.Selected.dlCheckoutMetricClassify = {};

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('updateQCP'+data.message);
        });
	}

	$scope.removeItem = function(cmSid){
		var a = confirm("您确定要删除吗？删除后数据不可恢复!")
		if (a) {
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/deleteQCPItems",
				// url: "plan/addDLQCPItems.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
	    			"checkoutMetrics": [{
						"checkoutMetricSid": cmSid
		  	        }]
				}
			})
			.success(function(data){
	            if (data.code=="N01"){
	            	alert("删除定性检验项目成功!");
	            	// DXCheckoutMetricList.splice(index, 1);
	            	planMetricList.queryQCPItems();
	            }
	            else if(data.code=="E00"){
	            	alert(data.message+"，请重新登录");
	            	localStorage.clear();
	            	$location.path('login');
	            }else {
	            	console.log(data.message);
	            }
	        }).error(function () {
	            console.log('updateQCP'+data.message);
	        });
    	}
	}

	
	

/*
***************************************************
***************************************************
***************************************************
***************************************************
*/
      $scope.planMetricListBack = function() {

   	       history.go(-1);
   }

	$scope.planMetricList = planMetricList;

	planMetricList.queryQCPItems();


}])


FIMS.controller('planHistoryListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planHistoryList = {
			//检验计划字典
			dicQCPType :[],
			selQCPType : {},
			QCP:[]
			// display: "",
			// page: 1
		};
         
         //时间戳格式转化
		Date.prototype.format = function() {
	   		var year = this.getFullYear().toString();
	   		var month = (this.getMonth()+1).toString();
	   		var day = this.getDate().toString();
	   		// console.log(year);

			if (month<10) {
				month = "0" + month;
			}

			if (day<10) {
				day = "0" + day;
			}

		 	return (year + "-" + month + "-" +day );
		}


		$scope.planHistoryListBack = function(){
			// $location.path('account_index/chooseModule').replace();
			 $location.path("account_index/planRevise");
		}

		//根据检验计划类型获取检验计划
		$scope.checkHistoryQCP = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/checkHistoryQCP",
				// url: "plan/checkHistoryQCP.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"materialSid": localStorage.getItem('materialSid'),
					"checkoutPlanTypeCode": planHistoryList.selQCPType.code
					// "page": localStorage.getItem('page')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	 //planHistoryList.dicQCPType = [];
	            	 //planHistoryList.Selected.materialName = {};
	                // planHistoryList.display = "display:block"; 
	 				// localStorage.setItem('page',1);	
	                planHistoryList.QCP = data.contents;

	             //      var entrytime = new Date(planHistoryList.QCP.entryTime*1000),
              //             maketime = new Date(planHistoryList.QCP.makeTime*1000);   
              // // console.log(entrytime);
              //   planHistoryList.QCP.entryTime = entrytime.format();
              //   planHistoryList.QCP.makeTime = maketime.format();

	                //console.log(planHistoryList.QCP); 
	                // planHistoryList.QCP.makeTime = time.format();
	                // planHistoryList.QCP.entryTime = time.format();
	                  for(var i=0,len=(planHistoryList.QCP).length;i<len;i++){
	                  	(planHistoryList.QCP)[i].makeTime = (new Date((planHistoryList.QCP)[i].makeTime*1000)).format();
	                  	(planHistoryList.QCP)[i].entryTime = (new Date((planHistoryList.QCP)[i].entryTime*1000)).format();
	                // // 	// console.log((planlist.QCPSelected)[i])
	                 }


	                   // localStorage.setItem("materialSid");
	                   // localStorage.setItem("materialSid",data.contents.materialSid);
	                   // localStorage.setItem("materialSid",planHistoryList.QCP.materialSid);

	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	            	// planHistoryList.QCPSelected= [];  
	            	// planHistoryList.dictionary.materialVersion = [];
	            	// planHistoryList.Selected.materialName = {};
	                alert(data.message);
	            }  
	        })
		}

		
		$scope.queryDicQCPType = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
				// url: "plan/queryDicQCPType.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	 				planHistoryList.dicQCPType = [];
	                for (var i=0; i < data.contents.length;i++) {
	                	planHistoryList.dicQCPType.push({
	                		"name": data.contents[i].checkoutPlanType,
	                		"code": data.contents[i].checkoutPlanTypeCode
	                	});
	                }
            		planHistoryList.selQCPType = (planHistoryList.dicQCPType)[0];
            		$scope.checkHistoryQCP(planHistoryList.selQCPType.code);
            		//console.log(data);


	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.companyShortName = localStorage.getItem('curCompanyName');
		$scope.planHistoryList = planHistoryList;	
		$scope.queryDicQCPType();


		
	// 	//  /api/2.0/bp/qcp/qcp
	

		$scope.querySingleQCPInfo =function(planSid,checkoutPlanStatusCode){

		
			localStorage.setItem("checkoutHistoryPlanSid",planSid);
			$location.path("account_index/planHistoryListCheck");

		}

	    $scope.querySingCopyInfo = function(planSid,checkoutPlanStatusCode) {
	    	localStorage.setItem("checkoutHistoryCopySid",planSid);
			$location.path("account_index/planHistoryListCopy");

	    }
		
	
}])
FIMS.controller('planMetricListCheckCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planMetricListCheck = {
			
		

			DXCheckoutMetricList:[],

			DLCheckoutMetricList:[],


        	
	};
 
$scope.planMetricListCheckBack = function() {

	history.go(-1);
}

//将定性和定量分开保存
	var parseQueryData = function(array){

		var dx =[];
		var dl =[];

		// 肯定又数据的情况；
		for (var i=0;i<array.length;i++){
			checkoutMetrics = array[i];
			if (checkoutMetrics.checkoutMetricTypeCode ==="DX")
				dx.push(checkoutMetrics);
			else if (checkoutMetrics.checkoutMetricTypeCode ==="DL")
				dl.push(checkoutMetrics);
			else
				alert("检验指标类型既不非定性，也非定量")
		}

		planMetricListCheck.DXCheckoutMetricList = dx;
		planMetricListCheck.DLCheckoutMetricList = dl;
	}




/*
***************************************************
***************************************************
queryQCPItems获取检验项目
***************************************************
***************************************************
*/

planMetricListCheck.queryQCPItems = function(){

		// // 准备参数
		// var assemblyObj = function(){
		// 	var o = {};

		// 	o.sid		                = localStorage.getItem('sid');

  //           o.checkoutPlanSid		    = localStorage.getItem('checkoutPlanSid');

  //           // localStorage.removeItem("checkoutPlanSid");

  //           // console.log(localStorage.getItem('checkoutPlanSid'));

		// 	return o;
		// }

		// var entry = assemblyObj();
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPItems",
			// url: "plan/queryQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					 "sid": localStorage.getItem('sid'),
                     "checkoutPlanSid": localStorage.getItem('checkoutPlanSid')
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	//alert("检验计划信息更新成功");
            	//$location.path("account_index/chooseModule");
            	// console.log(data.contents);
            	//绑定数据
            	parseQueryData(data.contents);

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('queryQCPItems'+data.message);
        });
	}

	
  




	$scope.planMetricListCheck = planMetricListCheck;

	planMetricListCheck.queryQCPItems();


}])


FIMS.controller('iqcIndexCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		$scope.curCompanyName = localStorage.getItem("curCompanyName");
		$scope.applyJoinCompanyNumber = localStorage.getItem("applyJoinCompanyNumber");
		
		localStorage.removeItem("DX");
		localStorage.removeItem("DL");
		localStorage.removeItem("checkoutRecord");

}])

FIMS.controller('iqcAddCtrl', ['$scope','$location','$http','$q',function($scope,$location,$http,$q){
	var iqcAdd = {
		dictionary: {
			materialName: [],
			materialVersion: [],
			vendor: []
		},
		
		Selected : {
			materialName : {},
			materialVersion: {},
			vendor: {}
		},
		
		plan: {},

		externalReceiptNo: "",

		checkoutRecordNo: "",
		batchNo: "",
		giveCheckoutTime: "",
		checkoutTime:"",
		giveCheckoutAmount: "",
		sampleAmount: "",
		checkoutRecordInputWay:"",

		companyShortName :localStorage.getItem('curCompanyName')

		// makeName : localStorage.getItem("userName"),
		// makeTime: "",
		// entryName: localStorage.getItem("userName"),
		// entryTime: ""
	};

	$scope.iqcAdd = iqcAdd;

	 var time  = new Date();

	//调整时间格式
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		//console.log(year);

		if (month<10) {
			month = "0" + month;
		}

		if (day<10) {
			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}

	// iqcAdd.makeTime = time.format();
	// iqcAdd.entryTime = time.format();
      iqcAdd.checkoutTime = time.format();

	//获取物料字典
	var queryMaterialsInfo = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
			// url: "manage/engineer/material/queryMaterialsInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid')
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	iqcAdd.dictionary.materialName = data.contents;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	queryMaterialsInfo();


	//根据物料编号获取物料版本
	$scope.queryMaterialVersionByMaterialNo = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
			// url: "plan/queryMaterialVersionByMaterialNo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"materialNo": iqcAdd.Selected.materialName.materialNo 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                iqcAdd.dictionary.materialVersion = data.contents;
            	iqcAdd.Selected.materialVersion = {};
                iqcAdd.plan = {};
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	// 供应商字典
    var queryVendorInfo = function(){
        $http({
            method: "POST",
            url: config.HOST + "/api/2.0/bp/vendor/vendor/queryVendorInfo",
            // url: "manage/vendor/vendor/queryVendorInfo.json",
            header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "companySid": localStorage.getItem('cSid')
            }
        })
        .success(function(data){
            if (data.code == 'N01') {
               iqcAdd.dictionary.vendor = data.contents;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
    }
    queryVendorInfo();


	// 确定检验计划
	$scope.queryActivateQCPByMaterial = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryActivateQCPByMaterial",
			// url: "iqc/iqc_add/queryActivateQCPByMaterial.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"materialNo": iqcAdd.Selected.materialName.materialNo,
				"materialVersion": iqcAdd.Selected.materialVersion.materialVersion 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                iqcAdd.plan = data.contents;
                // console.log(data.contents)
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	// 查询单个检验记录
	var querySingleIQCRecord = function(input_way_code){
		var deffered = $q.defer();

		var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
		http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord":"querySingleSimpleIQCRecord";
		

		// var checkoutRecordInputWay = (localStorage.getItem("input_way_code") == "CE")? "复杂录入":"简单录入";
	   //var checkoutRecordInputWay = (input_way_code == "CE")? "复杂录入":"简单录入";
   //    alert(checkoutRecordInputWay);
		
		// var http_url = "iqc/iqc_add/" ;
		// http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord.json":"querySingleSimpleIQCRecord.json";
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleIQCRecord",
			url: http_url,
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"checkoutRecordSid": localStorage.getItem('checkoutRecordSid')				
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	deffered.resolve(data.contents);           	
                localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
                localStorage.setItem("DX",JSON.stringify(data.contents.DX));
                localStorage.setItem("DL",JSON.stringify(data.contents.DL));
               //localStorage.setItem("checkoutRecordInputWay",iqcAdd.checkoutRecordInputWay);
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })

        return deffered.promise;
	}
/******************************
*******************************/
//  var checkoutway = function(checkoutRecordInputWay){

// // if(input_way_code == "CE")
// // 	checkoutRecordInputWay = querySingleComplexIQCRecord;
// // else if(input_way_code == "SE")
// // 	checkoutRecordInputWay = querySingleSimpleIQCRecord;
//  	var checkoutRecordInputWay = (input_way_code == "CE")? "querySingleComplexIQCRecord":"querySingleSimpleIQCRecord";

//  }

/******************************
*******************************/
  
	// 确定添加
	$scope.submitBaseIQCRecord = function(){

    var checkoutRecordInputWay = (localStorage.getItem("input_way_code") == "CE")? "复杂录入":"简单录入";
      //alert(checkoutRecordInputWay);
       //localStorage.setItem("checkoutRecordInputWay",checkoutRecordInputWay);
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qc/iqc/submitBaseIQCRecord",
			// url: "iqc/iqc_add/submitBaseIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutPlanSid": iqcAdd.plan.checkoutPlanSid,
				"checkoutRecordNo": iqcAdd.checkoutRecordNo,
				"companySid": localStorage.getItem('cSid'),
			    "batchNo": iqcAdd.batchNo,

			    "externalReceiptNo": iqcAdd.externalReceiptNo,
			    
			    "entryId": localStorage.getItem('email'),
			    "entryJobNumber": localStorage.getItem('userJobNumber'),
			    "entryName": localStorage.getItem('userName'),
			    "entryTime": parseInt((new Date()).valueOf()/1000),

				"nspectorJobNumber": localStorage.getItem('userJobNumber'),
			    "nspectorName": localStorage.getItem('userName'),
			    //"checkoutTime": parseInt((new Date()).valueOf()/1000),
			    
			    "giveCheckoutAmount": iqcAdd.giveCheckoutAmount,
			    "giveCheckoutTime": ((new Date(iqcAdd.giveCheckoutTime)).valueOf())/1000,
			    "checkoutTime": ((new Date(iqcAdd.checkoutTime)).valueOf())/1000,
			    "sampleAmount": iqcAdd.sampleAmount,

			    "vendorSid": iqcAdd.Selected.vendor.vendorSid,
			    "vendorNo": iqcAdd.Selected.vendor.vendorNo,
			    "vendorShortName": iqcAdd.Selected.vendor.vendorShortName,

			    "checkoutRecordInputWayCode": localStorage.getItem("input_way_code"),

			    "checkoutRecordInputWay":checkoutRecordInputWay

			    //"operateStatusCode":"TJ",
			    //"operateStatus":"提交状态"
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                alert(data.message);
                localStorage.setItem("checkoutRecordSid",data.contents.checkoutRecordSid);
                // localStorage.setItem("activePlan", JSON.stringify(iqcAdd.plan));
                var input_way_code = localStorage.getItem('input_way_code');
                var promise = querySingleIQCRecord(input_way_code);
                promise.then(function(data){
					console.log("s");
                	if ( localStorage.getItem('input_way_code') === "SE") {
                		$location.path('account_index/iqcSimpleDXAdd');
                	}	
                	else if (localStorage.getItem('input_way_code') === "CE") {
                			$location.path("account_index/iqcComplexDXAdd");
                		 }
                		 else {
                			alert("您还没设置录入方式!");
                		}
                	}
                )
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	$scope.back = function(){
		var a = confirm("您确定要退出吗？退出将丢失填写数据!")
		if (a) {
			$location.path("account_index/iqcIndex");
		}
	}


	
}])
FIMS.controller('iqcRecordCtrl', ['$scope', '$location', '$http', function($scope,$location,$http){

	$scope.companyShortName = localStorage.getItem('curCompanyName');
	$scope.iqcRecord = [];

	

	//判断是查看还是修订状态

	 $scope.querySingleIQCRecordInfo =function(recordSid,operateStatusCode){
	 	if (operateStatusCode=="TJ") {
            

	 		localStorage.setItem("checkoutRecordSid",recordSid);
	 		
	 		$location.path("account_index/iqcRecordCheck");
	 	}else if(operateStatusCode=="BC") {
	 		localStorage.setItem("checkoutRecordSid",recordSid);
	 	
	 		$location.path("account_index/iqcRecordRevise");
	 	}else {
	 		alert("不是“查看/修订”状态");
	 	}
	 }


	// 上一页
	$scope.previous = function(){
		if (iqcRecord.page==1) {
			alert("当前是第1页...");
		} 
		
	}

	//时间戳格式转化
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		// console.log(year);

		if (month<10) {
			month = "0" + month;
		}

		if (day<10) {
			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}



	
/***********************************************************************
************************************************************************
 //queryIQCRecords根据检验计划类型获取检验计划
************************************************************************
***********************************************************************/
	
	$scope.queryIQCRecord = function() {
		$http({
			method: "POST",

			//url: config.HOST + "/api/2.0/bp/qc/iqc/queryIQCRecords",
			//url: "iqc/iqc_record/queryIQCRecord.json",
			url: config.HOST + "/api/2.0/bp/qc/iqc/queryIQCRecords",
			// url: "iqc/iqc_record/queryIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"page": localStorage.getItem('page')
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	$scope.iqcRecord = data.contents;
               // console.log($scope.iqcRecord);
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	//queryIQCRecord();
	$scope.queryIQCRecord();
	





	
}])
FIMS.controller('iqcComplexDLAddCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDLAdd = {	
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		companyShortName: localStorage.getItem('curCompanyName'),
		checkoutRecordSid: "",

		// $rootScope.DX: [],
		//sampleCheckoutValue: ,
		sampleSel: []
	};//iqcComplexDLAdd

	$scope.iqcComplexDLAdd = iqcComplexDLAdd;

	//调整时间格式
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		console.log(year);

		if (month<10) {
			month = "0" + month;
		}

		if (day<10) {
			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}

	// 各种弹出框
	// var msg="您当前可能有正在填写的数据，刷新将导致数据丢失！";
	// window.onbeforeunload=function(event){
	//       event=event || window.event;
	//       event.returnValue=msg;
	//       return msg;
	// }

	// iqcComplexDLAdd.makeTime = time.format();
	// iqcComplexDLAdd.entryTime = time.format();

	// 获取基本信息部分
	var queryCheckoutRecord = function(){
		var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
		iqcComplexDLAdd.materialNo = checkoutRecord.materialNo;
		iqcComplexDLAdd.materialShortName = checkoutRecord.materialShortName;
		iqcComplexDLAdd.materialVersion = checkoutRecord.materialVersion;
		iqcComplexDLAdd.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcComplexDLAdd.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
		iqcComplexDLAdd.sampleAmount = checkoutRecord.sampleAmount;


		// 绑定定量部分
		$rootScope.DL = JSON.parse(localStorage.getItem("DL"));
		console.log($rootScope.DL);
		for (var i=0,len=$rootScope.DL.length;i<len;i++) {
			for (var j=0,lenj=$rootScope.DL[i].sample.length;j<lenj;j++) {
				var item = $rootScope.DL[i].sample[j];
				item.sampleCheckoutValue = iqcComplexDLAdd.sampleCheckoutValue;
			}
		}
	}
	queryCheckoutRecord();



	$scope.updateComplexIQCRecord = function() {
		// console.log($rootScope.DX);
		// var keyDX

		$http({
			method: "POST",
			 url: config.HOST + "/api/2.0/bp/qc/iqc/updateComplexIQCRecord",
			//url: "iqc/iqc_add/updateComplexIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				// "companySid": localStorage.getItem('cSid'),
				"checkoutRecordSid": localStorage.getItem('checkoutRecordSid'),
				"DX": $rootScope.DX,
				"DL": $rootScope.DL 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	localStorage.setItem("DL",JSON.stringify($rootScope.DL));           	
                alert(data.message);
                // $location.path("account_index/iqcRecord");
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}
	//提交复杂录入
	$scope.submitComplexIQCRecord = function() {
		// console.log($rootScope.DX);
		// var keyDX
		var a = confirm("确认提交？");
		if (a === true){
			$http({
				method: "POST",
				 url: config.HOST + "/api/2.0/bp/qc/iqc/submitComplexIQCRecord",
				//url: "iqc/iqc_add/submitComplexIQCRecord.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					// "companySid": localStorage.getItem('cSid'),
					"checkoutRecordSid": localStorage.getItem('checkoutRecordSid'),
					"DX": $rootScope.DX,
					"DL": $rootScope.DL 
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {            	         	
	                alert(data.message);
	                $location.path("account_index/iqcRecord");
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}
	}
	
}])
FIMS.controller('iqcComplexDXAddCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDXAdd = {	
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		companyShortName: localStorage.getItem('curCompanyName'),

		checkoutRecordSid: "",

		// $rootScope.DX: [],
		itemDic: [
			{
				"value": "",
				"sampleCheckoutValue": "NULL"
			},
			{
				"value": "是",
				"sampleCheckoutValue": "是"
			},
			{
				// "sampleNo": "",
				"value": "否",
				"sampleCheckoutValue": "否"
			}
		],
		sampleSel: []
	};

	$scope.iqcComplexDXAdd = iqcComplexDXAdd;

	//调整时间格式
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		console.log(year);

		if (month<10) {
			month = "0" + month;
		}

		if (day<10) {
			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}

	// 各种弹出框
	// var msg="您当前可能有正在填写的数据，刷新将导致数据丢失！";
	// window.onbeforeunload=function(event){
	//       event=event || window.event;
	//       event.returnValue=msg;
	//       return msg;
	// }

	// iqcComplexDXAdd.makeTime = time.format();
	// iqcComplexDXAdd.entryTime = time.format();

	// 获取基本信息部分
	var queryCheckoutRecord = function(){
		var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
		iqcComplexDXAdd.materialNo = checkoutRecord.materialNo;
		// console.log(checkoutRecord);
		iqcComplexDXAdd.materialShortName = checkoutRecord.materialShortName;
		iqcComplexDXAdd.materialVersion = checkoutRecord.materialVersion;
		iqcComplexDXAdd.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcComplexDXAdd.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
		iqcComplexDXAdd.sampleAmount = checkoutRecord.sampleAmount;


		// 绑定定性部分
		$rootScope.DX = JSON.parse(localStorage.getItem("DX"));
		//console.log($rootScope.DX);
		// console.log($rootScope.DX);

		//下拉数据绑定
		// $rootScope.DX = $rootScope.DX.sample;
		// console.log($rootScope.DX);
		// for (var i=0,len=$rootScope.DX.length;i<len;i++){
		// 	$rootScope.DX.push($rootScope.DX[i].sample);
		// }
		// console.log($rootScope.DX);

		for (var i=0,len=$rootScope.DX.length;i<len;i++) {
			for (var j=0,lenj=$rootScope.DX[i].sample.length;j<lenj;j++) {
				var item = $rootScope.DX[i].sample[j];
				if (item.sampleCheckoutValue=="是") {
					$rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXAdd.itemDic[1].sampleCheckoutValue;
				}else if (item.sampleCheckoutValue=="否"){
					$rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXAdd.itemDic[2].sampleCheckoutValue;
				}else {
					$rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXAdd.itemDic[0].sampleCheckoutValue;
				}
			}
		}
	}
	queryCheckoutRecord();

	$scope.next = function() {
		localStorage.setItem("DX",JSON.stringify($rootScope.DX));
		$location.path("account_index/iqcComplexDLAdd");
	}

	$scope.updateComplexIQCRecord = function() {
		// console.log($rootScope.DX);
		// var keyDX

		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qc/iqc/updateComplexIQCRecord",
			// url: "iqc/iqc_add/updateComplexIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				// "companySid": localStorage.getItem('cSid'),
				"checkoutRecordSid": localStorage.getItem('checkoutRecordSid'),
				"DX": $rootScope.DX,
				"DL": $rootScope.DL || JSON.parse(localStorage.getItem("DL"))
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	localStorage.setItem("DX",JSON.stringify($rootScope.DX));           	
                alert(data.message);
                // $location.path("account_index/iqcRecord");
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}
	
}])

FIMS.controller('iqcSimpleDXAddCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var iqcSimpleDXAdd = {		
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		

		checkoutRecordId: "",
		batchNo: "",
		giveCheckoutTime: "",
		vendor: "",
		giveCheckoutAmount: "",

		companyShortName :localStorage.getItem('curCompanyName')
		// makeName : localStorage.getItem("userName"),
		// makeTime: "",
		// entryName: localStorage.getItem("userName"),
		// entryTime: ""
	};

	$scope.iqcSimpleDXAdd = iqcSimpleDXAdd;

	// var time  = new Date();

	//调整时间格式
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		console.log(year);

		if (month<10) {
			month = "0" + month;
		}

		if (day<10) {
			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}

	// 各种弹出框
	var msg="您当前可能有正在填写的数据，刷新将导致数据丢失！";
	window.onbeforeunload=function(event){
	      event=event || window.event;
	      event.returnValue=msg;
	      return msg;
	}

	$scope.back = function(){
		var a = confirm("您确定要退出吗？退出将可能丢失填写数据!")
		if (a) {
			$location.path("account_index/iqcIndex");
		}
	}

	// iqcSimpleDXAdd.makeTime = time.format();
	// iqcSimpleDXAdd.entryTime = time.format();

	// 获取基本信息部分
	var querySingleIQCRecord = function(){
		var singleIQC = JSON.parse(localStorage.getItem("SingleIQCRecord"));
		iqcSimpleDXAdd.materialNo = singleIQC.checkoutRecord.materialNo;
		iqcSimpleDXAdd.materialShortName = singleIQC.checkoutRecord.materialShortName;
		iqcSimpleDXAdd.materialVersion = singleIQC.checkoutRecord.materialVersion;
		iqcSimpleDXAdd.checkoutPlanNo = singleIQC.checkoutRecord.checkoutPlanNo;
		iqcSimpleDXAdd.checkoutPlanVersion = singleIQC.checkoutRecord.checkoutPlanVersion;

		iqcSimpleDXAdd.checkoutRecordId = singleIQC.checkoutRecord.checkoutRecordId;
		iqcSimpleDXAdd.batchNo = singleIQC.checkoutRecord.batchNo;
		iqcSimpleDXAdd.materialShortName = singleIQC.checkoutRecord.materialShortName;
		iqcSimpleDXAdd.giveCheckoutTime = (new Date(singleIQC.checkoutRecord.giveCheckoutTime*1000)).format();
		iqcSimpleDXAdd.vendor = singleIQC.checkoutRecord.vendorShortName;
		iqcSimpleDXAdd.giveCheckoutAmount = singleIQC.checkoutRecord.giveCheckoutAmount;
		iqcSimpleDXAdd.sampleAmount = singleIQC.checkoutRecord.sampleAmount;
	}
	querySingleIQCRecord();
	

	// 供应商字典
    // var queryVendorInfo = function(){
    //     $http({
    //         method: "POST",
    //         url: config.HOST + "/api/2.0/bp/vendor/vendor/queryVendorInfo",
    //         // url: "manage/vendor/vendor/queryVendorInfo.json",
    //         header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
    //         data: {
    //             "sid": localStorage.getItem('sid'),
    //             "companySid": localStorage.getItem('cSid')
    //         }
    //     })
    //     .success(function(data){
    //         if (data.code == 'N01') {
    //            iqcSimpleDXAdd.dictionary.vendor = data.contents;
    //         }
    //         else if(data.code=="E00"){
    //             alert(data.message+",请重新登陆");
    //             localStorage.clear();
    //             $location.path('login').replace();
    //         }else {
    //             alert(data.message);
    //         }  
    //     })
    // }
    // queryVendorInfo();

	
}])
FIMS.controller('qrCodeCtrl',['$scope','$http', '$location', function($scope,$http,$location){
	var qrCode = {    
        "companySid": localStorage.getItem("cSid"),
        "materialNameDic": [],
        "materialVersionDic": [], 
        "vendorDic":[],
        "materialNameSelected": {},
        "materialVersionSelected": {},
        "vendorSelected": {},
        "curCom": localStorage.getItem('curCompanyName') + "(IPC二维码生成器)"
	};

	var resource = "resource/";

    var queryMaterialsInfo = function(){
        $http({
            method: "POST",
            url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
            // url: "manage/engineer/material/queryMaterialsInfo.json",
            header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "companySid": localStorage.getItem('cSid')
            }
        })
        .success(function(data){
            if (data.code == 'N01') {
                qrCode.materialNameDic = data.contents;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
    }

    queryMaterialsInfo();

    //根据物料编号查版本
    $scope.queryMaterialVersionByMaterialNo = function(){
        $http({
            method: "POST",
            url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
            // url: "plan/queryMaterialVersionByMaterialNo.json",
            header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "companySid": localStorage.getItem('cSid'),
                "materialNo": qrCode.materialNameSelected.materialNo 
            }
        })
        .success(function(data){
            if (data.code == 'N01') {               
                qrCode.materialVersionDic = [];
                qrCode.materialVersionSelected = {};
                qrCode.materialVersionDic = data.contents;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
    }

    // 供应商字典
    var queryVendorInfo = function(){
        $http({
            method: "POST",
            url: config.HOST + "/api/2.0/bp/vendor/vendor/queryVendorInfo",
            // url: "manage/vendor/vendor/queryVendorInfo.json",
            header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "companySid": localStorage.getItem('cSid')
            }
        })
        .success(function(data){
            if (data.code == 'N01') {
               qrCode.vendorDic = data.contents;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
    }
    queryVendorInfo();

	$scope.genCode = function(){
		$http({
            method: 'POST',
            url: config.HOST+'/api/2.0/ll/tools/tdcode/resolveTDCode',
            data: {
                "materialNo": qrCode.materialNameSelected.materialNo,
                "materialName": qrCode.materialNameSelected.materialShortName,
                "materialVersion": qrCode.materialVersionSelected.materialVersion,
                "vendorNo": qrCode.vendorSelected.vendorNo,
                "vendorShortName": qrCode.vendorSelected.vendorShortName
            }
        })
        .success(function(data){
            if (data.code === "E01") {
                console.log(data.message)
            }else{
                resource += data.filename;
                $("#qrcode").attr("src",resource);
                resource = "resource/";
            }
        });
	}

	$scope.clearCode = function(){
        location.reload(true);
		// qrCode.materialId =  "";
  //       qrCode.materialVersion =  "";
  //       qrCode.vendorId =  "";
  //       qrCode.vendorShortName =  "";
  //       qrCode.materialName =  "";           
  //       $("#qrcode").attr("src",'');
	}

	$scope.back = function(){
		var a = confirm("您确定要退出吗？退出将丢失填写数据!")
		if (a) {
			history.go(-1);
		}
	}

	$scope.qrCode = qrCode;
}]);

FIMS.controller('iqcAddCheckCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var iqcAddCheck = {		
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",

		externalReceiptNo: "",

		checkoutRecordNo: "",
		batchNo: "",
		//giveCheckoutTime: "",
		checkoutTime:"",
		vendor: "",
		giveCheckoutAmount: "",
		sampleAmount: "",

		companyShortName :localStorage.getItem('curCompanyName')
		// makeName : localStorage.getItem("userName"),
		// makeTime: "",
		// entryName: localStorage.getItem("userName"),
		// entryTime: ""
	};

	$scope.iqcAddCheck = iqcAddCheck;

	// var time  = new Date();

	//调整时间格式
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		console.log(year);

		if (month<10) {
			month = "0" + month;
		}

		if (day<10) {
			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}

	// 各种弹出框
	// var msg="您当前可能有正在填写的数据，刷新将导致数据丢失！";
	// window.onbeforeunload=function(event){
	//       event=event || window.event;
	//       event.returnValue=msg;
	//       return msg;
	// }

	$scope.back = function(){
		var a = confirm("您确定要退出吗？退出将可能丢失填写数据!")
		if (a) {
			$location.path("account_index/iqcIndex");
		}
	}

	// iqcAddCheck.makeTime = time.format();
	// iqcAddCheck.entryTime = time.format();

	// 查询单个检验记录
	var querySingleIQCRecord = function(){
		var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
		var input_way_code = localStorage.getItem("input_way_code");
		http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord":"querySingleSimpleIQCRecord";
		
		// var input_way_code = localStorage.getItem("input_way_code");
		// var http_url = "iqc/iqc_add/" ;
		// http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord.json":"querySingleSimpleIQCRecord.json";
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleIQCRecord",
			url: http_url,
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"checkoutRecordSid": localStorage.getItem('checkoutRecordSid')				
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
                localStorage.setItem("DX",JSON.stringify(data.contents.DX));
                localStorage.setItem("DL",JSON.stringify(data.contents.DL));
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}
	querySingleIQCRecord();

	// 获取基本信息部分
	var querySingleIQCRecord = function(){
		var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
		//console.log(checkoutRecord);
		iqcAddCheck.materialNo = checkoutRecord.materialNo;
		iqcAddCheck.materialShortName = checkoutRecord.materialShortName;
		iqcAddCheck.materialVersion = checkoutRecord.materialVersion;
		iqcAddCheck.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcAddCheck.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;

		iqcAddCheck.externalReceiptNo  = checkoutRecord.externalReceiptNo;

		iqcAddCheck.checkoutRecordNo = checkoutRecord.checkoutRecordNo;
		iqcAddCheck.batchNo = checkoutRecord.batchNo;
		iqcAddCheck.materialShortName = checkoutRecord.materialShortName;
		iqcAddCheck.checkoutTime = (new Date(checkoutRecord.checkoutTime*1000)).format();
		iqcAddCheck.vendor = checkoutRecord.vendorShortName;
		iqcAddCheck.giveCheckoutAmount = checkoutRecord.giveCheckoutAmount;
		iqcAddCheck.sampleAmount = checkoutRecord.sampleAmount;
	}
	querySingleIQCRecord();
	
	// 下一步按钮
	$scope.next = function() {
		if (localStorage.getItem('input_way_code') == "SE") {
        	$location.path('account_index/iqcSimpleDXAdd');
        }else if (localStorage.getItem('input_way_code') == "CE") {
        	$location.path("account_index/iqcComplexDXAdd");
        }else {
        	alert("您还没设置录入方式!");
        }
	}

	// 供应商字典
    // var queryVendorInfo = function(){
    //     $http({
    //         method: "POST",
    //         url: config.HOST + "/api/2.0/bp/vendor/vendor/queryVendorInfo",
    //         // url: "manage/vendor/vendor/queryVendorInfo.json",
    //         header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
    //         data: {
    //             "sid": localStorage.getItem('sid'),
    //             "companySid": localStorage.getItem('cSid')
    //         }
    //     })
    //     .success(function(data){
    //         if (data.code == 'N01') {
    //            iqcAddCheck.dictionary.vendor = data.contents;
    //         }
    //         else if(data.code=="E00"){
    //             alert(data.message+",请重新登陆");
    //             localStorage.clear();
    //             $location.path('login').replace();
    //         }else {
    //             alert(data.message);
    //         }  
    //     })
    // }
    // queryVendorInfo();

	
}])
FIMS.controller('tool_indexCtrl', ['$scope','$location','$http','$q',function($scope,$location,$http,$q){
	$scope.curCompanyName = localStorage.getItem("curCompanyName");
}])
FIMS.controller('dailyDetailsCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var dailyDetails = {
			checkoutTime: "",
			dateSelected: []
		};
		$scope.companyShortName = localStorage.getItem("curCompanyName");	
		$scope.dailyDetails = dailyDetails;

		//调整时间格式
		var time  = new Date();
		Date.prototype.format = function() {
	   		var year = this.getFullYear().toString();
	   		var month = (this.getMonth()+1).toString();
	   		var day = this.getDate().toString();
	   		console.log(year);

			if (month<10) {
				month = "0" + month;
			}

			if (day<10) {
				day = "0" + day;
			}

		 	return (year + "-" + month + "-" +day );
		}
		dailyDetails.checkoutTime = time.format();
		// iqcAddCheck.entryTime = time.format();

		$scope.dailyDetailsBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}

		$scope.getDailyDetails = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A102_0DailyReport",
				// url: "iqc/iqc_dataCount/bak/A102_0DailyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime":  ((new Date(dailyDetails.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
					
				}
			})
			.success(function(data){				
	            if(data.code == "N01"&&data.contents.length !== 0) {
	    // 			
	            	dailyDetails.dateSelected = data.contents;
	            	// dailyDetails.defectives = data.contents.defectives;
	           		for(var i=0,len=(dailyDetails.dateSelected).length;i<len;i++){
	                (dailyDetails.dateSelected)[i].checkoutTime = (new Date((dailyDetails.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            else if (data.contents.length === 0) {
	            	alert("暂无数据");}
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}
}])
FIMS.controller('monthlyDetailsCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var monthlyDetails = {
			checkoutTime: "",
			dateSelected: []
		}

		$scope.companyShortName = localStorage.getItem("curCompanyName");
		$scope.monthlyDetails = monthlyDetails;

		//调整时间格式
		Date.prototype.format = function() {
	   		var year = this.getFullYear().toString();
	   		var month = (this.getMonth()+1).toString();
	   		var day = this.getDate().toString();
	   		console.log(year);

			if (month<10) {
				month = "0" + month;
			}

			if (day<10) {
				day = "0" + day;
			}

		 	return (year + "-" + month + "-" +day );
		}
		
		$scope.monthlyDetailsBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}

		$scope.A103MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {	
					"sid": localStorage.getItem('sid'),					
					"checkoutTime": ((new Date(monthlyDetails.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')					
				}
			})
			.success(function(data){				
	            if(data.code == "N01") {
	            	// &&data.message !== "获取数据为空"
	            	monthlyDetails.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyDetails.dateSelected).length;i<len;i++){
	                (monthlyDetails.dateSelected)[i].checkoutTime = (new Date((monthlyDetails.dateSelected)[i].checkoutTime*1000)).format(); 
	                     	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.message === "获取数据为空") {
	            // 	alert("暂无数据");
	            // }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}
}])
FIMS.controller('monthlyChart_vendorCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var monthlyChart = {
			dictionary: {
				materialName: []
			},
			Selected: {
				materialName : {}
			},
			checkoutTime: ""
		}
		$scope.companyShortName = localStorage.getItem("curCompanyName");
		$scope.monthlyChart = monthlyChart;
		$scope.monthlyChartBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}
		$scope.queryMaterialsInfo = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
				// url: "manage/engineer/material/queryMaterialsInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	monthlyChart.dictionary.materialName = [];
	            	for (var i=0; i < data.contents.length;i++) {
	                	monthlyChart.dictionary.materialName.push({
	                		"name": data.contents[i].materialShortName,
	                		"materialSid": data.contents[i].materialSid
	                	});
	                }
	                monthlyChart.Selected.materialName = (monthlyChart.dictionary.materialName)[0];
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}		
		$scope.queryMaterialsInfo();
		function echarts(op,div){
			// console.log(op);
			// console.log(div);
			require.config({
	            paths: {
		            echarts: './deps/echarts'
		        }
	        });
			require(
	            [
	                'echarts',
	                // 'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	                'echarts/chart/bar'
	            ],
			function (ec) {
				  	if (document.getElementById(div)){
	                	var myChart = ec.init(document.getElementById(div));
	                // console.log(myChart);
		                var option = op;
		                myChart.setOption(option);
	            	}else {
	            		console.log("DOM未加载");
	            		return;
	            	}
	            }
	        );

		}

		$scope.A1081Report = function(){

			$http({
				method: 'POST',
				url: config.HOST + "/api/2.0/bp/evaluate/report/A1081Report",
				//url: "iqc/iqc_dataCount/bak/A1081Report.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                //"date": dataCount.dataCountInputs.dataCountTab4.checkoutTime+"-01T00:00:00Z",
	                //"materialid": dataCount.dataCountInputs.dataCountTab4.materialid,
	                "sid": localStorage.getItem('sid'),
	                "checkoutTime": ((new Date(monthlyChart.checkoutTime)).valueOf())/1000,
	                "materialSid": monthlyChart.Selected.materialName.materialSid,
					"companySid": localStorage.getItem('cSid')

	            }
			})
			.success(function(data){
				if (data.code == "N01") {
					var xAxisData = [];
				 	var sampercentArr = [];
				 	var batchpercentArr = [];
				 	var PPMpercentArr = [];

			 		for(var i=0;i<data.contents.length;i++) {
				 		xAxisData.push(data.contents[i].vendorShortName);
				 		sampercentArr.push(data.contents[i].samplePercent*100);
				 		batchpercentArr.push(data.contents[i].batchpercent*100);
				 		PPMpercentArr.push(data.contents[i].PPMpercent);
				 	}

					var option1 = {
						color:  [
						  "#00a7eb"
						],
			         	tooltip: {
			                show: true
			            },			     
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '抽样合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":sampercentArr,
			                }
			            ]
			        };

			        var option2 = {
			        	color:  [
						  "#11cd6e"
						],
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '批次合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":batchpercentArr,
			                }
			            ]
			        };

			        var option3 = {
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '总计不良率 PPM',
			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":PPMpercentArr,
			                }
			            ]
			        };

					echarts(option1,"main1");
					echarts(option2,"main2");
					echarts(option3,"main3");
				}else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
			}).error(function(){
                console.log('接口报错');
            });
		}

		$scope.A1082Report = function(){
			$http({
				method: 'POST',
				url: config.HOST + "/api/2.0/bp/evaluate/report/A1082Report",
				//url: "iqc/iqc_dataCount/bak/A1081Report.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                //"date": dataCount.dataCountInputs.dataCountTab4.checkoutTime+"-01T00:00:00Z",
	                //"materialid": dataCount.dataCountInputs.dataCountTab4.materialid,
	                "sid": localStorage.getItem('sid'),
	                "checkoutTime": ((new Date(monthlyChart.checkoutTime)).valueOf())/1000,	                
					"companySid": localStorage.getItem('cSid')

	            }
			})
			.success(function(data){
				if (data.code == "N01") {
					var xAxisData = [];
				 	var sampercentArr = [];
				 	var batchpercentArr = [];
				 	var PPMpercentArr = [];

			 		for(var i=0;i<data.contents.length;i++) {
				 		xAxisData.push(data.contents[i].vendorShortName);
				 		sampercentArr.push(data.contents[i].samplePercent*100);
				 		batchpercentArr.push(data.contents[i].batchpercent*100);
				 		PPMpercentArr.push(data.contents[i].PPMpercent);
				 	}

					var option1 = {
						color:  [
						  "#00a7eb"
						],
			         	tooltip: {
			                show: true
			            },			     
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '抽样合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":sampercentArr,
			                }
			            ]
			        };

			        var option2 = {
			        	color:  [
						  "#11cd6e"
						],
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '批次合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":batchpercentArr,
			                }
			            ]
			        };

			        var option3 = {
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '总计不良率 PPM',
			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":PPMpercentArr,
			                }
			            ]
			        };

					echarts(option1,"main1");
					echarts(option2,"main2");
					echarts(option3,"main3");
				}else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
			}).error(function(){
                console.log('接口报错');
            });
		}
}])
FIMS.controller('monthlyChart_materialCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var monthlyChart = {
			dictionary: {
				vendorName: []
			},
			Selected: {
				vendorName: {}
			},
			checkoutTime: ""			
		}
		$scope.companyShortName = localStorage.getItem("curCompanyName");
		$scope.monthlyChart = monthlyChart;
		$scope.monthlyChartBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}
		$scope.queryVendorInfo = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/vendor/vendor/queryVendorInfo",
				// url: "manage/engineer/material/queryMaterialsInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	monthlyChart.dictionary.vendorName = [];
	            	for (var i=0; i < data.contents.length;i++) {
	                	monthlyChart.dictionary.vendorName.push({
	                		"name": data.contents[i].vendorShortName,
	                		"vendorSid": data.contents[i].vendorSid
	                	});
	                }
            		monthlyChart.Selected.vendorName = (monthlyChart.dictionary.vendorName)[0];
            		//$scope.queryVendorInfo(monthlyChart.Selected.vendorName.vendorSid);
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.queryVendorInfo();

		function echarts(op,div){
			// console.log(op);
			// console.log(div);
			require.config({
	            paths: {
		            echarts: './deps/echarts'
		        }
	        });
			require(
	            [
	                'echarts',
	                // 'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	                'echarts/chart/bar'
	            ],
			function (ec) {
				  	if (document.getElementById(div)){
	                	var myChart = ec.init(document.getElementById(div));
	                // console.log(myChart);
		                var option = op;
		                myChart.setOption(option);
	            	}else {
	            		console.log("DOM未加载");
	            		return;
	            	}
	            }
	        );

		}
		$scope.A1091Report = function(){
			$http({
				method: 'POST',
				url: config.HOST + "/api/2.0/bp/evaluate/report/A1091Report",
				//url: "iqc/iqc_dataCount/bak/A1091Report.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                //"date": dataCount.dataCountInputs.dataCountTab4.checkoutTime+"-01T00:00:00Z",
	                //"materialid": dataCount.dataCountInputs.dataCountTab4.materialid,
	                "sid": localStorage.getItem('sid'),
	                "checkoutTime": ((new Date(monthlyChart.checkoutTime)).valueOf())/1000,
	                "companySid": localStorage.getItem('cSid'),
					"vendorSid": monthlyChart.Selected.vendorName.vendorSid

	            }
			})
			.success(function(data){
				if (data.code == "N01") {
					var xAxisData = [];
				 	var sampercentArr = [];
				 	var batchpercentArr = [];
				 	var PPMpercentArr = [];

			 		for(var i=0;i<data.contents.length;i++) {
				 		xAxisData.push(data.contents[i].materialName);
				 		sampercentArr.push(data.contents[i].samplePercent*100);
				 		batchpercentArr.push(data.contents[i].batchpercent*100);
				 		PPMpercentArr.push(data.contents[i].PPMpercent);
				 	}

					var option1 = {
						color:  [
						  "#00a7eb"
						],
			         	tooltip: {
			                show: true
			            },			     
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '抽样合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":sampercentArr,
			                }
			            ]
			        };

			        var option2 = {
			        	color:  [
						  "#11cd6e"
						],
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '批次合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":batchpercentArr,
			                }
			            ]
			        };

			        var option3 = {
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '总计不良率 PPM',
			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":PPMpercentArr,
			                }
			            ]
			        };

					echarts(option1,"main1");
					echarts(option2,"main2");
					echarts(option3,"main3");
				}else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
			}).error(function(){
                console.log('接口报错');
            });
		}

		$scope.A1092Report = function(){
			$http({
				method: 'POST',
				url: config.HOST + "/api/2.0/bp/evaluate/report/A1092Report",
				//url: "iqc/iqc_dataCount/bak/A1091Report.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                //"date": dataCount.dataCountInputs.dataCountTab4.checkoutTime+"-01T00:00:00Z",
	                //"materialid": dataCount.dataCountInputs.dataCountTab4.materialid,
	                "sid": localStorage.getItem('sid'),
	                "checkoutTime": ((new Date(monthlyChart.checkoutTime)).valueOf())/1000,
	                "companySid": localStorage.getItem('cSid')					
	            }
			})
			.success(function(data){
				if (data.code == "N01") {
					var xAxisData = [];
				 	var sampercentArr = [];
				 	var batchpercentArr = [];
				 	var PPMpercentArr = [];

			 		for(var i=0;i<data.contents.length;i++) {
				 		xAxisData.push(data.contents[i].materialName);
				 		sampercentArr.push(data.contents[i].samplePercent*100);
				 		batchpercentArr.push(data.contents[i].batchpercent*100);
				 		PPMpercentArr.push(data.contents[i].PPMpercent);
				 	}

					var option1 = {
						color:  [
						  "#00a7eb"
						],
			         	tooltip: {
			                show: true
			            },			     
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '抽样合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":sampercentArr,
			                }
			            ]
			        };

			        var option2 = {
			        	color:  [
						  "#11cd6e"
						],
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '批次合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":batchpercentArr,
			                }
			            ]
			        };

			        var option3 = {
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '总计不良率 PPM',
			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":PPMpercentArr,
			                }
			            ]
			        };

					echarts(option1,"main1");
					echarts(option2,"main2");
					echarts(option3,"main3");
				}else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
			}).error(function(){
                console.log('接口报错');
            });
		}
}])
FIMS.controller('monthlyStatisticsCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var monthlyStatistics = {
			checkoutTime: "",
			dateSelected: []
		}

		$scope.companyShortName = localStorage.getItem("curCompanyName");
		$scope.monthlyStatistics = monthlyStatistics;
		
		var time  = new Date();
		Date.prototype.format = function() {
	   		var year = this.getFullYear().toString();
	   		var month = (this.getMonth()+1).toString();
	   		var day = this.getDate().toString();
	   		console.log(year);

			if (month<10) {
				month = "0" + month;
			}

			if (day<10) {
				day = "0" + day;
			}

		 	return (year + "-" + month + "-" +day );
		}		
		
		$scope.monthlyStatisticsBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}

		$scope.A103_0MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103_0MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103_0MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if(data.code == "N01") {
	            	// &&data.contents.length !== 0
	            	monthlyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyStatistics.dateSelected).length;i<len;i++){
	                (monthlyStatistics.dateSelected)[i].checkoutTime = (new Date((monthlyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");
	            // }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A103_1MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103_1MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103_0MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if(data.code == "N01") {
	            	// &&data.contents.length !== 0
	            	monthlyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyStatistics.dateSelected).length;i<len;i++){
	                (monthlyStatistics.dateSelected)[i].checkoutTime = (new Date((monthlyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");
	            // }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A103_1_1MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103_1_1MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103_0MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if(data.code == "N01") {
	            	// &&data.contents.length !== 0
	            	monthlyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyStatistics.dateSelected).length;i<len;i++){
	                (monthlyStatistics.dateSelected)[i].checkoutTime = (new Date((monthlyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");
	            // }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A103_2MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103_2MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103_0MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if(data.code == "N01") {
	            	// &&data.contents.length !== 0
	            	monthlyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyStatistics.dateSelected).length;i<len;i++){
	                (monthlyStatistics.dateSelected)[i].checkoutTime = (new Date((monthlyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");
	            // }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A103_3MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103_3MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103_0MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if(data.code == "N01") {
	            	// &&data.contents.length !== 0
	            	monthlyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyStatistics.dateSelected).length;i<len;i++){
	                (monthlyStatistics.dateSelected)[i].checkoutTime = (new Date((monthlyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");
	            // }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}
}])
FIMS.controller('dailyStatisticsCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var dailyStatistics = {
			checkoutTime: "",
			dateSelected: []
		};
		$scope.companyShortName = localStorage.getItem("curCompanyName");	
		$scope.dailyStatistics = dailyStatistics;

		//调整时间格式
		var time  = new Date();
		Date.prototype.format = function() {
	   		var year = this.getFullYear().toString();
	   		var month = (this.getMonth()+1).toString();
	   		var day = this.getDate().toString();
	   		console.log(year);

			if (month<10) {
				month = "0" + month;
			}

			if (day<10) {
				day = "0" + day;
			}

		 	return (year + "-" + month + "-" +day );
		}
		dailyStatistics.checkoutTime = time.format();
		// iqcAddCheck.entryTime = time.format();


		$scope.dailyStatisticsBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}

		$scope.A102_1DailyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A102_1DailyReport",
				//url: "iqc/iqc_dataCount/bak/A102_2DailyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {		
					"sid": localStorage.getItem('sid'),			
					"checkoutTime": ((new Date(dailyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
					
				}
			})
			.success(function(data){				
	            if(data.code == "N01"&&data.contents.length !== 0) {
	         // 
	            	dailyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(dailyStatistics.dateSelected).length;i<len;i++){
	                (dailyStatistics.dateSelected)[i].checkoutTime = (new Date((dailyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            else if (data.contents.length === 0) {
	            	alert("暂无数据");}
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A102_1_1DailyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A102_1_1DailyReport",
				//url: "iqc/iqc_dataCount/bak/A102_2DailyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),					
					"checkoutTime": ((new Date(dailyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
					
				}
			})
			.success(function(data){				
	            if(data.code == "N01"&&data.contents.length !== 0) {
	         // 
	            	dailyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(dailyStatistics.dateSelected).length;i<len;i++){
	                (dailyStatistics.dateSelected)[i].checkoutTime = (new Date((dailyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            else if (data.contents.length === 0) {
	            	alert("暂无数据");}
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A102_2DailyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A102_2DailyReport",
				//url: "iqc/iqc_dataCount/bak/A102_2DailyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {	
					"sid": localStorage.getItem('sid'),				
					"checkoutTime": ((new Date(dailyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
					
				}
			})
			.success(function(data){				
	            if(data.code == "N01"&&data.contents.length !== 0) {
	         // 
	            	dailyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(dailyStatistics.dateSelected).length;i<len;i++){
	                (dailyStatistics.dateSelected)[i].checkoutTime = (new Date((dailyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            else if (data.contents.length === 0) {
	            	alert("暂无数据");}
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A102_3DailyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A102_3DailyReport",
				//url: "iqc/iqc_dataCount/bak/A102_2DailyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {	
					"sid": localStorage.getItem('sid'),				
					"checkoutTime": ((new Date(dailyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
					
				}
			})
			.success(function(data){				
	            if(data.code == "N01"&&data.contents.length !== 0) {
	         //
	            	dailyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(dailyStatistics.dateSelected).length;i<len;i++){
	                (dailyStatistics.dateSelected)[i].checkoutTime = (new Date((dailyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            else if (data.contents.length === 0) {
	            	alert("暂无数据");}
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}
}])
FIMS.controller('monthlySumStatisticsCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var monthlySumStatistics = {
			checkoutTime: "",
			dateSelected: []
		};
		$scope.companyShortName = localStorage.getItem("curCompanyName");	
		$scope.monthlySumStatistics = monthlySumStatistics;

		//调整时间格式
		var time  = new Date();
		Date.prototype.format = function() {
	   		var year = this.getFullYear().toString();
	   		var month = (this.getMonth()+1).toString();
	   		var day = this.getDate().toString();
	   		console.log(year);

			if (month<10) {
				month = "0" + month;
			}

			if (day<10) {
				day = "0" + day;
			}

		 	return (year + "-" + month + "-" +day );
		}

		function echarts(op,div){
			// console.log(op);
			// console.log(div);
			require.config({
	            paths: {
		            echarts: './deps/echarts'
		        }
	        });
			require(
	            [
	                'echarts',
	                'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	                'echarts/chart/bar'
	            ],
			function (ec) {
				  	if (document.getElementById(div)){
	                	var myChart = ec.init(document.getElementById(div));
	                // console.log(myChart);
		                var option = op;
		                myChart.setOption(option);
	            	}else {
	            		console.log("DOM未加载");
	            		return;
	            	}
	            }
	        );

		}


		// monthlySumStatistics.checkoutTime = time.format();		

		$scope.monthlySumStatisticsBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}

		A104Report = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A104Report",
				// url: "iqc/iqc_dataCount/bak/A104Report.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlySumStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
					
				}
			})
			.success(function(data){				
	            if(data.code == "N01") {
	            	monthlySumStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlySumStatistics.dateSelected).length;i<len;i++){
	                	(monthlySumStatistics.dateSelected)[i].checkoutTime = monthlySumStatistics.checkoutTime + "-" + (data.contents)[i].month;
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");}
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		A105Report = function(){
			$http({
				method: 'POST',
				url: config.HOST + "/api/2.0/bp/evaluate/report/A105Report",
				// url: "iqc/iqc_dataCount/bak/A105Report.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {	    
	                "sid": localStorage.getItem('sid'),
	                "checkoutTime": ((new Date(monthlySumStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
	            }
			})
			.success(function(data){
				if (data.code == "N01") {
					var xAxisData = [];
					var samplePassRateArr = [];
				 	var samplePassRateTargetArr = [];				 	
			 		for(var i=0;i<data.contents.length;i++) {
				 		xAxisData.push(data.contents[i].month);
				 		samplePassRateTargetArr.push(data.contents[i].samplePassRateTarget*100);
				 		samplePassRateArr.push(data.contents[i].samplePassRate*100);

				 	}
				 	for(var i=0 ;i<samplePassRateTargetArr.length;i++)
 					{
			             if(isNaN(samplePassRateTargetArr[i]))
			             {
			             	samplePassRateTargetArr[i] = 0;		                    	
			                      		                      			                  
			             }
			         } 
			         // console.log(samplePassRateTargetArr); 				 	 
					var option = {
						tooltip : {
					        trigger: 'axis'
					    },
			      		toolbox: {
                    		show : true,
                		},
					    // calculable : true,
					    legend: {
					        data:['抽样合格率%','抽样合格率目标%']
					    },    
			            xAxis : [
			                {
			                    type : 'category',
			                    name : '月份',
			                    data : xAxisData
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',	 
			                    max : 100,
			                	name : '%',                 
			                    splitArea : {show : true}
			                }
			            ],
			            series : [
			                {
			                    name: '抽样合格率%',
			                    type: 'bar',
			                    data: samplePassRateArr
			                },
			                {
					            name: '抽样合格率目标%',
					            type: 'line',					           
					            data: samplePassRateTargetArr
					        }
			            ]
			        };
					echarts(option,"main");
				}else if(data.code == "E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
			}).error(function(){
                console.log('接口报错');
            });
		}

		A106Report = function(){
			$http({
				method: 'POST',
				url: config.HOST + "/api/2.0/bp/evaluate/report/A106Report",
				// url: "iqc/iqc_dataCount/bak/A106Report.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {	    
	                "sid": localStorage.getItem('sid'),
	                "checkoutTime": ((new Date(monthlySumStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
	            }
			})
			.success(function(data){
				if (data.code == "N01") {
					var xAxisData = [];
					var batchPassRateArr = [];
				 	var batchPassRateTargetArr = [];				 	
			 		for(var i=0;i<data.contents.length;i++) {
				 		xAxisData.push(data.contents[i].month);
				 		batchPassRateTargetArr.push(data.contents[i].batchPassRateTarget*100);
				 		batchPassRateArr.push(data.contents[i].batchPassRate*100);

				 	}
				 	for(var i=0 ;i<batchPassRateTargetArr.length;i++)
 					{
			             if(isNaN(batchPassRateTargetArr[i]))
			             {
			             	batchPassRateTargetArr[i] = 0;			                    	
			                      		                      			                  
			             }
			         } 
			         // console.log(samplePassRateTargetArr); 				 	 
					var option = {
						tooltip : {
					        trigger: 'axis'
					    },
			      		toolbox: {
                    		show : true,
                		},
					    // calculable : true,
					    legend: {
					        data:['批次合格率 %','批次合格率目标 %']
					    },    
			            xAxis : [
			                {
			                    type : 'category',
			                    name : '月份',
			                    data : xAxisData
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',	                  
			                	max : 100,
			                	name : '%',
			                    splitArea : {show : true}
			                }
			            ],
			            series : [
			                {
			                    name: '批次合格率 %',
			                    type: 'bar',
			                    data: batchPassRateArr
			                },
			                {
					            name: '批次合格率目标 %',
					            type: 'line',					           
					            data: batchPassRateTargetArr
					        }
			            ]
			        };
					echarts(option,"main");
				}else if(data.code == "E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
			}).error(function(){
                console.log('接口报错');
            });	
		}

		A107Report = function(){
			$http({
				method: 'POST',
				url: config.HOST + "/api/2.0/bp/evaluate/report/A107Report",
				// url: "iqc/iqc_dataCount/bak/A107Report.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {	    
	                "sid": localStorage.getItem('sid'),
	                "checkoutTime": ((new Date(monthlySumStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
	            }
			})
			.success(function(data){
				if (data.code == "N01") {
					var xAxisData = [];
					var totalDefectiveRatePPMArr = [];
				 	var totalDefectiveRatePPMTargetArr = [];				 	
			 		for(var i=0;i<data.contents.length;i++) {
				 		xAxisData.push(data.contents[i].month);
				 		totalDefectiveRatePPMTargetArr.push(data.contents[i].totalDefectiveRatePPMTarget);
				 		totalDefectiveRatePPMArr.push(data.contents[i].totalDefectiveRatePPM);

				 	}
				 	for(var i=0 ;i<totalDefectiveRatePPMTargetArr.length;i++)
 					{
			             if(isNaN(totalDefectiveRatePPMTargetArr[i]))
			             {
			             	totalDefectiveRatePPMTargetArr[i] = 0;		                    	
			                      		                      			                  
			             }
			         } 
			         // console.log(samplePassRateTargetArr); 				 	 
					var option = {
						tooltip : {
					        trigger: 'axis'
					    },
			      		toolbox: {
                    		show : true,
                		},
					    // calculable : true,
					    legend: {
					        data:['总计不良率 PPM','总计不良率目标 PPM']
					    },    
			            xAxis : [
			                {
			                    type : 'category',
			                    name : '月份',
			                    data : xAxisData
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',	              
			                	
			                    splitArea : {show : true}
			                }
			            ],
			            series : [
			                {
			                    name: '总计不良率 PPM',
			                    type: 'bar',
			                    data: totalDefectiveRatePPMArr
			                },
			                {
					            name: '总计不良率目标 PPM',
					            type: 'line',					           
					            data: totalDefectiveRatePPMTargetArr
					        }
			            ]
			        };
					echarts(option,"main");
				}else if(data.code == "E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
			}).error(function(){
                console.log('接口报错');
            });	
		}

}])
FIMS.controller('planHistoryListCheckCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var planHistoryListCheck = {
		
	};

		//调整时间格式
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		// console.log(year);

		if (month<10) {

			month = "0" + month;
		}

		if (day<10) {

			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}

	// 自执行函数，删除相关本地存储
	function init(){
		localStorage.removeItem('materialSid');
	}

	init();

	

	// $scope.makeTime = time.format();
	// $scope.entryTime = time.format();

	$scope.planHistoryListCheckBack = function(){
		$location.path("account_index/planHistoryList");
		//history.go(account_index/planHistoryList);

	}

	$scope.querySingleQCP = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleQCP",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutPlanSid": localStorage.getItem('checkoutHistoryPlanSid'),
				"companySid": localStorage.getItem('cSid')
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	$scope.planHistoryListCheck = data.contents;
            	var entrytime = new Date($scope.planHistoryListCheck.entryTime*1000),
            		maketime = new Date($scope.planHistoryListCheck.makeTime*1000);		
            	// console.log(entrytime);
              	$scope.planHistoryListCheck.entryTime = entrytime.format();
              	$scope.planHistoryListCheck.makeTime = maketime.format();
              	localStorage.setItem("materialSid",$scope.planHistoryListCheck.materialSid);
              	// console.log($scope.planCheck.entryTime)

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('querySingleQCP'+data.message);
        });
	}

	$scope.querySingleQCP();

   // $scope.planHistoryListCheck = planHistoryListCheck;

	var time  = new Date();
	
	
}])
FIMS.controller('planHistoryMetricListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planHistoryMetricList = {
			
		

			DXCheckoutMetricList:[],

			DLCheckoutMetricList:[],


        	
	};
 
$scope.planHistoryMetricListBack = function() {

	history.go(-1);
}

//将定性和定量分开保存
	var parseQueryData = function(array){

		var dx =[];
		var dl =[];

		// 肯定又数据的情况；
		for (var i=0;i<array.length;i++){
			checkoutMetrics = array[i];
			if (checkoutMetrics.checkoutMetricTypeCode ==="DX")
				dx.push(checkoutMetrics);
			else if (checkoutMetrics.checkoutMetricTypeCode ==="DL")
				dl.push(checkoutMetrics);
			else
				alert("检验指标类型既不非定性，也非定量")
		}

		planHistoryMetricList.DXCheckoutMetricList = dx;
		planHistoryMetricList.DLCheckoutMetricList = dl;
	}




/*
***************************************************
***************************************************
queryQCPItems获取检验项目
***************************************************
***************************************************
*/

planHistoryMetricList.queryQCPItems = function(){

		// // 准备参数
		// var assemblyObj = function(){
		// 	var o = {};

		// 	o.sid		                = localStorage.getItem('sid');

  //           o.checkoutPlanSid		    = localStorage.getItem('checkoutPlanSid');

  //           // localStorage.removeItem("checkoutPlanSid");

  //           // console.log(localStorage.getItem('checkoutPlanSid'));

		// 	return o;
		// }

		// var entry = assemblyObj();
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPItems",
			// url: "plan/queryQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					 "sid": localStorage.getItem('sid'),
                     "checkoutPlanSid": localStorage.getItem('checkoutPlanSid')
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	//alert("检验计划信息更新成功");
            	//$location.path("account_index/chooseModule");
            	// console.log(data.contents);
            	//绑定数据
            	parseQueryData(data.contents);

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('queryQCPItems'+data.message);
        });
	}

	
  




	$scope.planHistoryMetricList = planHistoryMetricList;

	planHistoryMetricList.queryQCPItems();


}])


FIMS.controller('planHistoryListCopyCtrl', ['$scope','$location','$http',function($scope,$location,$http){
      var planHistoryListCopy = {
          singleQCP: {

            // QCPType: {},
            // materialNo : {}   
          }

          
            };
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/
     
    var time  = new Date();
  

  //调整时间格式
  Date.prototype.format = function() {
      var year = this.getFullYear().toString();
      var month = (this.getMonth()+1).toString();
      var day = this.getDate().toString();
      // console.log(year);

    if (month<10) {
      month = "0" + month;
    }

    if (day<10) {
      day = "0" + day;
    }

    return (year + "-" + month + "-" +day );
  }

  // planHistoryListCopy.singleQCP.makeTime = time.format();
  // planHistoryListCopy.singleQCP.entryTime = time.format();
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/      

    planHistoryListCopy.querySingleQCP = function(){
            $http({
                  method: "POST",
                  url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleQCP",
                   // url: "plan/querySingleQCP.json",
                   headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                  data: {
                        "sid": localStorage.getItem('sid'),
                        "checkoutPlanSid": localStorage.getItem('checkoutHistoryCopySid'),
                        "companySid": localStorage.getItem('cSid')
                  }
            })
            .success(function(data){
            if (data.code=="N01"){
                
                  planHistoryListCopy.singleQCP =data.contents;
                var entrytime = new Date(planHistoryListCopy.singleQCP.entryTime*1000),
                maketime = new Date(planHistoryListCopy.singleQCP.makeTime*1000);   
              // console.log(entrytime);
                planHistoryListCopy.singleQCP.entryTime = entrytime.format();
                 planHistoryListCopy.singleQCP.makeTime = maketime.format();
                 localStorage.setItem("materialSid",planHistoryListCopy.singleQCP.materialSid);
                //   var entrytime = new Date(planHistoryListCopy.singleQCP.entryTime*1000),
                // maketime = new Date(planHistoryListCopy.singleQCP.makeTime*1000);   
              // console.log(entrytime);
                //planHistoryListCopy.singleQCP.makeTime = time.format();
                //planHistoryListCopy.singleQCP.entryTime = time.format();
                  //console.log(planHistoryListCopy.singleQCP);
                
            }
            else if(data.code=="E00"){
                  alert(data.message+"，请重新登录");
                  localStorage.clear();
                  $location.path('login');
            }else {
                  console.log(data.message);
            }
        }).error(function () {
            console.log('querySingleQCP'+data.message);
        });
      }
// $scope.querySingleQCP();
/*
***************************************************
***************************************************
addQCP
***************************************************
***************************************************
*/
 $scope.addQCP = function(){

     $http({
       method: "POST",
       url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCP",
       // url: "plan/addQCP.json",
       header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
       data: {
               "sid": localStorage.getItem('sid'),
              "checkoutPlanNo":planHistoryListCopy.singleQCP.checkoutPlanNo,
              "checkoutPlanVersion":planHistoryListCopy.singleQCP.checkoutPlanVersion,
              "checkoutPlanTypeCode":planHistoryListCopy.singleQCP.checkoutPlanTypeCode,
              "checkoutPlanType":planHistoryListCopy.singleQCP.checkoutPlanType,
              "companySid":localStorage.getItem('cSid'),
              "companyShortName":localStorage.getItem('curCompanyName'),
              "materialSid":planHistoryListCopy.singleQCP.materialSid,
              "materialNo":planHistoryListCopy.singleQCP.materialNo,
              "materialVersion":planHistoryListCopy.singleQCP.materialVersion,
              "materialShortName":planHistoryListCopy.singleQCP.materialShortName,
              "aql":planHistoryListCopy.singleQCP.aql,
              // "entrySid":planHistoryListCopy.singleQCP. 1,
              "entryId":localStorage.getItem('email'),
              "entryJobNumber":localStorage.getItem('userJobNumber'),
              "entryName":planHistoryListCopy.singleQCP.entryName,
              "entryTime":((new Date(planHistoryListCopy.singleQCP.entryTime)).valueOf())/1000,
              "makeJobNumber":planHistoryListCopy.singleQCP.makeJobNumber,
              // "makeJobNumber":localStorage.getItem('makeJobNumber'),
              "makeName":planHistoryListCopy.singleQCP.makeName,
              "makeTime":((new Date(planHistoryListCopy.singleQCP.makeTime)).valueOf())/1000,






              //  "checkoutPlanNo":planHistoryListCopy.checkoutPlanNo,
              //  "checkoutPlanVersion":planHistoryListCopy.checkoutPlanVersion,
              //  //"checkoutPlanTypeCode":planHistoryListCopy.singleQCP.Selected.QCPType.code,
              //  //"checkoutPlanType":planHistoryListCopy.singleQCP.Selected.QCPType.name,
              //  //"companySid":localStorage.getItem('cSid'),
              //  //"companyShortName":localStorage.getItem('curCompanyName'),
              //  //"materialSid":planHistoryListCopy.singleQCP.Selected.materialNo.materialSid,
              //  "materialNo":planHistoryListCopy.materialNo,
              //  "materialVersion":planHistoryListCopy.materialVersion,
              //  "materialShortName":planHistoryListCopy.materialShortName,
              //  "aql":planHistoryListCopy.aql,
              // //  "entrySid":planHistoryListCopy. 1,
              // // "entryId":localStorage.getItem('email'),
              // // "entryJobNumber":localStorage.getItem('userJobNumber'),
              //  "entryName":planHistoryListCopy.entryName,
              // "entryTime":((new Date(planHistoryListCopy.entryTime)).valueOf())/1000,
              //  "makeJobNumber":planHistoryListCopy.makeJobNumber,
              //  // "makeJobNumber":localStorage.getItem('makeJobNumber'),
              //  "makeName":planHistoryListCopy.makeName,
              //  "makeTime":((new Date(planHistoryListCopy.makeTime)).valueOf())/1000,
       }
     })
     .success(function(data){
             if (data.code == 'N01') {             
           alert(data.message);
           $location.path('account_index/planHistoryList');         
             }
             else if(data.code=="E00"){
                 alert(data.message+",请重新登陆");
                 localStorage.clear();
                 $location.path('login').replace();
             }else {
                 alert(data.message);
             }  
         })
   }

/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

      $scope.HistoryListCopyback = function(){
            var a = confirm("您确定要退出吗？退出将丢失填写数据!")
            if (a) {
                  $location.path("account_index/planHistoryList");
            }
      }
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

/************************************************************
*************************************************************
只能输入数字和小数点的限制
*************************************************************
************************************************************/
function check(e) { 
    var re = /^\d+(?=\.{0,1}\d+$|$)/ 
    if (e.value != "") { 
        if (!re.test(e.value)) { 
            alert("请输入正确的数字"); 
            e.value = ""; 
            e.focus(); 
        } 
    } 
} 

/************************************************************
*************************************************************
*************************************************************
************************************************************/

    $scope.planHistoryListCopy =planHistoryListCopy;
     planHistoryListCopy.querySingleQCP();

}])


FIMS.controller('iqcRecordCheckCtrl',['$scope','$location','$http',function($scope,$location,$http,$q){

    var iqcRecordCheck = {

        materialNo: "",
        materialName: "",
        materialShortName: "",
        materialVersion: "",
        checkoutPlanNo: "",
        checkoutPlanVersion: "",
        checkoutRecordSid:"",
        externalReceiptNo: "",
        checkoutRecordId:"",
        vendorShortName:"",
        checkoutRecordNo: "",
        batchNo: "",
       // giveCheckoutTime: "",
        checkoutTime:"",
        vendor: "",
        giveCheckoutAmount: "",
        sampleAmount: "",

        companyShortName :localStorage.getItem('curCompanyName')

    };

   // $scope.iqcRecordCheck = iqcRecordCheck;

//调整时间格式
    Date.prototype.format = function() {
        var year = this.getFullYear().toString();
        var month = (this.getMonth()+1).toString();
        var day = this.getDate().toString();
       // console.log(year);

        if (month<10) {
            month = "0" + month;
        }

        if (day<10) {
            day = "0" + day;
        }

        return (year + "-" + month + "-" +day );
    }


   
   //自执行函数，删除相关本地存储
  function init(){
        localStorage.removeItem('materialSid');
    }

    init();

/***********************************************************
************************************************************
queryIQCRecords 检验记录查询
************************************************************
***********************************************************/

 $scope.querySingleIQCRecord = function(input_way_code) {
       
        var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
        http_url += (input_way_code == "CE")? "querySingleSimpleIQCRecord":"querySingleComplexIQCRecord";


        $http({

            method: "POST",
            url: http_url,
            // url: config.HOST + "/api/2.0/bp/qc/iqc/queryIQCRecords",
            //url: "iqc/iqc_record/querySingleIQCRecord.json",
            header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "checkoutRecordSid":localStorage.getItem('checkoutRecordSid'),
                "companySid": localStorage.getItem('cSid'),
                 //"page": localStorage.getItem('page')
            }
        })

        .success(function(data){
            if (data.code == 'N01') {
               $scope.iqcRecordCheck = data.contents.checkoutRecord;
               $scope.iqcRecordCheck.checkoutTime = (new Date(data.contents.checkoutRecord.checkoutTime*1000)).format();
                localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
                localStorage.setItem("DX",JSON.stringify(data.contents.DX));
                localStorage.setItem("DL",JSON.stringify(data.contents.DL));
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
        // .error(function () {
        //     console.log('querySingleIQCRecord'+data.message);
        // });
    }
      $scope.querySingleIQCRecord();

/***********************************************************
************************************************************
querySingleIQCRecord1 获取本地数据
************************************************************
***********************************************************/
    // 查询单个检验记录
    // var querySingleIQCRecord1 = function(input_way_code){
    //     //var deffered = $q.defer();

    //     var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
    //     http_url += (input_way_code == "CE")? "querySingleSimpleIQCRecord":"querySingleComplexIQCRecord";
    //      // var http_url = "iqc/iqc_add/" ;
    //      //  http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord.json":"querySingleSimpleIQCRecord.json";
    //     $http({
    //         method: "POST",
    //         // url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleIQCRecord",
    //         url: http_url,
    //         header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
    //         data: {
    //             "sid": localStorage.getItem('sid'),
    //             "companySid": localStorage.getItem('cSid'),
    //             "checkoutRecordSid": localStorage.getItem('checkoutRecordSid')              
    //         }
    //     })
    //     .success(function(data){
    //         if (data.code == 'N01') {
    //            // deffered.resolve(data.contents);            
    //             localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
    //             localStorage.setItem("DX",JSON.stringify(data.contents.DX));
    //             localStorage.setItem("DL",JSON.stringify(data.contents.DL));
    //         }
    //         else if(data.code=="E00"){
    //             alert(data.message+",请重新登陆");
    //             localStorage.clear();
    //             $location.path('login').replace();
    //         }else {
    //             alert(data.message);
    //         }  
    //     })

    //    // return deffered.promise;
    // }

    // querySingleIQCRecord1();


 /***********************************************************
************************************************************
back 返回上一级
************************************************************
***********************************************************/  


    $scope.back = function(){

       $location.path("account_index/iqcRecord");

    }

}])
FIMS.controller('iqcRecordReviseCtrl',['$scope','$location','$http',function($scope,$location,$http,$q){

    var iqcRecordRevise = {

        materialNo: "",
        materialName: "",
        materialShortName: "",
        materialVersion: "",
        checkoutPlanNo: "",
        checkoutPlanVersion: "",
        checkoutRecordSid:"",
        externalReceiptNo: "",
        checkoutRecordId:"",
        vendorShortName:"",
        checkoutRecordNo: "",
        batchNo: "",
        giveCheckoutTime: "",
        checkoutTime:"",
        vendor: "",
        giveCheckoutAmount: "",
        sampleAmount: "",

        companyShortName :localStorage.getItem('curCompanyName')

    };

   // $scope.iqcRecordRevise = iqcRecordRevise;

//调整时间格式
    Date.prototype.format = function() {
        var year = this.getFullYear().toString();
        var month = (this.getMonth()+1).toString();
        var day = this.getDate().toString();
       // console.log(year);

        if (month<10) {
            month = "0" + month;
        }

        if (day<10) {
            day = "0" + day;
        }

        return (year + "-" + month + "-" +day );
    }


   
   //自执行函数，删除相关本地存储
  function init(){
        localStorage.removeItem('materialSid');
    }

    init();

/***********************************************************
************************************************************
queryIQCRecords 检验记录查询
************************************************************
***********************************************************/

 $scope.querySingleIQCRecord = function(input_way_code) {
       
        var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
        http_url += (input_way_code == "CE")? "querySingleSimpleIQCRecord":"querySingleComplexIQCRecord";


        $http({

            method: "POST",
            url: http_url,
            // url: config.HOST + "/api/2.0/bp/qc/iqc/queryIQCRecords",
            //url: "iqc/iqc_record/querySingleIQCRecord.json",
            header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "checkoutRecordSid":localStorage.getItem('checkoutRecordSid'),
                "companySid": localStorage.getItem('cSid'),
                 //"page": localStorage.getItem('page')
            }
        })

        .success(function(data){
            if (data.code == 'N01') {
               $scope.iqcRecordRevise = data.contents.checkoutRecord;
               $scope.iqcRecordRevise.checkoutTime = (new Date(data.contents.checkoutRecord.checkoutTime*1000)).format();
                localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
                localStorage.setItem("DX",JSON.stringify(data.contents.DX));
                localStorage.setItem("DL",JSON.stringify(data.contents.DL));
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
        // .error(function () {
        //     console.log('querySingleIQCRecord'+data.message);
        // });
    }
      $scope.querySingleIQCRecord();

/***********************************************************
************************************************************
querySingleIQCRecord1 获取本地数据
************************************************************
***********************************************************/
    // 查询单个检验记录
    // var querySingleIQCRecord1 = function(input_way_code){
    //     //var deffered = $q.defer();

    //     var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
    //     http_url += (input_way_code == "CE")? "querySingleSimpleIQCRecord":"querySingleComplexIQCRecord";
    //      // var http_url = "iqc/iqc_add/" ;
    //      //  http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord.json":"querySingleSimpleIQCRecord.json";
    //     $http({
    //         method: "POST",
    //         // url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleIQCRecord",
    //         url: http_url,
    //         header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
    //         data: {
    //             "sid": localStorage.getItem('sid'),
    //             "companySid": localStorage.getItem('cSid'),
    //             "checkoutRecordSid": localStorage.getItem('checkoutRecordSid')              
    //         }
    //     })
    //     .success(function(data){
    //         if (data.code == 'N01') {
    //            // deffered.resolve(data.contents);            
    //             localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
    //             localStorage.setItem("DX",JSON.stringify(data.contents.DX));
    //             localStorage.setItem("DL",JSON.stringify(data.contents.DL));
    //         }
    //         else if(data.code=="E00"){
    //             alert(data.message+",请重新登陆");
    //             localStorage.clear();
    //             $location.path('login').replace();
    //         }else {
    //             alert(data.message);
    //         }  
    //     })

    //    // return deffered.promise;
    // }

    // querySingleIQCRecord1();


 /***********************************************************
************************************************************
back 返回上一级
************************************************************
***********************************************************/  


    $scope.back = function(){

       $location.path("account_index/iqcRecord");

    }

}])
FIMS.controller('iqcComplexDLCheckCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDLCheck = {	
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		companyShortName: localStorage.getItem('curCompanyName'),

		checkoutRecordSid: "",

		
         
        // sampleCheckoutValue: localStorage.getItem('DL'),
		
		 //DL: localStorage.getItem('DL'),
		  // DL:{

		  // 	sampleCheckoutValue:[]
		  // }
		   
	};
    
	$scope.iqcComplexDLCheck = iqcComplexDLCheck;
	//var $index;
	//if($index<10)

	//$index ="00"+$index;

	// $scope.i=00;

	// if(10<$index<100)
	// 	$scope.i=00;

function format ($index){
if($index<10)
{
	$index ="00"+$index;
}
else if(10<$index<100)
{
	$index = "0"+$index;
}

   return $index;
}
console.log( format(11));
console.log( format(10));

///////////////////////////////
//////////////////////////////
// function format (i){

//   format('000',   i)       
//    return i;
// }
// console.log( format(1));
// console.log( format(10));
// $scope.function(){

// i={if(0<=$index<=9)
//    {
// 	i ="00";
//    }
//    else if(10<$index<100)
//    {
// 	i = "0";
//    }}
//    return i;
// }//$index:= String.format("%03d",$index);
	//$index:=format('%0.3d',[$index]); 
    //DL: localStorage.getItem('DL');
//console.log(iqcComplexDLCheck.DL.sampleCheckoutValue);
 
  // var checkdl =function(){
  // 	var DL=localStorage.getItem("DL");

  // }
// function init(i) {
// 	//var i;

// 	for($index=0;$index<100;$index++){
// 	if(0<=$index<=9)
// 	{
// 		i=00;
// 	}
// 	else if(10<=$index<=99)
// 	{
// 		i=0;
// 	}

// }
// return i;
// }


	

	//	i="00";
	
	// else if(10<=$index<=99)
	// {
	// 	i=0;
	// }


//return i;

/***********************************************************************
************************************************************************
 // 获取基本信息部分
************************************************************************
***********************************************************************/

	var queryCheckoutRecord = function(){
		var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
		iqcComplexDLCheck.materialNo = checkoutRecord.materialNo;
		iqcComplexDLCheck.materialShortName = checkoutRecord.materialShortName;
		iqcComplexDLCheck.materialVersion = checkoutRecord.materialVersion;
		iqcComplexDLCheck.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcComplexDLCheck.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
		iqcComplexDLCheck.sampleAmount = checkoutRecord.sampleAmount;

		iqcComplexDLCheck.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

		// var a = JSON.parse(localStorage.getItem("DL"));
		// iqcComplexDLCheck.sampleCheckoutValue = a.sampleCheckoutValue;

		// 绑定定量部分
		 $rootScope.DL = JSON.parse(localStorage.getItem("DL"));
		// sampleCheckoutValue

		// iqcComplexDLCheck.sampleSel = $rootScope.DL;
		//console.log(DL);

		// for (var i=0,len=$rootScope.DL.length;i<len;i++) {
		// 	for (var j=0,lenj=$rootScope.DL[i].sample.length;j<lenj;j++) {
		// 		//var item = $rootScope.DL[i].sample[j];
		// 		$rootScope.DL[i].sample[j].sampleCheckoutValue = iqcComplexDLCheck.DL.sampleCheckoutValue;
		// 	}
		// }

		
	}
	queryCheckoutRecord();
/***********************************************************************
************************************************************************
 //返回字符串指定位数 不足补齐0
************************************************************************
***********************************************************************/
// function FilledZeroStr(st, num) {             
// var retSt = 000;          
//    // by script 
//            
//  if (st.indexOf(".") == st.lastIndexOf(".")) { 
//                 var stNum = st.indexOf(".") > -1 ? st.split(".")[1].length : 0;               
//                 for (var i = 0; i < num - stNum; i++) 
//                 {     
// 	                retSt += "0";   
//                 }        
//           } 
//             return retSt;  
//        }
// $index:=format('%0.3d',[$index]);  


/***********************************************************************
************************************************************************
 // 返回首页
************************************************************************
***********************************************************************/

	$scope.next = function() {
		localStorage.setItem("DL",JSON.stringify($rootScope.DL));
		$location.path("account_index/iqcRecord");
	}

	
	
}])
FIMS.controller('iqcComplexDXCheckCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
    var iqcComplexDXCheck = { 

    materialNo: "",
    materialShortName: "",
    materialVersion: "",
    checkoutPlanNo: "",
    checkoutPlanVersion: "",
    sampleAmount: "",
    companyShortName: localStorage.getItem('curCompanyName'),
    
    checkoutRecordSid: "",

    // $rootScope.DX: [],
    itemDic: [
      {
        "value": "",
        "sampleCheckoutValue": "NULL"
      },
      {
        "value": "是",
        "sampleCheckoutValue": "是"
      },
      {
        // "sampleNo": "",
        "value": "否",
        "sampleCheckoutValue": "否"
      }
    ],
    sampleSel: []
     

    };

 

  $scope.iqcComplexDXCheck = iqcComplexDXCheck;
/***********************************************************************
************************************************************************
 // 获取基本信息部分
************************************************************************
***********************************************************************/
  var queryCheckoutRecord = function(){
    
    var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
    iqcComplexDXCheck.materialNo = checkoutRecord.materialNo;
    iqcComplexDXCheck.materialShortName = checkoutRecord.materialShortName;
    iqcComplexDXCheck.materialVersion = checkoutRecord.materialVersion;
    iqcComplexDXCheck.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
    iqcComplexDXCheck.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
    iqcComplexDXCheck.sampleAmount = checkoutRecord.sampleAmount;

    iqcComplexDXCheck.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

    // 绑定定性部分
    $rootScope.DX = JSON.parse(localStorage.getItem("DX"));
    //console.log($rootScope.DX);

    //下拉数据绑定
    // $rootScope.DX = $rootScope.DX.sample;
    // console.log($rootScope.DX);
    // for (var i=0,len=$rootScope.DX.length;i<len;i++){
    //  $rootScope.DX.push($rootScope.DX[i].sample);
    // }
    // console.log($rootScope.DX);

    for (var i=0,len=$rootScope.DX.length;i<len;i++) {
      for (var j=0,lenj=$rootScope.DX[i].sample.length;j<lenj;j++) {
        var item = $rootScope.DX[i].sample[j];
        if (item.sampleCheckoutValue=="是") {
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXCheck.itemDic[1].sampleCheckoutValue;
        }else if (item.sampleCheckoutValue=="否"){
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXCheck.itemDic[2].sampleCheckoutValue;
        }else {
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXCheck.itemDic[0].sampleCheckoutValue;
        }
      }
    }
  }
  queryCheckoutRecord();

/***********************************************************************
************************************************************************
 // 返回首页
************************************************************************
***********************************************************************/


    $scope.back = function(){

        $location.path("account_index/iqcRecord");

    }

}])


FIMS.controller('iqcComplexDLReviseCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDLRevise = {	
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		companyShortName: localStorage.getItem('curCompanyName'),

		checkoutRecordSid: "",

		
         
        // sampleCheckoutValue: localStorage.getItem('DL'),
		
		 //DL: localStorage.getItem('DL'),
		  // DL:{

		  // 	sampleCheckoutValue:[]
		  // }
		   
	};
    
	$scope.iqcComplexDLRevise = iqcComplexDLRevise;
    //DL: localStorage.getItem('DL');
//console.log(iqcComplexDLRevise.DL.sampleCheckoutValue);
 
  // var checkdl =function(){
  // 	var DL=localStorage.getItem("DL");

  // }

/***********************************************************************
************************************************************************
 // 获取基本信息部分
************************************************************************
***********************************************************************/

	var queryCheckoutRecord = function(){
		var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
		iqcComplexDLRevise.materialNo = checkoutRecord.materialNo;
		iqcComplexDLRevise.materialShortName = checkoutRecord.materialShortName;
		iqcComplexDLRevise.materialVersion = checkoutRecord.materialVersion;
		iqcComplexDLRevise.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcComplexDLRevise.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
		iqcComplexDLRevise.sampleAmount = checkoutRecord.sampleAmount;

		iqcComplexDLRevise.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

		// var a = JSON.parse(localStorage.getItem("DL"));
		// iqcComplexDLRevise.sampleCheckoutValue = a.sampleCheckoutValue;

		// 绑定定量部分
		 $rootScope.DL = JSON.parse(localStorage.getItem("DL"));
		// sampleCheckoutValue

		// iqcComplexDLRevise.sampleSel = $rootScope.DL;
		//console.log(DL);

		// for (var i=0,len=$rootScope.DL.length;i<len;i++) {
		// 	for (var j=0,lenj=$rootScope.DL[i].sample.length;j<lenj;j++) {
		// 		//var item = $rootScope.DL[i].sample[j];
		// 		$rootScope.DL[i].sample[j].sampleCheckoutValue = iqcComplexDLRevise.DL.sampleCheckoutValue;
		// 	}
		// }

		
	}
	queryCheckoutRecord();
/***********************************************************************
************************************************************************
 // 保存
************************************************************************
***********************************************************************/

	$scope.updateComplexIQCRecord = function() {
		// console.log($rootScope.DX);
		// var keyDX

		$http({
			method: "POST",
			 url: config.HOST + "/api/2.0/bp/qc/iqc/updateComplexIQCRecord",
			//url: "iqc/iqc_add/updateComplexIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				// "companySid": localStorage.getItem('cSid'),
				"checkoutRecordSid": localStorage.getItem('checkoutRecordSid'),
				"DX": $rootScope.DX,
				"DL": $rootScope.DL 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	localStorage.setItem("DL",JSON.stringify($rootScope.DL));           	
                alert(data.message);
                // $location.path("account_index/iqcRecord");
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}


/***********************************************************************
************************************************************************
 // 提交
************************************************************************
***********************************************************************/
$scope.submitComplexIQCRecord = function() {
		// console.log($rootScope.DX);
		// var keyDX

		$http({
			method: "POST",
			 url: config.HOST + "/api/2.0/bp/qc/iqc/submitComplexIQCRecord",
			//url: "iqc/iqc_add/submitComplexIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				// "companySid": localStorage.getItem('cSid'),
				"checkoutRecordSid": localStorage.getItem('checkoutRecordSid'),
				"DX": $rootScope.DX,
				"DL": $rootScope.DL 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {            	         	
                alert("你确定要提交吗？提交后数据就不能更改！");
                $location.path("account_index/iqcRecord");
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}
/***********************************************************************
************************************************************************
 // 返回
************************************************************************
***********************************************************************/
	$scope.next = function() {
		localStorage.setItem("DL",JSON.stringify($rootScope.DL));
		$location.path("account_index/iqcRecord");
	}

	
	
}])
FIMS.controller('iqcComplexDXReviseCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
    var iqcComplexDXRevise = { 

    materialNo: "",
    materialShortName: "",
    materialVersion: "",
    checkoutPlanNo: "",
    checkoutPlanVersion: "",
    sampleAmount: "",
    companyShortName: localStorage.getItem('curCompanyName'),
    
    checkoutRecordSid: "",

    // $rootScope.DX: [],
    itemDic: [
      {
        "value": "",
        "sampleCheckoutValue": "NULL"
      },
      {
        "value": "是",
        "sampleCheckoutValue": "是"
      },
      {
        // "sampleNo": "",
        "value": "否",
        "sampleCheckoutValue": "否"
      }
    ],
    sampleSel: []
     

    };

 

  $scope.iqcComplexDXRevise = iqcComplexDXRevise;


/***********************************************************
************************************************************
queryIQCRecords 检验记录查询
************************************************************
***********************************************************/

 $scope.querySingleIQCRecord = function(input_way_code) {
       
        var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
        http_url += (input_way_code == "CE")? "querySingleSimpleIQCRecord":"querySingleComplexIQCRecord";


        $http({

            method: "POST",
            url: http_url,
            // url: config.HOST + "/api/2.0/bp/qc/iqc/queryIQCRecords",
            //url: "iqc/iqc_record/querySingleIQCRecord.json",
            header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "checkoutRecordSid":localStorage.getItem('checkoutRecordSid'),
                "companySid": localStorage.getItem('cSid'),
                 //"page": localStorage.getItem('page')
            }
        })

        .success(function(data){
            if (data.code == 'N01') {
               // $scope.iqcRecordRevise = data.contents.checkoutRecord;
               // $scope.iqcRecordRevise.giveCheckoutTime = (new Date(data.contents.checkoutRecord.giveCheckoutTime*1000)).format();
                localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
                localStorage.setItem("DX",JSON.stringify(data.contents.DX));
                localStorage.setItem("DL",JSON.stringify(data.contents.DL));
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
        // .error(function () {
        //     console.log('querySingleIQCRecord'+data.message);
        // });
    }
      $scope.querySingleIQCRecord();



/***********************************************************************
************************************************************************
 // 获取基本信息部分
************************************************************************
***********************************************************************/
  var queryCheckoutRecord = function(){
    
    var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
    iqcComplexDXRevise.materialNo = checkoutRecord.materialNo;
    iqcComplexDXRevise.materialShortName = checkoutRecord.materialShortName;
    iqcComplexDXRevise.materialVersion = checkoutRecord.materialVersion;
    iqcComplexDXRevise.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
    iqcComplexDXRevise.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
    iqcComplexDXRevise.sampleAmount = checkoutRecord.sampleAmount;

    iqcComplexDXRevise.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

    // 绑定定性部分
    $rootScope.DX = JSON.parse(localStorage.getItem("DX"));
    //console.log($rootScope.DX);

    //下拉数据绑定
    // $rootScope.DX = $rootScope.DX.sample;
    // console.log($rootScope.DX);
    // for (var i=0,len=$rootScope.DX.length;i<len;i++){
    //  $rootScope.DX.push($rootScope.DX[i].sample);
    // }
    // console.log($rootScope.DX);

    for (var i=0,len=$rootScope.DX.length;i<len;i++) {
      for (var j=0,lenj=$rootScope.DX[i].sample.length;j<lenj;j++) {
        var item = $rootScope.DX[i].sample[j];
        if (item.sampleCheckoutValue=="是") {
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXRevise.itemDic[1].sampleCheckoutValue;
        }else if (item.sampleCheckoutValue=="否"){
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXRevise.itemDic[2].sampleCheckoutValue;
        }else {
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXRevise.itemDic[0].sampleCheckoutValue;
        }
      }
    }
  }
  queryCheckoutRecord();

 /***********************************************************************
************************************************************************
 // 保存
************************************************************************
***********************************************************************/ 

$scope.updateComplexIQCRecord = function() {
    // console.log($rootScope.DX);
    // var keyDX

    $http({
      method: "POST",
      url: config.HOST + "/api/2.0/bp/qc/iqc/updateComplexIQCRecord",
      // url: "iqc/iqc_add/updateComplexIQCRecord.json",
      header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
      data: {
        "sid": localStorage.getItem('sid'),
        // "companySid": localStorage.getItem('cSid'),
        "checkoutRecordSid": localStorage.getItem('checkoutRecordSid'),
        "DX": $rootScope.DX,
        "DL": $rootScope.DL || JSON.parse(localStorage.getItem("DL"))
      }
    })
    .success(function(data){
            if (data.code == 'N01') {
              localStorage.setItem("DX",JSON.stringify($rootScope.DX));             
                alert(data.message);
                // $location.path("account_index/iqcRecord");
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
  }




/***********************************************************************
************************************************************************
 // 返回首页
************************************************************************
***********************************************************************/


    $scope.back = function(){

        $location.path("account_index/iqcRecord");

    }

}])
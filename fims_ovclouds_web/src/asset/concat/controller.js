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
		// $scope.companyList = chooseTeamService.queryJoinedCompanies();
		$scope.joinedCompanies = chooseTeamService.joinedCompanies;
		$scope.setWorkingCompany = chooseTeamService.setWorkingCompany;
}])

FIMS.controller('chooseModuleCtrl',['$scope', '$rootScope','$q','$location',"$http",
	function($scope, $rootScope, $q,$location,$http) {
		// $scope.userName = localStorage.getItem("userName");
		$scope.curCompanyName = localStorage.getItem("curCompanyName");
		$scope.applyJoinCompanyNumber = localStorage.getItem("applyJoinCompanyNumber");

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
	                localStorage.setItem('applyJoin', JSON.stringify(data.contents));
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
}])

FIMS.controller('userManageCtrl', ['$scope','$location','userManageService',
	function($scope,$location,userManageService){
	$scope.genLink = userManageService.genLink;
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
	$scope.applyInfo = JSON.parse(localStorage.getItem('applyJoin'));
	$scope.agreeJoin = function(){
		// console.log($scope.applyInfo);
		var subContent = [];
		var subContentBody = {};
		// console.log(subContent);
		// console.log($scope.applyInfo.length);

		// subContentBody = {
		// 	"applyJoinSid":($scope.applyInfo)[0].applyJoinSid,
		// 	"userApplyStatus":($scope.applyInfo)[0].userApplyStatus
		// }
		// console.log(subContentBody);

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
FIMS.controller('joinCoCtrl', ['$scope','$http', '$state','$location',function ($scope,$http,$state,$location) {
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
                console.log(data.message);
            }  
		})
	}

	$scope.joinCo = joinCo;
}])
FIMS.controller('comSettingCtrl', ['$scope','$location','$http',function($scope,$location,$http){
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
			iInfo: []
		},
		industry: {
			iType: {
				name: '',
				code: ''
			},
			iInfo: {
				name: '',
				code: ''
			}

		},

		address: {
			province: {
				name: '',
				code: ''
			},
			city: {
				name: '',
				code: ''
			}
		}
	};

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
			        "companyRegionCode": comSetting.address.province.code,
			        "companyRegion": comSetting.address.province.name,
			        "companyProvinceCode": comSetting.address.city.code,
			        "companyProvince": comSetting.address.city.name,
			        "companyIndustryCode": comSetting.industry.iInfo.code,
			        "companyIndustry": comSetting.industry.iInfo.name,
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

	comSetting.getProvince = function(){
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
                comSetting.dictionary.province = [];
                for (var i=0;i < data.contents.length;i++){
                    comSetting.dictionary.province.push({
                        "name": data.contents[i].provinceName,
                        "code" : data.contents[i].provinceCode
                    });
                }   
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
	}

	comSetting.getProvince();


	comSetting.getCity = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCity",
			// url: "account/comSetting/City.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"provinceCode": comSetting.address.province.code
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.city = [];
                for (var i=0;i < data.contents.length;i++){
                    comSetting.dictionary.city.push({
                        "name": data.contents[i].cityName,
                        "code" : data.contents[i].cityCode
                    });
                }   
            }
         	else if(data.code=="E00"){
            	alert(data.message+"（获取城市）,请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }        
        }).error(function () {
            console.log('error');
        });
	}

	comSetting.queryType = function(){
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
                comSetting.dictionary.iType = [];
                for (var i=0;i < data.contents.length;i++){
                    comSetting.dictionary.iType.push({
                        "code": data.contents[i].companyIndustryCode,
                        "name" : data.contents[i].companyIndustry
                    });
                }   
            }
            else {
                console.log(data.message);
            }
        }).error(function () {
            console.log('error');
        });
	}

	comSetting.queryType();


	comSetting.queryInfo = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCompanyIndustry",
			// url: "account/comSetting/Industry.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companyIndustryCode": comSetting.industry.iType.code
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.iInfo = [];
                for (var i=0;i < data.contents.length;i++){
                    comSetting.dictionary.iInfo.push({
                        "code": data.contents[i].companyIndustryCode,
                        "name" : data.contents[i].companyIndustry
                    });
                }   
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

	comSetting.queryCompanyExtendInfo = function(){
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
		        ccomSetting.address.province.code = data.contents.countryRegionCode;
			    comSetting.address.province.name = data.contents.companyRegion;
			    comSetting.address.city.code =data.contents.companyProvinceCode;
			    comSetting.address.city.name = data.contents.companyProvince;
			    comSetting.industry.iInfo.code = data.contents.companyIndustryCode;
			    comSetting.industry.iInfo.name = data.contents.companyIndustry;
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
	}

	comSetting.queryCompanyExtendInfo();

	$scope.comSetting = comSetting;


}])
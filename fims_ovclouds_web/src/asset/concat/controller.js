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

		// 将所有当前改为1
		localStorage.setItem("page",1);

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
			        "companyRegionCode": "86#",
			        "companyRegion": "中国",
			        "companyProvinceCode": comSetting.address.province.code,
			        "companyProvince": comSetting.address.province.name,
			        "companyCityCode": comSetting.address.city.code,
			        "companyCity": comSetting.address.city.name,
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
		        comSetting.address.province.code = data.contents.countryRegionCode;
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
FIMS.controller('materialCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var material = {};
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
					"sid": localStorage.getItem('sid'),
				    "operateStatus": 1,
				    "materialSid": localStorage.getItem('curM'),
				    // "materialNo":updateMaterial.materialNo,
				    "materialShortName":$scope.material.materialShortName,
				    "materialVersion":$scope.material.materialVersion,
				    "materialFullName":$scope.material.materialFullName,
				    "companySid":localStorage.getItem('cSid'),
				    "companyShortName":$scope.material.companyShortName,
				    "notes":$scope.material.notes
				        
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

	var newMaterial = {
		"materialNo": "",
        "materialShortName": "",
        "materialVersion": "",
        "materialFullName": "",
        "notes": ""
	};

	$scope.newMaterial= newMaterial;

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
                $scope.newMaterial = {
                	"materialNo": "",
			        "materialShortName": "",
			        "materialVersion": "",
			        "materialFullName": "",
			        "notes": ""
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

}])
FIMS.controller('customerCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var customer = {};

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
                $scope.newcustomer = {
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
		var vendor = {};

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
                $scope.newvendor = {
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
			page: localStorage.getItem("page")
		};

		$scope.companyShortName = localStorage.getItem('curCompanyName');
		$scope.planlist = planlist;

		$scope.planlistBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/chooseModule').replace();
		}

		//  /api/2.0/bp/qcp/qcp
		
		$scope.queryDicQCPType = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
				url: "plan/queryDicQCPType.json",
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


		// 上一页
		$scope.previous = function(){
			if (planlist.page==1) {
				alert("当前是第1页...")
			} 
			
		}

		//根据检验计划类型获取检验计划
		$scope.queryQCPByType = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCP",
				url: "plan/queryQCPByType.json",
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
				// url: "account/joinCo/joinCo.json",
				// url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
				url: "manage/engineer/material/queryMaterialsInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	planlist.dictionary.materialName = data.contents;
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
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
				url: "plan/queryMaterialVersionByMaterialNo.json",
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
	                planlist.QCPSelected = data.contents;
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
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByMaterial",
				url: "plan/queryQCPByMaterial.json",
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
			        "companyRegionCode": "86#",
			        "companyRegion": "中国",
			        "companyProvinceCode": comSetting.address.province.code,
			        "companyProvince": comSetting.address.province.name,
			        "companyCityCode": comSetting.address.city.code,
			        "companyCity": comSetting.address.city.name,
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
		        comSetting.address.province.code = data.contents.countryRegionCode;
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
FIMS.controller('planReviseCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var planRevise = {

		keyCheckoutPlan:{
/*
{
            "sid":"123",
            "checkoutPlanSid": 1,
            "checkoutPlanNo": "20140420",
            "checkoutPlanVersion": "A",
            "checkoutPlanTypeCode": "A",
            "checkoutPlanType": "A",
            "companySid": 1,
            "companyShortName": "极创",
            "materialSid": 1,
            "materialNo": "1",
            "materialVersion": "A",
            "materialShortName": "A",
            "aql": 5,
            "entrySid": 1,
            "entrySidHash": 1,
            "entryId": "1",
            "entryJobNumber": "123",
            "entryName": "123",
            "entryTime": 123,
            "makeJobNumber": "2014",
            "makeName": "123",
            "makeTime": 123,
            "operateStatusCode": "1",
            "operateStatus": "1",
            "checkoutPlanStatusCode": "1",
            "checkoutPlanStatus": "1",
            "notes": "1",
            "page":"2"

}
*/
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
            aql: 5,
            entrySid: 1,
            entrySidHash: 1,
            entryId: "",
            entryJobNumber: "",
            entryName: "",
            entryTime: 123,
            makeJobNumber: "2014",
            makeName: "123",
            makeTime: 123,
            operateStatusCode: "1",
            operateStatus: "1",
            checkoutPlanStatusCode: "1",
            checkoutPlanStatus: "1",
            notes: "1",
            page:"2"
		},

		auxCheckoutPlan:{
/*
{
            "checkoutPlanSid": 1,
            "checkoutPlanSidHash": 1,
            "checkoutPlanNo": "20140420",
            "checkoutPlanVersion": "A",
            "checkoutPlanTypeCode": "A",
            "checkoutPlanType": "A",
            "companySid": 1,
            "companySidHash": 1,
            "companyShortName": "极创",
            "materialSid": 1,
            "materialSidHash": 1,
            "materialNo": "1",
            "materialVersion": "A",
            "materialShortName": "A",
            "aql": 5,
            "entrySid": 1,
            "entrySidHash": 1,
            "entryId": "1",
            "entryJobNumber": "123",
            "entryName": "123",
            "entryTime": 123,
            "makeJobNumber": "2014",
            "makeName": "123",
            "makeTime": 123,
            "operateStatusCode": "1",
            "operateStatus": "1",
            "checkoutPlanStatusCode": "1",
            "checkoutPlanStatus": "1",
            "notes": "1"
}
*/
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

            oObj.sid                  = iObj.sid,
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
	planRevise.querySingleQCP = function(){
		$http({
			method: "POST",
			//url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleQCP",
			 url: "plan/querySingleQCP.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutPlanSid": planRevise.selectedCheckoutPlanSid
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	//alert("公司信息更新成功");
            	//$location.path("account_index/chooseModule");
            	planRevise.auxCheckoutPlan = data.contents;
            	console.log(planRevise.auxCheckoutPlan);
            	dataTransfer(planRevise.keyCheckoutPlan,planRevise.auxCheckoutPlan);

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

		 alert("set11");
        console.log(entry);
	 	 alert("set11");

		//
		$http({
			method: "POST",
			//url: config.HOST + "/api/2.0/bp/qcp/qcp/updateQCP",
			url: "plan/updateQCP.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					sid		                    : entry.sid,
		            checkoutPlanSid		        : entry.checkoutPlanSid,
		            aql		                    : entry.aql,
		            entryId		                : entry.entryId,
		            entryJobNumber		        : entry.entryJobNumber,
		            entryName		            : entry.entryName,
		            entryTime		            : entry.entryTime,
		            makeJobNumber		        : entry.makeJobNumber,
		            makeName		            : entry.makeName,
		            makeTime		            : entry.makeTime,
		            notes		                : entry.notes

			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	alert("检验计划信息更新成功");
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

/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

	$scope.planRevise = planRevise;

 	// alert("set");
 	localStorage.setItem('checkoutPlanSid','111');
 	// alert("get");
 	planRevise.selectedCheckoutPlanSid = localStorage.getItem('checkoutPlanSid');
 	// alert("remove");
 	localStorage.removeItem('checkoutPlanSid');

	planRevise.querySingleQCP();

}])

/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

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
		checkoutPlanVersion : "checkoutPlanVersion",
		aql: "aql",
		makeName : "makeName",
		makeTime: "makeTime",
		entryName: "entryName",
		entryTime: "entryTime"
	};

	$scope.queryDicQCPType = function(){
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
			url: "plan/queryDicQCPType.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
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
            }else {
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
			// url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
			url: "manage/engineer/material/queryMaterialsInfo.json",
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
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
			url: "plan/queryMaterialVersionByMaterialNo.json",
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
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
			url: "plan/queryMaterialShortName.json",
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
            	planAdd.checkoutPlanNo = planAdd.Selected.QCPType.code+"-"+planAdd.Selected.materialNo+"-"+planAdd.Selected.materialVersion ;

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
FIMS.controller('planMetricListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planMetricList = {
			
			viewSelectedCheckoutPlanSid: 0,

			viewSelectedCheckoutMetricSid: 0,

			DXCheckoutMetricList:[],

			DLCheckoutMetricList:[],

			checkoutMetrics:{
	            checkoutMetricSid: "",
	            checkoutPlanSid: "",
	            checkoutMetricName: "",
	            checkoutMetricDescription: "",
	            checkoutToolCode: "",
	            checkoutToolName: "",
	            checkoutMetricTypeCode: "",
	            checkoutMetricType: "",
	            checkoutMetricClassifyCode: "",
	            checkoutMetricClassify: "",
	            processName: "",
	            metricUnit: "",
	            referenceStandard: "",
	            underTolerance: "",
	            upTolerance: "",
	            mapPosition: "",
	            threeDimensionalRogramNo: "",
	            fixtureId: "",
	            checkoutMetricNo: ""
        	}

		};
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/


		$scope.planlistBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/chooseModule').replace();
		}

		//  /api/2.0/bp/qcp/qcp
		
		$scope.queryDicQCPType = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
				url: "plan/queryDicQCPType.json",
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



		// 上一页
		$scope.previous = function(){
			if (planlist.page==1) {
				alert("当前是第1页...")
			} 
			
		}

		//根据检验计划类型获取检验计划
		$scope.queryQCPByType = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCP",
				url: "plan/queryQCPByType.json",
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
				// url: "account/joinCo/joinCo.json",
				// url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
				url: "manage/engineer/material/queryMaterialsInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	planlist.dictionary.materialName = data.contents;
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
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
				url: "plan/queryMaterialVersionByMaterialNo.json",
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
	                planlist.QCPSelected = data.contents;
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
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByMaterial",
				url: "plan/queryQCPByMaterial.json",
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
queryQCPItems
***************************************************
***************************************************
*/

	var parseData = function(array){

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

            o.checkoutPlanSid		    = planMetricList.viewSelectedCheckoutPlanSid;

			return o;
		}

		var entry = assemblyObj();

		 alert("set11");
        console.log(entry);
	 	 alert("set11");

		//
		$http({
			method: "POST",
			//url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPItems",
			url: "plan/queryQCPItems.json",
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

            	//绑定数据
            	parseData(data.contents);

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

	planMetricList.updateQCP = function(){

		// 准备参数
		var assemblyObj = function(){
			var o = {};

			o.sid		                = planMetricList.keyCheckoutPlan.sid,
            o.checkoutPlanSid		    = planMetricList.keyCheckoutPlan.checkoutPlanSid,
            o.aql		                = planMetricList.keyCheckoutPlan.aql,
            o.entryId		            = planMetricList.keyCheckoutPlan.entryId,
            o.entryJobNumber		    = planMetricList.keyCheckoutPlan.entryJobNumber,
            o.entryName		            = planMetricList.keyCheckoutPlan.entryName,
            o.entryTime		            = planMetricList.keyCheckoutPlan.entryTime,
            o.makeJobNumber		        = planMetricList.keyCheckoutPlan.makeJobNumber,
            o.makeName		            = planMetricList.keyCheckoutPlan.makeName,
            o.makeTime		            = planMetricList.keyCheckoutPlan.makeTime,
            o.notes		                = planMetricList.keyCheckoutPlan.notes

			return o;
		}

		var entry = assemblyObj();

		 alert("set11");
        console.log(entry);
	 	 alert("set11");

		//
		$http({
			method: "POST",
			//url: config.HOST + "/api/2.0/bp/qcp/qcp/updateQCP",
			url: "plan/updateQCP.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					sid		                    : entry.sid,
		            checkoutPlanSid		        : entry.checkoutPlanSid,
		            aql		                    : entry.aql,
		            entryId		                : entry.entryId,
		            entryJobNumber		        : entry.entryJobNumber,
		            entryName		            : entry.entryName,
		            entryTime		            : entry.entryTime,
		            makeJobNumber		        : entry.makeJobNumber,
		            makeName		            : entry.makeName,
		            makeTime		            : entry.makeTime,
		            notes		                : entry.notes

			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	alert("检验计划信息更新成功");
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


/*
***************************************************
***************************************************
***************************************************
***************************************************
*/
	//$scope.companyShortName = localStorage.getItem('curCompanyName');

	$scope.planMetricList = planMetricList;

 	// alert("set");
 	localStorage.setItem('checkoutPlanSid','111');
 	// alert("get");
 	planMetricList.viewSelectedCheckoutPlanSid = localStorage.getItem('checkoutPlanSid');
 	// alert("remove");
 	localStorage.removeItem('checkoutPlanSid');

	planMetricList.queryQCPItems();


}])
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

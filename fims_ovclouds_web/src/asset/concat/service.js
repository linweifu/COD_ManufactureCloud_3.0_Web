FIMS.factory('loginService',  ['$location', '$rootScope', '$http' ,function($location,$rootScope, $http) {
    var login = {};

    login.user = {
        email: '',
        password: ''
    };

    login.response = {
        returnMsg:  '',
        emailStatus: '',
        pwStatus: '',
        alert_display: 'none'
    };

    login.subData = function () {
        // var postUrl = '';
        // if (login.user.email=="zchar.hong@qq.com" && login.user.password=="123456"){
        //     postUrl = "account/login/login1.json";
        // } else if(login.user.email=="zchar.hong@qq.com" && login.user.password!="123456"){
        //     postUrl = "account/login/login2.json";
        // }else {
        //     postUrl = "account/login/login3.json";
        // }

        login.response.emailStatus = '';
        login.response.pwStatus ='';
        $http({
            method: 'POST',
            // url: postUrl,
            // url: config.HOST+"/api/2.0/bp/account/user/loginSystem",
            url: "account/login/login.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "userId": login.user.email,
                // "password": login.user.password
                "password": hex_md5(login.user.password)
            }
        }).success(function (data) {
            if(data.code == "N01"){
                $location.path("account_index/chooseTeam").replace();
                // window.localStorage.clear();
                // $.cookie("userId",null,{path:"/"});
                var storage = window.localStorage;
                login.response = {
                    returnMsg:  '',
                    emailStatus: '',
                    pwStatus: '',
                    alert_display: 'none'
                };
                var localData = data.contents;
                if(storage){
                    storage.setItem('sid',localData.sid);    
                    storage.setItem('userName',localData.userName);    
                    storage.setItem('email',login.user.email);    
                }else{
                    // $.cookie('email',localData);
                }
            }else if (data.code == "E01") {
                login.response.returnMsg = data.message;
                login.response.pwStatus = "has-error";
                login.response.alert_display = "block";

            }else if (data.code == "E02"){
                login.response.returnMsg = data.message;
                login.response.emailStatus = "has-error";
                login.response.alert_display = "block";
            }


        }).error(function(){
            console.log('http error')
        });
    }

    return login;
}]);

FIMS.factory('sigupService',  ['$location', '$rootScope', '$http' ,function($location,$rootScope, $http) {
    var sigup = {};

    sigup.user = {
        userId: '',
        password1: '',
        password2: '',
        username: ''
    };

    sigup.response = {
        returnMsg:'',
        emailStatus: '',
        pwStatus: '',
        pwTextShow: 'none',
        alert_display: 'none'
    };

    sigup.subData = function () {
        // sigup.response.emailStatus = '';
        // sigup.response.pwStatus ='';
        if (sigup.user.password1===sigup.user.password2) {
            $http({
                method: 'POST',
                url: config.HOST+"/api/2.0/bp/account/user/registNewUser",
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "userId": sigup.user.userId,
                    "password": hex_md5(sigup.user.password2),
                    "userName": sigup.user.username
                }
            }).success(function (data) {
                if(data.code == "N01"){
                    console.log(data);
                    $location.path("account_index/chooseTeam");
                    // window.localStorage.clear();
                    // $.cookie("userId",null,{path:"/"});
                    var storage = window.localStorage;
                    var localData = data.contents;
                    if(storage){
                        storage.setItem('sid',localData.sid);    
                        storage.setItem('userName',localData.userName);    
                    }else{
                        // $.cookie('email',localData);
                    }
                }else {
                    sigup.response.returnMsg = data.message;
                    sigup.response.userIdStatus = "has-error";
                    sigup.response.alert_display = "block";
                }
            }).error(function(){
                console.log('http error')
            });
        }else {
            sigup.response.pwTextShow = "block";
            console.log(sigup.response.pwTextShow);
        }
    }

    return sigup;
}]);

FIMS.factory('account_indexService',  ['$location', '$rootScope', '$http' ,function($location,$rootScope, $http) {
    var account_index = {};

    account_index.getUserName = function(){
        $rootScope.userName = localStorage.getItem("userName");
    }

    account_index.switchCom = function(){
        $http({
            method: 'post',
            // url: config.HOST + '/api/2.0/bp/account/user/exitSystem',
            url: 'account/account_index/quitWorkingCompany.json',
            headers:  {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid')
            }
        }).success(function(data){
            if (data.code == 'N01') {
                localStorage.removeItem('curCompanyName');
                localStorage.removeItem('cSid');
                localStorage.removeItem('applyJoinCompanyNumber');
                localStorage.removeItem('inlink');
                $location.path('account_index/chooseTeam');
            }else{alert("退出系统失败！")}
        })
    }

    account_index.exitSystem = function(){
        $http({
            method: 'post',
            // url: config.HOST + '/api/2.0/bp/account/user/exitSystem',
            url: 'account/account_index/exitSystem.json',
            headers:  {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid')
            }
        }).success(function(data){
            if (data.code == 'N01') {
                localStorage.clear();
                $location.path('/login');
            }else{alert("退出系统失败！")}
        })
    }
    //     $http({
    //         method: 'POST',
    //         // url: postUrl,
    //         url: config.HOST+"/api/2.0/bp/account/user/account_indexSystem",
    //         headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
    //         data: {
    //             "userId": account_index.user.email,
    //             "password": account_index.user.password
    //             // "password": hex_md5(account_index.user.password)
    //         }
    //     }).success(function (data) {
    //         if(data.code == "N01"){
    //             console.log(data);
    //             $location.path("account_index/chooseTeam");
    //             // window.localStorage.clear();
    //             // $.cookie("userId",null,{path:"/"});
    //             var storage = window.localStorage;
    //             account_index.response = {
    //                 returnMsg:  '',
    //                 emailStatus: '',
    //                 pwStatus: '',
    //                 alert_display: 'none'
    //             };
    //             var localData = data.contents;
    //             if(storage){
    //                 storage.setItem('sid',localData.sid);    
    //                 storage.setItem('userName',localData.userName);    
    //             }else{
    //                 // $.cookie('email',localData);
    //             }
    //         }else if (data.code == "E01") {
    //             account_index.response.returnMsg = data.message;
    //             account_index.response.pwStatus = "has-error";
    //             account_index.response.alert_display = "block";

    //         }else if (data.code == "E02"){
    //             account_index.response.returnMsg = data.message;
    //             account_index.response.emailStatus = "has-error";
    //             account_index.response.alert_display = "block";
    //         }


    //     }).error(function(){
    //         console.log('http error')
    //     });
    // }

    return account_index;
}]);

FIMS.factory('userSettingService',  ['$location',"account_indexService",'$rootScope', '$http' ,function($location,account_indexService,$rootScope, $http) {
    var userSetting = {};
    userSetting.user = {
        "email": localStorage.getItem('email'),
        "userName": localStorage.getItem('userName')
    };
    userSetting.subData = function(){
        $http({
            method: 'post',
            // url: config.HOST + '/api/2.0/bp/account/user/exitSystem',
            url: 'account/userSetting/userSetting.json',
            headers:  {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                // "contactPhone": "13026397003",
                // "contactAddress": "联系地址",
                "sid": localStorage.getItem('sid'),
                "contents": {
                    "userName": userSetting.user.userName
                }
            }
        }).success(function(data){
            if (data.code == 'N01') {
                localStorage.setItem('userName',userSetting.user.userName);
                account_indexService.getUserName();
                alert("更新成功！");
               // console.log($rootScope.userName);
            }else{alert("更新失败！")}
        })
    }

    return userSetting;
}]);

FIMS.factory('chooseTeamService',['$location','$http','$q','$rootScope',
	function($location,$http, $q,$rootScope){
		var chooseTeam = {};
        chooseTeam.createCom = {
            "name": '',
            "cid": ''
        };
        chooseTeam.companyList=[];
        
        chooseTeam.subData = function(){
            $http({
                method: 'POST',
                // url: HOST+'/api/2.0/bp/account/releation/queryJoinedCompanies',
                url: "account/chooseTeam/createNewCompany.json",
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem("sid"),
                    "contents":{
                       "companyName":  chooseTeam.createCom.name,
                       "userJobNumber": chooseTeam.createCom.cid
                    }
                }
            }).success(function (data){
                if (data.code == 'N01') {
                    $location.path('/account_index/chooseModule');
                    localStorage.setItem("curCompanyName",data.contents.companyName);
                    localStorage.setItem("cSid",data.contents.companySid);
                    localStorage.setItem("applyJoinCompanyNumber",0);
                }else{alert("退出系统失败！")}
                
            }).error(function (data){
                
            });
        };

        chooseTeam.queryJoinedCompanies = function(){
            $http({
                method: 'POST',
                // url: config.HOST+'/api/2.0/bp/account/releation/queryJoinedCompanies',
                url: "account/chooseTeam/queryJoinedCompanies.json",
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem("sid"),
                }
            }).success(function (data){
                chooseTeam.companyList=[];

                if (data.code == 'N01') {
                    chooseTeam.companyList = data.contents.joinedCompanies;
                    for(var i=0;i<chooseTeam.companyList.length;i++){
                        chooseTeam.companyList[i].userApplyStatus = (chooseTeam.companyList[i].userApplyStatus==1)?'':'disabled';
                    }
                    $rootScope.companyList  =chooseTeam.companyList;
                }else{
                    console.log(data.message+"[queryJoinedCompanies]");
                    localStorage.clear();
                    $location.path('login').replace();
                }
                
            }).error(function (data){
                
            });
        }
       
       chooseTeam.setWorkingCompany = function(sid){
            $http({
                method: 'POST',
                // url: HOST+'/api/1.0/user-manager/getCompanyApplicant',
                url: "account/chooseTeam/setWorkingCompany.json",
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem("sid"),
                    "contents": {
                        "companySid": sid
                    }
                }
            }).success(function (data){
                if (data.code == 'N01') {
                    localStorage.setItem("curCompanyName",data.contents.companyShortName);
                    localStorage.setItem("cSid",sid);
                    localStorage.setItem("applyJoinCompanyNumber",data.contents.applyJoinCompanyNumber);
                    $location.path("account_index/chooseModule");
                }else{
                    console.log("获取失败！");
                    localStorage.clear();
                    $location.path('login').replace();
                }
                console.log(chooseTeam.companyList)
                
            }).error(function (data){
                
            });
       }
        //     $http({
        //             method: 'POST',
        //             url: HOST+'/api/1.0/user-manager/getCompanyApplicant',
        //             headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
        //             data: {
        //                 "companyId":companyId,
        //                 "userPurview":userPurview
        //             }
        //         }).success(function (data){
        //             if(data.array[0] != null)
        //             {
        //                chooseTeam.CompanyInfoByUserId.applychooseUser = data.array;
        //                if(userPurview === 0)
        //                {
        //                 chooseTeam.CompanyInfoByUserId.show = true;
        //                };
        //             }
                    
        //         }).error(function (data){
                    
        //         });
        // }
		return chooseTeam;
	}

])
// FIMS.factory('chooseModuleService',  ['$location', '$rootScope', '$http' ,function($location,$rootScope, $http) {
//     var chooseModule = {};

//     chooseModule.getUserName = function(){
//         $rootScope.userName = localStorage.getItem("userName");
//     }

//     chooseModule.switchCom = function(){
//         localStorage.removeItem('curCompanyName');
//         localStorage.removeItem('cSid');
//         $location.path('chooseModule/chooseTeam');
//     }

//     chooseModule.exitSystem = function(){
//         $http({
//             method: 'post',
//             // url: config.HOST + '/api/2.0/bp/account/user/exitSystem',
//             url: 'account/chooseModule/exitSystem.json',
//             headers:  {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
//             data: {
//                 "sid": localStorage.getItem('sid')
//             }
//         }).success(function(data){
//             if (data.code == 'N01') {
//                 localStorage.clear();
//                 $location.path('/login');
//             }else{alert("退出系统失败！")}
//         })
//     }

//     // }

//     return chooseModule;
// }]);

FIMS.factory('userManageService', ['$location','$http', function($location,$http){
	var userManage = {};
	userManage.genLink = function(){
		$http({
			method: 'POST',
		 // url: HOST+'/api/2.0/bp/account/releation/queryJoinedCompanies',
            url: "account/userManage/generateInvitationLink.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"contents": {
					"companySid": localStorage.getItem("cSid")
				}
			}
		})
		.success(function(data) {
			if (data.code == 'N01') {
				$location.path('account_index/agreeMem');
				localStorage.setItem('inlink',data.contents);	
			}
		})
	}
	return userManage;
}])
FIMS.factory('agreeMemService', ['$location','$http', function($location,$http){
	var agreeMem = {};
	agreeMem.agreeMemBack = function(){
		
	}
	return agreeMem;
}])
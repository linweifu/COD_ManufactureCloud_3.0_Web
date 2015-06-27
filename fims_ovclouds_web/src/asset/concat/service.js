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

// /*********************************************************
// //  判断是否给出提示
// // *********************************************************/

//  var a = localStorage.getItem("mailActive");
//  //console.log(b);

// function init(){
//     if(a==1)
//         {
//             $("#warning-block").hide();
//         }
//         else if(a==0)
//         {
//            $("#warning-block").show();
//         }

//  // $("#warning-block").show();
//  }

//  init();



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
            url: config.HOST+"/api/2.0/bp/account/user/loginSystem",
            // url: "account/login/login.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "userId": login.user.email,
                // "password": login.user.password
                "password": hex_md5(login.user.password),
                "token": "hzc"
            }
        }).success(function (data) {
            if(data.code == "N01"){
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
                    storage.setItem('mailActive',localData.mailActive);   
                }else{
                    // $.cookie('email',localData);
                }
                if (localStorage.getItem('apj')) {
                  $location.path("account_index/joinCo").replace();
                  return;
                }
                $location.path("account_index/chooseTeam").replace();
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
                    localStorage.setItem('sid',data.contents.sid);    
                    localStorage.setItem('userName',data.contents.userName);    
                    localStorage.setItem("email",sigup.user.userId);
                    if (localStorage.getItem('apj')) {
                      $location.path("account_index/joinCo").replace();
                      return;
                    }
                    $location.path("account_index/chooseTeam").replace();
                }else {
                    sigup.response.returnMsg = data.message;
                    sigup.response.emailStatus = "has-error";
                    sigup.response.alert_display = "block";
                }
            }).error(function(){
                console.log('http error')
            });
        }else {
            sigup.response.pwTextShow = "block";
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
            url: config.HOST + '/api/2.0/bp/account/relation/quitWorkingCompany',
            // url: 'account/account_index/quitWorkingCompany.json',
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
                localStorage.removeItem('applyJoin');
                $location.path('account_index/chooseTeam');
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

    account_index.exitSystem = function(){
        $http({
            method: 'post',
            url: config.HOST + '/api/2.0/bp/account/user/exitSystem',
            // url: 'account/account_index/exitSystem.json',
            headers:  {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid')
            }
        }).success(function(data){
            if (data.code == 'N01') {
                localStorage.clear();
                $location.path('/login');
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
        "userName": localStorage.getItem('userName'),
        "contactPhone": "",
        "contactAddress": ""
    };
    userSetting.queryUserExtendInfo = function(){
        $http({
            method: 'post',
            url: config.HOST + '/api/2.0/bp/account/user/queryUserExtendInfo',
            // url: 'account/userSetting/queryUserExtendInfo.json',
            headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                // "contactPhone": "13026397003",
                // "contactAddress": "联系地址",
                "sid": localStorage.getItem('sid'),
            }
        })
        .success(function(data){
            if(data.code == 'N01') {
                userSetting.user.contactPhone = data.contents.contactPhone,
                userSetting.user.contactAddress = data.contents.contactAddress
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
    userSetting.subData = function(){
        $http({
            method: 'post',
            url: config.HOST + '/api/2.0/bp/account/user/improveUserInfo',
            // url: 'account/userSetting/userSetting.json',
            headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                // "contactPhone": "13026397003",
                // "contactAddress": "联系地址",
                "sid": localStorage.getItem('sid'),
                "contents": {
                    "contactPhone": userSetting.user.contactPhone,
                    "contactAddress": userSetting.user.contactAddress
                }
            }
        })
        .success(function(data){
            if(data.code == 'N01') {
                alert("更新成功");
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

    return userSetting;
}]);

FIMS.factory('chooseTeamService',['$location','$http','$q','$rootScope',
	function($location,$http, $q,$rootScope){
		var chooseTeam = {};
        chooseTeam.createCom = {
            "name": '',
            "cid": ''
        };

       //var userPurview
        chooseTeam.companyList=[];



 /*********************************************************
 *********************************************************/


 chooseTeam.sentUserActivateEmail = function(){
    //var deffered = $q.defer();

             $http({
                method: 'post',
              //  url: config.HOST + '/api/2.0/bp/account/user/sentUserActivateEmail',
                // url: 'account/chooseModule/getAppliesJoinCompany.json',
                 url: config.HOST + '/api/3.0/ll/account/user/sentUserActivateEmail',
                headers:  {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem('sid'),
                    // "userId": login.user.email
                     "userId":localStorage.getItem('email')
                     
                }
            }).success(function(data){
                if (data.code == 'N01') {
                   // localStorage.setItem('mailActive',data.contents.mailActive); 
                    // deffered.resolve(data);   
                    alert(data.message);
                }
                else if(data.code=="E00"){
                    alert(data.message+",请重新登陆");
                }else {
                    alert(data.message);  
                }
            })

             //return deffered.promise;
        }


    //chooseTeam.sentUserActivateEmail();
/*********************************************************
*********************************************************/
        chooseTeam.subData = function(){
            $http({
                method: 'POST',
                url: config.HOST+'/api/2.0/bp/account/company/createNewCompany',
                // url: "account/chooseTeam/createNewCompany.json",
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem("sid"),
                    "contents":{
                       "companyShortName":  chooseTeam.createCom.name,
                       "userJobNumber": chooseTeam.createCom.cid
                    }
                }
            }).success(function (data){
                if (data.code == 'N01') {
                    $location.path('/account_index/chooseModule');
                    localStorage.setItem("curCompanyName",data.contents.companyShortName);
                    localStorage.setItem("cSid",data.contents.companySid);
                    localStorage.setItem("applyJoinCompanyNumber",0);

                }
                else if(data.code=="E00"){
                    alert(data.message+"（创建公司）,请重新登陆");
                    localStorage.clear();
                    $location.path('login');
                }else {
                    console.log(data.message);
                }        
            }).error(function (data){
                
            });
        };

        chooseTeam.queryJoinedCompanies = function(){
            $http({
                method: 'POST',
                url: config.HOST+'/api/2.0/bp/account/relation/queryJoinedCompanies',
                // url: "account/chooseTeam/queryJoinedCompanies.json",
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem("sid"),
                }
            }).success(function (data){
                chooseTeam.companyList=[];

                //$("#warning-block").hide();
                if (data.code == 'N01') {
                    chooseTeam.companyList = data.contents;
                  //  userPurview = data.contents.userPurview;
                  // chooseTeam.companyList.userPurview = data.contents.userPurview;
                   //console.log(data.contents.userPurview);


                   
                   // localStorage.setItem("userPurview",data.contents.userPurview);
                    for(var i=0;i<chooseTeam.companyList.length;i++){
                        chooseTeam.companyList[i].userApplyStatus = (chooseTeam.companyList[i].userApplyStatus==1)?'':'disabled';
                         // chooseTeam.companyList.userPurview = data.contents.userPurview;
                         // console.log( chooseTeam.companyList[i].userPurview);
                         localStorage.setItem("userPurview", chooseTeam.companyList[i].userPurview);

                    }
                    $rootScope.companyList  =chooseTeam.companyList;
                }
                else if(data.code=="E00"){
                    alert(data.message+",请重新登陆");
                    localStorage.clear();
                    $location.path('login').replace();
                }else {
                    console.log(data.message);
                }  
                
            }).error(function (data){
                
            });
        }
       
       chooseTeam.setWorkingCompany = function(cid,userApplyStatus){
        // console.log(cid);
        // console.log(userApplyStatus);
            if (userApplyStatus=="disabled"){
                return;
            }
            $http({
                method: 'POST',
                url: config.HOST+'/api/2.0/bp/account/relation/setWorkingCompany',
                // url: "account/chooseTeam/setWorkingCompany.json",
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem("sid"),
                    "contents": {
                        "companySid": cid
                    }
                }
            }).success(function (data){
                if (data.code == 'N01') {
                    localStorage.setItem("curCompanyName",data.contents.companyShortName);
                    localStorage.setItem("cSid",cid);
                    localStorage.setItem("applyJoinCompanyNumber",data.contents.applyJoinCompanyNumber);
                    localStorage.setItem("userJobNumber",data.contents.userJobNumber);
                    
                    localStorage.setItem("input_way_code",data.contents.checkoutRecordInputWayCode);
                    // localStorage.setItem("checkoutRecordInputWay",data.contents.checkoutRecordInputWay);
                    $location.path("account_index/chooseModule");
                }

                else if(data.code=="E00"){
                    alert(data.message+",请重新登陆");
                    localStorage.clear();
                    $location.path('login').replace();
                }else {
                    console.log(data.message);
                }  


            }).error(function (data){
                
            });
       }
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
	userManage.companyMem = {
		"array": []
	};
	
	userManage.genLink = function(){
		$http({
			method: 'POST',
		 url: config.HOST+'/api/2.0/bp/account/mailbox_link/generateInvitationLink',
            // url: "account/userManage/generateInvitationLink.json",
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
		    else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                console.log(data.message);
            }  

		})
	}

	userManage.queryMember = function(){
		$http({
			method: 'POST',
		 url: config.HOST+'/api/2.0/bp//account/company/queryCompanyMember',
            // url: "account/userManage/queryCompanyMember.json",
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
				userManage.companyMem.array = data.contents;
				for(var i=0;i<userManage.companyMem.array.length;i++) {
					switch(userManage.companyMem.array[i].userPurview) {
						case '0' : 
							userManage.companyMem.array[i].userPurview = "超级管理员";
							break;
						case '1' : 
							userManage.companyMem.array[i].userPurview = "公司管理员";
							break;
						case '2' :
							userManage.companyMem.array[i].userPurview = "普通成员";
							break;
					}
				}
			}
		    else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                console.log(data.message);
            }  

			// console.log(userManage.companyMem.array);
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
// FIMS.factory('addOrUpdateMaterialService',['$location','$http',
// 	function($location,$http){
// 		var addOrUpdateMaterial = {};
// 		addOrUpdateMaterial.newMaterial = {
// 			"materialNo": "",
//             "materialShortName": "",
//             "materialVersion": "",
//             "materialFullName": "",
//             "notes": ""
// 		};

// 		addOrUpdateMaterial.addOrUpdateMaterials = function(s){
// 			$http({
// 				method: "POST",
// 				// url: "account/joinCo/joinCo.json",
// 				// url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
// 				url: "manage/engineer/material/queryMaterialsInfo.json",
// 				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
// 				data: {
// 					"sid": localStorage.getItem('sid'),
// 				    "status": s,
// 				    "materialNo":"",
// 				    "materialShortName":"",
// 				    "materialVersion":"",
// 				    "materialFullName":"",
// 				    "companySid": localStorage.getItem('cSid'),
// 				    "companySidHash":,
// 				    "companyShortName":"",
// 				    "materialBarcode":"",
// 				    "notes":""

// 				}
// 			})
// 			.success(function(data){
// 	            if (data.code == 'N01') {
// 	                addOrUpdateMaterial.listdata = data.contents;
// 	            }
// 	            else if(data.code=="E00"){
// 	                alert(data.message+",请重新登陆");
// 	                localStorage.clear();
// 	                $location.path('login').replace();
// 	            }else {
// 	                alert(data.message);
// 	            }  
// 	        })
// 		}

// 		return addOrUpdateMaterial;
// }])
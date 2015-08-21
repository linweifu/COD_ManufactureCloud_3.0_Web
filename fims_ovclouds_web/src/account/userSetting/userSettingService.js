FIMS.factory('userSettingService',  ['$location',"account_indexService",'$rootScope', '$http' ,function($location,account_indexService,$rootScope, $http) {
    var userSetting = {};
    userSetting.user = {
        "email": localStorage.getItem('email'),
        "userName": localStorage.getItem('userName'),
        // "http": localStorage.getItem('http'),
        "contactPhone": "",
         "password":"",
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
               // console.log(data.message);
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

/*************************************************************
**************************************************************
更新用户姓名updateUserName
**************************************************************
*************************************************************/
 userSetting.updateUserName = function(){
        $http({
            method: 'post',
            url: config.HOST + '/api/2.0/bp/account/user/updateUserName',
            headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "userName": userSetting.user.userName
            }
        })
        .success(function(data){
            if(data.code == 'N01') {
              // localStorage.setItem('userName',userSetting.user.userName); 
                alert("修改成功");
            } 
            else if(data.code=="E00"){
                alert(data.message);
                localStorage.clear();
                //$location.path('login').replace();
            }else {
               // console.log(data.message);
            }  

        }) 
        
    }

/*************************************************************
**************************************************************
更新用户邮箱updateUserId
**************************************************************
*************************************************************/
 userSetting.updateUserId = function(){
        $http({
            method: 'post',
            url: config.HOST + '/api/2.0/bp/account/user/updateUserId',
            headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "userId": userSetting.user.email
            }
        })
        .success(function(data){
            if(data.code == 'N01') {
                alert(data.message);
            } 
            else if(data.code=="E00"){
                alert(data.message);
                localStorage.clear();
                //$location.path('login').replace();
            }else {
               // console.log(data.message);
            }  

        }) 
        
    }

/*************************************************************
**************************************************************
**************************************************************
*************************************************************/
 
    return userSetting;
}]);

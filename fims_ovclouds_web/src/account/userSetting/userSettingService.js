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
解绑微信 unbindWechat
**************************************************************
*************************************************************/
 userSetting.unbindWechat = function(){
        $http({
            method: 'post',
            url: config.HOST + '/api/2.0/bp/account/user/unbindWechat',
            headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid')
                
            }
        })
        .success(function(data){
            if(data.code == 'N01') {
                localStorage.setItem('wxActive',data.contents.whetherBindWx);
                var wxActive=localStorage.getItem('wxActive');
               // console.log(wxActive);
                alert(data.message);
                if(wxActive==0)
            {
                 var tar = document.getElementById('tar');
                 var bd = document.getElementById('bd');
                 var spanid = document.getElementById('spanid');
                 var wx = document.getElementById('wx');
                 tar.style.display = tar.style.display=='block' ? 'none' : '';
                 bd.style.display = bd.style.display=='block' ? 'none' : '';
                 spanid.style.display = spanid.style.display=='block' ? '' : 'none';
                 wx.style.display = wx.style.display=='block' ? '' : 'none';


            }
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

/*************************************************************
**************************************************************
获取用户是否绑定信息queryUserInfo
**************************************************************
*************************************************************/
userSetting.queryUserInfo = function(){
        $http({
            method: 'post',
            url: config.HOST + '/api/2.0/bp/account/user/queryUserInfo',
            headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid')
                //"userId": userSetting.user.email
            }
        })
        .success(function(data){

            if(data.code == 'N01') {
                //alert("亲，确定要绑定吗？"); 
                localStorage.setItem('wxActive',data.contents.whetherBindWx);
                var wxActive=localStorage.getItem('wxActive');
                
             if(wxActive==1)
           { 
            alert("绑定成功！"); 
           var tar = document.getElementById('tar');
           var bd = document.getElementById('bd');
           var spanid = document.getElementById('spanid');
           var wx = document.getElementById('wx');
           tar.style.display = tar.style.display=='block' ? '' : 'none';
           bd.style.display = bd.style.display=='block' ? 'block' : 'none';
           spanid.style.display = spanid.style.display=='block' ? '' : '';
           wx.style.display = wx.style.display=='block' ? 'none' : ''; 
          

          }
         // else if(wxActive==0)
        // {
        //    var tar = document.getElementById('tar');
        //    var bd = document.getElementById('bd');
        //    var spanid = document.getElementById('spanid');
        //    var wx = document.getElementById('wx');
        //    tar.style.display = tar.style.display=='block' ? 'none' : '';
        //    bd.style.display = bd.style.display=='block' ? 'none' : '';
        //    spanid.style.display = spanid.style.display=='block' ? '' : 'none';
        //    wx.style.display = wx.style.display=='block' ? '' : 'none';


        // }

       
               // console.log(wxActive);
                //localStorage.setItem('userName',data.contents.userName);
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

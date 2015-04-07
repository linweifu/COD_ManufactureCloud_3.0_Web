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

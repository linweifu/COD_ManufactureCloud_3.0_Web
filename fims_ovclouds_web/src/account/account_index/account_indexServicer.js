FIMS.factory('account_indexService',  ['$location', '$rootScope', '$http' ,function($location,$rootScope, $http) {
    var account_index = {};

    account_index.getUserName = function(){
        $rootScope.userName = localStorage.getItem("userName");
    }

    account_index.switchCom = function(){
        $http({
            method: 'post',
            // url: config.HOST + '/api/2.0/bp/account/releation/quitWorkingCompany',
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
                localStorage.removeItem('applyJoin');
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

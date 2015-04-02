FIMS.factory('loginService',  ['$location', '$rootScope', '$http' ,function($location,$rootScope, $http) {
    var login = {};
    // var HOST = "http://"+config.Interface;

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
            url: "http://ovclouds.com/api/2.0/bp/account/user/loginSystem",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "userId": login.user.email,
                "password": login.user.password
                // "password": hex_md5(login.user.password)
            }
        }).success(function (data) {
            if(data.code == "N01"){
                console.log(data);
                $location.path("account_index/chooseTeam");
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
    // var HOST = "http://"+config.Interface;

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
                url: "http://ovclouds.com/api/2.0/bp/account/user/registNewUser",
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

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

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

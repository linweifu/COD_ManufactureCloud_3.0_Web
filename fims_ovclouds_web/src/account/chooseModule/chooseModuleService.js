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

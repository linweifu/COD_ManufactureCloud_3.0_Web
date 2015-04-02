FIMS.factory('joinService',['$location','$http','$q','$rootScope',
	function($location,$http, $q,$rootScope){
		var joinTeam = {};
        var HOST = "http://"+config.Interface;
        joinTeam.handleMsg = function(){
            $('.dropdown').slideDown("slow");
            $('.overlay').show();
        }
        joinTeam.handleOverlay = function(){
            $('.dropdown').fadeOut();
            $('.overlay').hide();
        }
        joinTeam.handleAgreeBtn = function(i,userId){
            if(joinTeam.CompanyInfoByUserId.applyJoinUser.length >= 0)
            {
                $http({
                    method: 'POST',
                    url: HOST+'/api/1.0/user-manager/applyJoinCompany',
                    headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                    data: {
                        companyId: $rootScope.companyId,
                        userPurview:1,
                        tUserByUserId:{
                         userId: userId
                        }
                    }
                }).success(function (data){
                    alert(data.message);
                    joinTeam.CompanyInfoByUserId.applyJoinUser.splice(i,1);
                }).error(function (data){

                });
            }
        
            
        }
        joinTeam.handleRejectBtn = function(i,userId){
            console.log(i);
            // alert(target);
            if(joinTeam.CompanyInfoByUserId.applyJoinUser.length >= 0)
            {
                $http({
                    method: 'POST',
                    url: HOST+'/api/1.0/user-manager/rejectUserJoinCompany',
                    headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                    data: {
                        companyId: $rootScope.companyId,
                        userPurview:2,
                        tUserByUserId:{
                         userId: userId
                        }
                    }
                }).success(function (data){
                    alert(data.message);
                    joinTeam.CompanyInfoByUserId.applyJoinUser.splice(i,1)
                }).error(function (data){

                });
            }
            
        }
        joinTeam.CompanyInfoByUserId = {
            companyInfo:[],
            applyJoinUser:[],
            show:false
        }
        joinTeam.getCompanysByUserId = function(){
            var userId = window.localStorage.getItem('userId') || $.cookie('userId');
            if(userId != undefined || userId != null ){
                $http({
                    method: 'POST',
                    url: HOST+'/api/1.0/user-manager/getCompanysByUserId',
                    headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                    data: {
                        userId: userId
                    }
                }).success(function (data){
                    joinTeam.CompanyInfoByUserId.companyInfo = data.array;
                }).error(function (data){
                    
                });
            }else{
                alert("获取用户名错误");
            }
            
        }
        
        joinTeam.toLocal = function(companyId,userPurview){
            var storage = window.localStorage;
            // window.localStorage.clear();
            // $.cookie("companyId",null,{path:"/"});
            // $.cookie("userPurview",null,{path:"/"});
            if(storage){
                         storage.setItem('companyId',companyId);
                         storage.setItem('userPurview',userPurview); 
                     }else{
                         $.cookie('companyId',companyId);
                         $.cookie('userPurview',userPurview);
                     }
                     joinTeam.localdata = {
                        userId:'',
                        userPurview:window.localStorage.getItem('userPurview') || $.cookie('userPurview'),
                        companyId:window.localStorage.getItem('companyId') || $.cookie('companyId')
            };
            $rootScope.userId = joinTeam.localdata.userId;
            $rootScope.userPurview = joinTeam.localdata.userPurview;
            $rootScope.companyId = joinTeam.localdata.companyId;
            
        }
        joinTeam.addSelectedClass = function(target){
            $('.page_link li').removeClass("selected");
            $(target).addClass("selected");
        }
        joinTeam.getCompanyApplicant = function(companyId,userPurview){
                        $rootScope.companyId = companyId;
                        $rootScope.userPurview = userPurview;
            $http({
                    method: 'POST',
                    url: HOST+'/api/1.0/user-manager/getCompanyApplicant',
                    headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                    data: {
                        "companyId":companyId,
                        "userPurview":userPurview
                    }
                }).success(function (data){
                    if(data.array[0] != null)
                    {
                       joinTeam.CompanyInfoByUserId.applyJoinUser = data.array;
                       if(userPurview === 0)
                       {
                        joinTeam.CompanyInfoByUserId.show = true;
                       };
                    }
                    
                }).error(function (data){
                    
                });
        }
		return joinTeam;
	}

])
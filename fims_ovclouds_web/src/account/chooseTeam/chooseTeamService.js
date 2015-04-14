FIMS.factory('chooseTeamService',['$location','$http','$q','$rootScope',
	function($location,$http, $q,$rootScope){
		var chooseTeam = {};
        chooseTeam.createCom = {
            "name": '',
            "cid": ''
        };
        chooseTeam.companyList=[];
        
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
                console.log(data);
                chooseTeam.companyList=[];
                if (data.code == 'N01') {
                    chooseTeam.companyList = data.contents;
                    for(var i=0;i<chooseTeam.companyList.length;i++){
                        chooseTeam.companyList[i].userApplyStatus = (chooseTeam.companyList[i].userApplyStatus==0)?'':'disabled';
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
       
       chooseTeam.setWorkingCompany = function(sid){
            $http({
                method: 'POST',
                url: config.HOST+'/api/2.0/bp/account/relation/setWorkingCompany',
                // url: "account/chooseTeam/setWorkingCompany.json",
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem("sid"),
                    "contents": {
                        "companySid": sid
                    }
                }
            }).success(function (data){
                if (data.code == 'N01') {
                    localStorage.setItem("curCompanyName",data.contents.companyShortName);
                    localStorage.setItem("cSid",sid);
                    localStorage.setItem("applyJoinCompanyNumber",data.contents.applyJoinCompanyNumber);
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
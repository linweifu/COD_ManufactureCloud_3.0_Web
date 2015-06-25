FIMS.factory('chooseTeamService',['$location','$http','$q','$rootScope',
	function($location,$http, $q,$rootScope){
		var chooseTeam = {};
        chooseTeam.createCom = {
            "name": '',
            "cid": ''
        };

       //var userPurview
        chooseTeam.companyList=[];

/*********************************************************
*********************************************************/
 chooseTeam.sentUserActivateEmail = function(){
    //var deffered = $q.defer();

             $http({
                method: 'post',
                //url: config.HOST + '/api/2.0/bp/account/user/sentUserActivateEmail',
                // url: 'account/chooseModule/getAppliesJoinCompany.json',
                 url: config.HOST + '/api/3.0/ll/account/user/sentUserActivateEmail',
                headers:  {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem('sid'),
                    // "userId": login.user.email
                     "userId":localStorage.getItem('email')
                     
                }
            }).success(function(data){
                if (data.code == 'N01') {
                    // deffered.resolve(data);   
                    alert(data.message);
                }
                else if(data.code=="E00"){
                    alert(data.message+",请重新登陆");
                }else {
                    alert(data.message);  
                }
            })

             //return deffered.promise;
        }


    //chooseTeam.sentUserActivateEmail();
/*********************************************************
 判断是否给出提示
*********************************************************/

 var a = localStorage.getItem("userPurview");

function init(){
    if(a==1)
        {
            $("#warning-block").hide();
        }
        else if(a==0)
        {
            $("#warning-block").show();
        }

 // $("#warning-block").show();
 }

 init();

/*********************************************************
*********************************************************/
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
                chooseTeam.companyList=[];

                //$("#warning-block").hide();
                if (data.code == 'N01') {
                    chooseTeam.companyList = data.contents;
                  //  userPurview = data.contents.userPurview;
                  // chooseTeam.companyList.userPurview = data.contents.userPurview;
                   //console.log(data.contents.userPurview);


                   
                   // localStorage.setItem("userPurview",data.contents.userPurview);
                    for(var i=0;i<chooseTeam.companyList.length;i++){
                        chooseTeam.companyList[i].userApplyStatus = (chooseTeam.companyList[i].userApplyStatus==1)?'':'disabled';
                         // chooseTeam.companyList.userPurview = data.contents.userPurview;
                          console.log( chooseTeam.companyList[i].userPurview);
                         localStorage.setItem("userPurview", chooseTeam.companyList[i].userPurview);

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
       
       chooseTeam.setWorkingCompany = function(cid,userApplyStatus){
        // console.log(cid);
        // console.log(userApplyStatus);
            if (userApplyStatus=="disabled"){
                return;
            }
            $http({
                method: 'POST',
                url: config.HOST+'/api/2.0/bp/account/relation/setWorkingCompany',
                // url: "account/chooseTeam/setWorkingCompany.json",
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem("sid"),
                    "contents": {
                        "companySid": cid
                    }
                }
            }).success(function (data){
                if (data.code == 'N01') {
                    localStorage.setItem("curCompanyName",data.contents.companyShortName);
                    localStorage.setItem("cSid",cid);
                    localStorage.setItem("applyJoinCompanyNumber",data.contents.applyJoinCompanyNumber);
                    localStorage.setItem("userJobNumber",data.contents.userJobNumber);
                    
                    localStorage.setItem("input_way_code",data.contents.checkoutRecordInputWayCode);
                    // localStorage.setItem("checkoutRecordInputWay",data.contents.checkoutRecordInputWay);
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
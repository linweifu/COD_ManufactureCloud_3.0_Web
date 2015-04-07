FIMS.factory('chooseTeamService',['$location','$http','$q','$rootScope',
	function($location,$http, $q,$rootScope){
		var chooseTeam = {};
        chooseTeam.createCom = {
            "name": '',
            "cid": ''
        };
        
        chooseTeam.subData = function(){
            $http({
                method: 'POST',
                // url: HOST+'/api/1.0/user-manager/getCompanyApplicant',
                url: "account/chooseTeam/createNewCompany.json",
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data: {
                    "sid": localStorage.getItem("sid"),
                    "contents":{
                       "companyName":  chooseTeam.createCom.name,
                       "userJobNumber": chooseTeam.createCom.cid
                    }
                }
            }).success(function (data){
                if (data.code == 'N01') {
                    $location.path('/account_index/chooseModule');
                    localStorage.setItem("curCompanyName",chooseTeam.createCom.name);
                }else{alert("退出系统失败！")}
                
            }).error(function (data){
                
            });
        }
       
        //     $http({
        //             method: 'POST',
        //             url: HOST+'/api/1.0/user-manager/getCompanyApplicant',
        //             headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
        //             data: {
        //                 "companyId":companyId,
        //                 "userPurview":userPurview
        //             }
        //         }).success(function (data){
        //             if(data.array[0] != null)
        //             {
        //                chooseTeam.CompanyInfoByUserId.applychooseUser = data.array;
        //                if(userPurview === 0)
        //                {
        //                 chooseTeam.CompanyInfoByUserId.show = true;
        //                };
        //             }
                    
        //         }).error(function (data){
                    
        //         });
        // }
		return chooseTeam;
	}

])
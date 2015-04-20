FIMS.controller('planListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
	$scope.companyShortName = localStorage.getItem('curCompanyName');
	$scope.planlistBack = function(){
		localStorage.removeItem('singleplan');
		$location.path('account_index/chooseModule').replace();
	}
	$scope.queryplanInfo = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/plan/plan/queryplanInfo",
			// url: "manage/plan/plan/queryplanInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid')
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
                $scope.listdata = data.contents;
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

	$scope.queryplanInfo();

	$scope.querySingleplanInfo = function(msid){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/plan/plan/querySingleplanInfo",
			// url: "manage/plan/plan/querySingleplanInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"planSid": msid
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
                // $scope.singleplan = data.contents;
                localStorage.setItem('singleplan',JSON.stringify(data.contents));
                $location.path('account_index/plan');
            }
            // else if(data.code=="E00"){
            //     alert(data.message+",请重新登陆");
            //     localStorage.clear();
            //     $location.path('login').replace();
            // }else {
            //     alert(data.message);
            // }  
        })
	}

	var newplan = {
	    "planNo":"",
	    "planShortName":"",
	    "planFullName":"",
	    "companySid":"",
	    "companyShortName":"",
	    "contactPhone":"",
	    "contactAddress":"",
	    "notes":"",
	    "zipCode":""
	};

	$scope.newplan= newplan;

	$scope.addOrUpdateplans = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/plan/plan/addOrUpdateplanInfo",
			// url: "manage/plan/plan/addOrUpdateplanInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
			    "status": 0,
			    "planNo":newplan.planNo,
			    "planShortName":newplan.planShortName,
			    "planFullName":newplan.planFullName,
			    "companySid": localStorage.getItem('cSid'),
			    "companyShortName":localStorage.getItem('curCompanyName'),
			    "contactPhone":newplan.contactPhone,
	    		"contactAddress":newplan.contactAddress,
			    "zipCode": newplan.zipCode,
			    "notes":newplan.notes
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	$scope.queryplanInfo();
                alert(data.message);
                $scope.newplan = {
                	"planNo":"",
				    "planShortName":"",
				    "planFullName":"",
				    "companySid":"",
				    "companyShortName":"",
				    "contactPhone":"",
				    "contactAddress":"",
				    "notes":"",
				    "zipCode":""
                }
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
	}

}])
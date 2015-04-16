FIMS.controller('vendorListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
	$scope.companyShortName = localStorage.getItem('curCompanyName');
	$scope.vendorlistBack = function(){
		localStorage.removeItem('singlevendor');
		$location.path('account_index/chooseModule').replace();
	}
	$scope.queryVendorInfo = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			// url: config.HOST + "/api/2.0/bp/vendor/vendor/queryvendorInfo",
			url: "manage/vendor/vendor/queryVendorInfo.json",
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

	$scope.queryVendorInfo();

	$scope.querySingleVendorInfo = function(msid){
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/vendor/vendor/querySingleVendorInfo",
			url: "manage/vendor/vendor/querySingleVendorInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"vendorSid": msid
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
                // $scope.singlevendor = data.contents;
                localStorage.setItem('singlevendor',JSON.stringify(data.contents));
                $location.path('account_index/vendor');
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

	var newvendor = {
	    "vendorNo":"",
	    "vendorShortName":"",
	    "vendorFullName":"",
	    "companySid":"",
	    "companyShortName":"",
	    "contactPhone":"",
	    "contactAddress":"",
	    "notes":"",
	    "zipCode":""
	};

	$scope.newvendor= newvendor;

	$scope.addOrUpdateVendors = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			// url: config.HOST + "/api/2.0/bp/vendor/vendor//addOrUpdatevendors",
			url: "manage/vendor/vendor/addOrUpdateVendorInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
			    "status": 0,
			    "vendorNo":newvendor.vendorNo,
			    "vendorShortName":newvendor.vendorShortName,
			    "vendorFullName":newvendor.vendorFullName,
			    "companySid": localStorage.getItem('cSid'),
			    "companyShortName":localStorage.getItem('curCompanyName'),
			    "contactPhone":newvendor.contactPhone,
	    		"contactAddress":newvendor.contactAddress,
			    "zipCode": newvendor.zipCode,
			    "notes":newvendor.notes
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	$scope.queryVendorInfo();
                alert(data.message);
                $scope.newvendor = {
                	"vendorNo":"",
				    "vendorShortName":"",
				    "vendorFullName":"",
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
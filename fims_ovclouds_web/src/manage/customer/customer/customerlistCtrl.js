FIMS.controller('customerListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
	$scope.companyShortName = localStorage.getItem('curCompanyName');
	$scope.customerlistBack = function(){
		localStorage.removeItem('singlecustomer');
		$location.path('account_index/chooseModule').replace();
	}
	$scope.queryCustomerInfo = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			// url: config.HOST + "/api/2.0/bp/customer/customer/queryCustomerInfo",
			url: "manage/customer/customer/queryCustomerInfo.json",
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

	$scope.queryCustomerInfo();

	$scope.querySingleCustomerInfo = function(msid){
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/customer/customer/querySingleCustomerInfo",
			url: "manage/customer/customer/querySingleCustomerInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"customerSid": msid
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
                // $scope.singlecustomer = data.contents;
                localStorage.setItem('singlecustomer',JSON.stringify(data.contents));
                $location.path('account_index/customer');
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

	var newcustomer = {
	    "customerNo":"",
	    "customerShortName":"",
	    "customerFullName":"",
	    "companySid":"",
	    "companyShortName":"",
	    "contactPhone":"",
	    "contactAddress":"",
	    "notes":"",
	    "zipCode":""
	};

	$scope.newcustomer= newcustomer;

	$scope.addOrUpdateCustomers = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			// url: config.HOST + "/api/2.0/bp/customer/customer//addOrUpdatecustomers",
			url: "manage/customer/customer/addOrUpdateCustomerInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
			    "status": 0,
			    "customerNo":newcustomer.customerNo,
			    "customerShortName":newcustomer.customerShortName,
			    "customerFullName":newcustomer.customerFullName,
			    "companySid": localStorage.getItem('cSid'),
			    "companyShortName":localStorage.getItem('curCompanyName'),
			    "contactPhone":newcustomer.contactPhone,
	    		"contactAddress":newcustomer.contactAddress,
			    "zipCode": newcustomer.zipCode,
			    "notes":newcustomer.notes
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	$scope.queryCustomerInfo();
                alert(data.message);
                $scope.newcustomer = {
                	"customerNo":"",
				    "customerShortName":"",
				    "customerFullName":"",
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
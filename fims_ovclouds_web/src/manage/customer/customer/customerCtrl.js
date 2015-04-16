FIMS.controller('customerCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var customer = JSON.parse(localStorage.getItem('singlecustomer'));
		var updatecustomer = {
			"customerNo": customer.customerNo,
            "customerShortName": customer.customerShortName,
            "customerFullName": customer.customerFullName,
            "contactPhone": customer.contactPhone,
            "contactAddress": customer.contactAddress,
		    "zipCode": customer.zipCode,
            "notes": customer.notes
		};
		console.log(customer);
		$scope.updatecustomer= updatecustomer;

		$scope.customerBack = function(){
			localStorage.removeItem('singlecustomer');
			$location.path('account_index/customerlist').replace();
		}


		$scope.updatecustomer = updatecustomer;

		$scope.addOrUpdateCustomerInfo = function(){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				url: config.HOST + "/api/2.0/bp/customer/customer/addOrUpdateCustomerInfo",
				// url: "manage/customer/customer/addOrUpdateCustomerInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				    "operateStatus": 1,
				    "customerNo":updatecustomer.customerNo,
				    "customerShortName":updatecustomer.customerShortName,
				    "customerFullName":updatecustomer.customerFullName,
				    "companySid": localStorage.getItem('cSid'),
				    "companyShortName":localStorage.getItem('curCompanyName'),
				    "contactPhone": updatecustomer.contactPhone,
				    "contactAddress": updatecustomer.contactAddress,
		    		"zipCode": updatecustomer.zipCode,
				    "notes":updatecustomer.notes
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                alert(data.message);
	                $scope.customerBack();
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
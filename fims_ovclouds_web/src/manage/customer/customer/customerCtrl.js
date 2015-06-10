FIMS.controller('customerCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var customer = {
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

		// var customer = {
		// 	"customerNo": customer.customerNo,
  //           "customerShortName": customer.customerShortName,
  //           "customerFullName": customer.customerFullName,
  //           "contactPhone": customer.contactPhone,
  //           "contactAddress": customer.contactAddress,
		//     "zipCode": customer.zipCode,
  //           "notes": customer.notes
		// };

		//数据绑定以及准备
		$scope.customer= customer;


		//方法定义区
		$scope.customerBack = function(){
			localStorage.removeItem('curC');
			$location.path('account_index/customerlist').replace();
		}

		$scope.querySingleCustomerInfo = function(msid){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/customer/customer/querySingleCustomerInfo",
				// url: "manage/customer/customer/querySingleCustomerInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"customerSid": msid
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                $scope.customer = data.contents;
	                console.log($scope.customer);
	                
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
				    // "customerNo":$scope.customer.customerNo,
				    "customerSid":$scope.customer.customerSid,
				    "customerShortName":$scope.customer.customerShortName,
				    "customerFullName":$scope.customer.customerFullName,
				    "companySid": localStorage.getItem('cSid'),
				    "companyShortName":localStorage.getItem('curCompanyName'),
				    "contactPhone": $scope.customer.contactPhone,
				    "contactAddress": $scope.customer.contactAddress,
		    		"zipCode": $scope.customer.zipCode,
				    "notes": $scope.customer.notes
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	console.log(customer);
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

		//*********初始化调用区域
		$scope.querySingleCustomerInfo(localStorage.getItem("curC"));

}])
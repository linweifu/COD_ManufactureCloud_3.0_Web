FIMS.controller('vendorCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var vendor = {
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

		//数据绑定以及准备
		$scope.vendor= vendor;


		// $scope.updatevendor= updatevendor;

		$scope.vendorBack = function(){
			localStorage.removeItem('curV');
			$location.path('account_index/vendorlist').replace();
		}

		// $scope.updatevendor = updatevendor;


		$scope.querySingleVendorInfo = function(msid){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/vendor/vendor/querySingleVendorInfo",
				// url: "manage/vendor/vendor/querySingleVendorInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"vendorSid": msid
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                $scope.vendor = data.contents;
	                $location.path('account_index/vendor');
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
		$scope.querySingleVendorInfo(localStorage.getItem("curV"));

		$scope.addOrUpdateVendorInfo = function(){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				url: config.HOST + "/api/2.0/bp/vendor/vendor/addOrUpdateVendorInfo",
				// url: "manage/vendor/vendor/addOrUpdatevendorInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				    "vendorSid": localStorage.getItem("curV"),
				    "operateStatus": 1,
				    "vendorNo": $scope.vendor.vendorNo,
				    "vendorShortName": $scope.vendor.vendorShortName,
				    "vendorFullName": $scope.vendor.vendorFullName,
				    "companySid": localStorage.getItem('cSid'),
				    "companyShortName": localStorage.getItem('curCompanyName'),
				    "contactPhone": $scope.vendor.contactPhone,
				    "contactAddress": $scope.vendor.contactAddress,
		    		"zipCode": $scope.vendor.zipCode,
				    "notes": $scope.vendor.notes
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                alert(data.message);
	                $scope.vendorBack();
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
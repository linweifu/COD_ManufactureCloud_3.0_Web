FIMS.controller('vendorCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var vendor = JSON.parse(localStorage.getItem('singlevendor'));
		var updatevendor = {
			"vendorNo": vendor.vendorNo,
            "vendorShortName": vendor.vendorShortName,
            "vendorFullName": vendor.vendorFullName,
            "contactPhone": vendor.contactPhone,
            "contactAddress": vendor.contactAddress,
		    "zipCode": vendor.zipCode,
            "notes": vendor.notes
		};
		console.log(vendor);
		$scope.updatevendor= updatevendor;

		$scope.vendorBack = function(){
			localStorage.removeItem('singlevendor');
			$location.path('account_index/vendorlist').replace();
		}

		$scope.updatevendor = updatevendor;

		$scope.addOrUpdateVendorInfo = function(){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				url: config.HOST + "/api/2.0/bp/vendor/vendor/addOrUpdateVendorInfo",
				// url: "manage/vendor/vendor/addOrUpdatevendorInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				    "operateStatus": 1,
				    "vendorNo":updatevendor.vendorNo,
				    "vendorShortName":updatevendor.vendorShortName,
				    "vendorFullName":updatevendor.vendorFullName,
				    "companySid": localStorage.getItem('cSid'),
				    "companyShortName":localStorage.getItem('curCompanyName'),
				    "contactPhone": updatevendor.contactPhone,
				    "contactAddress": updatevendor.contactAddress,
		    		"zipCode": updatevendor.zipCode,
				    "notes":updatevendor.notes
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
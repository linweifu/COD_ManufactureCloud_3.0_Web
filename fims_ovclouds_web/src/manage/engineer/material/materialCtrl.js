FIMS.controller('materialCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var material = {};
		$scope.material = material;

		$scope.materialBack = function(){
			localStorage.removeItem('curM');
			$location.path('account_index/materiallist').replace();
		}


		// $scope.updateMaterial = updateMaterial;

		$scope.querySingleMaterial = function(msid){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				url: config.HOST + "/api/2.0/bp/engineering/materials/querySingleMaterialsInfo",
				// url: "manage/engineer/material/querySingleMaterial.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"materialSid": msid
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                $scope.material = data.contents;
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

		$scope.querySingleMaterial(localStorage.getItem('curM'));

		$scope.addOrUpdateMaterials = function(){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				url: config.HOST + "/api/2.0/bp/engineering/materials/addOrUpdateMaterialsInfo",
				// url: "manage/engineer/material/addOrUpdateMaterials.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				    "operateStatus": 1,
				    "materialSid": localStorage.getItem('curM'),
				    // "materialNo":updateMaterial.materialNo,
				    "materialShortName":$scope.material.materialShortName,
				    "materialVersion":$scope.material.materialVersion,
				    "materialFullName":$scope.material.materialFullName,
				    "companySid":localStorage.getItem('cSid'),
				    "companyShortName":$scope.material.companyShortName,
				    "notes":$scope.material.notes
				        
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                alert(data.message);
	                $scope.materialBack();
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
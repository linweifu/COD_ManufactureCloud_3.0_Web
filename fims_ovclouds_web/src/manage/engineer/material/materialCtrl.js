FIMS.controller('materialCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var material = {
			materialNo: "",
			materialVersion: "",
			materialShortName: "",
			materialFullName: "",
			notes:""
		};
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
					
				    "operateStatus": 1,
				    "materialSid": localStorage.getItem('curM'),
				    "materialNo": material.materialNo,
				    "materialShortName": material.materialShortName,
				    "materialVersion": material.materialVersion,
				    "materialFullName": material.materialFullName,
				    "companySid":localStorage.getItem('cSid'),
				    "companyShortName": material.companyShortName,
				    "notes": material.notes,
				    "sid": localStorage.getItem('sid')
				        
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
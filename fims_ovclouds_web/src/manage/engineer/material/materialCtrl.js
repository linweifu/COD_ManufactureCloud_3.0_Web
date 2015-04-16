FIMS.controller('materialCtrl', ['$scope',  '$location', '$http', 
	function($scope,$location,$http){
		var material = JSON.parse(localStorage.getItem('singlematerial'));
		var updateMaterial = {
			"materialNo": material.materialNo,
            "materialShortName": material.materialShortName,
            "materialVersion": material.materialVersion,
            "materialFullName": material.materialFullName,
           	"materialSid": material.materialSid,
            "notes": material.notes
		};
		console.log(material);
		$scope.updateMaterial= updateMaterial;

		$scope.materialBack = function(){
			localStorage.removeItem('singlematerial');
			$location.path('account_index/materiallist').replace();
		}

		$scope.addOrUpdateMaterials = function(status){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				// url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
				url: "manage/engineer/material/queryMaterialsInfo.json",
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

		$scope.updateMaterial = updateMaterial;

		$scope.addOrUpdateMaterials = function(){
			$http({
				method: "POST",
				// url: "account/joinCo/joinCo.json",
				// url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
				url: "manage/engineer/material/addOrUpdateMaterials.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				    "operateStatus": 1,
				    "materialSid": material.materialSid,
				    "materialNo":updateMaterial.materialNo,
				    "materialShortName":updateMaterial.materialShortName,
				    "materialVersion":updateMaterial.materialVersion,
				    "materialFullName":updateMaterial.materialFullName,
				    "companySid": localStorage.getItem('cSid'),
				    "companyShortName":updateMaterial.materialShortName,
				    "notes":updateMaterial.notes
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
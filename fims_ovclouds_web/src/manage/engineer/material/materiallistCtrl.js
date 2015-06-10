FIMS.controller('materialListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var newMaterial = {
		"materialNo": "",
        "materialShortName": "",
        "materialVersion": "",
        "materialFullName": "",
        "notes": ""
	};

	$scope.newMaterial= newMaterial;
	$scope.companyShortName = localStorage.getItem('curCompanyName');
	$scope.materiallistBack = function(){
		localStorage.removeItem('singlematerial');
		$location.path('account_index/chooseModule').replace();
	}
	$scope.queryMaterialsInfo = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
			// url: "manage/engineer/material/queryMaterialsInfo.json",
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

	$scope.queryMaterialsInfo();

	$scope.querySingleMaterial = function(msid){
		localStorage.setItem('curM',msid);
 		$location.path('account_index/material');     
	}
	// $scope.querySingleMaterial = function(msid){
	// 	$http({
	// 		method: "POST",
	// 		// url: "account/joinCo/joinCo.json",
	// 		url: config.HOST + "/api/2.0/bp/engineering/materials/querySingleMaterialsInfo",
	// 		// url: "manage/engineer/material/querySingleMaterial.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"materialSid": msid
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {
 //                $scope.singlematerial = data.contents;
 //                localStorage.setItem('singlematerial',JSON.stringify(data.contents));
 //                $location.path('account_index/material');
 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }

	$scope.addOrUpdateMaterials = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			url: config.HOST + "/api/2.0/bp/engineering/materials/addOrUpdateMaterialsInfo",
			// url: "manage/engineer/material/addOrUpdateMaterials.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
			    "operateStatus": 0,
			    "materialNo":newMaterial.materialNo,
			    "materialShortName":newMaterial.materialShortName,
			    "materialVersion":newMaterial.materialVersion,
			    "materialFullName":newMaterial.materialFullName,
			    "companySid": localStorage.getItem('cSid'),
			    "companyShortName":newMaterial.materialShortName,
			    "notes":newMaterial.notes
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	$scope.queryMaterialsInfo();
                alert(data.message);
                newMaterial = {
                	"materialNo": "",
			        "materialShortName": "",
			        "materialVersion": "",
			        "materialFullName": "",
			        "notes": ""
                }
                $scope.newMaterial = newMaterial;
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
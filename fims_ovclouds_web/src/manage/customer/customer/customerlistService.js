// FIMS.factory('addOrUpdateMaterialService',['$location','$http',
// 	function($location,$http){
// 		var addOrUpdateMaterial = {};
// 		addOrUpdateMaterial.newMaterial = {
// 			"materialNo": "",
//             "materialShortName": "",
//             "materialVersion": "",
//             "materialFullName": "",
//             "notes": ""
// 		};

// 		addOrUpdateMaterial.addOrUpdateMaterials = function(s){
// 			$http({
// 				method: "POST",
// 				// url: "account/joinCo/joinCo.json",
// 				// url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
// 				url: "manage/engineer/material/queryMaterialsInfo.json",
// 				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
// 				data: {
// 					"sid": localStorage.getItem('sid'),
// 				    "status": s,
// 				    "materialNo":"",
// 				    "materialShortName":"",
// 				    "materialVersion":"",
// 				    "materialFullName":"",
// 				    "companySid": localStorage.getItem('cSid'),
// 				    "companySidHash":,
// 				    "companyShortName":"",
// 				    "materialBarcode":"",
// 				    "notes":""

// 				}
// 			})
// 			.success(function(data){
// 	            if (data.code == 'N01') {
// 	                addOrUpdateMaterial.listdata = data.contents;
// 	            }
// 	            else if(data.code=="E00"){
// 	                alert(data.message+",请重新登陆");
// 	                localStorage.clear();
// 	                $location.path('login').replace();
// 	            }else {
// 	                alert(data.message);
// 	            }  
// 	        })
// 		}

// 		return addOrUpdateMaterial;
// }])
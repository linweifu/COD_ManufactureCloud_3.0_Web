FIMS.controller('planHistoryListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planHistoryList = {
			//检验计划字典
			dicQCPType :[],
			selQCPType : {},
			QCP:[]
			// display: "",
			// page: 1
		};

		$scope.planHistoryListBack = function(){
			// $location.path('account_index/chooseModule').replace();
			history.go(-1);
		}

		//根据检验计划类型获取检验计划
		$scope.checkHistoryQCP = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/checkHistoryQCP",
				// url: "plan/checkHistoryQCP.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"materialSid": localStorage.getItem('materialSid'),
					"checkoutPlanTypeCode": planHistoryList.selQCPType.code
					// "page": localStorage.getItem('page')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	// planHistoryList.dicQCPType = [];
	            	// planHistoryList.Selected.materialName = {};
	                // planHistoryList.display = "display:block"; 
	 				// localStorage.setItem('page',1);	
	                planHistoryList.QCP = data.contents;
	                console.log(planHistoryList.QCP); 
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	            	// planHistoryList.QCPSelected= [];  
	            	// planHistoryList.dictionary.materialVersion = [];
	            	// planHistoryList.Selected.materialName = {};
	                alert(data.message);
	            }  
	        })
		}


		// $scope.querySingleplanInfo =function(planSid,checkoutPlanStatusCode){
		// 	if (checkoutPlanStatusCode=="cps001") {
		// 		localStorage.setItem("checkoutPlanSid",planSid);
		// 		$location.path("account_index/planCheck");
		// 	}else if(checkoutPlanStatusCode=="cps002") {
		// 		localStorage.setItem("checkoutPlanSid",planSid);
		// 		$location.path("account_index/planRevise");
		// 	}else {
		// 		alert("不是“查看/修订”状态");
		// 	}
		// }
		
		$scope.queryDicQCPType = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
				// url: "plan/queryDicQCPType.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	 				planHistoryList.dicQCPType = [];
	                for (var i=0; i < data.contents.length;i++) {
	                	planHistoryList.dicQCPType.push({
	                		"name": data.contents[i].checkoutPlanType,
	                		"code": data.contents[i].checkoutPlanTypeCode
	                	});
	                }
            		planHistoryList.selQCPType = (planHistoryList.dicQCPType)[0];
            		$scope.checkHistoryQCP();
            		console.log(data);

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

		$scope.companyShortName = localStorage.getItem('curCompanyName');
		$scope.planHistoryList = planHistoryList;	
		$scope.queryDicQCPType();


		
	// 	//  /api/2.0/bp/qcp/qcp

		$scope.querySingleQCP =function(planSid,checkoutPlanStatusCode){
			// if (checkoutPlanStatusCode=="cps001") {
			// 	localStorage.setItem("checkoutHistoryPlanSid",planSid);
			// 	$location.path("account_index.planCheck");
			// }else if(checkoutPlanStatusCode=="cps002") {
			// 	localStorage.setItem("checkoutPlanSid",planSid);
			// 	$location.path("account_index/planRevise");
			// }else {
			// 	alert("不是“查看/修订”状态");
			// }
			localStorage.setItem("checkoutHistoryPlanSid",planSid);
			$location.path("account_index/planCheck");
		}
		
	// 	$scope.queryDicQCPType = function(){
	// 		$http({
	// 			method: "POST",
	// 			url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
	// 			// url: "plan/queryDicQCPType.json",
	// 			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 			data: {
	// 				"sid": localStorage.getItem('sid'),
	// 			}
	// 		})
	// 		.success(function(data){
	//             if (data.code == 'N01') {
	//  				planHistoryList.dictionary.QCPType = [];
	//                 for (var i=0; i < data.contents.length;i++) {
	//                 	planHistoryList.dictionary.QCPType.push({
	//                 		"name": data.contents[i].checkoutPlanType,
	//                 		"code": data.contents[i].checkoutPlanTypeCode
	//                 	});
	//                 }
 //            		planHistoryList.Selected.QCPType = (planHistoryList.dictionary.QCPType)[0];
 //            		$scope.queryQCPByType(planHistoryList.Selected.QCPType.code);

	//             }
	//             else if(data.code=="E00"){
	//                 alert(data.message+",请重新登陆");
	//                 localStorage.clear();
	//                 $location.path('login').replace();
	//             }else {
	//                 alert(data.message);
	//             }  
	//         })
	// 	}

	// 	$scope.queryDicQCPType();


	// 	// 上一页
	// 	$scope.previous = function(){
	// 		if (planHistoryList.page==1) {
	// 			alert("当前是第1页...")
	// 		} 
			
	// 	}

	
		

	// 	// 查询检验计划
	// 	// $scope.queryQCP = function(){
	// 	// 	$http({
	// 	// 		method: "POST",
	// 	// 		// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCP",
	// 	// 		url: "plan/queryQCP.json",
	// 	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 	// 		data: {
	// 	// 			"sid": localStorage.getItem('sid'),
	// 	// 			"companySid": localStorage.getItem('cSid'),
	// 	// 			"page": localStorage.getItem('page')
	// 	// 		}
	// 	// 	})
	// 	// 	.success(function(data){
	//  //            if (data.code == 'N01') {
	//  //                // planHistoryList.dictionary.materialName = data.contents;
	//  //                planHistoryList.QCPSelected = data.contents;          
	//  //            }
	//  //            else if(data.code=="E00"){
	//  //                alert(data.message+",请重新登陆");
	//  //                localStorage.clear();
	//  //                $location.path('login').replace();
	//  //            }else {
	//  //                alert(data.message);
	//  //            }  
	//  //        })
	// 	// }

	// 	// $scope.queryQCP();

	// 	//获取物料字典
	// 	$scope.queryMaterialsInfo = function(){
	// 		$http({
	// 			method: "POST",
	// 			url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
	// 			// url: "manage/engineer/material/queryMaterialsInfo.json",
	// 			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 			data: {
	// 				"sid": localStorage.getItem('sid'),
	// 				"companySid": localStorage.getItem('cSid')
	// 			}
	// 		})
	// 		.success(function(data){
	//             if (data.code == 'N01') {
	//             	planHistoryList.dictionary.materialName = data.contents;
	//             }
	//             else if(data.code=="E00"){
	//                 alert(data.message+",请重新登陆");
	//                 localStorage.clear();
	//                 $location.path('login').replace();
	//             }else {
	//                 alert(data.message);
	//             }  
	//         })
	// 	}

	// $scope.queryMaterialsInfo();




	// 	//根据物料编号获取物料版本
	// 	$scope.queryMaterialVersionByMaterialNo = function(){
	// 		$http({
	// 			method: "POST",
	// 			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
	// 			// url: "plan/queryMaterialVersionByMaterialNo.json",
	// 			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 			data: {
	// 				"sid": localStorage.getItem('sid'),
	// 				"companySid": localStorage.getItem('cSid'),
	// 				"materialNo": planHistoryList.Selected.materialName.materialNo 
	// 			}
	// 		})
	// 		.success(function(data){
	//             if (data.code == 'N01') {           	
	//                 planHistoryList.display = "display:none"; 
	//                 planHistoryList.dictionary.materialVersion = [];
	//             	planHistoryList.Selected.materialVersion = "";
	//                 planHistoryList.dictionary.materialVersion = data.contents;
	//                 // planHistoryList.QCPSelected = data.contents;
	//             }
	//             else if(data.code=="E00"){
	//                 alert(data.message+",请重新登陆");
	//                 localStorage.clear();
	//                 $location.path('login').replace();
	//             }else {
	//                 alert(data.message);
	//             }  
	//         })
	// 	}

	// 	//根据物料ID和物料版本获取检验计划
	// 	$scope.queryQCPByMaterial = function(){
	// 		$http({
	// 			method: "POST",
	// 			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByMaterial",
	// 			// url: "plan/queryQCPByMaterial.json",
	// 			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 			data: {
	// 				"sid": localStorage.getItem('sid'),
	// 				"companySid": localStorage.getItem('cSid'),
	// 				"materialNo": planHistoryList.Selected.materialName.materialNo ,
	// 				"materialVersion": planHistoryList.Selected.materialVersion
	// 			}
	// 		})
	// 		.success(function(data){
	//             if (data.code == 'N01') {           	
	//  				localStorage.setItem('page',1);
	//                 planHistoryList.QCPSelected = data.contents;
	//             	// comsole.log()
	//             }
	//             else if(data.code=="E00"){
	//                 alert(data.message+",请重新登陆");
	//                 localStorage.clear();
	//                 $location.path('login').replace();
	//             }else {
	//                 alert(data.message);
	//             }  
	//         })
	// 	}

}])
FIMS.controller('planListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planlist = {
			dictionary: {
				QCPType: [],
				materialName: [],
				materialVersion: []
			},
			
			Selected : {
				QCPType: {},
				materialName : {},
				// materialVersion : {},
				// materialNo: "",
				materialVersion: ""
			},
			QCPSelected :[],
			display: "",
			page: localStorage.getItem("page")
		};

		$scope.companyShortName = localStorage.getItem('curCompanyName');
		$scope.planlist = planlist;

		//页面初始化
		(function(){
			localStorage.removeItem("checkoutPlanSid");
		})()

		$scope.planlistBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/chooseModule').replace();
		}

		//  /api/2.0/bp/qcp/qcp

		$scope.querySingleplanInfo =function(planSid,operateStatus){
			if (operateStatus=="查看") {
				localStorage.setItem("checkoutPlanSid",planSid);
				$location.path("account_index/planCheck");
			}else if(operateStatus=="修改") {
				localStorage.setItem("checkoutPlanSid",planSid);
				$location.path("account_index/planRevise");
			}else {
				alert("不是“查看/修改”状态");
			}
		}
		
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
	 				planlist.dictionary.QCPType = [];
	                for (var i=0; i < data.contents.length;i++) {
	                	planlist.dictionary.QCPType.push({
	                		"name": data.contents[i].checkoutPlanType,
	                		"code": data.contents[i].checkoutPlanTypeCode
	                	});
	                }
            		planlist.Selected.QCPType = (planlist.dictionary.QCPType)[0];
            		$scope.queryQCPByType(planlist.Selected.QCPType.code);

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

		$scope.queryDicQCPType();


		// 上一页
		$scope.previous = function(){
			if (planlist.page==1) {
				alert("当前是第1页...")
			} 
			
		}

		//根据检验计划类型获取检验计划
		$scope.queryQCPByType = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByType",
				// url: "plan/queryQCPByType.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"checkoutPlanTypeCode": planlist.Selected.QCPType.code,
					"page": localStorage.getItem('page')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	planlist.dictionary.materialVersion = [];
	            	planlist.Selected.materialName = {};
	                planlist.display = "display:block"; 
	 				localStorage.setItem('page',1);	
	                planlist.QCPSelected = data.contents; 
	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	            	planlist.QCPSelected= [];  
	                alert(data.message);
	            }  
	        })
		}
		

		// 查询检验计划
		// $scope.queryQCP = function(){
		// 	$http({
		// 		method: "POST",
		// 		// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCP",
		// 		url: "plan/queryQCP.json",
		// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
		// 		data: {
		// 			"sid": localStorage.getItem('sid'),
		// 			"companySid": localStorage.getItem('cSid'),
		// 			"page": localStorage.getItem('page')
		// 		}
		// 	})
		// 	.success(function(data){
	 //            if (data.code == 'N01') {
	 //                // planlist.dictionary.materialName = data.contents;
	 //                planlist.QCPSelected = data.contents;          
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

		// $scope.queryQCP();

		//获取物料字典
		$scope.queryMaterialsInfo = function(){
			$http({
				method: "POST",
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
	            	planlist.dictionary.materialName = data.contents;
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




		//根据物料编号获取物料版本
		$scope.queryMaterialVersionByMaterialNo = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
				// url: "plan/queryMaterialVersionByMaterialNo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"materialNo": planlist.Selected.materialName.materialNo 
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {           	
	                planlist.display = "display:none"; 
	                planlist.dictionary.materialVersion = [];
	            	planlist.Selected.materialVersion = "";
	                planlist.dictionary.materialVersion = data.contents;
	                // planlist.QCPSelected = data.contents;
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

		//根据物料ID和物料版本获取检验计划
		$scope.queryQCPByMaterial = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByMaterial",
				// url: "plan/queryQCPByMaterial.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"materialNo": planlist.Selected.materialName.materialNo ,
					"materialVersion": planlist.Selected.materialVersion
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {           	
	 				localStorage.setItem('page',1);
	                planlist.QCPSelected = data.contents;
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
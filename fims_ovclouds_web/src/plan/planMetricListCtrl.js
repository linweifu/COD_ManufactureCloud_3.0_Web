FIMS.controller('planMetricListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planMetricList = {
			
			viewSelectedCheckoutPlanSid: 0,

			viewSelectedCheckoutMetricSid: 0,

			DXCheckoutMetricList:[],

			DLCheckoutMetricList:[],

			checkoutMetrics:{
	            checkoutMetricSid: "",
	            checkoutPlanSid: "",
	            checkoutMetricName: "",
	            checkoutMetricDescription: "",
	            checkoutToolCode: "",
	            checkoutToolName: "",
	            checkoutMetricTypeCode: "",
	            checkoutMetricType: "",
	            checkoutMetricClassifyCode: "",
	            checkoutMetricClassify: "",
	            processName: "",
	            metricUnit: "",
	            referenceStandard: "",
	            underTolerance: "",
	            upTolerance: "",
	            mapPosition: "",
	            threeDimensionalRogramNo: "",
	            fixtureId: "",
	            checkoutMetricNo: ""
        	}

		};
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/


		$scope.planlistBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/chooseModule').replace();
		}

		//  /api/2.0/bp/qcp/qcp
		
		$scope.queryDicQCPType = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
				url: "plan/queryDicQCPType.json",
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
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCP",
				url: "plan/queryQCPByType.json",
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
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
				url: "plan/queryMaterialVersionByMaterialNo.json",
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

		//根据物料ID和物料版本获取检验计划
		$scope.queryQCPByMaterial = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByMaterial",
				url: "plan/queryQCPByMaterial.json",
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

/*
***************************************************
***************************************************
queryQCPItems
***************************************************
***************************************************
*/

	var parseData = function(array){

		var dx =[];
		var dl =[];

		// 肯定又数据的情况；
		for (var i=0;i<array.length;i++){
			checkoutMetrics = array[i];
			if (checkoutMetrics.checkoutMetricTypeCode ==="DX")
				dx.push(checkoutMetrics);
			else if (checkoutMetrics.checkoutMetricTypeCode ==="DL")
				dl.push(checkoutMetrics);
			else
				alert("检验指标类型既不非定性，也非定量")
		}

		planMetricList.DXCheckoutMetricList = dx;
		planMetricList.DLCheckoutMetricList = dl;
	}

	planMetricList.queryQCPItems = function(){

		// 准备参数
		var assemblyObj = function(){
			var o = {};

			o.sid		                = localStorage.getItem('sid');

            o.checkoutPlanSid		    = planMetricList.viewSelectedCheckoutPlanSid;

			return o;
		}

		var entry = assemblyObj();

		 alert("set11");
        console.log(entry);
	 	 alert("set11");

		//
		$http({
			method: "POST",
			//url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPItems",
			url: "plan/queryQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					sid		                    : entry.sid,
		            checkoutPlanSid		        : entry.checkoutPlanSid,
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	//alert("检验计划信息更新成功");
            	//$location.path("account_index/chooseModule");

            	//绑定数据
            	parseData(data.contents);

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('queryQCPItems'+data.message);
        });
	}

/*
***************************************************
***************************************************
***************************************************
***************************************************
*/


/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

	planMetricList.updateQCP = function(){

		// 准备参数
		var assemblyObj = function(){
			var o = {};

			o.sid		                = planMetricList.keyCheckoutPlan.sid,
            o.checkoutPlanSid		    = planMetricList.keyCheckoutPlan.checkoutPlanSid,
            o.aql		                = planMetricList.keyCheckoutPlan.aql,
            o.entryId		            = planMetricList.keyCheckoutPlan.entryId,
            o.entryJobNumber		    = planMetricList.keyCheckoutPlan.entryJobNumber,
            o.entryName		            = planMetricList.keyCheckoutPlan.entryName,
            o.entryTime		            = planMetricList.keyCheckoutPlan.entryTime,
            o.makeJobNumber		        = planMetricList.keyCheckoutPlan.makeJobNumber,
            o.makeName		            = planMetricList.keyCheckoutPlan.makeName,
            o.makeTime		            = planMetricList.keyCheckoutPlan.makeTime,
            o.notes		                = planMetricList.keyCheckoutPlan.notes

			return o;
		}

		var entry = assemblyObj();

		 alert("set11");
        console.log(entry);
	 	 alert("set11");

		//
		$http({
			method: "POST",
			//url: config.HOST + "/api/2.0/bp/qcp/qcp/updateQCP",
			url: "plan/updateQCP.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					sid		                    : entry.sid,
		            checkoutPlanSid		        : entry.checkoutPlanSid,
		            aql		                    : entry.aql,
		            entryId		                : entry.entryId,
		            entryJobNumber		        : entry.entryJobNumber,
		            entryName		            : entry.entryName,
		            entryTime		            : entry.entryTime,
		            makeJobNumber		        : entry.makeJobNumber,
		            makeName		            : entry.makeName,
		            makeTime		            : entry.makeTime,
		            notes		                : entry.notes

			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	alert("检验计划信息更新成功");
          //  	//$location.path("account_index/chooseModule");

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('updateQCP'+data.message);
        });
	}


/*
***************************************************
***************************************************
***************************************************
***************************************************
*/
	//$scope.companyShortName = localStorage.getItem('curCompanyName');

	$scope.planMetricList = planMetricList;

 	// alert("set");
 	localStorage.setItem('checkoutPlanSid','111');
 	// alert("get");
 	planMetricList.viewSelectedCheckoutPlanSid = localStorage.getItem('checkoutPlanSid');
 	// alert("remove");
 	localStorage.removeItem('checkoutPlanSid');

	planMetricList.queryQCPItems();


}])
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

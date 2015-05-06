FIMS.controller('planMetricListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planMetricList = {
			
			viewSelectedCheckoutPlanSid: 0,

			viewSelectedCheckoutMetricSid: 0,

			DXCheckoutMetricList:[],

			DLCheckoutMetricList:[],

			// checkoutMetrics:{
	  //           checkoutMetricSid: "",
	  //           checkoutPlanSid: "",
	  //           checkoutMetricName: "",
	  //           checkoutMetricDescription: "",
	  //           checkoutToolCode: "",
	  //           checkoutToolName: "",
	  //           checkoutMetricTypeCode: "",
	  //           checkoutMetricType: "",
	  //           checkoutMetricClassifyCode: "",
	  //           checkoutMetricClassify: "",
	  //           processName: "",
	  //           metricUnit: "",
	  //           referenceStandard: "",
	  //           underTolerance: "",
	  //           upTolerance: "",
	  //           mapPosition: "",
	  //           threeDimensionalRogramNo: "",
	  //           fixtureId: "",
	  //           checkoutMetricNo: ""
   //      	},

        	addDX: {
	            "checkoutPlanSid": "",
	            "checkoutMetricName": "",
	            "checkoutMetricDescription": "",
	            "checkoutToolCode": "",
	            "checkoutToolName": "",
	            "checkoutMetricTypeCode": "",
	            "checkoutMetricType": "",
	            "checkoutMetricClassifyCode": "",
	            "checkoutMetricClassify": "",
	            "processName": "",
	            "metricUnit": "",
	            "referenceStandard": "",
	            "underTolerance": "",
	            "upTolerance": "",
	            "mapPosition": "",
	            "threeDimensionalRogramNo": "",
	            "fixtureId": "",
	            "checkoutMetricNo": ""
        	}

		};
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/


	// 	$scope.planlistBack = function(){
	// 		// localStorage.removeItem('singleplan');
	// 		$location.path('account_index/chooseModule').replace();
	// 	}

	// 	//  /api/2.0/bp/qcp/qcp
		
	// 	$scope.queryDicQCPType = function(){
	// 		$http({
	// 			method: "POST",
	// 			// url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
	// 			url: "plan/queryDicQCPType.json",
	// 			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 			data: {
	// 				"sid": localStorage.getItem('sid'),
	// 			}
	// 		})
	// 		.success(function(data){
	//             if (data.code == 'N01') {
	//  				planlist.dictionary.QCPType = [];
	//                 for (var i=0; i < data.contents.length;i++) {
	//                 	planlist.dictionary.QCPType.push({
	//                 		"name": data.contents[i].checkoutPlanType,
	//                 		"code": data.contents[i].checkoutPlanTypeCode
	//                 	});
	//                 }
 //            		planlist.Selected.QCPType = (planlist.dictionary.QCPType)[0];
 //            		$scope.queryQCPByType(planlist.Selected.QCPType.code);

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



	// 	// 上一页
	// 	$scope.previous = function(){
	// 		if (planlist.page==1) {
	// 			alert("当前是第1页...")
	// 		} 
			
	// 	}

	// 	//根据检验计划类型获取检验计划
	// 	$scope.queryQCPByType = function(){
	// 		$http({
	// 			method: "POST",
	// 			// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCP",
	// 			url: "plan/queryQCPByType.json",
	// 			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 			data: {
	// 				"sid": localStorage.getItem('sid'),
	// 				"companySid": localStorage.getItem('cSid'),
	// 				"checkoutPlanTypeCode": planlist.Selected.QCPType.code,
	// 				"page": localStorage.getItem('page')
	// 			}
	// 		})
	// 		.success(function(data){
	//             if (data.code == 'N01') {
	//             	planlist.dictionary.materialVersion = [];
	//             	planlist.Selected.materialName = {};
	//                 planlist.display = "display:block"; 
	//  				localStorage.setItem('page',1);	
	//                 planlist.QCPSelected = data.contents; 
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
	//  //                // planlist.dictionary.materialName = data.contents;
	//  //                planlist.QCPSelected = data.contents;          
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

	
	// $scope.queryMaterialsInfo();




	// 	//根据物料编号获取物料版本
	// 	$scope.queryMaterialVersionByMaterialNo = function(){
	// 		$http({
	// 			method: "POST",
	// 			// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
	// 			url: "plan/queryMaterialVersionByMaterialNo.json",
	// 			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 			data: {
	// 				"sid": localStorage.getItem('sid'),
	// 				"companySid": localStorage.getItem('cSid'),
	// 				"materialNo": planlist.Selected.materialName.materialNo 
	// 			}
	// 		})
	// 		.success(function(data){
	//             if (data.code == 'N01') {           	
	//                 planlist.display = "display:none"; 
	//                 planlist.dictionary.materialVersion = [];
	//             	planlist.Selected.materialVersion = "";
	//                 planlist.dictionary.materialVersion = data.contents;
	//                 planlist.QCPSelected = data.contents;
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
	// 			// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByMaterial",
	// 			url: "plan/queryQCPByMaterial.json",
	// 			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 			data: {
	// 				"sid": localStorage.getItem('sid'),
	// 				"companySid": localStorage.getItem('cSid'),
	// 				"materialNo": planlist.Selected.materialName.materialNo ,
	// 				"materialVersion": planlist.Selected.materialVersion
	// 			}
	// 		})
	// 		.success(function(data){
	//             if (data.code == 'N01') {           	
	//  				localStorage.setItem('page',1);
	//                 planlist.QCPSelected = data.contents;
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

/*
***************************************************
***************************************************
queryQCPItems
***************************************************
***************************************************
*/

	var parseQueryData = function(array){

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

            o.checkoutPlanSid		    = localStorage.getItem('checkoutPlanSid');

            // localStorage.removeItem("checkoutPlanSid");

            console.log(localStorage.getItem('checkoutPlanSid'));

			return o;
		}

		var entry = assemblyObj();

		 // alert("set11");
        console.log(entry);
	 	//  alert("set11");

		//
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPItems",
			// url: "plan/queryQCPItems.json",
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
            	console.log(data.contents);
            	//绑定数据
            	parseQueryData(data.contents);

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

	//将定性和定量分开保存
	var parseQueryData = function(array){

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


// ***************************************************
// ***************************************************
// addQCPItems  (parseAddData)
// ***************************************************
// ***************************************************


// //

	$scope.addQCPItems = function(type){
		$http({
			method: "POST",
			//url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCPItems",
			url: "plan/addQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
    			"checkoutMetrics": [{
    				// "checkoutMetricSid": "",
		            "checkoutPlanSid": "",
		            "checkoutMetricName": "",
		            "checkoutMetricDescription": "",
		            "checkoutToolCode": "",
		            "checkoutToolName": "",
		            "checkoutMetricTypeCode": "",
		            "checkoutMetricType": "",
		            "checkoutMetricClassifyCode": "",
		            "checkoutMetricClassify": "",
		            "processName": "",
		            "metricUnit": "",
		            "referenceStandard": "",
		            "underTolerance": "",
		            "upTolerance": "",
		            "mapPosition": "",
		            "threeDimensionalRogramNo": "",
		            "fixtureId": "",
		            "checkoutMetricNo": "",

					// checkoutMetricNo		       : planMetricList.addDX.checkoutMetricNo,
		   //          checkoutMetricClassify		   : planMetricList.addDX.checkoutMetricClassify,
		   //          checkoutMetricName             : planMetricList.addDX.checkoutMetricName,
		   //          checkoutMetricDescription	   : planMetricList.addDX.checkoutMetricDescription,
		   //          checkoutToolName		       : planMetricList.addDX.checkoutToolName,
		   //          processName		               : planMetricList.addDX.processName,		           
		   //          metricUnit                     : planMetricList.addDX.metricUnit,
		  	//         referenceStandard              : planMetricList.addDX.referenceStandard ,
		  	//         underTolerance                 : planMetricList.addDX.underTolerance,
		  	//         upTolerance                    : planMetricList.addDX.upTolerance,
		  	//         mapPosition                    : planMetricList.addDX.mapPosition,
		  	//         threeDimensionalRogramNo       : planMetricList.addDX.threeDimensionalRogramNo,
		  	//         fixtureId                      : planMetricList.addDX.fixtureId
	  	        }]
			}
		})
		.success(function(data){
		
            if (data.code=="N01"){
            	alert("检验项目信息添加成功");
            	planMetricList.queryQCPItems();
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
/*planMetricList.addQCPItems = function(){

        // 准备参数
		var addData = function(){
			//var o = {};
			var a = {};

		    planMetricList.checkoutMetrics.checkoutMetricNo             =  a.checkoutMetricNo,

          	planMetricList.checkoutMetrics.checkoutMetricClassify       =  a.checkoutMetricClassify,

            planMetricList.checkoutMetrics.checkoutMetricName           = a.checkoutMetricName,

            planMetricList.checkoutMetrics.checkoutMetricDescription    = a.checkoutMetricDescription,

            planMetricList.checkoutMetrics.checkoutToolName             = a.checkoutToolName,

            planMetricList.checkoutMetrics.processName                  = a.processName ,


            planMetricList.checkoutMetrics.metricUnit                   =a.metricUnit   ,
		  	planMetricList.checkoutMetrics.referenceStandard            =a.referenceStandard  ,
		  	planMetricList.checkoutMetrics.underTolerance               =a.underTolerance ,
		  	planMetricList.checkoutMetrics.upTolerance                  =a.upTolerance   ,
		  	planMetricList.checkoutMetrics.mapPosition                  =a.mapPosition ,
		  	planMetricList.checkoutMetrics.threeDimensionalRogramNo     =a.threeDimensionalRogramNo  ,
		  	planMetricList.checkoutMetrics.fixtureId                    =a.fixtureId  ,

			return a ;
		}
      
    
      var entry = addData  {};

		$http({
			method: "POST",
			//url: config.HOST + "/api/2.0/bp/qcp/qcp/updateQCP",
			url: "plan/addQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					checkoutMetricNo		       : entry.checkoutMetricNo,
		            checkoutMetricClassify		   : entry.checkoutMetricClassify,
		            checkoutMetricName             : entry.checkoutMetricName,
		            checkoutMetricDescription	   : entry.checkoutMetricDescription,
		            checkoutToolName		       : entry.checkoutToolName,
		            processName		               : entry.processName,
		           

		            metricUnit                     : entry.metricUnit,
		  	        referenceStandard              : entry.referenceStandard ,
		  	        underTolerance                 : entry.underTolerance,
		  	        upTolerance                    : entry.upTolerance,
		  	        mapPosition                    : entry.mapPosition,
		  	        threeDimensionalRogramNo       : entry.threeDimensionalRogramNo,
		  	        fixtureId                      : entry.fixtureId,

			}
		})
		.success(function(data){
		
            if (data.code=="N01"){
            	alert("检验项目信息添加成功");
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
/*var parseQueryData = function(array){

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



/*
***************************************************
***************************************************
qqand
***************************************************
***************************************************
*/
/*var parseAddData = function(array){

		var add =[];
		//var adl =[];

		// 肯定又数据的情况；
		for (var i=0;i<array.length;i++){
			  add[i]= array[i];
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
            	parseQueryData(data.contents);

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
	//$scope.companyShortName = localStorage.getItem('curCompanyName');

	$scope.planMetricList = planMetricList;

 	// alert("set");
 	// localStorage.setItem('checkoutPlanSid','111');
 	// alert("get");
 	// planMetricList.viewSelectedCheckoutPlanSid = localStorage.getItem('checkoutPlanSid');
 	// alert("remove");
 	// localStorage.removeItem('checkoutPlanSid');

	planMetricList.queryQCPItems();


}])
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

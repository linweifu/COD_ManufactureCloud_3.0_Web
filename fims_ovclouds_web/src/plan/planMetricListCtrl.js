FIMS.controller('planMetricListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planMetricList = {
			
			viewSelectedCheckoutPlanSid: 0,

			viewSelectedCheckoutMetricSid: 0,

			DXCheckoutMetricList:[],

			DLCheckoutMetricList:[],

			dictionary: {
				checkoutTool: [],
				checkoutMetricClassify: []
			},

			Selected: {
				dxCheckoutTool:{},
				dxCheckoutMetricClassify:{},
				dlCheckoutTool:{},
				dlCheckoutMetricClassify:{}
			},

        	addDX: {
	            "checkoutPlanSid": localStorage.getItem('checkoutPlanSid'),
	            "checkoutMetricName": "",
	            "checkoutMetricDescription": "",
	            "checkoutToolCode": "",
	            "checkoutToolName": "",
	            "checkoutMetricTypeCode": "DX",
	            "checkoutMetricType": "定性检验",
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
        	},

        	addDL: {
	            "checkoutPlanSid": localStorage.getItem('checkoutPlanSid'),
	            "checkoutMetricName": "",
	            "checkoutMetricDescription": "",
	            "checkoutToolCode": "",
	            "checkoutToolName": "",
	            "checkoutMetricTypeCode": "DL",
	            "checkoutMetricType": "定量检验",
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
	// 获取检验工具字典

	$scope.queryDicCheckoutMetricClassify = function(){
		$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/account/dic/queryDicCheckoutMetricClassify",
				// url: "plan/queryDicCheckoutMetricClassify.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	 				planMetricList.dictionary.checkoutMetricClassify = data.contents;
	 				// console.log(planMetricList.dictionary.checkoutTool);
            		// planMetricList.Selected.CheckoutTool = (planMetricList.dictionary.CheckoutTool)[0];
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

	$scope.queryDicCheckoutMetricClassify();


	// 获取检验工具字典

	$scope.queryDicCheckoutTool = function(){
		$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/account/dic/queryDicCheckoutTool",
				// url: "plan/queryDicCheckoutTool.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid')					
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	 				planMetricList.dictionary.checkoutTool = data.contents;
	 				// console.log(planMetricList.dictionary.checkoutTool);
            		// planMetricList.Selected.CheckoutTool = (planMetricList.dictionary.CheckoutTool)[0];
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

	$scope.queryDicCheckoutTool();

	// 	$scope.planMetricListBack = function(){
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
	//  				planMetricList.dictionary.QCPType = [];
	//                 for (var i=0; i < data.contents.length;i++) {
	//                 	planMetricList.dictionary.QCPType.push({
	//                 		"name": data.contents[i].checkoutPlanType,
	//                 		"code": data.contents[i].checkoutPlanTypeCode
	//                 	});
	//                 }
 //            		planMetricList.Selected.QCPType = (planMetricList.dictionary.QCPType)[0];
 //            		$scope.queryQCPByType(planMetricList.Selected.QCPType.code);

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

	$scope.addDXQCPItems = function(type){
		console.log('s');
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCPItems",
			// url: "plan/addDXQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
    			"checkoutMetrics": [{
    				// "checkoutMetricSid": "",
		            "checkoutPlanSid":planMetricList.addDX.checkoutPlanSid,
		            "checkoutMetricName":planMetricList.addDX.checkoutMetricName,
		            "checkoutMetricDescription":planMetricList.addDX.checkoutMetricDescription,
	                "checkoutToolCode": planMetricList.Selected.dxCheckoutTool.checkoutToolCode,
	           		"checkoutToolName": planMetricList.Selected.dxCheckoutTool.checkoutToolName,
	            	"checkoutMetricTypeCode": "DX",
	                "checkoutMetricType": "定性检验",
	            	"checkoutMetricClassifyCode": planMetricList.Selected.dxCheckoutMetricClassify.checkoutMetricClassifyCode,
	            	"checkoutMetricClassify": planMetricList.Selected.dxCheckoutMetricClassify.checkoutMetricClassify,
		            "processName":planMetricList.addDX.processName,
		            "metricUnit":planMetricList.addDX.metricUnit,
		            "referenceStandard":planMetricList.addDX.referenceStandard,
		            "underTolerance":planMetricList.addDX.underTolerance,
		            "upTolerance":planMetricList.addDX.upTolerance,
		            "mapPosition":planMetricList.addDX.mapPosition,
		            "threeDimensionalRogramNo":planMetricList.addDX.threeDimensionalRogramNo,
		            "fixtureId":planMetricList.addDX.fixtureId,
		            "checkoutMetricNo":planMetricList.addDX.checkoutMetricNo

	  	        }]
			}
		})
		.success(function(data){
		console.log("ss");
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


	$scope.addDLQCPItems = function(type){
		console.log('s');
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCPItems",
			// url: "plan/addDLQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
    			"checkoutMetrics": [{
    				// "checkoutMetricSid": "",
		            "checkoutPlanSid":planMetricList.addDL.checkoutPlanSid,
		            "checkoutMetricName":planMetricList.addDL.checkoutMetricName,
		            "checkoutMetricDescription":planMetricList.addDL.checkoutMetricDescription,
	                "checkoutToolCode": planMetricList.Selected.dlCheckoutTool.checkoutToolCode,
	           		"checkoutToolName": planMetricList.Selected.dlCheckoutTool.checkoutToolName,
	            	"checkoutMetricTypeCode": "DL",
	                "checkoutMetricType": "定量检验",
	            	"checkoutMetricClassifyCode": planMetricList.Selected.dlCheckoutMetricClassify.checkoutMetricClassifyCode,
	            	"checkoutMetricClassify": planMetricList.Selected.dlCheckoutMetricClassify.checkoutMetricClassify,
		            "processName":planMetricList.addDL.processName,
		            "metricUnit":planMetricList.addDL.metricUnit,
		            "referenceStandard":planMetricList.addDL.referenceStandard,
		            "underTolerance":planMetricList.addDL.underTolerance,
		            "upTolerance":planMetricList.addDL.upTolerance,
		            "mapPosition":planMetricList.addDL.mapPosition,
		            "threeDimensionalRogramNo":planMetricList.addDL.threeDimensionalRogramNo,
		            "fixtureId":planMetricList.addDL.fixtureId,
		            "checkoutMetricNo":planMetricList.addDL.checkoutMetricNo

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

		var dl =[];
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


	$scope.planMetricList = planMetricList;

	planMetricList.queryQCPItems();


}])


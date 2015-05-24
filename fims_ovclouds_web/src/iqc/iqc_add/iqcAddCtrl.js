FIMS.controller('iqcAddCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var iqcAdd = {
		dictionary: {
			materialName: [],
			materialVersion: [],
			vendor: []
		},
		
		Selected : {
			materialName : {},
			materialVersion: {},
			vendor: {},
		},
		
		plan: {},

		checkoutRecordId: "",
		batchNo: "",
		giveCheckoutTime: "",
		giveCheckoutAmount: "",
		sampleAmount: "",

		companyShortName :localStorage.getItem('curCompanyName')

		// makeName : localStorage.getItem("userName"),
		// makeTime: "",
		// entryName: localStorage.getItem("userName"),
		// entryTime: ""
	};

	$scope.iqcAdd = iqcAdd;

	// var time  = new Date();

	//调整时间格式
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		console.log(year);

		if (month<10) {
			month = "0" + month;
		}

		if (day<10) {
			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}

	// iqcAdd.makeTime = time.format();
	// iqcAdd.entryTime = time.format();


	//获取物料字典
	var queryMaterialsInfo = function(){
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
            	iqcAdd.dictionary.materialName = data.contents;
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

	queryMaterialsInfo();


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
				"materialNo": iqcAdd.Selected.materialName.materialNo 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                iqcAdd.dictionary.materialVersion = data.contents;
            	iqcAdd.Selected.materialVersion = {};
                iqcAdd.plan = {};
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

	// 供应商字典
    var queryVendorInfo = function(){
        $http({
            method: "POST",
            url: config.HOST + "/api/2.0/bp/vendor/vendor/queryVendorInfo",
            // url: "manage/vendor/vendor/queryVendorInfo.json",
            header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "companySid": localStorage.getItem('cSid')
            }
        })
        .success(function(data){
            if (data.code == 'N01') {
               iqcAdd.dictionary.vendor = data.contents;
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
    queryVendorInfo();


	// 确定检验计划
	$scope.queryActivateQCPByMaterial = function(){
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryActivateQCPByMaterial",
			url: "iqc/iqc_add/queryActivateQCPByMaterial.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"materialNo": iqcAdd.Selected.materialName.materialNo,
				"materialVersion": iqcAdd.Selected.materialVersion.materialVersion 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                iqcAdd.plan = data.contents;
                console.log(data.contents)
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

	$scope.saveBaseIQCRecord = function(){
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/qc/iqc/saveBaseIQCRecord",
			url: "iqc/iqc_add/saveBaseIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"checkoutPlanSid": iqcAdd.plan.checkoutPlanSid,
				"companySid": localStorage.getItem('cSid'),
			    "batchNo": iqcAdd.batchNo,
			    // "externalReceiptNo":"",
			    // "entrySid": "1",
			    // "entryId": "mixmore@qq.com",
			    // "entryJobNumber": "002",
			    // "entryName": "杜旻翔",
			    // "entryTime": "14432555678",
			    "giveCheckoutAmount": iqcAdd.giveCheckoutAmount,
			    "giveCheckoutTime": ((new Date(iqcAdd.giveCheckoutTime)).valueOf())/1000,
			    "sampleAmount": iqcAdd.sampleAmount,
			    // "nspectorJobNumber":"001",
			    // "nspectorName":"Mex",
			    // "checkoutTime"："1432412138" ,
				"sid": localStorage.getItem('sid'),
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                alert(data.message);
                localStorage.setItem("checkoutRecordSid",data.contents.checkoutRecordSid);
                localStorage.setItem("activePlan", iqcAdd.plan);
                $location.path('account_index/iqcSimpleDXAdd');
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



	// $scope.queryActivateQCPByMaterial = function(){
	// 	$http({
	// 		method: "POST",
	// 		// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryActivateQCPByMaterial",
	// 		url: "iqc/iqc_add/queryActivateQCPByMaterial.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"companySid": localStorage.getItem('cSid'),
	// 			"materialNo": iqcAdd.Selected.materialName.materialNo,
	// 			"materialVersion": iqcAdd.Selected.materialVersion.materialVersion 
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
 //                iqcAdd.plan = data.contents;
 //                console.log(data.contents)
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

	// //获取物料简称
	// $scope.queryMaterialShortName = function(){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialShortName",
	// 		// url: "plan/queryMaterialShortName.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"materialNo": iqcAdd.Selected.materialNo.materialNo,
	// 			"materialVersion": iqcAdd.Selected.materialVersion 
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
 //            	iqcAdd.materialShortName = data.contents.materialShortName;
 //            	iqcAdd.checkoutPlanNo = iqcAdd.Selected.QCPType.code+"-"+iqcAdd.Selected.materialNo.materialNo+"-"+iqcAdd.Selected.materialVersion ;

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


	// /*********************************************************
	// *  
	// */

	// $scope.addQCP = function(){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCP",
	// 		// url: "plan/addQCP.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	//             "checkoutPlanNo":iqcAdd.checkoutPlanNo,
	//             "checkoutPlanVersion":iqcAdd.checkoutPlanVersion,
	//             "checkoutPlanTypeCode":iqcAdd.Selected.QCPType.code,
	//             "checkoutPlanType":iqcAdd.Selected.QCPType.name,
	//             "companySid":localStorage.getItem('cSid'),
	//             "companyShortName":localStorage.getItem('curCompanyName'),
	//             "materialSid":iqcAdd.Selected.materialNo.materialSid,
	//             "materialNo":iqcAdd.Selected.materialNo.materialNo,
	//             "materialVersion":iqcAdd.Selected.materialVersion,
	//             "materialShortName":iqcAdd.materialShortName,
	//             "aql":iqcAdd.aql,
	//             // "entrySid":iqcAdd. 1,
	//             "entryId":localStorage.getItem('email'),
	//             "entryJobNumber":localStorage.getItem('userJobNumber'),
	//             "entryName":iqcAdd.entryName,
	//             "entryTime":((new Date(iqcAdd.entryTime)).valueOf())/1000,
	//             "makeJobNumber":localStorage.getItem('userJobNumber'),
	//             "makeName":iqcAdd.makeName,
	//             "makeTime":((new Date(iqcAdd.makeTime)).valueOf())/1000,
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
	// 	     	alert(data.message);
	// 	     	$location.path('account_index/planList');       	
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

	// $scope.backQCP = function(){
	// 	var a = confirm("您确定要退出吗？退出将丢失填写数据!")
	// 	if (a) {
	// 		$location.path("account_index/planList");
	// 	}
	// }
	
}])
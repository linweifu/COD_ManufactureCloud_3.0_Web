FIMS.controller('iqcAddCodeCtrl', ['$scope','$location','$http','$q',function($scope,$location,$http,$q){
	var iqcAddCode = {
		dictionary: {
			materialName: [],
			materialVersion: [],
			vendor: []
		},
		
		Selected : {
			materialName : {},
			materialVersion: {},
			vendor: {}
		},
		
		plan: {},

		externalReceiptNo: "",

		checkoutRecordNo: "",
		batchNo: "",
		giveCheckoutTime: "",
		checkoutTime:"",
		giveCheckoutAmount: "",
		sampleAmount: "",
		checkoutRecordInputWay:"",

		companyShortName :localStorage.getItem('curCompanyName')

		// makeName : localStorage.getItem("userName"),
		// makeTime: "",
		// entryName: localStorage.getItem("userName"),
		// entryTime: ""
	};

	$scope.iqcAddCode = iqcAddCode;

	 var time  = new Date();

	//调整时间格式
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		//console.log(year);

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
      iqcAddCode.checkoutTime = time.format();

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
            	iqcAddCode.dictionary.materialName = data.contents;
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
	// $scope.queryMaterialVersionByMaterialNo = function(){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
	// 		// url: "plan/queryMaterialVersionByMaterialNo.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"companySid": localStorage.getItem('cSid'),
	// 			"materialNo": iqcAddCode.Selected.materialName.materialNo 
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
 //                iqcAddCode.dictionary.materialVersion = data.contents;
 //            	iqcAddCode.Selected.materialVersion = {};
 //                iqcAddCode.plan = {};
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
               iqcAddCode.dictionary.vendor = data.contents;
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


/**************************************************
***************************************************
取数
***************************************************
**************************************************/
 function testData() {
 	var jsonStr = $("#Codes").val();
   console.log(jsonStr);
 	//$("#materialVersion").val(jsonStr.)


 }
/**************************************************
***************************************************
***************************************************
**************************************************/


/**************************************************
***************************************************
***************************************************
**************************************************/
	// $scope.queryActivateQCPByMaterial = function(){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/qcp/qcp/queryActivateQCPByMaterial",
	// 		// url: "iqc/iqc_add/queryActivateQCPByMaterial.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"companySid": localStorage.getItem('cSid'),
	// 			"materialNo": iqcAddCode.Selected.materialName.materialNo,
	// 			"materialVersion": iqcAddCode.Selected.materialVersion.materialVersion 
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
 //                iqcAddCode.plan = data.contents;
 //                // console.log(data.contents)
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

	// 查询单个检验记录
	var querySingleIQCRecord = function(input_way_code){
		var deffered = $q.defer();

		var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
		http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord":"querySingleSimpleIQCRecord";
		

		// var checkoutRecordInputWay = (localStorage.getItem("input_way_code") == "CE")? "复杂录入":"简单录入";
	   //var checkoutRecordInputWay = (input_way_code == "CE")? "复杂录入":"简单录入";
   //    alert(checkoutRecordInputWay);
		
		// var http_url = "iqc/iqc_add/" ;
		// http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord.json":"querySingleSimpleIQCRecord.json";
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleIQCRecord",
			url: http_url,
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"checkoutRecordSid": localStorage.getItem('checkoutRecordSid')				
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	deffered.resolve(data.contents);           	
                localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
                localStorage.setItem("DX",JSON.stringify(data.contents.DX));
                localStorage.setItem("DL",JSON.stringify(data.contents.DL));
               //localStorage.setItem("checkoutRecordInputWay",iqcAddCode.checkoutRecordInputWay);
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })

        return deffered.promise;
	}
/******************************
*******************************/
//  var checkoutway = function(checkoutRecordInputWay){

// // if(input_way_code == "CE")
// // 	checkoutRecordInputWay = querySingleComplexIQCRecord;
// // else if(input_way_code == "SE")
// // 	checkoutRecordInputWay = querySingleSimpleIQCRecord;
//  	var checkoutRecordInputWay = (input_way_code == "CE")? "querySingleComplexIQCRecord":"querySingleSimpleIQCRecord";

//  }

/******************************
*******************************/
  
	// 确定添加
	$scope.submitBaseIQCRecord = function(){

    var checkoutRecordInputWay = (localStorage.getItem("input_way_code") == "CE")? "复杂录入":"简单录入";
      //alert(checkoutRecordInputWay);
       //localStorage.setItem("checkoutRecordInputWay",checkoutRecordInputWay);
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qc/iqc/submitBaseIQCRecord",
			// url: "iqc/iqc_add/submitBaseIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutPlanSid": iqcAddCode.plan.checkoutPlanSid,
				"checkoutRecordNo": iqcAddCode.checkoutRecordNo,
				"companySid": localStorage.getItem('cSid'),
			    "batchNo": iqcAddCode.batchNo,
			    "externalReceiptNo": iqcAddCode.externalReceiptNo,			    
			    "entryId": localStorage.getItem('email'),
			    "entryJobNumber": localStorage.getItem('userJobNumber'),
			    "entryName": localStorage.getItem('userName'),
			    "entryTime": parseInt((new Date()).valueOf()/1000),
				"nspectorJobNumber": localStorage.getItem('userJobNumber'),
			    "nspectorName": localStorage.getItem('userName'),
			    //"checkoutTime": parseInt((new Date()).valueOf()/1000),			    
			    "giveCheckoutAmount": iqcAddCode.giveCheckoutAmount,
			    "giveCheckoutTime": ((new Date(iqcAddCode.giveCheckoutTime)).valueOf())/1000,
			    "checkoutTime": ((new Date(iqcAddCode.checkoutTime)).valueOf())/1000,
			    "sampleAmount": iqcAddCode.sampleAmount,
			    "vendorSid": iqcAddCode.Selected.vendor.vendorSid,
			    "vendorNo": iqcAddCode.Selected.vendor.vendorNo,
			    "vendorShortName": iqcAddCode.Selected.vendor.vendorShortName,
			    "checkoutRecordInputWayCode": localStorage.getItem("input_way_code"),
			    "checkoutRecordInputWay":checkoutRecordInputWay

			    //"operateStatusCode":"TJ",
			    //"operateStatus":"提交状态"
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                alert(data.message);
                localStorage.setItem("checkoutRecordSid",data.contents.checkoutRecordSid);
                // localStorage.setItem("activePlan", JSON.stringify(iqcAddCode.plan));
                var input_way_code = localStorage.getItem('input_way_code');
                var promise = querySingleIQCRecord(input_way_code);
                promise.then(function(data){
					console.log("s");
                	if ( localStorage.getItem('input_way_code') === "SE") {
                		$location.path('account_index/iqcSimpleDXAdd');
                	}	
                	else if (localStorage.getItem('input_way_code') === "CE") {
                			$location.path("account_index/iqcComplexDXAdd");
                		 }
                		 else {
                			alert("您还没设置录入方式!");
                		}
                	}
                )
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

	$scope.back = function(){
		var a = confirm("您确定要退出吗？退出将丢失填写数据!")
		if (a) {
			$location.path("account_index/selectmode");
		}
	}


	
}])
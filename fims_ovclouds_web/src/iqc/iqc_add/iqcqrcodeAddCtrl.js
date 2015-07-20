FIMS.controller('iqcqrcodeAddCtrl', ['$scope','$location','$http','$q',function($scope,$location,$http,$q){
	var iqcqrcodeAdd = {
		message: "",		
		checkoutRecordNo: "",
		batchNo: "",
		giveCheckoutTime: "",
		checkoutTime: "",		
		giveCheckoutAmount: "",
		sampleAmount: "",
		qcode: {},
		plan: {}

	};
	$scope.companyShortName = localStorage.getItem("curCompanyName");
	$scope.iqcqrcodeAdd = iqcqrcodeAdd;	
	var el = document.getElementById("Codes");
	el.focus();
	// console.log(iqcqrcodeAdd.jsonStr);
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
    iqcqrcodeAdd.checkoutTime = time.format();
	
    $scope.qrcode = function(){		
		var jsonStr = [];
		jsonStr = $("#Codes").val();
		for (var i = jsonStr.length - 1; i >= 0; i--) {
			if(jsonStr[i]==="}") return codeMessage();
		};
	}
		
	function codeMessage(){
		var a = iqcqrcodeAdd.message.replace(/\“/g,'"');
		a = a.replace(/\”/g,'"');
		a = a.replace(/\：/g,':');
		a = a.replace(/\，/g,',');
		var obj = JSON.parse(a);
		iqcqrcodeAdd.qcode = obj;
		console.log(iqcqrcodeAdd.message);
		console.log(iqcqrcodeAdd.qcode.materialName);
		// console.log($scope.iqcqrcodeAdd.qcode.materialName);
		queryActivateQCPByMaterial();
	}

	function queryActivateQCPByMaterial() {
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryActivateQCPByMaterial",
			// url: "iqc/iqc_add/queryActivateQCPByMaterial.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"materialNo": iqcqrcodeAdd.qcode.materialNo,
				"materialVersion": iqcqrcodeAdd.qcode.materialVersion 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                iqcqrcodeAdd.plan = data.contents;
                // console.log(data.contents)
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
               //localStorage.setItem("checkoutRecordInputWay",iqcqrcodeAdd.checkoutRecordInputWay);
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
				"checkoutPlanSid": iqcqrcodeAdd.plan.checkoutPlanSid,
				"checkoutRecordNo": iqcqrcodeAdd.checkoutRecordNo,
				"companySid": localStorage.getItem('cSid'),
			    "batchNo": iqcqrcodeAdd.batchNo,
			    "externalReceiptNo": iqcqrcodeAdd.qcode.externalReceiptNo,			    
			    "entryId": localStorage.getItem('email'),
			    "entryJobNumber": localStorage.getItem('userJobNumber'),
			    "entryName": localStorage.getItem('userName'),
			    "entryTime": parseInt((new Date()).valueOf()/1000),
				"nspectorJobNumber": localStorage.getItem('userJobNumber'),
			    "nspectorName": localStorage.getItem('userName'),
			    //"checkoutTime": parseInt((new Date()).valueOf()/1000),			    
			    "giveCheckoutAmount": iqcqrcodeAdd.giveCheckoutAmount,
			    "giveCheckoutTime": ((new Date(iqcqrcodeAdd.giveCheckoutTime)).valueOf())/1000,
			    "checkoutTime": ((new Date(iqcqrcodeAdd.checkoutTime)).valueOf())/1000,
			    "sampleAmount": iqcqrcodeAdd.sampleAmount,
			    "vendorSid": iqcqrcodeAdd.qcode.vendorSid,
			    "vendorNo": iqcqrcodeAdd.qcode.vendorNo,
			    "vendorShortName": iqcqrcodeAdd.qcode.vendorShortName,
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
                // localStorage.setItem("activePlan", JSON.stringify(iqcqrcodeAdd.plan));
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

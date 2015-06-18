FIMS.controller('iqcComplexDLAddCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDLAdd = {	
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		companyShortName: localStorage.getItem('curCompanyName'),
		checkoutRecordSid: "",

		// $rootScope.DX: [],
		sampleCheckoutValue: "",
		sampleSel: []
	};//iqcComplexDLAdd

	$scope.iqcComplexDLAdd = iqcComplexDLAdd;

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

	// 各种弹出框
	// var msg="您当前可能有正在填写的数据，刷新将导致数据丢失！";
	// window.onbeforeunload=function(event){
	//       event=event || window.event;
	//       event.returnValue=msg;
	//       return msg;
	// }

	// iqcComplexDLAdd.makeTime = time.format();
	// iqcComplexDLAdd.entryTime = time.format();

	// 获取基本信息部分
	var queryCheckoutRecord = function(){
		var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
		iqcComplexDLAdd.materialNo = checkoutRecord.materialNo;
		iqcComplexDLAdd.materialShortName = checkoutRecord.materialShortName;
		iqcComplexDLAdd.materialVersion = checkoutRecord.materialVersion;
		iqcComplexDLAdd.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcComplexDLAdd.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
		iqcComplexDLAdd.sampleAmount = checkoutRecord.sampleAmount;

		iqcComplexDLAdd.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

		// 绑定定量部分
		$rootScope.DL = JSON.parse(localStorage.getItem("DL"));
		console.log($rootScope.DL);
		for (var i=0,len=$rootScope.DL.length;i<len;i++) {
			for (var j=0,lenj=$rootScope.DL[i].sample.length;j<lenj;j++) {
				var item = $rootScope.DL[i].sample[j];
				item.sampleCheckoutValue = iqcComplexDLAdd.sampleCheckoutValue;
			}
		}
	}
	queryCheckoutRecord();



	$scope.updateComplexIQCRecord = function() {
		// console.log($rootScope.DX);
		// var keyDX

		$http({
			method: "POST",
			 url: config.HOST + "/api/2.0/bp/qc/iqc/updateComplexIQCRecord",
			//url: "iqc/iqc_add/updateComplexIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				// "companySid": localStorage.getItem('cSid'),
				"checkoutRecordSid": iqcComplexDLAdd.checkoutRecordSid,
				"DX": $rootScope.DX,
				"DL": $rootScope.DL 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	localStorage.setItem("DL",JSON.stringify($rootScope.DL));           	
                alert(data.message);
                // $location.path("account_index/iqcRecord");
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
	//提交复杂录入
	$scope.submitComplexIQCRecord = function() {
		// console.log($rootScope.DX);
		// var keyDX

		$http({
			method: "POST",
			 url: config.HOST + "/api/2.0/bp/qc/iqc/submitComplexIQCRecord",
			//url: "iqc/iqc_add/submitComplexIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				// "companySid": localStorage.getItem('cSid'),
				"checkoutRecordSid": iqcComplexDLAdd.checkoutRecordSid,
				"DX": $rootScope.DX,
				"DL": $rootScope.DL 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {            	         	
                alert(data.message);
                $location.path("account_index/iqcRecord");
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
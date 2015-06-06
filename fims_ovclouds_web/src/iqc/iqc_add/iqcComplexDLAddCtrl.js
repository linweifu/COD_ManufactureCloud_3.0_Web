<<<<<<< HEAD
FIMS.controller('iqcComplexDXAddCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDXAdd = {	
=======
FIMS.controller('iqcComplexDLAddCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDLAdd = {	
>>>>>>> 650cbca210066977b5720699a8737587eb5f3b4d
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		companyShortName: localStorage.getItem('curCompanyName'),
<<<<<<< HEAD

		checkoutRecordSid: "",

		// $rootScope.DX: [],
		itemDic: [
			{
				"value": "",
				"sampleCheckoutValue": "NULL"
			},
			{
				"value": "是",
				"sampleCheckoutValue": "是"
			},
			{
				// "sampleNo": "",
				"value": "否",
				"sampleCheckoutValue": "否"
			}
		],
		sampleSel: []
	};

	$scope.iqcComplexDXAdd = iqcComplexDXAdd;
=======
		checkoutRecordSid: "",

		// $rootScope.DX: [],
		
		sampleSel: []
	};//iqcComplexDLAdd

	$scope.iqcComplexDLAdd = iqcComplexDLAdd;
>>>>>>> 650cbca210066977b5720699a8737587eb5f3b4d

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

<<<<<<< HEAD
	// iqcComplexDXAdd.makeTime = time.format();
	// iqcComplexDXAdd.entryTime = time.format();
=======
	// iqcComplexDLAdd.makeTime = time.format();
	// iqcComplexDLAdd.entryTime = time.format();
>>>>>>> 650cbca210066977b5720699a8737587eb5f3b4d

	// 获取基本信息部分
	var queryCheckoutRecord = function(){
		var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
<<<<<<< HEAD
		iqcComplexDXAdd.materialNo = checkoutRecord.materialNo;
		iqcComplexDXAdd.materialShortName = checkoutRecord.materialShortName;
		iqcComplexDXAdd.materialVersion = checkoutRecord.materialVersion;
		iqcComplexDXAdd.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcComplexDXAdd.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
		iqcComplexDXAdd.sampleAmount = checkoutRecord.sampleAmount;

		iqcComplexDXAdd.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

		// 绑定定性部分
		$rootScope.DX = JSON.parse(localStorage.getItem("DX"));
		console.log($rootScope.DX);

		//下拉数据绑定
=======
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
	}//下拉数据绑定
>>>>>>> 650cbca210066977b5720699a8737587eb5f3b4d
		// $rootScope.DX = $rootScope.DX.sample;
		// console.log($rootScope.DX);
		// for (var i=0,len=$rootScope.DX.length;i<len;i++){
		// 	$rootScope.DX.push($rootScope.DX[i].sample);
<<<<<<< HEAD
		// }
		// console.log($rootScope.DX);

		for (var i=0,len=$rootScope.DX.length;i<len;i++) {
			for (var j=0,lenj=$rootScope.DX[i].sample.length;j<lenj;j++) {
				var item = $rootScope.DX[i].sample[j];
				if (item.sampleCheckoutValue=="是") {
					$rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXAdd.itemDic[1].sampleCheckoutValue;
				}else if (item.sampleCheckoutValue=="否"){
					$rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXAdd.itemDic[2].sampleCheckoutValue;
				}else {
					$rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXAdd.itemDic[0].sampleCheckoutValue;
				}
			}
		}
	}
	queryCheckoutRecord();

	$scope.next = function() {
		localStorage.setItem("DX",JSON.stringify($rootScope.DX));
		$location.path("account_index/iqcComplexDLAdd");
=======
		// 
	queryCheckoutRecord();

	$scope.addComplexDL = function() {
		localStorage.setItem("DL",JSON.stringify($rootScope.DL));
		alert("保存成功");
>>>>>>> 650cbca210066977b5720699a8737587eb5f3b4d
	}

	$scope.updateComplexIQCRecord = function() {
		// console.log($rootScope.DX);
		// var keyDX

		$http({
			method: "POST",
<<<<<<< HEAD
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/updateComplexIQCRecord",
			url: "iqc/iqc_add/updateComplexIQCRecord.json",
=======
			 url: config.HOST + "/api/2.0/bp/qcp/qcp/updateComplexIQCRecord",
			//url: "iqc/iqc_add/updateComplexIQCRecord.json",
>>>>>>> 650cbca210066977b5720699a8737587eb5f3b4d
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				// "companySid": localStorage.getItem('cSid'),
<<<<<<< HEAD
				"checkoutRecordSid": iqcComplexDXAdd.checkoutRecordSid,
=======
				"checkoutRecordSid": iqcComplexDLAdd.checkoutRecordSid,
>>>>>>> 650cbca210066977b5720699a8737587eb5f3b4d
				"DX": $rootScope.DX,
				"DL": $rootScope.DL || JSON.parse(localStorage.getItem("DL"))
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
<<<<<<< HEAD
            	localStorage.setItem("DX",JSON.stringify($rootScope.DX));           	
=======
            	localStorage.setItem("DL",JSON.stringify($rootScope.DL));           	
>>>>>>> 650cbca210066977b5720699a8737587eb5f3b4d
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
	
}])
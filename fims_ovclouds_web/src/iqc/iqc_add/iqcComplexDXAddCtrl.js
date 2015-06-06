FIMS.controller('iqcComplexDXAddCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDXAdd = {	
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		companyShortName: localStorage.getItem('curCompanyName'),

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

	// iqcComplexDXAdd.makeTime = time.format();
	// iqcComplexDXAdd.entryTime = time.format();

	// 获取基本信息部分
	var queryCheckoutRecord = function(){
		var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
		iqcComplexDXAdd.materialNo = checkoutRecord.materialNo;
		// console.log(checkoutRecord);
		iqcComplexDXAdd.materialShortName = checkoutRecord.materialShortName;
		iqcComplexDXAdd.materialVersion = checkoutRecord.materialVersion;
		iqcComplexDXAdd.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcComplexDXAdd.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
		iqcComplexDXAdd.sampleAmount = checkoutRecord.sampleAmount;

		iqcComplexDXAdd.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

		// 绑定定性部分
		$rootScope.DX = JSON.parse(localStorage.getItem("DX"));
<<<<<<< HEAD
		//console.log($rootScope.DX);
=======
		// console.log($rootScope.DX);
>>>>>>> 650cbca210066977b5720699a8737587eb5f3b4d

		//下拉数据绑定
		// $rootScope.DX = $rootScope.DX.sample;
		// console.log($rootScope.DX);
		// for (var i=0,len=$rootScope.DX.length;i<len;i++){
		// 	$rootScope.DX.push($rootScope.DX[i].sample);
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
	}

	$scope.updateComplexIQCRecord = function() {
		// console.log($rootScope.DX);
		// var keyDX

		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/updateComplexIQCRecord",
			url: "iqc/iqc_add/updateComplexIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				// "companySid": localStorage.getItem('cSid'),
				"checkoutRecordSid": iqcComplexDXAdd.checkoutRecordSid,
				"DX": $rootScope.DX,
				"DL": $rootScope.DL || JSON.parse(localStorage.getItem("DL"))
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	localStorage.setItem("DX",JSON.stringify($rootScope.DX));           	
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
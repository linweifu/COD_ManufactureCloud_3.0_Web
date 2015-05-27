FIMS.controller('iqcComplexDXAddCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDXAdd = {	
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		companyShortName: localStorage.getItem('curCompanyName'),

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
		iqcComplexDXAdd.materialShortName = checkoutRecord.materialShortName;
		iqcComplexDXAdd.materialVersion = checkoutRecord.materialVersion;
		iqcComplexDXAdd.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcComplexDXAdd.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
		iqcComplexDXAdd.sampleAmount = checkoutRecord.sampleAmount;

		// 绑定定性部分
		$rootScope.DX = JSON.parse(localStorage.getItem("DX"));

		//下拉数据绑定
		// iqcComplexDXAdd.sampleSel = $rootScope.DX.sample;
		// console.log(iqcComplexDXAdd.sampleSel);
		for (var i=0,len=$rootScope.DX.length;i<len;i++){
			iqcComplexDXAdd.sampleSel.push($rootScope.DX[i].sample);
		}

		for (var i=0,len=iqcComplexDXAdd.sampleSel.length;i<len;i++) {
			for (var j=0,lenj=iqcComplexDXAdd.sampleSel[i];j<len;j++) {
				var item = iqcComplexDXAdd.sampleSel[i][j];
				if (item.sampleCheckoutValue=="NULL") {
					iqcComplexDXAdd.sampleSel[i][j] = iqcComplexDXAdd.itemDic[0];
				}if (item.sampleCheckoutValue=="是") {
					iqcComplexDXAdd.sampleSel[i][j] = iqcComplexDXAdd.itemDic[1];
				}else if (item.sampleCheckoutValue=="否"){
					iqcComplexDXAdd.sampleSel[i][j] = iqcComplexDXAdd.itemDic[2];
				}
			}
		}
	}
	queryCheckoutRecord();

	$scope.updateComplexIQCRecord = function() {
		for (var i=0,len=$rootScope.DX.length;i<len;i++) {
			for (var j=0,lenj=$rootScope.DX[i].sample.length;j<lenj;j++) {
				// console.log(($rootScope.DX[i].sample)[j].sampleNo);
				($rootScope.DX[i].sample)[j].sampleNo = i+1;
				console.log($rootScope.DX[i].sample[j].sampleNo);
			}
		}
		console.log($rootScope.DX);

		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/updateComplexIQCRecord",
			url: "iqc/iqc_add/updateComplexIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"checkoutRecord": localStorage.getItem("checkoutRecord"),
				"DX": $rootScope.DX,
				"DL": $rootScope.DL || localStorage.getItem("DL")
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
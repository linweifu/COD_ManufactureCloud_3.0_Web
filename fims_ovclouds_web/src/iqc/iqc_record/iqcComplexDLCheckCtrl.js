FIMS.controller('iqcComplexDLCheckCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDLCheck = {	
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		companyShortName: localStorage.getItem('curCompanyName'),

		checkoutRecordSid: "",

		// $rootScope.DL: [],
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

	$scope.iqcComplexDLCheck = iqcComplexDLCheck;

	
/***********************************************************************
************************************************************************
 // 获取基本信息部分
************************************************************************
***********************************************************************/

	var queryCheckoutRecord = function(){
		var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
		iqcComplexDLCheck.materialNo = checkoutRecord.materialNo;
		iqcComplexDLCheck.materialShortName = checkoutRecord.materialShortName;
		iqcComplexDLCheck.materialVersion = checkoutRecord.materialVersion;
		iqcComplexDLCheck.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcComplexDLCheck.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
		iqcComplexDLCheck.sampleAmount = checkoutRecord.sampleAmount;

		iqcComplexDLCheck.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

		// 绑定定性部分
		$rootScope.DL = JSON.parse(localStorage.getItem("DL"));
		//console.log($rootScope.DL);

		//下拉数据绑定
		// $rootScope.DL = $rootScope.DL.sample;
		// console.log($rootScope.DL);
		// for (var i=0,len=$rootScope.DL.length;i<len;i++){
		// 	$rootScope.DL.push($rootScope.DL[i].sample);
		// }
		// console.log($rootScope.DL);

		for (var i=0,len=$rootScope.DL.length;i<len;i++) {
			for (var j=0,lenj=$rootScope.DL[i].sample.length;j<lenj;j++) {
				var item = $rootScope.DL[i].sample[j];
				if (item.sampleCheckoutValue=="是") {
					$rootScope.DL[i].sample[j].sampleCheckoutValue = iqcComplexDLCheck.itemDic[1].sampleCheckoutValue;
				}else if (item.sampleCheckoutValue=="否"){
					$rootScope.DL[i].sample[j].sampleCheckoutValue = iqcComplexDLCheck.itemDic[2].sampleCheckoutValue;
				}else {
					$rootScope.DL[i].sample[j].sampleCheckoutValue = iqcComplexDLCheck.itemDic[0].sampleCheckoutValue;
				}
			}
		}
	}
	queryCheckoutRecord();
/***********************************************************************
************************************************************************
 // 返回首页
************************************************************************
***********************************************************************/
	$scope.next = function() {
		localStorage.setItem("DL",JSON.stringify($rootScope.DL));
		$location.path("account_index/iqcRecord");
	}

	
	
}])
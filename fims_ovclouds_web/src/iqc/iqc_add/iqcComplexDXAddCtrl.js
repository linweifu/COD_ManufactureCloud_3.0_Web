FIMS.controller('iqcComplexDXAddCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var iqcComplexDXAdd = {		
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",

		companyShortName :localStorage.getItem('curCompanyName')
		// makeName : localStorage.getItem("userName"),
		// makeTime: "",
		// entryName: localStorage.getItem("userName"),
		// entryTime: ""
	};

	$scope.iqcComplexDXAdd = iqcComplexDXAdd;

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

	// 各种弹出框
	var msg="您当前可能有正在填写的数据，刷新将导致数据丢失！";
	window.onbeforeunload=function(event){
	      event=event || window.event;
	      event.returnValue=msg;
	      return msg;
	}

	// iqcComplexDXAdd.makeTime = time.format();
	// iqcComplexDXAdd.entryTime = time.format();

	// 获取基本信息部分
	var queryCheckoutRecord = function(){
		var singleIQC = JSON.parse(localStorage.getItem("SingleIQCRecord"));
		iqcComplexDXAdd.materialNo = singleIQC.checkoutRecord.materialNo;
		iqcComplexDXAdd.materialShortName = singleIQC.checkoutRecord.materialShortName;
		iqcComplexDXAdd.materialVersion = singleIQC.checkoutRecord.materialVersion;
		iqcComplexDXAdd.checkoutPlanNo = singleIQC.checkoutRecord.checkoutPlanNo;
		iqcComplexDXAdd.checkoutPlanVersion = singleIQC.checkoutRecord.checkoutPlanVersion;
		iqcComplexDXAdd.sampleAmount = singleIQC.checkoutRecord.sampleAmount;
		
		console.log(iqcComplexDXAdd);
	}

	queryCheckoutRecord();
	
	// 下一步按钮
	// $scope.next = function() {
	// 	if (localStorage.getItem('input_way_code') == "SE") {
 //        	$location.path('account_index/iqcSimpleDXAdd');
 //        }else if (localStorage.getItem('input_way_code') == "CE") {
 //        	$location.path("account_index/iqcComplexDXAdd");
 //        }else {
 //        	alert("您还没设置录入方式!");
 //        }
	// }	
}])
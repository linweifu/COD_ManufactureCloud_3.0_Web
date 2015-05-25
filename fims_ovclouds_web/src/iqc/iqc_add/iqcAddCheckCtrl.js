FIMS.controller('iqcAddCheckCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var iqcAddCheck = {		
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",

		checkoutRecordId: "",
		batchNo: "",
		giveCheckoutTime: "",
		vendor: "",
		giveCheckoutAmount: "",
		sampleAmount: "",

		companyShortName :localStorage.getItem('curCompanyName')
		// makeName : localStorage.getItem("userName"),
		// makeTime: "",
		// entryName: localStorage.getItem("userName"),
		// entryTime: ""
	};

	$scope.iqcAddCheck = iqcAddCheck;

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

	$scope.back = function(){
		var a = confirm("您确定要退出吗？退出将可能丢失填写数据!")
		if (a) {
			$location.path("account_index/iqcIndex");
		}
	}

	// iqcAddCheck.makeTime = time.format();
	// iqcAddCheck.entryTime = time.format();

	// 获取基本信息部分
	var querySingleIQCRecord = function(){
		var singleIQC = JSON.parse(localStorage.getItem("SingleIQCRecord"));
		iqcAddCheck.materialNo = singleIQC.checkoutRecord.materialNo;
		iqcAddCheck.materialShortName = singleIQC.checkoutRecord.materialShortName;
		iqcAddCheck.materialVersion = singleIQC.checkoutRecord.materialVersion;
		iqcAddCheck.checkoutPlanNo = singleIQC.checkoutRecord.checkoutPlanNo;
		iqcAddCheck.checkoutPlanVersion = singleIQC.checkoutRecord.checkoutPlanVersion;

		iqcAddCheck.checkoutRecordId = singleIQC.checkoutRecord.checkoutRecordId;
		iqcAddCheck.batchNo = singleIQC.checkoutRecord.batchNo;
		iqcAddCheck.materialShortName = singleIQC.checkoutRecord.materialShortName;
		iqcAddCheck.giveCheckoutTime = (new Date(singleIQC.checkoutRecord.giveCheckoutTime*1000)).format();
		iqcAddCheck.vendor = singleIQC.checkoutRecord.vendorShortName;
		iqcAddCheck.giveCheckoutAmount = singleIQC.checkoutRecord.giveCheckoutAmount;
		iqcAddCheck.sampleAmount = singleIQC.checkoutRecord.sampleAmount;
	}
	querySingleIQCRecord();
	
	// 下一步按钮
	$scope.next = function() {
		if (localStorage.getItem('input_way_code') == "SE") {
        	$location.path('account_index/iqcSimpleDXAdd');
        }else if (localStorage.getItem('input_way_code') == "CE") {
        	$location.path("account_index/iqcComplexDXAdd");
        }else {
        	alert("您还没设置录入方式!");
        }
	}

	// 供应商字典
    // var queryVendorInfo = function(){
    //     $http({
    //         method: "POST",
    //         url: config.HOST + "/api/2.0/bp/vendor/vendor/queryVendorInfo",
    //         // url: "manage/vendor/vendor/queryVendorInfo.json",
    //         header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
    //         data: {
    //             "sid": localStorage.getItem('sid'),
    //             "companySid": localStorage.getItem('cSid')
    //         }
    //     })
    //     .success(function(data){
    //         if (data.code == 'N01') {
    //            iqcAddCheck.dictionary.vendor = data.contents;
    //         }
    //         else if(data.code=="E00"){
    //             alert(data.message+",请重新登陆");
    //             localStorage.clear();
    //             $location.path('login').replace();
    //         }else {
    //             alert(data.message);
    //         }  
    //     })
    // }
    // queryVendorInfo();

	
}])
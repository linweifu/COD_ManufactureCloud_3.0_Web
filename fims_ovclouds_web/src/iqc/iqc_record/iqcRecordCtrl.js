FIMS.controller('iqcRecordCtrl', ['$scope', '$location', '$http', function($scope,$location,$http){

	$scope.companyShortName = localStorage.getItem('curCompanyName');
	$scope.iqcRecord = [];

	

	//判断是查看还是修订状态

	 $scope.querySingleIQCRecordInfo =function(recordSid,operateStatusCode){
	 	if (operateStatusCode=="TJ") {
            

	 		localStorage.setItem("checkoutRecordSid",recordSid);
	 		
	 		$location.path("account_index/iqcRecordCheck");
	 	}else if(operateStatusCode=="BC") {
	 		localStorage.setItem("checkoutRecordSid",recordSid);
	 	
	 		$location.path("account_index/iqcRecordRevise");
	 	}else {
	 		alert("不是“查看/修订”状态");
	 	}
	 }


	// 上一页
	$scope.previous = function(){
		if (iqcRecord.page==1) {
			alert("当前是第1页...");
		} 
		
	}

	//时间戳格式转化
	Date.prototype.format = function() {
   		var year = this.getFullYear().toString();
   		var month = (this.getMonth()+1).toString();
   		var day = this.getDate().toString();
   		// console.log(year);

		if (month<10) {
			month = "0" + month;
		}

		if (day<10) {
			day = "0" + day;
		}

	 	return (year + "-" + month + "-" +day );
	}
/***********************************************************************
************************************************************************
 //queryIQCRecords根据检验计划类型获取检验计划
************************************************************************
***********************************************************************/
	
	$scope.queryIQCRecord = function() {
		$http({
			method: "POST",

			//url: config.HOST + "/api/2.0/bp/qc/iqc/queryIQCRecords",
			//url: "iqc/iqc_record/queryIQCRecord.json",
			url: config.HOST + "/api/2.0/bp/qc/iqc/queryIQCRecords",
			// url: "iqc/iqc_record/queryIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"page": localStorage.getItem('page')
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	$scope.iqcRecord = data.contents;
               // console.log($scope.iqcRecord);
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

	//queryIQCRecord();
	$scope.queryIQCRecord();
	





	
}])
FIMS.controller('iqcComplexDLReviseCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
	var iqcComplexDLRevise = {	
		materialNo: "",
		materialShortName: "",
		materialVersion: "",
		checkoutPlanNo: "",
		checkoutPlanVersion: "",
		sampleAmount: "",
		companyShortName: localStorage.getItem('curCompanyName'),

		checkoutRecordSid: "",

		
         
        // sampleCheckoutValue: localStorage.getItem('DL'),
		
		 //DL: localStorage.getItem('DL'),
		  // DL:{

		  // 	sampleCheckoutValue:[]
		  // }
		   
	};
    
	$scope.iqcComplexDLRevise = iqcComplexDLRevise;
    //DL: localStorage.getItem('DL');
/***********************************************************************
***********************************************************************/
$scope.format = function($index){
if($index<10)
{
  $index ="00"+$index;
}
else if(10<$index<100)
{
  $index = "0"+$index;
}

   return $index;
}

/***********************************************************************
************************************************************************
 // 获取基本信息部分
************************************************************************
***********************************************************************/

	var queryCheckoutRecord = function(){
		var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
		iqcComplexDLRevise.materialNo = checkoutRecord.materialNo;
		iqcComplexDLRevise.materialShortName = checkoutRecord.materialShortName;
		iqcComplexDLRevise.materialVersion = checkoutRecord.materialVersion;
		iqcComplexDLRevise.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
		iqcComplexDLRevise.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
		iqcComplexDLRevise.sampleAmount = checkoutRecord.sampleAmount;

		iqcComplexDLRevise.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

		// var a = JSON.parse(localStorage.getItem("DL"));
		// iqcComplexDLRevise.sampleCheckoutValue = a.sampleCheckoutValue;

		// 绑定定量部分
		 $rootScope.DL = JSON.parse(localStorage.getItem("DL"));
		// sampleCheckoutValue

		// iqcComplexDLRevise.sampleSel = $rootScope.DL;
		//console.log(DL);

		// for (var i=0,len=$rootScope.DL.length;i<len;i++) {
		// 	for (var j=0,lenj=$rootScope.DL[i].sample.length;j<lenj;j++) {
		// 		//var item = $rootScope.DL[i].sample[j];
		// 		$rootScope.DL[i].sample[j].sampleCheckoutValue = iqcComplexDLRevise.DL.sampleCheckoutValue;
		// 	}
		// }

		
	}
	queryCheckoutRecord();
/***********************************************************************
************************************************************************
 // 保存
************************************************************************
***********************************************************************/

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
				"checkoutRecordSid": localStorage.getItem('checkoutRecordSid'),
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


/***********************************************************************
************************************************************************
 // 提交
************************************************************************
***********************************************************************/
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
				"checkoutRecordSid": localStorage.getItem('checkoutRecordSid'),
				"DX": $rootScope.DX,
				"DL": $rootScope.DL 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {            	         	
                alert("你确定要提交吗？提交后数据就不能更改！");
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
/***********************************************************************
************************************************************************
 // 返回
************************************************************************
***********************************************************************/
	$scope.next = function() {
		localStorage.setItem("DL",JSON.stringify($rootScope.DL));
		$location.path("account_index/iqcRecord");
	}

	
	
}])
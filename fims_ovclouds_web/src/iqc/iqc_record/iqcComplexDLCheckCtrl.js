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

		
         
        // sampleCheckoutValue: localStorage.getItem('DL'),
		
		 //DL: localStorage.getItem('DL'),
		  // DL:{

		  // 	sampleCheckoutValue:[]
		  // }
		   
	};
    
	$scope.iqcComplexDLCheck = iqcComplexDLCheck;
	//String.format("%03d",$index);
	//$scope.$index:=format('%0.3d',[$index]); 
    //DL: localStorage.getItem('DL');
//console.log(iqcComplexDLCheck.DL.sampleCheckoutValue);
 
  // var checkdl =function(){
  // 	var DL=localStorage.getItem("DL");

  // }

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

		// var a = JSON.parse(localStorage.getItem("DL"));
		// iqcComplexDLCheck.sampleCheckoutValue = a.sampleCheckoutValue;

		// 绑定定量部分
		 $rootScope.DL = JSON.parse(localStorage.getItem("DL"));
		// sampleCheckoutValue

		// iqcComplexDLCheck.sampleSel = $rootScope.DL;
		//console.log(DL);

		// for (var i=0,len=$rootScope.DL.length;i<len;i++) {
		// 	for (var j=0,lenj=$rootScope.DL[i].sample.length;j<lenj;j++) {
		// 		//var item = $rootScope.DL[i].sample[j];
		// 		$rootScope.DL[i].sample[j].sampleCheckoutValue = iqcComplexDLCheck.DL.sampleCheckoutValue;
		// 	}
		// }

		
	}
	queryCheckoutRecord();
/***********************************************************************
************************************************************************
 //返回字符串指定位数 不足补齐0
************************************************************************
***********************************************************************/
// function FilledZeroStr(st, num) {             
// var retSt = 000;          
//    // by script 
//            
//  if (st.indexOf(".") == st.lastIndexOf(".")) { 
//                 var stNum = st.indexOf(".") > -1 ? st.split(".")[1].length : 0;               
//                 for (var i = 0; i < num - stNum; i++) 
//                 {     
// 	                retSt += "0";   
//                 }        
//           } 
//             return retSt;  
//        }
// $index:=format('%0.3d',[$index]);  


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
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
	};
    
	$scope.iqcComplexDLCheck = iqcComplexDLCheck;
/***********************************************************************
************************************************************************/

// $scope.format = function($index){
// if($index<10)
// {
// 	$index ="00"+$index;
// }
// else if(10<$index<100)
// {
// 	$index = "0"+$index;
// }

//    return $index;
// }
$scope.Ptitle=function (num, length) { 
 return (Array(length).join('0') + num).slice(-length);
  }

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


		 $rootScope.DL = JSON.parse(localStorage.getItem("DL"));
	

		
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
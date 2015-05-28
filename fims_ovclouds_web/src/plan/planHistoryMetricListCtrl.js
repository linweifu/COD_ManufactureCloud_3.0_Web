FIMS.controller('planHistoryMetricListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planHistoryMetricList = {
			
		

			DXCheckoutMetricList:[],

			DLCheckoutMetricList:[],


        	
	};
 
$scope.planHistoryMetricListBack = function() {

	history.go(-1);
}

//将定性和定量分开保存
	var parseQueryData = function(array){

		var dx =[];
		var dl =[];

		// 肯定又数据的情况；
		for (var i=0;i<array.length;i++){
			checkoutMetrics = array[i];
			if (checkoutMetrics.checkoutMetricTypeCode ==="DX")
				dx.push(checkoutMetrics);
			else if (checkoutMetrics.checkoutMetricTypeCode ==="DL")
				dl.push(checkoutMetrics);
			else
				alert("检验指标类型既不非定性，也非定量")
		}

		planHistoryMetricList.DXCheckoutMetricList = dx;
		planHistoryMetricList.DLCheckoutMetricList = dl;
	}




/*
***************************************************
***************************************************
queryQCPItems获取检验项目
***************************************************
***************************************************
*/

planHistoryMetricList.queryQCPItems = function(){

		// // 准备参数
		// var assemblyObj = function(){
		// 	var o = {};

		// 	o.sid		                = localStorage.getItem('sid');

  //           o.checkoutPlanSid		    = localStorage.getItem('checkoutPlanSid');

  //           // localStorage.removeItem("checkoutPlanSid");

  //           // console.log(localStorage.getItem('checkoutPlanSid'));

		// 	return o;
		// }

		// var entry = assemblyObj();
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPItems",
			// url: "plan/queryQCPItems.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					 "sid": localStorage.getItem('sid'),
                     "checkoutPlanSid": localStorage.getItem('checkoutPlanSid')
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	//alert("检验计划信息更新成功");
            	//$location.path("account_index/chooseModule");
            	// console.log(data.contents);
            	//绑定数据
            	parseQueryData(data.contents);

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('queryQCPItems'+data.message);
        });
	}

	
  




	$scope.planHistoryMetricList = planHistoryMetricList;

	planHistoryMetricList.queryQCPItems();


}])


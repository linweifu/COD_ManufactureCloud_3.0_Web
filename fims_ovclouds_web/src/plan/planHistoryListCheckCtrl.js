FIMS.controller('planHistoryListCheckCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var planHistoryListCheck = {
		
	};

		//调整时间格式
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

	// 自执行函数，删除相关本地存储
	function init(){
		localStorage.removeItem('materialSid');
	}

	init();

	

	// $scope.makeTime = time.format();
	// $scope.entryTime = time.format();

	$scope.planHistoryListCheckBack = function(){
		$location.path("account_index/planHistoryList");
		//history.go(account_index/planHistoryList);

	}

	$scope.querySingleQCP = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleQCP",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutPlanSid": localStorage.getItem('checkoutHistoryPlanSid'),
				"companySid": localStorage.getItem('cSid')
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	$scope.planHistoryListCheck = data.contents;
            	var entrytime = new Date($scope.planHistoryListCheck.entryTime*1000),
            		maketime = new Date($scope.planHistoryListCheck.makeTime*1000);		
            	// console.log(entrytime);
              	$scope.planHistoryListCheck.entryTime = entrytime.format();
              	$scope.planHistoryListCheck.makeTime = maketime.format();
              	localStorage.setItem("materialSid",$scope.planHistoryListCheck.materialSid);
              	// console.log($scope.planCheck.entryTime)

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('querySingleQCP'+data.message);
        });
	}

	$scope.querySingleQCP();

   // $scope.planHistoryListCheck = planHistoryListCheck;

	var time  = new Date();
	
	
}])
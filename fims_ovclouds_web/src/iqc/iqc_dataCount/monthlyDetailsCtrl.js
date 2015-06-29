FIMS.controller('monthlyDetailsCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var monthlyDetails = {
			checkoutTime: "",
			dateSelected: []
		}

		$scope.companyShortName = localStorage.getItem("curCompanyName");
		$scope.monthlyDetails = monthlyDetails;

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
		
		$scope.monthlyDetailsBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}

		$scope.A103MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103MonthlyReport",
				//url: "iqc/iqc_dataCount/A103MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {					
					"checkoutTime": ((new Date(monthlyDetails.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')					
				}
			})
			.success(function(data){				
	            if(data.code == "N01"&&data.message !== "获取数据为空") {
	            	monthlyDetails.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyDetails.dateSelected).length;i<len;i++){
	                (monthlyDetails.dateSelected)[i].checkoutTime = (new Date((monthlyDetails.dateSelected)[i].checkoutTime*1000)).format(); 
	                     	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }else if (data.message === "获取数据为空") {
	            	alert("暂无数据");
	            }else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}
}])
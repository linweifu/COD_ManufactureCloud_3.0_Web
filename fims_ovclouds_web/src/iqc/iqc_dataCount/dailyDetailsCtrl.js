FIMS.controller('dailyDetailsCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var dailyDetails = {
			checkoutTime: "",
			dateSelected: []
		};
		$scope.companyShortName = localStorage.getItem("curCompanyName");	
		$scope.dailyDetails = dailyDetails;

		//调整时间格式
		var time  = new Date();
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
		dailyDetails.checkoutTime = time.format();
		// iqcAddCheck.entryTime = time.format();

		$scope.dailyDetailsBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}

		$scope.getDailyDetails = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A102_0DailyReport",
				// url: "iqc/iqc_dataCount/bak/A102_0DailyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime":  ((new Date(dailyDetails.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
					
				}
			})
			.success(function(data){				
	            if(data.code == "N01"&&data.contents.length !== 0) {
	    // 			
	            	dailyDetails.dateSelected = data.contents;
	            	// dailyDetails.defectives = data.contents.defectives;
	           		for(var i=0,len=(dailyDetails.dateSelected).length;i<len;i++){
	                (dailyDetails.dateSelected)[i].checkoutTime = (new Date((dailyDetails.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            else if (data.contents.length === 0) {
	            	alert("暂无数据");}
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}
}])
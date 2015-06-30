FIMS.controller('monthlyStatisticsCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var monthlyStatistics = {
			checkoutTime: "",
			dateSelected: []
		}

		$scope.companyShortName = localStorage.getItem("curCompanyName");
		$scope.monthlyStatistics = monthlyStatistics;
		
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
		
		$scope.monthlyStatisticsBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}

		$scope.A103_0MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103_0MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103_0MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if(data.code == "N01") {
	            	// &&data.contents.length !== 0
	            	monthlyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyStatistics.dateSelected).length;i<len;i++){
	                (monthlyStatistics.dateSelected)[i].checkoutTime = (new Date((monthlyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");
	            // }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A103_1MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103_1MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103_0MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if(data.code == "N01") {
	            	// &&data.contents.length !== 0
	            	monthlyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyStatistics.dateSelected).length;i<len;i++){
	                (monthlyStatistics.dateSelected)[i].checkoutTime = (new Date((monthlyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");
	            // }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A103_1_1MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103_1_1MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103_0MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if(data.code == "N01") {
	            	// &&data.contents.length !== 0
	            	monthlyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyStatistics.dateSelected).length;i<len;i++){
	                (monthlyStatistics.dateSelected)[i].checkoutTime = (new Date((monthlyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");
	            // }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A103_2MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103_2MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103_0MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if(data.code == "N01") {
	            	// &&data.contents.length !== 0
	            	monthlyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyStatistics.dateSelected).length;i<len;i++){
	                (monthlyStatistics.dateSelected)[i].checkoutTime = (new Date((monthlyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");
	            // }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A103_3MonthlyReport = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A103_3MonthlyReport",
				//url: "iqc/iqc_dataCount/bak/A103_0MonthlyReport.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlyStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if(data.code == "N01") {
	            	// &&data.contents.length !== 0
	            	monthlyStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlyStatistics.dateSelected).length;i<len;i++){
	                (monthlyStatistics.dateSelected)[i].checkoutTime = (new Date((monthlyStatistics.dateSelected)[i].checkoutTime*1000)).format();      	
	                	// console.log((planlist.QCPSelected)[i])
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");
	            // }
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
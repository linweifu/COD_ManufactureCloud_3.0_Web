FIMS.controller('monthlySumStatisticsCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var monthlySumStatistics = {
			checkoutTime: "",
			dateSelected: []
		};
		$scope.companyShortName = localStorage.getItem("curCompanyName");	
		$scope.monthlySumStatistics = monthlySumStatistics;

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

		function echarts(op,div){
			// console.log(op);
			// console.log(div);
			require.config({
	            paths: {
		            echarts: './deps/echarts'
		        }
	        });
			require(
	            [
	                'echarts',
	                'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
	                'echarts/chart/bar'
	            ],
			function (ec) {
				  	if (document.getElementById(div)){
	                	var myChart = ec.init(document.getElementById(div));
	                // console.log(myChart);
		                var option = op;
		                myChart.setOption(option);
	            	}else {
	            		console.log("DOM未加载");
	            		return;
	            	}
	            }
	        );

		}


		// monthlySumStatistics.checkoutTime = time.format();
		// iqcAddCheck.entryTime = time.format();

		$scope.monthlySumStatisticsBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}

		$scope.A104Report = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/evaluate/report/A104Report",
				// url: "iqc/iqc_dataCount/A104Report.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"checkoutTime": ((new Date(monthlySumStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
					
				}
			})
			.success(function(data){				
	            if(data.code == "N01") {
	            	monthlySumStatistics.dateSelected = data.contents;
	           		for(var i=0,len=(monthlySumStatistics.dateSelected).length;i<len;i++){
	                	(monthlySumStatistics.dateSelected)[i].checkoutTime = monthlySumStatistics.checkoutTime + "-" + (data.contents)[i].month;
	                }
	            }
	            // else if (data.contents.length === 0) {
	            // 	alert("暂无数据");}
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
	        })
		}

		$scope.A105Report = function(){
			$http({
				method: 'POST',
				url: config.HOST + "/api/2.0/bp/evaluate/report/A105Report",
				// url: "iqc/iqc_dataCount/A105Report.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {	    
	                "sid": localStorage.getItem('sid'),
	                "checkoutTime": ((new Date(monthlySumStatistics.checkoutTime)).valueOf())/1000,
					"companySid": localStorage.getItem('cSid')
	            }
			})
			.success(function(data){
				if (data.code == "N01") {
					var xAxisData = [];
					var samplePassRateArr = [];
				 	var samplePassRateTargetArr = [];				 	
			 		for(var i=0;i<data.contents.length;i++) {
				 		xAxisData.push(data.contents[i].month);
				 		samplePassRateTargetArr.push(data.contents[i].samplePassRateTarget*100);
				 		samplePassRateArr.push(data.contents[i].samplePassRate*100);

				 	}
				 	for(var i=0 ;i<samplePassRateTargetArr.length;i++)
 					{
			             if(isNaN(samplePassRateTargetArr[i]))
			             {
			             	delete samplePassRateTargetArr[i];		                    	
			                      		                      			                  
			             }
			         } 
			         // console.log(samplePassRateTargetArr); 				 	 
					var option = {
						tooltip : {
					        trigger: 'axis'
					    },
			      		toolbox: {
                    		show : true,
                		},
					    // calculable : true,
					    legend: {
					        data:['抽样合格率%','抽样合格率目标%']
					    },    
			            xAxis : [
			                {
			                    type : 'category',
			                    name : '月份',
			                    data : xAxisData
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',	                  
			                
			                    splitArea : {show : true}
			                }
			            ],
			            series : [
			                {
			                    name: '抽样合格率%',
			                    type: 'bar',
			                    data: samplePassRateArr
			                },
			                {
					            name: '抽样合格率目标%',
					            type: 'line',					           
					            data: samplePassRateTargetArr
					        }
			            ]
			        };
					echarts(option,"main");
				}else if(data.code == "E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	                alert(data.message);
	            }  
			}).error(function(){
                console.log('接口报错');
            });
		}
}])
FIMS.controller('monthlyChart_materialCtrl',['$scope','$location',"$http",
	function($scope,$location,$http) {
		var monthlyChart = {
			dictionary: {
				vendorName: []
			},
			Selected: {
				vendorName: {}
			},
			checkoutTime: ""			
		}
		$scope.companyShortName = localStorage.getItem("curCompanyName");
		$scope.monthlyChart = monthlyChart;
		$scope.monthlyChartBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/iqcDataCount').replace();
		}
		$scope.queryVendorInfo = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/vendor/vendor/queryVendorInfo",
				// url: "manage/engineer/material/queryMaterialsInfo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	monthlyChart.dictionary.vendorName = [];
	            	for (var i=0; i < data.contents.length;i++) {
	                	monthlyChart.dictionary.vendorName.push({
	                		"name": data.contents[i].vendorShortName,
	                		"vendorSid": data.contents[i].vendorSid
	                	});
	                }
            		monthlyChart.Selected.vendorName = (monthlyChart.dictionary.vendorName)[0];
            		//$scope.queryVendorInfo(monthlyChart.Selected.vendorName.vendorSid);
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

		$scope.queryVendorInfo();

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
	                // 'echarts/chart/line',   // 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
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
		$scope.A1091Report = function(){
			$http({
				method: 'POST',
				url: config.HOST + "/api/2.0/bp/evaluate/report/A1091Report",
				//url: "iqc/iqc_dataCount/bak/A1091Report.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                //"date": dataCount.dataCountInputs.dataCountTab4.checkoutTime+"-01T00:00:00Z",
	                //"materialid": dataCount.dataCountInputs.dataCountTab4.materialid,
	                "sid": localStorage.getItem('sid'),
	                "checkoutTime": ((new Date(monthlyChart.checkoutTime)).valueOf())/1000,
	                "companySid": localStorage.getItem('cSid'),
					"vendorSid": monthlyChart.Selected.vendorName.vendorSid

	            }
			})
			.success(function(data){
				if (data.code == "N01") {
					var xAxisData = [];
				 	var sampercentArr = [];
				 	var batchpercentArr = [];
				 	var PPMpercentArr = [];

			 		for(var i=0;i<data.contents.length;i++) {
				 		xAxisData.push(data.contents[i].materialName);
				 		sampercentArr.push(data.contents[i].samplePercent*100);
				 		batchpercentArr.push(data.contents[i].batchpercent*100);
				 		PPMpercentArr.push(data.contents[i].PPMpercent);
				 	}

					var option1 = {
						color:  [
						  "#00a7eb"
						],
			         	tooltip: {
			                show: true
			            },			     
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '抽样合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":sampercentArr,
			                }
			            ]
			        };

			        var option2 = {
			        	color:  [
						  "#11cd6e"
						],
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '批次合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":batchpercentArr,
			                }
			            ]
			        };

			        var option3 = {
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '总计不良率 PPM',
			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":PPMpercentArr,
			                }
			            ]
			        };

					echarts(option1,"main1");
					echarts(option2,"main2");
					echarts(option3,"main3");
				}else if(data.code=="E00"){
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

		$scope.A1092Report = function(){
			$http({
				method: 'POST',
				url: config.HOST + "/api/2.0/bp/evaluate/report/A1092Report",
				//url: "iqc/iqc_dataCount/bak/A1091Report.json",
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                //"date": dataCount.dataCountInputs.dataCountTab4.checkoutTime+"-01T00:00:00Z",
	                //"materialid": dataCount.dataCountInputs.dataCountTab4.materialid,
	                "sid": localStorage.getItem('sid'),
	                "checkoutTime": ((new Date(monthlyChart.checkoutTime)).valueOf())/1000,
	                "companySid": localStorage.getItem('cSid')					
	            }
			})
			.success(function(data){
				if (data.code == "N01") {
					var xAxisData = [];
				 	var sampercentArr = [];
				 	var batchpercentArr = [];
				 	var PPMpercentArr = [];

			 		for(var i=0;i<data.contents.length;i++) {
				 		xAxisData.push(data.contents[i].materialName);
				 		sampercentArr.push(data.contents[i].samplePercent*100);
				 		batchpercentArr.push(data.contents[i].batchpercent*100);
				 		PPMpercentArr.push(data.contents[i].PPMpercent);
				 	}

					var option1 = {
						color:  [
						  "#00a7eb"
						],
			         	tooltip: {
			                show: true
			            },			     
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '抽样合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":sampercentArr,
			                }
			            ]
			        };

			        var option2 = {
			        	color:  [
						  "#11cd6e"
						],
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '批次合格率%',
			                   max : 100

			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":batchpercentArr,
			                }
			            ]
			        };

			        var option3 = {
			         	tooltip: {
			                show: true
			            },
			            // legend: {
			            //     data:['抽样合格率']
			            // },
			            xAxis : [
			                {
			                    type : 'category',
			                    data : xAxisData,
			                }
			            ],
			            yAxis : [
			                {
			                    type : 'value',
			                    name : '总计不良率 PPM',
			                }
			            ],
			            series : [
			                {
			                    // "name":"销量",
			                    "type":"bar",
			                    "data":PPMpercentArr,
			                }
			            ]
			        };

					echarts(option1,"main1");
					echarts(option2,"main2");
					echarts(option3,"main3");
				}else if(data.code=="E00"){
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
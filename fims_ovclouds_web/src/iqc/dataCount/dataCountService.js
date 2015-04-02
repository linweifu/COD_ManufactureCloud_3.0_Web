FIMS.factory('dataCountService',['$location','$rootScope','$http',
	function($location,$rootScope,$http){
		var dataCount = {};
		var HOST = "http://"+config.Interface;

		
		dataCount.changeTab = function(){
			$('#qc_tab1').removeClass("tab1_selected");
			$('#qc_tab2').removeClass("tab2_selected");
			$('#qc_tab3').addClass("tab3_selected");

		}

		dataCount.localTo = function(){
			$("#dataCountTab1").click(function() {
				  	$('.qc_form_tab li').removeClass('qc_form_selected');
			        $(this).addClass('qc_form_selected');
			        // $location.path("dashboard/dataCount/dataCountTab1");
			        $rootScope.$apply();
			});
			$("#dataCountTab2").click(function() {
			        $('.qc_form_tab li').removeClass('qc_form_selected');
			        $(this).addClass('qc_form_selected');
			        // $location.path("dashboard/dataCount/dataCountTab2");
			        $rootScope.$apply();

			});
			$("#dataCountTab3").click(function() {
				 	$('.qc_form_tab li').removeClass('qc_form_selected');
			        $(this).addClass('qc_form_selected');
			        // $location.path("dashboard/dataCount/dataCountTab3");
			        $rootScope.$apply();
			});
			$("#dataCountTab31").click(function() {
				 	$('.qc_form_tab li').removeClass('qc_form_selected');
			        $(this).addClass('qc_form_selected');
			        // $location.path("dashboard/dataCount/dataCountTab3");
			        $rootScope.$apply();
			});
			$("#dataCountTab4").click(function() {
				 	$('.qc_form_tab li').removeClass('qc_form_selected');
			        $(this).addClass('qc_form_selected');
			        // $location.path("dashboard/dataCount/dataCountTab4");
			        $rootScope.$apply();
			});
			$("#dataCountTab5").click(function() {
				 	$('.qc_form_tab li').removeClass('qc_form_selected');
			        $(this).addClass('qc_form_selected');
			        // $location.path("dashboard/dataCount/dataCountTab5");
			        $rootScope.$apply();
			});
		}

		function echarts(op,div){
			// console.log(op);
			// console.log(div);
			require.config({
	            paths: {
	                echarts: 'echarts.js'
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

		//公共数据
		dataCount.commom = {
			// "vendorId": "1323"
		}

		dataCount.radio = [
			{
				"name": "按物料分组",
				"value": "1",
				"status": true
			},
			{
				"name": "按供应商分组",
				"value": "0",
				"status": false
			}
		];

		//input data
		// dataCount.sign = '';
		dataCount.dataCountInputs = {
			"dataCountTab1" : {
				"checkoutTime": "2013-07-30"
			},
			"dataCountTab2" : {
				"checkoutTime": "2013-07"
			},
			"dataCountTab3" : {
				"checkoutTime": "2013-07",
			},
			"dataCountTab4" : {
				"checkoutTime": "2015-01",
				"materialid": "FIT-RM-900303.A",
			},
			"dataCountTab5" : {
				"checkoutTime": "2015-01",
				"vendorid": "FIT-VEN-60001"
			}
		};

		// console.log(dataCount.dataCountInputs.dataCountTab1.checkoutTime);

		//Tab1
		dataCount.getDayDetails  = function(){
			$http({
				method: 'POST',
				url: HOST+'/api/1.0/evaluate-manager/A102DailyReport',
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                 "checkoutTime": dataCount.dataCountInputs.dataCountTab1.checkoutTime+"T00:00:00Z",
	                 companyId:$rootScope.companyId
	            }
			})
			.success(function(data){
				if (data.array.length === 0) {
					alert("暂无数据");
				}else{$rootScope.dataCountData1 = data.array;}
				// console.log(data.array);
			});
			// $rootScope.dataCountData1 = [{
			// 	"iqcCheckouQualityDetailsSid":"xxx",
			// 	"checkoutTime":"xxx",
			// 	"checkoutRecordId":"xxx",
			// 	"batchId":"xxx",
			// 	"materialBarcode":"xxx",
			// 	"materialId":"xxx",
			// 	"materialVersion":"xxx",
			// 	"vendorId":"xxx",
			// 	"vendorShortName":"xxx",
			// 	"externalReceiptNo":"xxx",
			// 	"submitCheckoutAmount":"xxx",
			// 	"sampleAmount":"xxx",
			// 	"sampleQualifiedAmount":"xxx",
			// 	"sampleUnqualifiedAmount":"xxx",
			// 	"inbatchSampleBadPhenomenonTotal":"xxx",
			// 	"sampleQualifiedRate":"xxx",
			// 	"sampleUnqualifiedRate":"xxx",
			// 	"sampleUnqualifiedRatePpm":"xxx",
			// 	"aql":"xxx",
			// 	"determinationResults":"xxx",
			// 	"inspectorName":"xxx"
			// },
			// {
			// 	"iqcCheckouQualityDetailsSid":"xxx",
			// 	"checkoutTime":"xxx",
			// 	"checkoutRecordId":"xxx",
			// 	"batchId":"xxx",
			// 	"materialBarcode":"xxx",
			// 	"materialId":"xxx",
			// 	"materialVersion":"xxx",
			// 	"vendorId":"xxx",
			// 	"vendorShortName":"xxx",
			// 	"externalReceiptNo":"xxx",
			// 	"submitCheckoutAmount":"xxx",
			// 	"sampleAmount":"xxx",
			// 	"sampleQualifiedAmount":"xxx",
			// 	"sampleUnqualifiedAmount":"xxx",
			// 	"inbatchSampleBadPhenomenonTotal":"xxx",
			// 	"sampleQualifiedRate":"xxx",
			// 	"sampleUnqualifiedRate":"xxx",
			// 	"sampleUnqualifiedRatePpm":"xxx",
			// 	"aql":"xxx",
			// 	"determinationResults":"xxx",
			// 	"inspectorName":"xxx"
			// }];

		}

		//tab2
		dataCount.getMonthDetails  = function(){
			$http({
				method: 'POST',
				url: HOST+'/api/1.0/evaluate-manager/A103MonthlyReport',
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                 "checkoutTime": dataCount.dataCountInputs.dataCountTab2.checkoutTime+"-01T00:00:00Z",
	                 companyId:$rootScope.companyId
	            }
			})
			.success(function(data){
				if (data.array.length === 0) {
					alert("暂无数据");
				}else{$rootScope.dataCountData2 = data.array;}
				// console.log(data.array);
			});
			// $rootScope.dataCountData1 = [{
			// 	"iqcCheckouQualityDetailsSid":"xxx",
			// 	"checkoutTime":"xxx",
			// 	"checkoutRecordId":"xxx",
			// 	"batchId":"xxx",
			// 	"materialBarcode":"xxx",
			// 	"materialId":"xxx",
			// 	"materialVersion":"xxx",
			// 	"vendorId":"xxx",
			// 	"vendorShortName":"xxx",
			// 	"externalReceiptNo":"xxx",
			// 	"submitCheckoutAmount":"xxx",
			// 	"sampleAmount":"xxx",
			// 	"sampleQualifiedAmount":"xxx",
			// 	"sampleUnqualifiedAmount":"xxx",
			// 	"inbatchSampleBadPhenomenonTotal":"xxx",
			// 	"sampleQualifiedRate":"xxx",
			// 	"sampleUnqualifiedRate":"xxx",
			// 	"sampleUnqualifiedRatePpm":"xxx",
			// 	"aql":"xxx",
			// 	"determinationResults":"xxx",
			// 	"inspectorName":"xxx"
			// },
			// {
			// 	"iqcCheckouQualityDetailsSid":"xxx",
			// 	"checkoutTime":"xxx",
			// 	"checkoutRecordId":"xxx",
			// 	"batchId":"xxx",
			// 	"materialBarcode":"xxx",
			// 	"materialId":"xxx",
			// 	"materialVersion":"xxx",
			// 	"vendorId":"xxx",
			// 	"vendorShortName":"xxx",
			// 	"externalReceiptNo":"xxx",
			// 	"submitCheckoutAmount":"xxx",
			// 	"sampleAmount":"xxx",
			// 	"sampleQualifiedAmount":"xxx",
			// 	"sampleUnqualifiedAmount":"xxx",
			// 	"inbatchSampleBadPhenomenonTotal":"xxx",
			// 	"sampleQualifiedRate":"xxx",
			// 	"sampleUnqualifiedRate":"xxx",
			// 	"sampleUnqualifiedRatePpm":"xxx",
			// 	"aql":"xxx",
			// 	"determinationResults":"xxx",
			// 	"inspectorName":"xxx"
			// }];

		}


		//Tab3
		dataCount.getMonthCount  = function(){
			var sign = $(".filter").find(':checked').val();

			$http({
				method: 'POST',
				url: HOST+'/api/1.0/evaluate-manager/A1031MonthlyReport',
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                 "checkoutTime": dataCount.dataCountInputs.dataCountTab3.checkoutTime+"-01T00:00:00Z",
	                 "companyId": "FIT",
	                 "sign": sign
	            }
			})
			.success(function(data){
				if (data.array.length === 0) {
					alert("暂无数据");
				}else{$rootScope.dataCountData3 = data.array;}
			})
			.error(function() {
				console.log('接口出错');
			});;
			

			// $rootScope.dataCountData3 = [{
			// 	 "iqcCheckouQualityId": "xxx",
			// 	 "checkoutTime": "xxx",
			// 	 "checkoutRecordId": "xxx",
			// 	 "batchId": "xxx",
			// 	 "materialBarcode": "xxx",
			// 	 "materialId": "xxx",
			// 	 "materialVersion": "xxx",
			// 	 "vendorId": "xxx",
			// 	 "vendorShortName": "xxx",
			// 	 "externalReceiptNo": "xxx",
			// 	 "submitCheckoutAmountTotal": "xxx",
			// 	 "sampleAmountTotal": "xxx",
			// 	 "sampleQualifiedAmountTotal": "xxx",
			// 	 "sampleUnqualifiedAmountTotal": "xxx",
			// 	 "inbatchSampleBadPhenomenonTotalTotal": "xxx",
			// 	 "averageSampleQualifiedRate": "xxx",
			// 	 "overallSampleQualifiedRate": "xxx",
			// 	 "averageSampleUnqualifiedRate": "xxx",
			// 	 "overallSampleUnqualifiedRate": "xxx",
			// 	 "overallSampleUnqualifiedRatePpm": "xxx",
			// 	 "batchQualifiedRate": "xxx",
			// 	 "submitCheckoutAmount": "xxx",
			// 	 "sampleAmount": "xxx",
			// 	 "sampleQualifiedAmount": "xxx",
			// 	 "sampleUnqualifiedAmount": "xxx",
			// 	 "inbatchSampleBadPhenomenonTotal": "xxx",
			// 	 "sampleQualifiedRate": "xxx",
			// 	 "sampleUnqualifiedRate": "xxx",
			// 	 "sampleUnqualifiedRatePpm": "xxx",
			// 	 "aql": "xxx",
			// 	 "determinationResults": "xxx",
			// 	 "inspectorName": "xxx"
			// },
			// {
			// 	"iqcCheckouQualityDetailsSid":"xxx",
			// 	"checkoutTime":"xxx",
			// 	"checkoutRecordId":"xxx",
			// 	"batchId":"xxx",
			// 	"materialBarcode":"xxx",
			// 	"materialId":"xxx",
			// 	"materialVersion":"xxx",
			// 	"vendorId":"xxx",
			// 	"vendorShortName":"xxx",
			// 	"externalReceiptNo":"xxx",
			// 	"submitCheckoutAmount":"xxx",
			// 	"sampleAmount":"xxx",
			// 	"sampleQualifiedAmount":"xxx",
			// 	"sampleUnqualifiedAmount":"xxx",
			// 	"inbatchSampleBadPhenomenonTotal":"xxx",
			// 	"sampleQualifiedRate":"xxx",
			// 	"sampleUnqualifiedRate":"xxx",
			// 	"sampleUnqualifiedRatePpm":"xxx",
			// 	"aql":"xxx",
			// 	"determinationResults":"xxx",
			// 	"inspectorName":"xxx"
			// }];

		}


		//Tab4
		dataCount.getSingleMaterial = function(){
			$http({
				method: 'POST',
				url: HOST+'/api/1.0/evaluate-manager/A1081MonthlyReport',
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                 "date": dataCount.dataCountInputs.dataCountTab4.checkoutTime+"-01T00:00:00Z",
	                 "materialid": dataCount.dataCountInputs.dataCountTab4.materialid,
	                 companyId:$rootScope.companyId
	            }
			})
			.success(function(data){
				if (data.array.length === 0) {
					alert("暂无数据");
				}else{
					var xAxisData = [];
				 	var sampercentArr = [];
				 	var batchpercentArr = [];
				 	var PPMpercentArr = [];

			 		for(var i=0;i<data.array.length;i++) {
				 		xAxisData.push(data.array[i].vendorShortName);
				 		sampercentArr.push(data.array[i].sampercent*100);
				 		batchpercentArr.push(data.array[i].batchpercent*100);
				 		PPMpercentArr.push(data.array[i].PPMpercent);
				 	}

			 	// console.log(xAxisData);
			 		// console.log(sampercentArr);
			 	// console.log(batchpercentArr);
			 	// console.log(PPMpercentArr);

					var option1 = {
						color:  [
						  "#00a7eb"
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
				}
			}).error(function(){
                console.log('接口报错');
            });
			// var data = [
			// 	 {
			// 	 "vendorShortName": "上海汇普",
			// 	 "sampercent": "41%",
			// 	 "batchpercent": "60%",
			// 	 "PPMpercent": "60%"
			// 	 },
			// 	 {
			// 	 "vendorShortName": "上海巨翰",
			// 	 "sampercent": "68%",
			// 	 "batchpercent": "90%",
			// 	 "PPMpercent": "70%" 
			// 	 },
			// 	 {
			// 	 "vendorShortName": "上海亿科",
			// 	 "sampercent": "23%",
			// 	 "batchpercent": "50%",
			// 	 "PPMpercent": "88%" 
			// 	 },
			// 	 {
			// 	 "vendorShortName": "上海亿科",
			// 	 "sampercent": "88%",
			// 	 "batchpercent": "11%",
			// 	 "PPMpercent": "98%" 
			// 	 },
			// 	 {
			// 	 "vendorShortName": "上海亿科",
			// 	 "sampercent": "55%",
			// 	 "batchpercent": "33%",
			// 	 "PPMpercent": "28%" 
			// 	 },
			// 	 {
			// 	 "vendorShortName": "上海亿科",
			// 	 "sampercent": "33%",
			// 	 "batchpercent": "77%",
			// 	 "PPMpercent": "66%" 
			// 	 },
			// 	 {
			// 	 "vendorShortName": "上海亿科",
			// 	 "sampercent": "22%",
			// 	 "batchpercent": "22%",
			// 	 "PPMpercent": "55%" 
			// 	 },
			// 	 {
			// 	 "vendorShortName": "上海亿科",
			// 	 "sampercent": "66%",
			// 	 "batchpercent": "64%",
			// 	 "PPMpercent": "33%" 
			// 	 },
			// 	 {
			// 	 "vendorShortName": "上海亿科",
			// 	 "sampercent": "88%",
			// 	 "batchpercent": "51%",
			// 	 "PPMpercent": "77%" 
			// 	 }
		 // 	]

		 	
		}

		//Tab5
		dataCount.getSingleProvider = function(){
			$http({
				method: 'POST',
				url: HOST+'/api/1.0/evaluate-manager/A1091MonthlyReport',
	            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data:  {
	                 "date": dataCount.dataCountInputs.dataCountTab5.checkoutTime+"-01T00:00:00Z",
	                 "vendorid": dataCount.dataCountInputs.dataCountTab5.vendorid,
	                 "companyId": $rootScope.companyId
	            }
			})
			.success(function(data){
				if (data.array.length === 0) {
					alert("暂无数据");
				}else{
					var xAxisData = [];
				 	var sampercentArr = [];
				 	var batchpercentArr = [];
				 	var PPMpercentArr = [];

				 	for(var i=0;i<data.array.length;i++) {
				 		xAxisData.push(data.array[i].materialname);
				 		sampercentArr.push(data.array[i].sampercent*100);
				 		batchpercentArr.push(data.array[i].batchpercent*100);
				 		PPMpercentArr.push(data.array[i].PPMpercent);
				 	}

					var option1 = {
						color:  [
						  "#00a7eb"
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
				}	
			})
		};
			// var data = [
			// 	 {
			// 	 "materialname": "O型圈",
			// 	 "sampercent": "59%",
			// 	 "batchpercent": "20%",
			// 	 "PPMpercent": "10%"
			// 	 },
			// 	 {
			// 	 "materialname": "铜接头",
			// 	 "sampercent": "69%",
			// 	 "batchpercent": "20%",
			// 	 "PPMpercent": "19%" 
			// 	 },
			// 	 {
			// 	 "materialname": "气阀",
			// 	 "sampercent": "77%",
			// 	 "batchpercent": "23%",
			// 	 "PPMpercent": "19%" 
			// 	 },
			// 	 {
			// 	 "materialname": "气阀1",
			// 	 "sampercent": "90%",
			// 	 "batchpercent": "22%",
			// 	 "PPMpercent": "66%" 
			// 	 },
			// 	 {
			// 	 "materialname": "气阀2",
			// 	 "sampercent": "33%",
			// 	 "batchpercent": "88%",
			// 	 "PPMpercent": "70%" 
			// 	 },
			// 	 {
			// 	 "materialname": "气阀3",
			// 	 "sampercent": "50%",
			// 	 "batchpercent": "60%",
			// 	 "PPMpercent": "70%" 
			// 	 }
		 // 	];

		 	
		
		return dataCount;
	}

])
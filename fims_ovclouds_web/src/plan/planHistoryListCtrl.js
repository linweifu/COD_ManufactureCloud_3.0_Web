FIMS.controller('planHistoryListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planHistoryList = {
			//检验计划字典
			dicQCPType :[],
			selQCPType : {},
			QCP:[]
			// display: "",
			// page: 1
		};
         
         //时间戳格式转化
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


		$scope.planHistoryListBack = function(){
			// $location.path('account_index/chooseModule').replace();
			 $location.path("account_index/planRevise");
		}

		//根据检验计划类型获取检验计划
		$scope.checkHistoryQCP = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/qcp/qcp/checkHistoryQCP",
				// url: "plan/checkHistoryQCP.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"materialSid": localStorage.getItem('materialSid'),
					"checkoutPlanTypeCode": planHistoryList.selQCPType.code
					// "page": localStorage.getItem('page')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	            	// planHistoryList.dicQCPType = [];
	            	// planHistoryList.Selected.materialName = {};
	                // planHistoryList.display = "display:block"; 
	 				// localStorage.setItem('page',1);	
	                planHistoryList.QCP = data.contents;

	             //      var entrytime = new Date(planHistoryList.QCP.entryTime*1000),
              //             maketime = new Date(planHistoryList.QCP.makeTime*1000);   
              // // console.log(entrytime);
              //   planHistoryList.QCP.entryTime = entrytime.format();
              //   planHistoryList.QCP.makeTime = maketime.format();

	                //console.log(planHistoryList.QCP); 
	                // planHistoryList.QCP.makeTime = time.format();
	                // planHistoryList.QCP.entryTime = time.format();
	                  for(var i=0,len=(planHistoryList.QCP).length;i<len;i++){
	                  	(planHistoryList.QCP)[i].makeTime = (new Date((planHistoryList.QCP)[i].makeTime*1000)).format();
	                  	(planHistoryList.QCP)[i].entryTime = (new Date((planHistoryList.QCP)[i].entryTime*1000)).format();
	                // // 	// console.log((planlist.QCPSelected)[i])
	                 }


	                   // localStorage.setItem("materialSid");
	                   // localStorage.setItem("materialSid",data.contents.materialSid);
	                   // localStorage.setItem("materialSid",planHistoryList.QCP.materialSid);

	            }
	            else if(data.code=="E00"){
	                alert(data.message+",请重新登陆");
	                localStorage.clear();
	                $location.path('login').replace();
	            }else {
	            	// planHistoryList.QCPSelected= [];  
	            	// planHistoryList.dictionary.materialVersion = [];
	            	// planHistoryList.Selected.materialName = {};
	                alert(data.message);
	            }  
	        })
		}

		
		$scope.queryDicQCPType = function(){
			$http({
				method: "POST",
				url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
				// url: "plan/queryDicQCPType.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	 				planHistoryList.dicQCPType = [];
	                for (var i=0; i < data.contents.length;i++) {
	                	planHistoryList.dicQCPType.push({
	                		"name": data.contents[i].checkoutPlanType,
	                		"code": data.contents[i].checkoutPlanTypeCode
	                	});
	                }
            		planHistoryList.selQCPType = (planHistoryList.dicQCPType)[0];
            		$scope.checkHistoryQCP(planHistoryList.selQCPType.code);
            		//console.log(data);


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

		$scope.companyShortName = localStorage.getItem('curCompanyName');
		$scope.planHistoryList = planHistoryList;	
		$scope.queryDicQCPType();


		
	// 	//  /api/2.0/bp/qcp/qcp
	

		$scope.querySingleQCPInfo =function(planSid,checkoutPlanStatusCode){

		
			localStorage.setItem("checkoutHistoryPlanSid",planSid);
			$location.path("account_index/planHistoryListCheck");

		}

	    $scope.querySingCopyInfo = function(planSid,checkoutPlanStatusCode) {
	    	localStorage.setItem("checkoutHistoryCopySid",planSid);
			$location.path("account_index/planHistoryListCopy");

	    }
		
	
}])
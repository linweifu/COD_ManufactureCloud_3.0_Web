FIMS.controller('planListCtrl', ['$scope', '$location', '$http', 
	function($scope,$location,$http){
		var planlist = {
			dictionary: {
				QCPType: [],
				materialName: [],
				materialVersion: []
			},
			QCPType: {
				checkoutPlanTypeCode: "",
				checkoutPlanType: ""
			},
			Selected : {
				checkoutPlanType :"",
				materialNo: "",
				materialVersion: ""
			},
			QCPSelected :[]
		};
		$scope.companyShortName = localStorage.getItem('curCompanyName');
		$scope.planlist = planlist;

		$scope.planlistBack = function(){
			// localStorage.removeItem('singleplan');
			$location.path('account_index/chooseModule').replace();
		}

		//  /api/2.0/bp/qcp/qcp
		//
		$scope.queryDicQCPType = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
				url: "plan/queryDicQCPType.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	 				planlist.dictionary.QCPType = [];
	                for (var i=0; i < data.contents.length;i++) {
	                	planlist.dictionary.QCPType.push({
	                		"name": data.contents[i].checkoutPlanType,
	                		"code": data.contents[i].checkoutPlanTypeCode
	                	});
	                }
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

		$scope.queryDicQCPType();

		//根据检验计划类型获取检验计划
		$scope.queryQCPByType = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCP",
				url: "plan/queryQCPByType.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"checkoutPlanType": planlist.Selected.checkoutPlanType
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                planlist.QCPSelected = data.contents;          
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

		// 查询检验计划
		$scope.queryQCP = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCP",
				url: "plan/queryQCP.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid')
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {
	                planlist.dictionary.materialName = data.contents;
	                planlist.QCPSelected = data.contents;          
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

		$scope.queryQCP();

		//根据物料编号获取物料版本
		$scope.queryMaterialVersionByMaterialNo = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
				url: "plan/queryMaterialVersionByMaterialNo.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"materialNo": planlist.Selected.materialNo
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {           	
	                planlist.dictionary.materialVersion = data.contents;
	                planlist.QCPSelected = data.contents;
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

		//根据物料ID和物料版本获取检验计划
		$scope.queryQCPByMaterial = function(){
			$http({
				method: "POST",
				// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryQCPByMaterial",
				url: "plan/queryQCPByMaterial.json",
				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
				data: {
					"sid": localStorage.getItem('sid'),
					"companySid": localStorage.getItem('cSid'),
					"materialNo": planlist.Selected.materialNo,
					"materialVersion": planlist.Selected.materialVersion
				}
			})
			.success(function(data){
	            if (data.code == 'N01') {           	
	                planlist.QCPSelected = data.contents;
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

}])
FIMS.controller('planAddCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var planAdd = {
		dictionary: {
			QCPType: [],
			materialNo: [],
			materialVersion: []
		},
		
		Selected : {
			QCPType: {},
			materialNo : {},
			// materialVersion : {},
			// materialNo: "",
			materialVersion: ""
		},

		materialShortName : "",
		planId: ""
	};

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
 				planAdd.dictionary.QCPType = [];
                for (var i=0; i < data.contents.length;i++) {
                	planAdd.dictionary.QCPType.push({
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

	//获取物料字典
	$scope.queryMaterialsInfo = function(){
		$http({
			method: "POST",
			// url: "account/joinCo/joinCo.json",
			// url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
			url: "manage/engineer/material/queryMaterialsInfo.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid')
			}
		})
		.success(function(data){
            if (data.code == 'N01') {
            	planAdd.dictionary.materialNo = data.contents;
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

	$scope.queryMaterialsInfo();

	$scope.planAdd = planAdd;


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
				"materialNo": planAdd.Selected.materialNo.materialNo 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
                planAdd.dictionary.materialVersion = [];
            	planAdd.Selected.materialVersion = "";
                planAdd.dictionary.materialVersion = data.contents;
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

	//获取物料简称
	$scope.queryMaterialShortName = function(){
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
			url: "plan/queryMaterialShortName.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"materialNo": planAdd.Selected.materialNo.materialNo,
				"materialVersion": planAdd.Selected.materialVersion 
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
            	planAdd.materialShortName = data.contents.materialShortName;
            	planAdd.planId = planAdd.Selected.QCPType.code+"-"+planAdd.Selected.materialNo+"-"+planAdd.Selected.materialVersion ;
	console.log(planAdd)

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
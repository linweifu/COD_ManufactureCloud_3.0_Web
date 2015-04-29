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
		checkoutPlanNo: "",
		checkoutPlanVersion : "",
		aql: "",
		makeName : localStorage.getItem("userName"),
		makeTime: "",
		entryName: localStorage.getItem("userName"),
		entryTime: ""

	};

	var time  = new Date();
	// function toTime(date) {
	// 	return date.toLocaleDateString().split('/').join('-');	
	// }
	// planAdd.makeTime = toTime(time);
	// console.log(planAdd.makeTime);

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

	planAdd.makeTime = time.format();
	planAdd.entryTime = time.format();



	$scope.queryDicQCPType = function(){
		$http({
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
			// url: "plan/queryDicQCPType.json",
			method: "POST",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid')
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
        		planAdd.Selected.QCPType = (planAdd.dictionary.QCPType)[0];
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
			url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
			// url: "manage/engineer/material/queryMaterialsInfo.json",
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
			url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
			// url: "plan/queryMaterialVersionByMaterialNo.json",
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
                planAdd.checkoutPlanNo = '';
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
			url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialShortName",
			// url: "plan/queryMaterialShortName.json",
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
            	planAdd.checkoutPlanNo = planAdd.Selected.QCPType.code+"-"+planAdd.Selected.materialNo.materialNo+"-"+planAdd.Selected.materialVersion ;

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


	/*********************************************************
	*  
	*/

	$scope.addQCP = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCP",
			// url: "plan/addQCP.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
	            "checkoutPlanNo":planAdd.checkoutPlanNo,
	            "checkoutPlanVersion":planAdd.checkoutPlanVersion,
	            "checkoutPlanTypeCode":planAdd.Selected.QCPType.code,
	            "checkoutPlanType":planAdd.Selected.QCPType.name,
	            "companySid":localStorage.getItem('cSid'),
	            "companyShortName":localStorage.getItem('curCompanyName'),
	            "materialSid":planAdd.Selected.materialNo.materialSid,
	            "materialNo":planAdd.Selected.materialNo.materialNo,
	            "materialVersion":planAdd.Selected.materialVersion,
	            "materialShortName":planAdd.materialShortName,
	            "aql":planAdd.aql,
	            // "entrySid":planAdd. 1,
	            "entryId":localStorage.getItem('email'),
	            "entryJobNumber":localStorage.getItem('userJobNumber'),
	            "entryName":planAdd.entryName,
	            "entryTime":(new Date(planAdd.entryTime)).valueOf(),
	            "makeJobNumber":localStorage.getItem('userJobNumber'),
	            "makeName":planAdd.makeName,
	            "makeTime":(new Date(planAdd.makeTime)).valueOf(),
			}
		})
		.success(function(data){
            if (data.code == 'N01') {           	
		     	alert(data.message);
		     	$location.path('account_index/planList');       	
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

	$scope.backQCP = function(){
		var a = confirm("您确定要退出吗？退出将丢失填写数据!")
		if (a) {
			$location.path("account_index/planList");
		}
	}
	
}])
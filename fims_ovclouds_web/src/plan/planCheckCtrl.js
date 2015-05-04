FIMS.controller('planCheckCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var planCheck = {
	};

		//调整时间格式
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

	// 自执行函数，删除相关本地存储
	function init(){
		localStorage.removeItem('materialSid');
	}

	init();

	

	// $scope.makeTime = time.format();
	// $scope.entryTime = time.format();

	$scope.querySingleQCP = function(){
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleQCP",
			url: "plan/querySingleQCP.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutPlanSid": $scope.selectedCheckoutPlanSid
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	$scope.planCheck = data.contents;
            	// console.log($scope.planCheck);
            	var entrytime = new Date($scope.planCheck.entryTime),
            		maketime = new Date($scope.planCheck.makeTime);		
            	// console.log(entrytime);
              	$scope.planCheck.entryTime = entrytime.format();
              	$scope.planCheck.makeTime = maketime.format();
              	localStorage.setItem("materialSid",$scope.planCheck.materialSid);
              	// console.log($scope.planCheck.entryTime)

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('querySingleQCP'+data.message);
        });
	}

	$scope.querySingleQCP();



	var time  = new Date();
	// function toTime(date) {
	// 	return date.toLocaleDateString().split('/').join('-');	
	// }
	// $scope.makeTime = toTime(time);
	// console.log($scope.makeTime);





	// $scope.queryDicQCPType = function(){
	// 	$http({
	// 		url: config.HOST + "/api/2.0/bp/account/dic/queryDicQCPType",
	// 		// url: "plan/queryDicQCPType.json",
	// 		method: "POST",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid')
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {
 				
 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }

	// $scope.queryDicQCPType();

	// //获取物料字典
	// $scope.queryMaterialsInfo = function(){
	// 	$http({
	// 		method: "POST",
	// 		// url: "account/joinCo/joinCo.json",
	// 		url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
	// 		// url: "manage/engineer/material/queryMaterialsInfo.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"companySid": localStorage.getItem('cSid')
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {
 //            	$scope.dictionary.materialNo = data.contents;
 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }

	// $scope.queryMaterialsInfo();

	// $scope.planCheck = planCheck;


	// //根据物料编号获取物料版本
	// $scope.queryMaterialVersionByMaterialNo = function(){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/qcp/qcp/queryMaterialVersionByMaterialNo",
	// 		// url: "plan/queryMaterialVersionByMaterialNo.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"companySid": localStorage.getItem('cSid'),
	// 			"materialNo": $scope.Selected.materialNo.materialNo 
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
 //                $scope.dictionary.materialVersion = [];
 //            	$scope.Selected.materialVersion = "";
 //                $scope.dictionary.materialVersion = data.contents;
 //                $scope.checkoutPlanNo = '';
 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }

	// //获取物料简称
	// $scope.queryMaterialShortName = function(){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialShortName",
	// 		// url: "plan/queryMaterialShortName.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	// 			"materialNo": $scope.Selected.materialNo.materialNo,
	// 			"materialVersion": $scope.Selected.materialVersion 
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
 //            	$scope.materialShortName = data.contents.materialShortName;
 //            	$scope.checkoutPlanNo = $scope.Selected.QCPType.code+"-"+$scope.Selected.materialNo.materialNo+"-"+$scope.Selected.materialVersion ;

 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }


	// /*********************************************************
	// *  
	// */

	// $scope.addQCP = function(){
	// 	$http({
	// 		method: "POST",
	// 		url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCP",
	// 		// url: "plan/addQCP.json",
	// 		header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
	// 		data: {
	// 			"sid": localStorage.getItem('sid'),
	//             "checkoutPlanNo":$scope.checkoutPlanNo,
	//             "checkoutPlanVersion":$scope.checkoutPlanVersion,
	//             "checkoutPlanTypeCode":$scope.Selected.QCPType.code,
	//             "checkoutPlanType":$scope.Selected.QCPType.name,
	//             "companySid":localStorage.getItem('cSid'),
	//             "companyShortName":localStorage.getItem('curCompanyName'),
	//             "materialSid":$scope.Selected.materialNo.materialSid,
	//             "materialNo":$scope.Selected.materialNo.materialNo,
	//             "materialVersion":$scope.Selected.materialVersion,
	//             "materialShortName":$scope.materialShortName,
	//             "aql":$scope.aql,
	//             // "entrySid":$scope. 1,
	//             "entryId":localStorage.getItem('email'),
	//             "entryJobNumber":localStorage.getItem('userJobNumber'),
	//             "entryName":$scope.entryName,
	//             "entryTime":((new Date($scope.entryTime)).valueOf())/1000,
	//             "makeJobNumber":localStorage.getItem('userJobNumber'),
	//             "makeName":$scope.makeName,
	//             "makeTime":((new Date($scope.makeTime)).valueOf())/1000,
	// 		}
	// 	})
	// 	.success(function(data){
 //            if (data.code == 'N01') {           	
	// 	     	alert(data.message);
	// 	     	$location.path('account_index/planList');       	
 //            }
 //            else if(data.code=="E00"){
 //                alert(data.message+",请重新登陆");
 //                localStorage.clear();
 //                $location.path('login').replace();
 //            }else {
 //                alert(data.message);
 //            }  
 //        })
	// }

	// $scope.backQCP = function(){
	// 	var a = confirm("您确定要退出吗？退出将丢失填写数据!")
	// 	if (a) {
	// 		$location.path("account_index/planList");
	// 	}
	// }
	
}])
// FIMS.factory('materiallistService',['$location','$http',
// 	function($location,$http){
// 		var materiallist = {};
// 		materiallist.querySingleMaterial = function(msid){
// 			$http({
// 				method: "POST",
// 				// url: "account/joinCo/joinCo.json",
// 				// url: config.HOST + "/api/2.0/bp/engineering/materials/queryMaterialsInfo",
// 				url: "manage/engineer/material/querySingleMaterial.json",
// 				header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
// 				data: {
// 					"sid": localStorage.getItem('sid'),
// 					"materialSid": msid
// 				}
// 			})
// 			.success(function(data){
// 	            if (data.code == 'N01') {
// 	                $scope.singlematerial = data.contents;
// 	            }
// 	            else if(data.code=="E00"){
// 	                alert(data.message+",请重新登陆");
// 	                localStorage.clear();
// 	                $location.path('login').replace();
// 	            }else {
// 	                alert(data.message);
// 	            }  
// 	        })
// 		}
		
// 		return materiallist;
// }])
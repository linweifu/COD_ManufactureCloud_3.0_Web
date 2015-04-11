FIMS.controller('applyApprovalCtrl', ['$scope', '$location','$http',function($scope,$location,$http){
	$scope.applyInfo = JSON.parse(localStorage.getItem('applyJoin'));
	$scope.agreeJoin = function(){
		// console.log($scope.applyInfo);
		var subContent = [];
		var subContentBody = {};
		// console.log(subContent);
		// console.log($scope.applyInfo.length);

		// subContentBody = {
		// 	"applyJoinSid":($scope.applyInfo)[0].applyJoinSid,
		// 	"userApplyStatus":($scope.applyInfo)[0].userApplyStatus
		// }
		// console.log(subContentBody);

		for(var i =0;i<$scope.applyInfo.length;i++){
			subContentBody = {
				"applyJoinSid":($scope.applyInfo)[i].applyJoinSid,
				"userApplyStatus":($scope.applyInfo)[i].userApplyStatus
			}
			subContent.push(subContentBody);
		}
		$http({
            method: 'POST',
			url: config.HOST+"/api/2.0/bp/account/relation/ratifyJoinCompany",
            // url: "account/applyApproval/applyApproval.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "contents": subContent
            }
        }).success(function (data) {
            if(data.code == "N01"){
            	console.log($scope.applyInfo);
            	localStorage.setItem("applyJoin",JSON.stringify($scope.applyInfo));
            	$location.path('account_index/chooseModule').replace();
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                console.log(data.message);
            }  
        }).error(function(){
            console.log('http error')
        });
	}

	$scope.applyApprovalBack = function(){
		localStorage.removeItem('applyJoin');
		$location.path("account_index/chooseModule").replace();
	}

	$scope.refuseJoin = function(index,aid){
	 	$http({
            method: 'POST',
			url: config.HOST+"/api/2.0/bp/account/relation/ratifyJoinCompany",
            // url: "account/applyApproval/applyApproval.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "contents": [
                	{
                		"applyJoinSid": aid,
                		"userApplyStatus": "2"
                	}
                ]
            }
        }).success(function (data) {
            if(data.code == "N01"){
            	$scope.applyInfo.splice(index,1);
            	console.log($scope.applyInfo);

            	localStorage.setItem("applyJoin",JSON.stringify($scope.applyInfo));
            	console.log(index);
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                console.log(data.message);
            }  

        }).error(function(){
            console.log('http error')
        });
	}
}])
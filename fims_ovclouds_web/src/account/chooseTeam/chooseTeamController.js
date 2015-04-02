FIMS.controller('chooseTeamController',['$scope','joinService','recordService', '$rootScope','$q',
	function($scope,joinService, recordService, $rootScope, $q) {
		joinService.getCompanysByUserId();
		$scope.getRecordList = function(page,companyId){
		recordService.getRecordList(page,companyId).then(function(data) {
            $rootScope.data = data.array;
            var pages=[],j=2;
            for(var i=1;i < data.totalpage;i++)
            {   
                  pages.push(j);
                  j++;
                  $rootScope.pages = pages;
            }
            console.log(pages);
            var operates = [];
            for (var i=0;i<data.array.length;i++) {
                  if (data.array[i].recordStatus === "未提交"){
                        // console.log(i);
                        operates.push({
                              "operate1": " 编辑 / ",
                              "operate2": " 提交",
                              "operate3": ""
                        });
                        // console.log("未提交"+data.array[i].recordStatus);
                  }else{
                        operates.push({
                              "operate1": "",
                              "operate2": "",
                              "operate3": "查看"
                        })
                  }
            }
            $rootScope.operate = operates;
            console.log(operates);
        });
	};      
            $scope.toLocal = joinService.toLocal;
            $scope.localdata = joinService.localdata;
            $scope.addSelectedClass = joinService.addSelectedClass;
		$scope.CompanyInfoByUserId = joinService.CompanyInfoByUserId;
		$scope.handleMsg = joinService.handleMsg;
		$scope.handleOverlay = joinService.handleOverlay;
		$scope.handleAgreeBtn = joinService.handleAgreeBtn;
		$scope.handleRejectBtn = joinService.handleRejectBtn;
		$scope.getCompanyApplicant = joinService.getCompanyApplicant;
}])

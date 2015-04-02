FIMS.controller('newAddController',['$scope', 'newAddService',
		function($scope,newAddService){
			
			$scope.materialId= newAddService.materialId;
			$scope.items = newAddService.data;
			$scope.msg = newAddService.baseMsgData;
			$scope.dxDatas = newAddService.DXData;
			$scope.dxDataValue = newAddService.dxDataValue;
			$scope.DLDatas = newAddService.DLData; 
			newAddService.localTo();
			$scope.subData = newAddService.subData;
			$scope.getPlanId = newAddService.getPlanId;
			$scope.testDXdata = newAddService.testDXdata;
			$scope.PlanDatas = newAddService.PlanDatas;
			$scope.changeTab = newAddService.changeTab;
			// $scope.checkQCRUniqueness = newAddService.checkQCRUniqueness;
		}]);

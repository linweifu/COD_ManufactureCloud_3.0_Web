FIMS.controller('dataCountController',['$scope','dataCountService',
	function($scope,dataCountService) {
		$scope.changeTab = dataCountService.changeTab;
		$scope.getSingleProvider = dataCountService.getSingleProvider;
		$scope.getSingleMaterial = dataCountService.getSingleMaterial;
		$scope.getDayDetails= dataCountService.getDayDetails;
		$scope.getMonthDetails= dataCountService.getMonthDetails;
		$scope.getMonthCount = dataCountService.getMonthCount;

		$scope.dataCountInputs = dataCountService.dataCountInputs;
		dataCountService.localTo();

		$scope.radio = dataCountService.radio;
		$scope.dataCountInputs = dataCountService.dataCountInputs;


}])
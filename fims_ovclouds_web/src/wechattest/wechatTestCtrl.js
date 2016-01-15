FIMS.controller('wechatTestCtrl',['$rootScope','$scope','$location','$http',
	function($rootScope,$scope,$location,$http){
		$('#headingOne a').click(function(e) {
				e.preventDefault();
		});
		$('#headingTwo a').click(function(e) {
				e.preventDefault();
		});
		$('#headingThree a').click(function(e) {
				e.preventDefault();
		});
	}]);
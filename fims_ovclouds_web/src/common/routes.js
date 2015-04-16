var config = {
	HOST : "http://ovclouds.com"
}
var FIMS = angular.module('FIMS', ['ui.router']);
FIMS.config([
	'$stateProvider',
	'$urlRouterProvider'
	, function($stateProvider, $urlRouterProvider) {
		$stateProvider
	.state('index',{
		url:'',
		templateUrl:'account/login/login.html'
	})
	.state('login',{
		url:'/login',
		templateUrl:'account/login/login.html'
	})
	.state('sigup',{
		url:'/sigup',
		// controller:'recordController',
		templateUrl:"account/sigup/sigup.html"
	})
	.state('account_index',{
		url:'/account_index',
		// controller:'recordController',
		templateUrl:"account/account_index/account_index.html"
	})
	.state('account_index.chooseTeam',{
		url:'/chooseTeam',
		// controller:'recordController',
		templateUrl:"account/chooseTeam/chooseTeam.html"
	})
	.state('account_index.chooseModule',{
		url:'/chooseModule',
		// controller:'recordController',
		templateUrl:"account/chooseModule/chooseModule.html"
	})
	.state('account_index.joinCo',{
		url:'/joinCo',
		// controller:'recordController',
		templateUrl:"account/joinCo/joinCo.html"
	})
	.state('account_index.agreeMem',{
		url:'/agreeMem',
		// controller:'recordController',
		templateUrl:"account/agreeMem/agreeMem.html"
	})
	.state('account_index.userManage',{
		url:'/userManage',
		// controller:'recordController',
		templateUrl:"account/userManage/userManage.html"
	})
	.state('account_index.applyApproval',{
		url:'/applyApproval',
		// controller:'joinController',
		templateUrl:'account/applyApproval/applyApproval.html'
	})
	.state('account_index.userSetting',{
		url:'/userSetting',
		// controller:'userSettingController',
		templateUrl:"account/userSetting/userSetting.html"
	})
	.state('account_index.comSetting',{
		url:'/comSetting',
		// controller:'userSettingController',
		templateUrl:"account/comSetting/comSetting.html"
	})
	.state('account_index.materiallist',{
		url:'/materiallist',
		// controller:'dataCountController',
		templateUrl:'manage/engineer/material/materiallist.html'
	})
	.state('account_index.material',{
		url:'/material',
		// controller:'dataCountController',
		templateUrl:'manage/engineer/material/material.html'
	})
	.state('account_index.customerlist',{
		url:'/customerlist',
		// controller:'dataCountController',
		templateUrl:'manage/customer/customer/customerlist.html'
	})
	.state('account_index.customer',{
		url:'/customer',
		// controller:'dataCountController',
		templateUrl:'manage/customer/customer/customer.html'
	})
	.state('account_index.vendorlist',{
		url:'/vendorlist',
		// controller:'dataCountController',
		templateUrl:'manage/vendor/vendor/vendorlist.html'
	})
	.state('account_index.vendor',{
		url:'/vendor',
		// controller:'dataCountController',
		templateUrl:'manage/vendor/vendor/vendor.html'
	})
	// .state('account_index.engineerlist',{
	// 	url:'/engineerlist',
	// 	// controller:'dataCountController',
	// 	templateUrl:'manage/engineering/engineerlist.html'
	// })
	// .state('dashboard.dataCount.dataCountTab1',{
	// 	url:'/dataCountTab1',
	// 	controller:'dataCountController',
	// 	templateUrl:'view/dashboard/dataCountTab1.html'
	// })
	// .state('dashboard.dataCount.dataCountTab2',{
	// 	url:'/dataCountTab2',
	// 	controller:'dataCountController',
	// 	templateUrl:'view/dashboard/dataCountTab2.html'
	// })
	// .state('dashboard.dataCount.dataCountTab3',{
	// 	url:'/dataCountTab3',
	// 	controller:'dataCountController',
	// 	templateUrl:'view/dashboard/dataCountTab3.html'
	// })
	// .state('dashboard.dataCount.dataCountTab31',{
	// 	url:'/dataCountTab31',
	// 	controller:'dataCountController',
	// 	templateUrl:'view/dashboard/dataCountTab31.html'
	// })
	// .state('dashboard.dataCount.dataCountTab4',{
	// 	url:'/dataCountTab4',
	// 	controller:'dataCountController',
	// 	templateUrl:'view/dashboard/dataCountTab4.html'
	// })
	// .state('dashboard.dataCount.dataCountTab5',{
	// 	url:'/dataCountTab5',
	// 	controller:'dataCountController',
	// 	templateUrl:'view/dashboard/dataCountTab5.html'
	// })
	// .state('dashboard.subNav', {
	// 	abstract: true,
	// 	url: '/subNav',
	// 	controller: 'newAddController',
	// 	templateUrl: 'view/dashboard/subNav.html'
	// })
	// .state('dashboard.subNav.home', {
	// 	url: '/home',
	// 	controller: 'newAddController',
	// 	templateUrl: 'view/dashboard/home.html'
	// })
	// .state('dashboard.subNav.dxjy', {
	// 	url: '/dxjy',
	// 	templateUrl: 'view/dashboard/dxjy.html'
	// })
	// .state('dashboard.subNav.dljc', {
	// 	url: '/dljc',
	// 	// controller: dljcController,
	// 	templateUrl: 'view/dashboard/dljc.html'
	// })
	// .state('login',{
	// 	url:'/login',
	// 	controller:'loginController',
	// 	templateUrl:'view/login/login.html'
	// })
	// .state('login.email',{
	// 	url:'/email',
	// 	controller:'loginController',
	// 	templateUrl:'view/login/email.html'
	// })
	// .state('login.choice',{
	// 	url:'/choice',
	// 	controller:'loginController',
	// 	templateUrl:'view/login/choice.html'
	// })
	// .state('login.choice2',{
	// 	url:'/choice2',
	// 	controller:'loginController',
	// 	templateUrl:'view/login/choice2.html'
	// });
		 // $urlRouterProvider.otherwise('');

}]);




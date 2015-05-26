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
		controller:'comSettingCtrl',
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
	.state('account_index.planList',{
		url:'/planList',
		// controller:'dataCountController',
		templateUrl:'plan/planList.html'
	})
	.state('account_index.planAdd',{
		url:'/planAdd',
		// controller:'dataCountController',
		templateUrl:'plan/planAdd.html'
	})
	.state('account_index.planCheck',{
		url:'/planCheck',
		// controller:'dataCountController',
		templateUrl:'plan/planCheck.html'
	})
	.state('account_index.planRevise',{
		url:'/planRevise',
		// controller:'dataCountController',
		templateUrl:'plan/planRevise.html'
	})
	.state('account_index.planHistoryList',{
		url:'/planHistoryList',
		// controller:'dataCountController',
		templateUrl:'plan/planHistoryList.html'
	})
	.state('account_index.planMetricList',{
		url:'/planMetricList',
		// controller:'dataCountController',
		templateUrl:'plan/planMetricList.html'
	})
	.state('account_index.iqcIndex',{
		url:'/iqcIndex',
		controller:'iqcIndexCtrl',
		templateUrl:'iqc/iqc_index/iqcIndex.html'
	})
	.state('account_index.iqcRecord',{
		url:'/iqcRecord',
		controller:'iqcRecordCtrl',
		templateUrl:'iqc/iqc_record/iqcRecord.html'
	})
	.state('account_index.iqcAdd',{
		url:'/iqcAdd',
		controller:'iqcAddCtrl',
		templateUrl:'iqc/iqc_add/iqcAdd.html'
	})
	.state('account_index.iqcAddCheck',{
		url:'/iqcAddCheck',
		controller:'iqcAddCheckCtrl',
		templateUrl:'iqc/iqc_add/iqcAddCheck.html'
	})
	// .state('account_index.iqcDataCount',{
	// 	url:'/iqcDataCount',
	// 	controller:'iqcRecordCtrl',
	// 	templateUrl:'iqc/iqc_dataCount/iqcDataCount.html'
	// })
	.state('account_index.iqcComplexDLAdd',{
		url:'/iqcComplexDLAdd',
		// controller:'iqcComplexDLAddCtrl',
		templateUrl:'iqc/iqc_add/iqcComplexDLAdd.html'
	})
	.state('account_index.iqcComplexDXAdd',{
		url:'/iqcComplexDXAdd',
		controller:'iqcComplexDXAddCtrl',
		templateUrl:'iqc/iqc_add/iqcComplexDXAdd.html'
	})
	.state('account_index.iqcSimpleDLAdd',{
		url:'/iqcSimpleDLAdd',
		// controller:'iqcSimpleDLAddCtrl',
		templateUrl:'iqc/iqc_add/iqcSimpleDLAdd.html'
	})
	.state('account_index.iqcSimpleDXAdd',{
		url:'/iqcSimpleDXAdd',
		// controller:'iqcSimpleDXAddCtrl',
		templateUrl:'iqc/iqc_add/iqcSimpleDXAdd.html'
	})
	.state('account_index.tool_index',{
		url:'/tool_index',
		controller:'tool_indexCtrl',
		templateUrl:'tool/tool_index/tool_index.html'
	})
	.state('account_index.qrCode',{
		url:'/qrCode',
		controller:'qrCodeCtrl',
		templateUrl:'tool/qrCode/qrCode.html'
	})
}]);




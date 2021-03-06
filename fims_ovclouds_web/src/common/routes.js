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
    


    .state('Web',{
		url:'/Web',
		controller:'WebCtrl',
		templateUrl:'account/login/Web.html'
	}) 

 //    .state('Weblogin',{
	// 	url:'/Weblogin',
	// 	templateUrl:'account/Weblogin/Weblogin.html'
	// }) 

 
    .state('Weblogin',{
		url:'/Weblogin',
	    controller:'WebloginCtrl',
		templateUrl:'account/Weblogin/Weblogin.html'
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
		 controller:'userSettingCtrl',
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

    .state('account_index.planHistoryListCheck',{
		url:'/planHistoryListCheck',
		templateUrl:'plan/planHistoryListCheck.html'
	})
	.state('account_index.planHistoryMetricList',{
		url:'/planHistoryMetricList',
		templateUrl:'plan/planHistoryMetricList.html'
	})

	.state('account_index.planHistoryListCopy',{
		url:'/planHistoryListCopy',
		templateUrl:'plan/planHistoryListCopy.html'
	})

   .state('account_index.planMetricListCheck',{
		url:'/planMetricListCheck',
		templateUrl:'plan/planMetricListCheck.html'
	})








    .state('account_index.iqcRecordCheck',{
		url:'/iqcRecordCheck',
		controller:'iqcRecordCheckCtrl',
		templateUrl:'iqc/iqc_record/iqcRecordCheck.html'
	})


    .state('account_index.iqcRecordRevise',{
		url:'/iqcRecordRevise',
		controller:'iqcRecordReviseCtrl',
		templateUrl:'iqc/iqc_record/iqcRecordRevise.html'
	})



    .state('account_index.iqcComplexDLCheck',{
		url:'/iqcComplexDLCheck',
		controller:'iqcComplexDLCheckCtrl',
		templateUrl:'iqc/iqc_record/iqcComplexDLCheck.html'
	})
    
    .state('account_index.iqcComplexDXCheck',{
		url:'/iqcComplexDXCheck',
		controller:'iqcComplexDXCheckCtrl',
		templateUrl:'iqc/iqc_record/iqcComplexDXCheck.html'
	})

    .state('account_index.iqcSimpleDLCheck',{
		url:'/iqcSimpleDLCheck',
		controller:'iqcSimpleDLCheckCtrl',
		templateUrl:'iqc/iqc_record/iqcSimpleDLCheck.html'
	})
    
     .state('account_index.iqcSimpleDXCheck',{
		url:'/iqcSimpleDXCheck',
		controller:'iqcSimpleDXCheckCtrl',
		templateUrl:'iqc/iqc_record/iqcSimpleDXCheck.html'
	})

   .state('account_index.iqcComplexDXRevise',{
		url:'/iqcComplexDXRevise',
		controller:'iqcComplexDXReviseCtrl',
		templateUrl:'iqc/iqc_record/iqcComplexDXRevise.html'
	})
    
     .state('account_index.iqcComplexDLRevise',{
		url:'/iqcComplexDLRevise',
		controller:'iqcComplexDLReviseCtrl',
		templateUrl:'iqc/iqc_record/iqcComplexDLRevise.html'
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
	.state('account_index.selectmode',{
		url:'/selectmode',
		controller:'iqcIndexCtrl',
		templateUrl:'iqc/iqc_add/selectmode.html'
	})
	.state('account_index.iqcAdd',{
		url:'/iqcAdd',
		controller:'iqcAddCtrl',
		templateUrl:'iqc/iqc_add/iqcAdd.html'
	})

 	.state('account_index.iqcqrcodeAdd',{
		url:'/iqcqrcodeAdd',
		controller:'iqcqrcodeAddCtrl',
		templateUrl:'iqc/iqc_add/iqcqrcodeAdd.html'
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
		controller:'iqcComplexDLAddCtrl',
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
	.state('account_index.IPQCqrCode',{
		url:'/IPQCqrCode',
		controller:'qrCodeCtrl',
		templateUrl:'tool/qrCode/IPQCqrcode.html'
	})
	.state('account_index.FQCqrCode',{
		url:'/FQCqrCode',
		controller:'qrCodeCtrl',
		templateUrl:'tool/qrCode/FQCqrCode.html'
	})
	.state('account_index.OQCqrCode',{
		url:'/OQCqrCode',
		controller:'qrCodeCtrl',
		templateUrl:'tool/qrCode/OQCqrCode.html'
	})

	.state('account_index.iqcDataCount',{
		url:'/iqcDataCount',
		templateUrl:'iqc/iqc_dataCount/chooseCount.html'
	})
	.state('account_index.dailyDetails',{
		url:'/dailyDetails',
		controller: 'dailyDetailsCtrl',
		templateUrl:'iqc/iqc_dataCount/dailyDetails.html'
	})
	.state('account_index.dailyStatistics_venmat',{
		url:'/dailyStatistics0',
		controller: 'dailyStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/dailyStatistics_venmat.html'
	})
	.state('account_index.dailyStatistics_matven',{
		url:'/dailyStatistics1',
		controller: 'dailyStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/dailyStatistics_matven.html'
	})
	.state('account_index.dailyStatistics_vendor',{
		url:'/dailyStatistics_vendor',
		controller: 'dailyStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/dailyStatistics_vendor.html'
	})
	.state('account_index.dailyStatistics_material',{
		url:'/dailyStatistics_material',
		controller: 'dailyStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/dailyStatistics_material.html'
	})
	.state('account_index.monthlyDetails',{
		url:'/monthlyDetails',
		controller: 'monthlyDetailsCtrl',
		templateUrl:'iqc/iqc_dataCount/monthlyDetails.html'
	})
	.state('account_index.monthlyStatistics',{
		url:'/monthlyStatistics',
		controller: 'monthlyStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/monthlyStatistics.html'
	})
	.state('account_index.monthlyStatistics_venmat',{
		url:'/monthlyStatistics_venmat',
		controller: 'monthlyStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/monthlyStatistics_venmat.html'
	})
	.state('account_index.monthlyStatistics_matven',{
		url:'/monthlyStatistics_matven',
		controller: 'monthlyStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/monthlyStatistics_matven.html'
	})
	.state('account_index.monthlyStatistics_material',{
		url:'/monthlyStatistics_material',
		controller: 'monthlyStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/monthlyStatistics_material.html'
	})
	.state('account_index.monthlyStatistics_vendor',{
		url:'/monthlyStatistics_vendor',
		controller: 'monthlyStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/monthlyStatistics_vendor.html'
	})
	.state('account_index.monthlySumStatistics',{
		url:'/monthlySumStatistics',
		controller: 'monthlySumStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/monthlySumStatistics.html'
	})
	.state('account_index.monthlySumStatics_Sampling',{
		url:'/monthlySumStatics_Sampling',
		controller: 'monthlySumStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/monthlySumStatics_Sampling.html'
	})
	.state('account_index.monthlySumStatics_PPM',{
		url:'/monthlySumStatics_PPM',
		controller: 'monthlySumStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/monthlySumStatics_PPM.html'
	})
	.state('account_index.monthlySumStatics_Batch',{
		url:'/monthlySumStatics_Batch',
		controller: 'monthlySumStatisticsCtrl',
		templateUrl:'iqc/iqc_dataCount/monthlySumStatics_Batch.html'
	})
	.state('account_index.monthlyChart_vendor_allmat',{
		url:'/monthlyChart_vendor(allmat)',
		controller: 'monthlyChart_vendorCtrl',
		templateUrl: 'iqc/iqc_dataCount/monthlyChart_vendor(allmat).html'
	})
	.state('account_index.monthlyChart_vendor_onemat',{
		url:'/monthlyChart_vendor(onemat)',
		controller: 'monthlyChart_vendorCtrl',
		templateUrl: 'iqc/iqc_dataCount/monthlyChart_vendor(onemat).html'
	})
	.state('account_index.monthlyChart_material_allven',{
		url:'/monthlyChart_material(allven)',
		controller: 'monthlyChart_materialCtrl',
		templateUrl: 'iqc/iqc_dataCount/monthlyChart_material(allven).html'
	})
	.state('account_index.monthlyChart_material_oneven',{
		url:'/monthlyChart_material(oneven)',
		controller: 'monthlyChart_materialCtrl',
		templateUrl: 'iqc/iqc_dataCount/monthlyChart_material(oneven).html'
	})
	.state('honey1',{
		url:'/wechat/honey1',
		// controller: 'monthlyChart_materialCtrl',
		templateUrl: 'wechattest/honey1.html'
	})
	.state('honey2',{
		url:'/wechat/honey2',
		// controller: 'monthlyChart_materialCtrl',
		templateUrl: 'wechattest/honey2.html'
	})	
	.state('honey3',{
		url:'/wechat/honey3',
		// controller: 'monthlyChart_materialCtrl',
		templateUrl: 'wechattest/honey3.html'
	})
	.state('honey4',{
		url:'/wechat/honey4',
		// controller: 'monthlyChart_materialCtrl',
		templateUrl: 'wechattest/honey4.html'
	})
	.state('rice1',{
		url:'/wechat/rice1',
		// controller: 'monthlyChart_materialCtrl',
		templateUrl: 'wechattest/rice1.html'
	})
	.state('rice2',{
		url:'/wechat/rice2',
		// controller: 'monthlyChart_materialCtrl',
		templateUrl: 'wechattest/rice2.html'
	})
	.state('about',{
		url:'/wechat/about',
		// controller: 'monthlyChart_materialCtrl',
		templateUrl: 'wechattest/about.html'
	})
}]);




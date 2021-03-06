
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// 合并css和js文件
		concat: {
			// css: {
			// 	src: ["src/iqc/dataCount/dataCount.less","src/iqc/index/login.less"],
			// 	dest: 'src/asset/style.less'
			// },
			controller: {

				src: ["src/account/login/loginController.js","src/account/login/WebCtrl.js","src/account/sigup/sigupController.js",
                "src/account/account_index/account_indexController.js","src/account/userSetting/userSettingCtrl.js",
				"src/account/chooseTeam/chooseTeamController.js","src/account/chooseModule/chooseModuleCtrl.js",
				"src/account/userManage/userManageCtrl.js","src/account/agreeMem/agreeMemCtrl.js",
				"src/account/applyApproval/applyApprovalCtrl.js","src/account/company_index/.company_indexCtrl.js",
				"src/account/joinCo/joinCoCtrl.js","src/account/comSetting/comSettingCtrl.js",
				"src/manage/engineer/material/materialCtrl.js",'src/manage/engineer/material/materiallistCtrl.js',
				"src/manage/customer/customer/customerCtrl.js",'src/manage/customer/customer/customerlistCtrl.js',
				"src/manage/vendor/vendor/vendorCtrl.js",'src/manage/vendor/vendor/vendorlistCtrl.js',
				'src/plan/planListCtrl.js','src/plan/planCheckCtrl.js',"src/plan/planReviseCtrl.js",
				"src/plan/planAddCtrl.js","src/plan/planMetricListCtrl.js","src/plan/planHistoryListCtrl.js","src/plan/planMetricListCheckCtrl.js",
				"src/iqc/iqc_index/iqcIndexCtrl.js","src/iqc/iqc_add/iqcAddCtrl.js","src/iqc/iqc_dataCount/iqcDataCountCtrl.js",
				"src/iqc/iqc_record/iqcRecordCtrl.js","src/iqc/iqc_add/iqcComplexDLAddCtrl.js","src/iqc/iqc_add/iqcComplexDXAddCtrl.js",
				"src/iqc/iqc_add/iqcSimpleDLAddCtrl.js","src/iqc/iqc_add/iqcSimpleDXAddCtrl.js","src/tool/qrCode/qrCodeCtrl.js",
				"src/iqc/iqc_add/iqcAddCheckCtrl.js","src/tool/tool_index/tool_indexCtrl.js",
				"src/iqc/iqc_dataCount/dailyDetailsCtrl.js","src/iqc/iqc_dataCount/monthlyDetailsCtrl.js","src/iqc/iqc_dataCount/monthlyChart_vendorCtrl.js","src/iqc/iqc_dataCount/monthlyChart_materialCtrl.js","src/iqc/iqc_dataCount/monthlyStatisticsCtrl.js","src/iqc/iqc_dataCount/dailyStatisticsCtrl.js","src/iqc/iqc_dataCount/monthlySumStatisticsCtrl.js",
				"src/plan/planHistoryListCheckCtrl.js","src/plan/planHistoryMetricListCtrl.js","src/plan/planHistoryListCopyCtrl.js",
				"src/iqc/iqc_record/iqcRecordCheckCtrl.js","src/iqc/iqc_record/iqcRecordReviseCtrl.js","src/iqc/iqc_record/iqcComplexDLCheckCtrl.js","src/iqc/iqc_record/iqcComplexDXCheckCtrl.js","src/iqc/iqc_add/iqcqrcodeAddCtrl.js",
				"src/iqc/iqc_record/iqcSimpleDLCheckCtrl.js","src/iqc/iqc_record/iqcSimpleDXCheckCtrl.js","src/iqc/iqc_record/iqcComplexDLReviseCtrl.js","src/iqc/iqc_record/iqcComplexDXReviseCtrl.js","src/wechattest/*.js"
				],
				dest: "src/asset/concat/controller.js"
			},
			service: {
				src: ["src/account/login/loginService.js","src/account/sigup/sigupService.js",
				"src/account/account_index/account_indexServicer.js","src/account/userSetting/userSettingService.js",
				"src/account/chooseTeam/chooseTeamService.js",'src/account/chooseModule/chooseModuleService.js',
				"src/account/userManage/userManageService.js","src/account/agreeMem/agreeMemService.js",
				"src/manage/engineer/material/materiallistService.js"
				],
				dest: "src/asset/concat/service.js"
			},
			zchar : {
				src: ["src/asset/concat/controller.js","src/asset/concat/service.js"],
				dest: "src/asset/ng-zchar.js"
			}
		}, 

		// 将less编译成css
// 		less: {
// 			compile: {
//                 files: {
//                     'src/asset/style.css': ['src/asset/style.less'] // 需要编译的less文件
//                 }
//             }
//         },
		
		// 压缩css文件
		// cssmin: {
		// 	minify: {
		// 	    options: {
		// 	      banner: '/**\n * Theme Name: FIMS\n * Author: zchar\n * Author URI: http://zchar-hong.com\n * Description: 组织部网站开发 \n * Version: 1.0\n**/'
		// 	    },
		// 	    files: {
		// 	      'src/asset/style.min.css': ['src/asset/style.css']
		// 	    }
		// 	}
		// },

		// 压缩js文件
		uglify: {
		    options: {
		        banner: '/*! <%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %> */\n'
		    },
		    build: {
		        files: {
		            // 'src/asset/controller.min.js': ['src/asset/concat/controller.js'],
		            // 'src/asset/service.min.js': ['src/asset/concat/service.js'],
		            // 'src/asset/angular-ui-router.min.js': ['src/asset/concat/angular-ui-router.js'],
		            'src/asset/routes.min.js': ['src/common/routes.js'] 
		        }
		    }
		},

		// 实时监听文件变化并编译
		watch: {
			files: ["src/common/routes.js","src/account/login/*.js","src/account/sigup/*.js",
			"src/account/account_index/*.js","src/account/userSetting/*.js","src/account/chooseTeam/*.js",
			"src/account/chooseModule/*.js","src/account/userManage/*.js","src/account/agreeMem/*.js",
			"src/account/applyApproval/*.js","src/account/company_index/*.js","src/account/joinCo/*.js",
			"src/account/comSetting/*.js",'src/manage/engineer/material/*.js',
			"src/manage/customer/customer/*.js",'src/manage/vendor/vendor/*.js',
			"src/plan/*.js","src/iqc/iqc_index/iqcIndexCtrl.js","src/iqc/iqc_add/*.js","src/iqc/iqc_dataCount/iqcDataCountCtrl.js",
			"src/iqc/iqc_record/*.js","src/tool/qrCode/*.js","src/tool/tool_index/*.js","src/iqc/iqc_dataCount/*.js","src/wechattest/*.js"
			],
        	// tasks: ['concat','less', 'cssmin', 'uglify']
        	tasks: ['concat', 'uglify']
        	
        }
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	// grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 编译，将less转换成css，压缩html，js，css

	grunt.registerTask('default', ['concat', 'uglify','watch']);
	// grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'watch']);
	// grunt.registerTask('build', ['less', 'cssmin', 'uglify']);
};


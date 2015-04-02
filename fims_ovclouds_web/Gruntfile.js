
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
				src: ["src/account/login/loginController.js","src/account/sigup/sigupController.js"],
				dest: "src/asset/concat/controller.js"
			},
			service: {
				src: ["src/account/login/loginService.js","src/account/sigup/sigupService.js"],
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
			files: ["src/common/routes.js","src/account/login/*.js","src/account/sigup/*.js"],
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


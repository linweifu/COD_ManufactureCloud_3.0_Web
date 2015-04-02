require.config({
	baseUrl: "js",
	paths: {
		'angular': './lib/angular.js',
		'uiRouter': './lib/angular-ui-router.js',
		'jQuery': './lib/jquery-2.1.1.js',
	},
	shim: {
		'angular': {'exports' : 'angualr'},
		'uiRouter': ['angular'],
		'jQuery': {'exports': '$'}
	}
});

require( [
	'angular',
	'jQuery',
	'app',
	'routes'] ,function(angular, $, app) {
		
	})
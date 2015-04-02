FIMS.factory('indexService',  ['$location', '$rootScope', '$http' ,function($location,$rootScope, $http) {
	var dates = {};
	var HOST = "http://"+config.Interface;
	dates.user = {
		userId: '',
		password: '',
		returnMsg:'',
		code: false
	}
	dates.subData = function () {
		$http({
			method: 'POST',
			url: HOST+'/api/1.0/user-manager/userLogin',
			headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"userId": dates.user.userId,
				"password": dates.user.password
			}

		}).success(function (data) {
			if(data.code == "N01"){
				console.log(data);
				$location.path("joinTeam");
				// $rootScope.userId = data.array;
				window.localStorage.clear();
				// $.cookie("userId",null,{path:"/"});
				var storage = window.localStorage;
				if(storage){
						var localData = data.array;
						storage.setItem('userId',localData);	
					}else{
						var localData = data.array;
						$.cookie('userId',localData);
					}
			}
			else{
				dates.user.returnMsg = data.message;
				dates.user.code = true;
			}
		}).error(function(){
			console.log('error')
		});
	}

	return dates;
}]);

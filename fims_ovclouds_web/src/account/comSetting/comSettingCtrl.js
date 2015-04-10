FIMS.controller('comSettingCtrl', ['$scope','$location',function($scope,$location){
	var comSetting = {
		shortName: getItem('curCompanyName'),
		name: '',
		comCode: '',
		comTel: '',
		comWeb: '',
		dictionary: {
			// country: [],
			province: [],
			city: [],
			industry: [],
			industry2: []
		},
		address: {
			province: {
				name: '',
				code: ''
			},
			city: {
				name: '',
				code: ''
			}
		}
	};

	comSetting.getProvince = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCountry",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid')
			}

		})
		.success(function(data){
            if (data.code=="N01"){
                login.dictionary.country.length = 0;
                for (var i=0;i < data.array.length;i++){
                    login.dictionary.country.push({
                        "id" : data.array[i].countryRegionId,
                        "name": data.array[i].countryRegion
                    });
                }   
            }
            else {
                console.log(data.message);
            }
        }).error(function () {
            console.log('error');
        });
	}

	comSetting.getCity = function(){

	}

	comSetting.queryType = function(){

	}

	comSetting.queryIndustry = function(){

	}

	$scope.comSetting = comSetting;


}])
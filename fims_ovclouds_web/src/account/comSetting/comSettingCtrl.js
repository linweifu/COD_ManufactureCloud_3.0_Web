FIMS.controller('comSettingCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var comSetting = {
		shortName: localStorage.getItem('curCompanyName'),
		name: '',
		comCode: '',
		comTel: '',
		comWeb: '',
		dictionary: {
			// country: [],
			province: [],
			city: [],
			iType: [],
			iInfo: []
		},
		industry: {
			iType: {
				name: '',
				code: ''
			},
			iInfo: {
				name: '',
				code: ''
			}

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

	comSetting.improveComInfo = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/company/improveCompanyInfo",
			// url: "account/comSetting/improveComInfo.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				 "contents": {
			        "companySid": localStorage.getItem("cSid"),
			        "companyShortName": comSetting.shortName,
			        "companyFullName": comSetting.name,
			        "companyRegionCode": comSetting.address.province.code,
			        "companyRegion": comSetting.address.province.name,
			        "companyProvinceCode": comSetting.address.city.code,
			        "companyProvince": comSetting.address.city.name,
			        "companyIndustryCode": comSetting.industry.iInfo.code,
			        "companyIndustry": comSetting.industry.iInfo.name,
			        "companyZipCode": comSetting.comCode,
			        "companyPhone": comSetting.comTel,
			        "companyWebsite": comSetting.comWeb
			    }
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	alert("公司信息更新成功");
            	$location.path("account_index/chooseModule");
            }
            else if(data.code=="E00"){
            	alert(data.message+"（获取省份）,请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('improveComInfo'+data.message);
        });
	}

	comSetting.getProvince = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicProvince",
			// url: "account/comSetting/Province.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid')
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.province = [];
                for (var i=0;i < data.contents.length;i++){
                    comSetting.dictionary.province.push({
                        "name": data.contents[i].provinceName,
                        "code" : data.contents[i].provinceCode
                    });
                }   
            }
            else if(data.code=="E00"){
            	alert(data.message+"（获取省份）,请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('data.message');
        });
	}

	comSetting.getProvince();

	comSetting.getCity = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCity",
			// url: "account/comSetting/City.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"provinceCode": comSetting.address.province.code
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.city = [];
                for (var i=0;i < data.contents.length;i++){
                    comSetting.dictionary.city.push({
                        "name": data.contents[i].cityName,
                        "code" : data.contents[i].cityCode
                    });
                }   
            }
         	else if(data.code=="E00"){
            	alert(data.message+"（获取城市）,请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }        
        }).error(function () {
            console.log('error');
        });
	}

	comSetting.queryType = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCompanyIndustryType",
			// url: "account/comSetting/Industry.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid')
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.iType = [];
                for (var i=0;i < data.contents.length;i++){
                    comSetting.dictionary.iType.push({
                        "code": data.contents[i].companyIndustryCode,
                        "name" : data.contents[i].companyIndustry
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

	comSetting.queryType();


	comSetting.queryInfo = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCompanyIndustry",
			// url: "account/comSetting/Industry.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companyIndustryCode": comSetting.industry.iType.code
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.iInfo = [];
                for (var i=0;i < data.contents.length;i++){
                    comSetting.dictionary.iInfo.push({
                        "code": data.contents[i].companyIndustryCode,
                        "name" : data.contents[i].companyIndustry
                    });
                }   
            }
            else if(data.code=="E00"){
            	alert(data.message+"（获取行业内容）,请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }        
            
        }).error(function () {
            console.log('error');
        });

	}

	$scope.comSetting = comSetting;


}])
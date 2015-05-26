FIMS.controller('comSettingCtrl', ['$scope','$location','$http','$q',function($scope,$location,$http,$q){
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
			iInfo: [],
			input_way: [
				{
					input_way_code: "CE",
					input_way_name: "复杂录入"
				},
				{
					input_way_code: "SE",
					input_way_name: "简单录入"
				}
			]
		},

		input_way: {},
		
		iType: {},
		iInfo: {},

		aPro: {},
		aCity: {},
	};

	$scope.back = function(){
		var a = confirm("您确定要退出吗？退出将丢失填写数据!")
		if (a) {
			history.go(-1);
		}
	}



	// 完善公司信息
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
			        "companyRegionCode": "86#",
			        "companyRegion": "中国",
			        "companyProvinceCode": comSetting.aPro.provinceCode,
			        "companyProvince": comSetting.aPro.provinceName,
			        "companyCityCode": comSetting.aCity.cityCode,
			        "companyCity": comSetting.aCity.cityName,
			        "companyIndustryCode": comSetting.iInfo.companyIndustryCode,
			        "companyIndustry": comSetting.iInfo.companyIndustry,
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

	comSetting.getCity = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCity",
			// url: "account/comSetting/City.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"provinceCode": comSetting.aPro.provinceCode
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.city = [];
                comSetting.dictionary.city = data.contents;
            }
         	else if(data.code=="E00"){
            	alert(data.message+",请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }        
        }).error(function () {
            console.log('error');
        });
	}


	comSetting.queryInfo = function(){
		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/dic/queryDicCompanyIndustry",
			// url: "account/comSetting/Industry.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companyIndustryCode": comSetting.iType.companyIndustryCode
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                comSetting.dictionary.iInfo = [];
                // comSetting.iInfo = {};
                comSetting.dictionary.iInfo = data.contents;
                // for (var i=0;i < data.contents.length;i++){
                //     comSetting.dictionary.iInfo.push({
                //         "code": data.contents[i].companyIndustryCode,
                //         "name" : data.contents[i].companyIndustry
                //     });
                // }   
            }
            else if(data.code=="E00"){
            	alert(data.message+",请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }        
            
        }).error(function () {
            console.log('error');
        });

	}

	
	// 使用Promise规范

	comSetting.getProvince = function(){
		var deferred = $q.defer();
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
                comSetting.dictionary.province = data.contents;
                deferred.resolve(data.contents);
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
        return deferred.promise;
	}

	// 获取行业类型
	comSetting.queryType = function(){
		var deferred = $q.defer();
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
                // comSetting.dictionary.iType = [];
                deferred.resolve(data.contents);
                comSetting.dictionary.iType = data.contents;
            }
            else {
                console.log(data.message);
            }
        }).error(function () {
            console.log('error');
        });

        return deferred.promise;
	}

	//Promise规范
	var promises = [];
	var deferred = $q.defer();

	var dicPro = comSetting.getProvince();
	var dicType = comSetting.queryType();

	promises.push(dicPro);
	promises.push(dicType);

	$q.all(promises).then(function(prodata){
        // comSetting.dictionary.province = prodata[0];
        // comSetting.dictionary.iType = prodata[1];

		$http({
			method: "POST",
			url: config.HOST + "/api/2.0/bp/account/company/queryCompanyExtendInfo",
			// url: "account/comSetting/queryCompanyExtendInfo.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem("cSid")
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	comSetting.shortName = data.contents.companyShortName ;
		        comSetting.name = data.contents.companyFullName;
		        comSetting.dictionary.city = data.contents.companyCityDic;
		        comSetting.aCity = (comSetting.dictionary.city)[data.contents.companyCityDisplay];
		        comSetting.aPro = prodata[0][data.contents.companyProvinceDisplay];
		        comSetting.iType = prodata[1][data.contents.industryTypeDisplay];
		        comSetting.dictionary.iInfo = data.contents.industryDic;
		        comSetting.iInfo = comSetting.dictionary.iInfo[data.contents.industryDisplay];
			    comSetting.comCode = data.contents.companyZipCode;
			    comSetting.comTel = data.contents.companyPhone;
			    comSetting.comWeb = data.contents.companyWebsite;
            }
            else if(data.code=="E00"){
            	alert(data.message+",请重新登陆");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('improveComInfo'+data.message);
        });

	});

	var queryCompanySite = function() {
		var i = (localStorage.getItem("input_way_code")=="CE")?0:1;
        comSetting.input_way = comSetting.dictionary.input_way[i];
		// $http({
		// 	method: "POST",
		// 	// url: config.HOST + "/api/2.0/bp/account/company/queryCompanySite",
		// 	url: "account/comSetting/queryCompanySite.json",
  //           headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
		// 	data: {
		// 		"sid": localStorage.getItem('sid'),
		// 		"companySid": localStorage.getItem('cSid')
		// 	}
		// })
		// .success(function(data){
  //           if (data.code=="N01"){
  //               var i = (data.contents.checkoutRecordInputWayCode=="CE")?0:1;
  //               comSetting.input_way = comSetting.dictionary.input_way[i];
  //           }
  //           else if(data.code=="E00"){
  //           	alert(data.message+",请重新登陆");
  //           	localStorage.clear();
  //           	$location.path('login');
  //           }else {
  //           	console.log(data.message);
  //           }        
            
  //       }).error(function () {
  //           console.log('error');
  //       });
	}
	queryCompanySite();

	$scope.updateCompanySite = function() {
		$http({
			method: "POST",
			// url: config.HOST + "/api/2.0/bp/account/company/updateCompanySite",
			url: "account/comSetting/updateCompanySite.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"companySid": localStorage.getItem('cSid'),
				"checkoutRecordInputWayCode": comSetting.input_way.input_way_code
			}
		})
		.success(function(data){
            if (data.code=="N01"){
                localStorage.setItem("input_way_code",comSetting.input_way.input_way_code);
                alert(data.message);
            }
            else if(data.code=="E00"){
            	alert(data.message+",请重新登陆");
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
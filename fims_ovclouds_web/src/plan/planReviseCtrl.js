FIMS.controller('planReviseCtrl', ['$scope','$location','$http',function($scope,$location,$http){
	var planRevise = {

		keyCheckoutPlan:{
/*
{
            "sid":"123",
            "checkoutPlanSid": 1,
            "checkoutPlanNo": "20140420",
            "checkoutPlanVersion": "A",
            "checkoutPlanTypeCode": "A",
            "checkoutPlanType": "A",
            "companySid": 1,
            "companyShortName": "极创",
            "materialSid": 1,
            "materialNo": "1",
            "materialVersion": "A",
            "materialShortName": "A",
            "aql": 5,
            "entrySid": 1,
            "entrySidHash": 1,
            "entryId": "1",
            "entryJobNumber": "123",
            "entryName": "123",
            "entryTime": 123,
            "makeJobNumber": "2014",
            "makeName": "123",
            "makeTime": 123,
            "operateStatusCode": "1",
            "operateStatus": "1",
            "checkoutPlanStatusCode": "1",
            "checkoutPlanStatus": "1",
            "notes": "1",
            "page":"2"

}
*/
            sid:"",
            checkoutPlanSid: 1,
            checkoutPlanNo: "",
            checkoutPlanVersion: "",
            checkoutPlanTypeCode: "",
            checkoutPlanType: "",
            companySid: 1,
            companyShortName: "",
            materialSid: 1,
            materialNo: "",
            materialVersion: "",
            materialShortName: "",
            aql: 5,
            entrySid: 1,
            entrySidHash: 1,
            entryId: "",
            entryJobNumber: "",
            entryName: "",
            entryTime: 123,
            makeJobNumber: "2014",
            makeName: "123",
            makeTime: 123,
            operateStatusCode: "1",
            operateStatus: "1",
            checkoutPlanStatusCode: "1",
            checkoutPlanStatus: "1",
            notes: "1",
            page:"2"
		},

		auxCheckoutPlan:{
/*
{
            "checkoutPlanSid": 1,
            "checkoutPlanSidHash": 1,
            "checkoutPlanNo": "20140420",
            "checkoutPlanVersion": "A",
            "checkoutPlanTypeCode": "A",
            "checkoutPlanType": "A",
            "companySid": 1,
            "companySidHash": 1,
            "companyShortName": "极创",
            "materialSid": 1,
            "materialSidHash": 1,
            "materialNo": "1",
            "materialVersion": "A",
            "materialShortName": "A",
            "aql": 5,
            "entrySid": 1,
            "entrySidHash": 1,
            "entryId": "1",
            "entryJobNumber": "123",
            "entryName": "123",
            "entryTime": 123,
            "makeJobNumber": "2014",
            "makeName": "123",
            "makeTime": 123,
            "operateStatusCode": "1",
            "operateStatus": "1",
            "checkoutPlanStatusCode": "1",
            "checkoutPlanStatus": "1",
            "notes": "1"
}
*/
            checkoutPlanSid: 1,
            checkoutPlanSidHash: 1,
            checkoutPlanNo: "20140420",
            checkoutPlanVersion: "A",
            checkoutPlanTypeCode: "A",
            checkoutPlanType: "A",
            companySid: 1,
            companySidHash: 1,
            companyShortName: "极创",
            materialSid: 1,
            materialSidHash: 1,
            materialNo: "1",
            materialVersion: "A",
            materialShortName: "A",
            aql: 5,
            entrySid: 1,
            entrySidHash: 1,
            entryId: "1",
            entryJobNumber: "123",
            entryName: "123",
            entryTime: 123,
            makeJobNumber: "2014",
            makeName: "123",
            makeTime: 123,
            operateStatusCode: "1",
            operateStatus: "1",
            checkoutPlanStatusCode: "1",
            checkoutPlanStatus: "1",
            notes: "1"

		},

		selectedCheckoutPlanSid: 0


	};
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/
	var dataTransfer = function(oObj,iObj){

            oObj.sid                  = iObj.sid,
            oObj.checkoutPlanSid      = iObj.checkoutPlanSid;
            oObj.checkoutPlanNo       =	iObj.checkoutPlanNo;
            oObj.checkoutPlanVersion  =	iObj.checkoutPlanVersion;
            oObj.checkoutPlanTypeCode =	iObj.checkoutPlanTypeCode;
            oObj.checkoutPlanType     =	iObj.checkoutPlanType;
            oObj.companySid           =	iObj.companySid;
            oObj.companyShortName     =	iObj.companyShortName;
            oObj.materialSid          =	iObj.materialSid;
            oObj.materialNo           =	iObj.materialNo;
            oObj.materialVersion      =	iObj.materialVersion;
            oObj.materialShortName    =	iObj.materialShortName;
            oObj.aql                  =	iObj.aql;
            oObj.entrySid             =	iObj.entrySid;
            oObj.entrySidHash         =	iObj.entrySidHash;
            oObj.entryId              =	iObj.entryId;
            oObj.entryJobNumber       =	iObj.entryJobNumber;
            oObj.entryName            =	iObj.entryName;
            oObj.entryTime            =	iObj.entryTime;
            oObj.makeJobNumber        =	iObj.makeJobNumber;
            oObj.makeName             =	iObj.makeName;
            oObj.makeTime             =	iObj.makeTime;
            oObj.operateStatusCode    =	iObj.operateStatusCode;
            oObj.operateStatus        =	iObj.operateStatus;
            oObj.checkoutPlanStatusCode = iObj.checkoutPlanStatusCode;
            oObj.checkoutPlanStatus   =	iObj.checkoutPlanStatus;
            oObj.notes                =	iObj.notes;
            oObj.page                 =	iObj.page;

	}
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/
	planRevise.querySingleQCP = function(){
		$http({
			method: "POST",
			//url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleQCP",
			 url: "plan/querySingleQCP.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutPlanSid": planRevise.selectedCheckoutPlanSid
			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	//alert("公司信息更新成功");
            	//$location.path("account_index/chooseModule");
            	planRevise.auxCheckoutPlan = data.contents;
            	console.log(planRevise.auxCheckoutPlan);
            	dataTransfer(planRevise.keyCheckoutPlan,planRevise.auxCheckoutPlan);

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('querySingleQCP'+data.message);
        });
	}

/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

	planRevise.updateQCP = function(){

		// 准备参数
		var assemblyObj = function(){
			var o = {};

			o.sid		                = planRevise.keyCheckoutPlan.sid,
            o.checkoutPlanSid		    = planRevise.keyCheckoutPlan.checkoutPlanSid,
            o.aql		                = planRevise.keyCheckoutPlan.aql,
            o.entryId		            = planRevise.keyCheckoutPlan.entryId,
            o.entryJobNumber		    = planRevise.keyCheckoutPlan.entryJobNumber,
            o.entryName		            = planRevise.keyCheckoutPlan.entryName,
            o.entryTime		            = planRevise.keyCheckoutPlan.entryTime,
            o.makeJobNumber		        = planRevise.keyCheckoutPlan.makeJobNumber,
            o.makeName		            = planRevise.keyCheckoutPlan.makeName,
            o.makeTime		            = planRevise.keyCheckoutPlan.makeTime,
            o.notes		                = planRevise.keyCheckoutPlan.notes

			return o;
		}

		var entry = assemblyObj();

		 alert("set11");
        console.log(entry);
	 	 alert("set11");

		//
		$http({
			method: "POST",
			//url: config.HOST + "/api/2.0/bp/qcp/qcp/updateQCP",
			url: "plan/updateQCP.json",
            headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
					sid		                    : entry.sid,
		            checkoutPlanSid		        : entry.checkoutPlanSid,
		            aql		                    : entry.aql,
		            entryId		                : entry.entryId,
		            entryJobNumber		        : entry.entryJobNumber,
		            entryName		            : entry.entryName,
		            entryTime		            : entry.entryTime,
		            makeJobNumber		        : entry.makeJobNumber,
		            makeName		            : entry.makeName,
		            makeTime		            : entry.makeTime,
		            notes		                : entry.notes

			}
		})
		.success(function(data){
            if (data.code=="N01"){
            	alert("检验计划信息更新成功");
          //  	//$location.path("account_index/chooseModule");

            }
            else if(data.code=="E00"){
            	alert(data.message+"，请重新登录");
            	localStorage.clear();
            	$location.path('login');
            }else {
            	console.log(data.message);
            }
        }).error(function () {
            console.log('updateQCP'+data.message);
        });
	}

/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

	$scope.planRevise = planRevise;

 	// alert("set");
 	localStorage.setItem('checkoutPlanSid','111');
 	// alert("get");
 	planRevise.selectedCheckoutPlanSid = localStorage.getItem('checkoutPlanSid');
 	// alert("remove");
 	localStorage.removeItem('checkoutPlanSid');

	planRevise.querySingleQCP();

}])

/*
***************************************************
***************************************************
***************************************************
***************************************************
*/
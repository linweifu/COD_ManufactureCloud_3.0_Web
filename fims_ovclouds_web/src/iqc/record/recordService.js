FIMS.factory('recordService',['$location','$rootScope','$http','$q',
	function($location,$rootScope,$http, $q){
		var record = {};
		//get RecordList Data
		var HOST = "http://"+config.Interface;
		record.getRecordList = function(page,companyid){
			$('#qc_tab3').removeClass("tab3_selected");
			$('#qc_tab2').removeClass("tab2_selected");
			$('#qc_tab1').addClass("tab1_selected");
			var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: HOST+'/api/1.0/record-manager/getAllQCRsByCompanyId',
                    data: {
                    	"page": page,
                    	"companyid": companyid 
                    }
                }).success(function (data) {
                	console.log(data);
                    deferred.resolve(data);

                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
		}

		record.localTo = function(){
			$("#qc_form1_tab").click(function() {
			  	$('.qc_form_tab li').removeClass('qc_form_selected');
		        $("#qc_form1_tab").addClass('qc_form_selected');
			});
			$("#qc_form2_tab").click(function() {
		        $('.qc_form_tab li').removeClass('qc_form_selected');
		        $("#qc_form2_tab").addClass('qc_form_selected');
			});
			$("#qc_form3_tab").click(function() {
			 	$('.qc_form_tab li').removeClass('qc_form_selected');
		        $("#qc_form3_tab").addClass('qc_form_selected');
			});
		}
		
		record.getSingleRecord = function(){
			var recordId = this.array.checkoutRecordId;
			// console.log(recordId);
			$http({
				method: 'POST',
				url: HOST+'/api/1.0/record-manager/getQCRById',
				data: {"checkoutRecordId":recordId}
			}).success(function(data){
				console.log(data.array)
				var recordDL =	data.array.quantitativeChecks.items;
				var recordDX =	data.array.qualitativeChecks.items;
				// console.log(recordDL);
				// console.log(recordDX);

				var recordDLItemValue = [];
				var recordDXItemValue = [];

				for (var i=0;i<recordDL.length;i++) {
					var tempArr = recordDL[i].matricDataValue.split(",");
					recordDLItemValue.push(tempArr.splice(0,tempArr.length-1));
				}

				for (var i=0;i<recordDX.length;i++) {
					var tempArr = recordDX[i].matricDataValue.split(",");
					recordDXItemValue.push(tempArr.splice(0,tempArr.length-1));
				}

				console.log(recordDLItemValue);
				console.log(recordDLItemValue);

				$rootScope.SingleRecord = data;
				$rootScope.SingleRecordDLValues = recordDLItemValue;
				$rootScope.SingleRecordDXValues = recordDXItemValue;


    //         	if(storage){
				// 	var localData = JSON.stringify(data);
				// 	storage.setItem('recordId',localData);	
				// 	console.log(recordId);
				// }else{
				// 	var localData = JSON.stringify(data);
				// 	$.cookie('recordId',localData);
				// }
            }).error(function(XMLHttpRequest, textStatus,errorThrown){
            	console.log(errorThrown);
        	});
		}

		// record.toLocalStorage = function(){
		// 	window.localStorage.clear();
		// 	var storage = window.localStorage,
		// 		recordId = this.array.checkoutRecordId;
		// 		$http({
		// 			method: 'POST',
		// 			url: HOST+'/api/1.0/record-manager/querySingle',
		// 			data: {"checkoutRecordId":recordId}
		// 			}).success(function(data){
		//             	if(storage){
		// 					var localData = JSON.stringify(data);
		// 					storage.setItem('recordId',localData);	
		// 					console.log(recordId);
		// 				}else{
		// 					var localData = JSON.stringify(data);
		// 					$.cookie('recordId',localData);
		// 				}
		//             }).error(function(XMLHttpRequest, textStatus,errorThrown){
		//             	console.log(errorThrown);
	 //            	});
			
		// }


		return record;
	}

])

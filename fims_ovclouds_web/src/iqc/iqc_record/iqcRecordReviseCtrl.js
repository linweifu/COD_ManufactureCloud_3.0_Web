FIMS.controller('iqcRecordReviseCtrl',['$scope','$location','$http',function($scope,$location,$http){

	var iqcRecordRevise = {

         singleRecord:{

        }

	};
   
   //自执行函数，删除相关本地存储
  function init(){
		localStorage.removeItem('materialSid');
	}

	init();

$scope.iqcRecordRevise = iqcRecordRevise;
 $scope.querySingleIQCRecord = function() {
    	$http({

            method: "POST",
			// url: config.HOST + "/api/2.0/bp/qc/iqc/queryIQCRecord",
			url: "iqc/iqc_record/querySingleIQCRecord.json",
			header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
			data: {
				"sid": localStorage.getItem('sid'),
				"checkoutRecordSid":localStorage.getItem('checkoutRecordSid'),
				"companySid": localStorage.getItem('cSid'),
				 //"page": localStorage.getItem('page')
			}
    	})

    	.success(function(data){
            if (data.code == 'N01') {
            	iqcRecordRevise.singleRecord = data.contents;
                // localStorage.setItem();
                localStorage.setItem("materialSid",$scope.iqcRecordRevise.materialSid);
               // console.log($scope.iqcRecordRevise);
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
        // .error(function () {
        //     console.log('querySingleIQCRecord'+data.message);
        // });
    }

      $scope.querySingleIQCRecord();



	$scope.back = function(){

		history.go(-1);

	}

}])
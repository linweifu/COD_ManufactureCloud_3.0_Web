FIMS.controller('iqcRecordCheckCtrl',['$scope','$location','$http',function($scope,$location,$http,$q){

    var iqcRecordCheck = {



    };
   
   //自执行函数，删除相关本地存储
  function init(){
        localStorage.removeItem('materialSid');
    }

    init();

////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
 $scope.querySingleIQCRecord = function() {
        $http({

            method: "POST",
             //url: config.HOST + "/api/2.0/bp/qc/iqc/queryIQCRecords",
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
                $scope.iqcRecordCheck = data.contents;
                 
                 // localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
                


                // localStorage.setItem();
                //localStorage.setItem("materialSid",$scope.iqcRecordCheck.materialSid);
               // console.log($scope.iqcRecordCheck);
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
/////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////




    // 查询单个检验记录
    var querySingleIQCRecord1 = function(input_way_code){
        //var deffered = $q.defer();

       // var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
        //http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord":"querySingleSimpleIQCRecord";
         var http_url = "iqc/iqc_add/" ;
         http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord.json":"querySingleSimpleIQCRecord.json";
        $http({
            method: "POST",
            // url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleIQCRecord",
            url: http_url,
            header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
            data: {
                "sid": localStorage.getItem('sid'),
                "companySid": localStorage.getItem('cSid'),
                "checkoutRecordSid": localStorage.getItem('checkoutRecordSid')              
            }
        })
        .success(function(data){
            if (data.code == 'N01') {
               // deffered.resolve(data.contents);            
                localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
                localStorage.setItem("DX",JSON.stringify(data.contents.DX));
                localStorage.setItem("DL",JSON.stringify(data.contents.DL));
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })

       // return deffered.promise;
    }

    querySingleIQCRecord1();
 
   


    $scope.back = function(){

        history.go(-1);

    }

}])
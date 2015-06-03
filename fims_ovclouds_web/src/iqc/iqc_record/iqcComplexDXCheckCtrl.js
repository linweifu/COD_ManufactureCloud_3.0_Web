FIMS.controller('iqcComplexDXCheckCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
    var iqcComplexDXCheck = { 
      
    };

  //自执行函数，删除相关本地存储
  function init(){
        localStorage.removeItem('materialSid');
    }

    init();

  //调整时间格式
    // Date.prototype.format = function() {
    //     var year = this.getFullYear().toString();
    //     var month = (this.getMonth()+1).toString();
    //     var day = this.getDate().toString();
    //     // console.log(year);

    //     if (month<10) {
    //         month = "0" + month;
    //     }

    //     if (day<10) {
    //         day = "0" + day;
    //     }

    //     return (year + "-" + month + "-" +day );
    // }

    // var time  = new Date();


 $scope.querySingleComplexIQCRecord = function() {
        $http({

            method: "POST",
             url: config.HOST + "/api/2.0/bp/qc/iqc/querySingleComplexIQCRecord",
            //url: "iqc/iqc_record/querySingleComplexIQCRecord.json",
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
                $scope.iqcComplexDXCheck = data.contents;
               // var giveCheckouttime = new Date($scope.iqcComplexDXCheck.giveCheckoutTime*1000);
                   // maketime = new Date($scope.iqcComplexDXCheck.makeTime*1000);        
                // console.log(entrytime);
               // $scope.iqcComplexDXCheck.giveCheckoutTime = giveCheckouttime.format();
                //$scope.iqcComplexDXCheck.makeTime = maketime.format();

                // localStorage.setItem();
                localStorage.setItem("materialSid",$scope.iqcComplexDXCheck.materialSid);
               // console.log($scope.iqcComplexDXCheck);
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
        //     console.log('querySingleComplexIQCRecord'+data.message);
        // });
    }

      $scope.querySingleComplexIQCRecord();



    // $scope.back = function(){

    //     $location.path("account_index/iqcRecord");

    // }




    $scope.back = function(){

        $location.path("account_index/iqcRecord");

    }

}])
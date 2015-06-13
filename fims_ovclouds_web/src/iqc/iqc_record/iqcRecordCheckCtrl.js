FIMS.controller('iqcRecordCheckCtrl',['$scope','$location','$http',function($scope,$location,$http,$q){

    var iqcRecordCheck = {

        materialNo: "",
        materialName: "",
        materialShortName: "",
        materialVersion: "",
        checkoutPlanNo: "",
        checkoutPlanVersion: "",
        checkoutRecordSid:"",
        externalReceiptNo: "",
        checkoutRecordId:"",
        vendorShortName:"",
        checkoutRecordNo: "",
        batchNo: "",
        giveCheckoutTime: "",
        vendor: "",
        giveCheckoutAmount: "",
        sampleAmount: "",

        companyShortName :localStorage.getItem('curCompanyName')

    };

   // $scope.iqcRecordCheck = iqcRecordCheck;

//调整时间格式
    Date.prototype.format = function() {
        var year = this.getFullYear().toString();
        var month = (this.getMonth()+1).toString();
        var day = this.getDate().toString();
        console.log(year);

        if (month<10) {
            month = "0" + month;
        }

        if (day<10) {
            day = "0" + day;
        }

        return (year + "-" + month + "-" +day );
    }


   
   //自执行函数，删除相关本地存储
  function init(){
        localStorage.removeItem('materialSid');
    }

    init();

/***********************************************************
************************************************************
queryIQCRecords 检验记录查询
************************************************************
***********************************************************/

 $scope.querySingleIQCRecord = function(input_way_code) {
       
        var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
        http_url += (input_way_code == "CE")? "querySingleSimpleIQCRecord":"querySingleComplexIQCRecord";


        $http({

            method: "POST",
            url: http_url,
            // url: config.HOST + "/api/2.0/bp/qc/iqc/queryIQCRecords",
            //url: "iqc/iqc_record/querySingleIQCRecord.json",
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
               $scope.iqcRecordCheck = data.contents.checkoutRecord;
               $scope.iqcRecordCheck.giveCheckoutTime = (new Date(data.contents.checkoutRecord.giveCheckoutTime*1000)).format();
                // var giveCheckouttime = new Date($scope.iqcRecordCheck.giveCheckoutTime*1000),
                //  $scope.iqcRecordCheck.giveCheckoutTime = giveCheckouttime.format();
                 // localStorage.setItem("checkoutRecord",JSON.stringify(data.contents.checkoutRecord));
                   // (planHistoryList.QCP)[i].makeTime = (new Date((planHistoryList.QCP)[i].makeTime*1000)).format();
                 // $scope.iqcRecordCheck.giveCheckoutTime = (new Date(($scope.iqcRecordCheck.giveCheckoutTime*1000)).format();

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

/***********************************************************
************************************************************
querySingleIQCRecord1 获取本地数据
************************************************************
***********************************************************/
    // 查询单个检验记录
    var querySingleIQCRecord1 = function(input_way_code){
        //var deffered = $q.defer();

        var http_url = config.HOST + "/api/2.0/bp/qc/iqc/" ;
        http_url += (input_way_code == "CE")? "querySingleSimpleIQCRecord":"querySingleComplexIQCRecord";
         // var http_url = "iqc/iqc_add/" ;
         //  http_url += (input_way_code == "CE")? "querySingleComplexIQCRecord.json":"querySingleSimpleIQCRecord.json";
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


 /***********************************************************
************************************************************
back 返回上一级
************************************************************
***********************************************************/  


    $scope.back = function(){

       $location.path("account_index/iqcRecord");

    }

}])
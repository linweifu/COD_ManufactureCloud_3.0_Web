FIMS.controller('iqcComplexDXReviseCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
    var iqcComplexDXRevise = { 

    materialNo: "",
    materialShortName: "",
    materialVersion: "",
    checkoutPlanNo: "",
    checkoutPlanVersion: "",
    sampleAmount: "",
    companyShortName: localStorage.getItem('curCompanyName'),
    
    checkoutRecordSid: "",

    // $rootScope.DX: [],
    itemDic: [
      {
        "value": "",
        "sampleCheckoutValue": "NULL"
      },
      {
        "value": "是",
        "sampleCheckoutValue": "是"
      },
      {
        // "sampleNo": "",
        "value": "否",
        "sampleCheckoutValue": "否"
      }
    ],
    sampleSel: []
     

    };

 

  $scope.iqcComplexDXRevise = iqcComplexDXRevise;

/***********************************************************************
***********************************************************************/
 $scope.Ptitle=function (num, length) { 
 return (Array(length).join('0') + num).slice(-length);
  }
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
               // $scope.iqcRecordRevise = data.contents.checkoutRecord;
               // $scope.iqcRecordRevise.giveCheckoutTime = (new Date(data.contents.checkoutRecord.giveCheckoutTime*1000)).format();
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
        // .error(function () {
        //     console.log('querySingleIQCRecord'+data.message);
        // });
    }
      $scope.querySingleIQCRecord();



/***********************************************************************
************************************************************************
 // 获取基本信息部分
************************************************************************
***********************************************************************/
  var queryCheckoutRecord = function(){
    
    var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
    iqcComplexDXRevise.materialNo = checkoutRecord.materialNo;
    iqcComplexDXRevise.materialShortName = checkoutRecord.materialShortName;
    iqcComplexDXRevise.materialVersion = checkoutRecord.materialVersion;
    iqcComplexDXRevise.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
    iqcComplexDXRevise.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
    iqcComplexDXRevise.sampleAmount = checkoutRecord.sampleAmount;

    iqcComplexDXRevise.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

    // 绑定定性部分
    $rootScope.DX = JSON.parse(localStorage.getItem("DX"));
    //console.log($rootScope.DX);

    //下拉数据绑定
    // $rootScope.DX = $rootScope.DX.sample;
    // console.log($rootScope.DX);
    // for (var i=0,len=$rootScope.DX.length;i<len;i++){
    //  $rootScope.DX.push($rootScope.DX[i].sample);
    // }
    // console.log($rootScope.DX);

    for (var i=0,len=$rootScope.DX.length;i<len;i++) {
      for (var j=0,lenj=$rootScope.DX[i].sample.length;j<lenj;j++) {
        var item = $rootScope.DX[i].sample[j];
        if (item.sampleCheckoutValue=="是") {
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXRevise.itemDic[1].sampleCheckoutValue;
        }else if (item.sampleCheckoutValue=="否"){
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXRevise.itemDic[2].sampleCheckoutValue;
        }else {
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXRevise.itemDic[0].sampleCheckoutValue;
        }
      }
    }
  }
  queryCheckoutRecord();

 /***********************************************************************
************************************************************************
 // 保存
************************************************************************
***********************************************************************/ 

$scope.updateComplexIQCRecord = function() {
    // console.log($rootScope.DX);
    // var keyDX

    $http({
      method: "POST",
      url: config.HOST + "/api/2.0/bp/qc/iqc/updateComplexIQCRecord",
      // url: "iqc/iqc_add/updateComplexIQCRecord.json",
      header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
      data: {
        "sid": localStorage.getItem('sid'),
        // "companySid": localStorage.getItem('cSid'),
        "checkoutRecordSid": localStorage.getItem('checkoutRecordSid'),
        "DX": $rootScope.DX,
        "DL": $rootScope.DL || JSON.parse(localStorage.getItem("DL"))
      }
    })
    .success(function(data){
            if (data.code == 'N01') {
              localStorage.setItem("DX",JSON.stringify($rootScope.DX));             
                alert(data.message);
                // $location.path("account_index/iqcRecord");
            }
            else if(data.code=="E00"){
                alert(data.message+",请重新登陆");
                localStorage.clear();
                $location.path('login').replace();
            }else {
                alert(data.message);
            }  
        })
  }




/***********************************************************************
************************************************************************
 // 返回首页
************************************************************************
***********************************************************************/


    $scope.back = function(){

        $location.path("account_index/iqcRecord");

    }

}])
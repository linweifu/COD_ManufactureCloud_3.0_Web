FIMS.controller('iqcComplexDXCheckCtrl',['$rootScope','$scope','$location','$http',function($rootScope,$scope,$location,$http){
    var iqcComplexDXCheck = { 

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

 

  $scope.iqcComplexDXCheck = iqcComplexDXCheck;
/***********************************************************************
***********************************************************************/
$scope.format = function($index){
if($index<10)
{
  $index ="00"+$index;
}
else if(10<$index<100)
{
  $index = "0"+$index;
}

   return $index;
}
/***********************************************************************
***********************************************************************
 // 获取基本信息部分
************************************************************************
***********************************************************************/
  var queryCheckoutRecord = function(){
    
    var checkoutRecord = JSON.parse(localStorage.getItem("checkoutRecord"));
    iqcComplexDXCheck.materialNo = checkoutRecord.materialNo;
    iqcComplexDXCheck.materialShortName = checkoutRecord.materialShortName;
    iqcComplexDXCheck.materialVersion = checkoutRecord.materialVersion;
    iqcComplexDXCheck.checkoutPlanNo = checkoutRecord.checkoutPlanNo;
    iqcComplexDXCheck.checkoutPlanVersion = checkoutRecord.checkoutPlanVersion;
    iqcComplexDXCheck.sampleAmount = checkoutRecord.sampleAmount;

    iqcComplexDXCheck.checkoutRecordSid = checkoutRecord.checkoutRecordSid;

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
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXCheck.itemDic[1].sampleCheckoutValue;
        }else if (item.sampleCheckoutValue=="否"){
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXCheck.itemDic[2].sampleCheckoutValue;
        }else {
          $rootScope.DX[i].sample[j].sampleCheckoutValue = iqcComplexDXCheck.itemDic[0].sampleCheckoutValue;
        }
      }
    }
  }
  queryCheckoutRecord();

/***********************************************************************
************************************************************************
 // 返回首页
************************************************************************
***********************************************************************/


    $scope.back = function(){

        $location.path("account_index/iqcRecord");

    }

}])
FIMS.controller('planHistoryListCopyCtrl', ['$scope','$location','$http',function($scope,$location,$http){
      var planHistoryListCopy = {
          singleQCP: {

            // QCPType: {},
            // materialNo : {}   
          }

          
            };
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/
     
    var time  = new Date();
  

  //调整时间格式
  Date.prototype.format = function() {
      var year = this.getFullYear().toString();
      var month = (this.getMonth()+1).toString();
      var day = this.getDate().toString();
      // console.log(year);

    if (month<10) {
      month = "0" + month;
    }

    if (day<10) {
      day = "0" + day;
    }

    return (year + "-" + month + "-" +day );
  }

  // planHistoryListCopy.singleQCP.makeTime = time.format();
  // planHistoryListCopy.singleQCP.entryTime = time.format();
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/      

    planHistoryListCopy.querySingleQCP = function(){
            $http({
                  method: "POST",
                  url: config.HOST + "/api/2.0/bp/qcp/qcp/querySingleQCP",
                   // url: "plan/querySingleQCP.json",
                   headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                  data: {
                        "sid": localStorage.getItem('sid'),
                        "checkoutPlanSid": localStorage.getItem('checkoutHistoryCopySid'),
                        "companySid": localStorage.getItem('cSid')
                  }
            })
            .success(function(data){
            if (data.code=="N01"){
                
                  planHistoryListCopy.singleQCP =data.contents;
                var entrytime = new Date(planHistoryListCopy.singleQCP.entryTime*1000),
                maketime = new Date(planHistoryListCopy.singleQCP.makeTime*1000);   
              // console.log(entrytime);
                planHistoryListCopy.singleQCP.entryTime = entrytime.format();
                 planHistoryListCopy.singleQCP.makeTime = maketime.format();
                 localStorage.setItem("materialSid",planHistoryListCopy.singleQCP.materialSid);
                //   var entrytime = new Date(planHistoryListCopy.singleQCP.entryTime*1000),
                // maketime = new Date(planHistoryListCopy.singleQCP.makeTime*1000);   
              // console.log(entrytime);
                //planHistoryListCopy.singleQCP.makeTime = time.format();
                //planHistoryListCopy.singleQCP.entryTime = time.format();
                  //console.log(planHistoryListCopy.singleQCP);
                
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
// $scope.querySingleQCP();
/*
***************************************************
***************************************************
addQCP
***************************************************
***************************************************
*/
 $scope.addQCP = function(){

     $http({
       method: "POST",
       url: config.HOST + "/api/2.0/bp/qcp/qcp/addQCP",
       // url: "plan/addQCP.json",
       header: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
       data: {
               "sid": localStorage.getItem('sid'),
              "checkoutPlanNo":planHistoryListCopy.singleQCP.checkoutPlanNo,
              "checkoutPlanVersion":planHistoryListCopy.singleQCP.checkoutPlanVersion,
              "checkoutPlanTypeCode":planHistoryListCopy.singleQCP.checkoutPlanTypeCode,
              "checkoutPlanType":planHistoryListCopy.singleQCP.checkoutPlanType,
              "companySid":localStorage.getItem('cSid'),
              "companyShortName":localStorage.getItem('curCompanyName'),
              "materialSid":planHistoryListCopy.singleQCP.materialSid,
              "materialNo":planHistoryListCopy.singleQCP.materialNo,
              "materialVersion":planHistoryListCopy.singleQCP.materialVersion,
              "materialShortName":planHistoryListCopy.singleQCP.materialShortName,
              "aql":planHistoryListCopy.singleQCP.aql,
              // "entrySid":planHistoryListCopy.singleQCP. 1,
              "entryId":localStorage.getItem('email'),
              "entryJobNumber":localStorage.getItem('userJobNumber'),
              "entryName":planHistoryListCopy.singleQCP.entryName,
              "entryTime":((new Date(planHistoryListCopy.singleQCP.entryTime)).valueOf())/1000,
              "makeJobNumber":planHistoryListCopy.singleQCP.makeJobNumber,
              // "makeJobNumber":localStorage.getItem('makeJobNumber'),
              "makeName":planHistoryListCopy.singleQCP.makeName,
              "makeTime":((new Date(planHistoryListCopy.singleQCP.makeTime)).valueOf())/1000,






              //  "checkoutPlanNo":planHistoryListCopy.checkoutPlanNo,
              //  "checkoutPlanVersion":planHistoryListCopy.checkoutPlanVersion,
              //  //"checkoutPlanTypeCode":planHistoryListCopy.singleQCP.Selected.QCPType.code,
              //  //"checkoutPlanType":planHistoryListCopy.singleQCP.Selected.QCPType.name,
              //  //"companySid":localStorage.getItem('cSid'),
              //  //"companyShortName":localStorage.getItem('curCompanyName'),
              //  //"materialSid":planHistoryListCopy.singleQCP.Selected.materialNo.materialSid,
              //  "materialNo":planHistoryListCopy.materialNo,
              //  "materialVersion":planHistoryListCopy.materialVersion,
              //  "materialShortName":planHistoryListCopy.materialShortName,
              //  "aql":planHistoryListCopy.aql,
              // //  "entrySid":planHistoryListCopy. 1,
              // // "entryId":localStorage.getItem('email'),
              // // "entryJobNumber":localStorage.getItem('userJobNumber'),
              //  "entryName":planHistoryListCopy.entryName,
              // "entryTime":((new Date(planHistoryListCopy.entryTime)).valueOf())/1000,
              //  "makeJobNumber":planHistoryListCopy.makeJobNumber,
              //  // "makeJobNumber":localStorage.getItem('makeJobNumber'),
              //  "makeName":planHistoryListCopy.makeName,
              //  "makeTime":((new Date(planHistoryListCopy.makeTime)).valueOf())/1000,
       }
     })
     .success(function(data){
             if (data.code == 'N01') {             
           alert(data.message);
           $location.path('account_index/planHistoryList');         
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

/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

      $scope.HistoryListCopyback = function(){
            var a = confirm("您确定要退出吗？退出将丢失填写数据!")
            if (a) {
                  $location.path("account_index/planHistoryList");
            }
      }
/*
***************************************************
***************************************************
***************************************************
***************************************************
*/

    $scope.planHistoryListCopy =planHistoryListCopy;
     planHistoryListCopy.querySingleQCP();

}])


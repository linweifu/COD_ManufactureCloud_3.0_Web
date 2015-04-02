FIMS.factory('newAddService',  ['$window', '$location', '$rootScope', '$http' ,function($window, $location,$rootScope, $http) {
	var items = {};

	var HOST = "http://"+config.Interface;
    items.locationFlag = false; //跳转标志
    items.changeTab = function(){
            $('#qc_tab3').removeClass("tab3_selected");
            $('#qc_tab1').removeClass("tab1_selected");
            $('#qc_tab2').addClass("tab2_selected");
        }
    
	items.localTo = function() {
        $('body').on('click', '.qc_to_dljc', function() {
            items.bindDL();
            comm.getDXData();
            $('.qc_form_tab li').removeClass('qc_form_selected');
            $("#qc_form3_tab").addClass('qc_form_selected');
            $location.path("dashboard/subNav/dljc");
            $rootScope.$apply();
        });
        
        $('body').on('click', '.qc_to_home', function() {
            $('.qc_form_tab li').removeClass('qc_form_selected');
            $("#qc_form1_tab").addClass('qc_form_selected');
            $location.path("dashboard/subNav/home");
            $rootScope.$apply();
        });
        function validator() {
            for(var i = 0; i < $("#qc_form1_inner_left input[type ='text']").length; i++) {
                if($("#qc_form1_inner_left input[type ='text']").val() == "") {
                    return false;
                }
                return true;
            }
            return $("#qc_form1_inner_left input[type ='text']").val() ? true : false;
        }

        $('body').on('click', '.qc_to_dxjy', function() {
            if($('#qc_form1_outer h1').eq(0).text().trim() === '物料名称' ) {
                $('.error-tips').show().text('请先确认正确的计划');
            }else {
                if(validator()) { 
                    // if(items.checkQCRUniqueness()) {
                        items.bindDX();
                        $('.qc_form_tab li').removeClass('qc_form_selected');
                        $("#qc_form2_tab").addClass('qc_form_selected');
                        $location.path("dashboard/subNav/dxjy");
                        $rootScope.$apply();
                    // }else {
                    //     $('.error-tips').show().text('记录编号与已存在重复');
                    // }
                }else {
                    $('.error-tips').show().text('请将数据填写完整');
                }
            }
        });

		var location = $location.path();
		var home = location.indexOf('dashboard/subNav/home') !== -1 ? true : false;
		var dxjy = location.indexOf('dashboard/subNav/dxjy') !== -1 ? true : false;
		var dljc = location.indexOf('dashboard/subNav/dljc') !== -1 ? true : false;

		if(home) {
			$('.qc_form_tab li').removeClass('qc_form_selected');
		    $("#qc_form1_tab").addClass('qc_form_selected');
		}else if(dxjy) {
			 $('.qc_form_tab li').removeClass('qc_form_selected');
		     $("#qc_form2_tab").addClass('qc_form_selected');
		} else if(dljc) {
			$('.qc_form_tab li').removeClass('qc_form_selected');
		    $("#qc_form3_tab").addClass('qc_form_selected');
		}

		$("#qc_form1_tab").click(function() {
			  	$('.qc_form_tab li').removeClass('qc_form_selected');
		        $("#qc_form1_tab").addClass('qc_form_selected');
		        $location.path("dashboard/subNav/home");
		        $rootScope.$apply();
		});

		$("#qc_form2_tab").click(function() {
            if($('#qc_form1_outer h1').eq(0).text().trim() === '物料名称' ) {
                $('.error-tips').show().text('请先确认正确的计划');
            }else {
                if(validator() ){
                    console.log(items.checkQCRUniqueness());
                    // if(items.checkQCRUniqueness()) {
                        items.bindDX();
        		        $('.qc_form_tab li').removeClass('qc_form_selected');
        		        $("#qc_form2_tab").addClass('qc_form_selected');
        		        $location.path("dashboard/subNav/dxjy");
        		        $rootScope.$apply();
                    // } else {
                    //     $('.error-tips').show().text('记录编号与已存在重复');
                    // }

                }else {
                    $('.error-tips').show().text('请将数据填写完整');
                }
            }
		});
		$("#qc_form3_tab").click(function() {
            if($('#qc_form1_outer h1').eq(0).text().trim() === '物料名称' ) {
                $('.error-tips').show().text('请先确认正确的计划');
            }else {
                if(validator() ){
                    comm.getDXData();
    			 	$('.qc_form_tab li').removeClass('qc_form_selected');
    		        $("#qc_form3_tab").addClass('qc_form_selected');
    		        $location.path("dashboard/subNav/dljc");
    		        $rootScope.$apply();
                }else {
                    $('.error-tips').show().text('请将数据填写完整');
                }
            }
		});

	}

	items.baseMsgData = {
        materialName:"物料名称",
        materialIdNew: "",

        materialId:"",
        planId:"",

        batchId: "", //批次号
	    // checkoutRecordSid: "",
	    checkoutRecordId: "",
	    // planRuleSid: "",
	    scope: "物料复杂录入",
	    venderId: "", 
        venderName: "",
	    submitCheckoutAmount: "",
	    submitCheckoutTime: "",
	    checkoutTime: "",
	    sampleAmount: "",
	    createOperatorId: ""
	};

    var metricDatas_A = [];	
	
    items.DXData = [];

    var initDXData = {
        'items' :[{
            "itemname": "颜色是否正常",
            "itemValues" :[
                {"values": [{'value': '', "id": 0, "id": 1, "id": 2},{'value': '是'},{'value': '否'}]}
            ]
        }]
    };

    for(var i = 0; i < items.baseMsgData.sampleAmount; i++) {
        items.DXData.push(initDXData);
    }

    items.DLData = [];
    items.dxDataValue = "";
    
    items.checkQCRUniqueness = function() {
        var flag = false;
        var d = {
            method: 'POST',
            url: HOST + '/api/1.0/record-manager/checkQCRUniqueness',
            data: {"checkoutRecordSid" : items.baseMsgData.checkoutRecordId}
        }
        $http(d).success(function(data) {
            console.log(data.code == 'N01');
            if(data.code != 'N01') {
                flag = false;
            }else {
                flag = true;
            }
        });
        return false;
    }

    items.string2Array = function(str) {
        return str.split('，');
    };

    //get plan service
    items.materialId = 'FIT-RM-900303.A';//'FIT-RM-900303.A';
    items.PlanDatas = [];
    for(var i = 0; i < items.baseMsgData.sampleAmount; i++ ){
        items.PlanDatas.push({});
        items.DLData.push({});
    }
    items.getPlanId =  function() {
        items.materialId = $('#search_qc_plan').val();
        var d = {
            method: 'POST',
            url: HOST+'/api/1.0/plan-manager/getIQCPIdByMaterialId',
            data: {
                "materialId": items.materialId, 
                "companyId":window.localStorage.getItem('companyId')
            }
        };

        $http(d)
            .success(function(res){
                if(res.code == "N01")
                {
                    items.baseMsgData.materialId = $('#search_qc_plan').val();
                    items.baseMsgData.planId = res.array;
                    var d = {   
                        method: 'POST',
                        url: HOST+'/api/1.0/plan-manager/getIQCPById',
                        data: {"planId": res.array} 
                    };
                }else{
                    alert(res.message);
                }
                
            $http(d)
                .success(function(data){
                    items._data = data;
                    items.PlanDatas.splice(0, items.PlanDatas.length);
                    for(var i = 0; i < data.array.qualitativeChecks.length; i++){
                        var j = {

                            "inspectionItem": data.array.qualitativeChecks[i].inspectionItem
                        };
                        items.PlanDatas.push(j);
                    }

                    items.baseMsgData.materialName = data.array.basicInformation.materialName;
                    items.baseMsgData.materialVersion = data.array.basicInformation.materialVersion;
                    items.baseMsgData.materialId = data.array.basicInformation.materialId;

                })
                .error(function(){
                    console.log('error0');
                });
            })
            .error(function(){
                console.log('error1');
            });
        }
        // 绑定定性检验记录数据
        items.bindDX = function() {
            if(items._data) {

                var data = items._data;
                items.DXData.splice(0, items.DXData.length);
                var itemValues = [];

                for(var j = 0; j < items.baseMsgData.sampleAmount; j++) {
                    var item = {"values": [{'value': null},{'value': '是'},{'value': '否'}]};
                    itemValues.push(item);
                }

                var sampleAmount = data.array.qualitativeChecks.length; 

               for(var i = 0; i < sampleAmount; i++){
                    var initDXData = {
                        'items' :[{
                            "itemname": data.array.qualitativeChecks[i].inspectionItem,
                            "checkoutToolName": data.array.qualitativeChecks[i].checkoutToolName,
                            "itemValues" :itemValues  
                        }]
                    };
                    items.DXData.push(initDXData);
                }
            }
            $rootScope.DXData = items.DXData;
        }//end bindDX

      // 绑定定量检测
        items.bindDL = function() {
            var data = items._data,
                itemValues = [];

            items.DLData.splice(0, items.DXData.length);
            itemValues.splice(0, itemValues.length);

            for(var i = 0; i < items.baseMsgData.sampleAmount; i++) {
                itemValues.push({});
            }

            var DLdataLength = data.array.quantitativeChecks.length;
            for(var i = 0; i < DLdataLength; i++) {
                var o = data.array.quantitativeChecks[i];
                o.itemValues = itemValues;
                items.DLData.push(o);
            }
            $rootScope.DLData = items.DLData;
        }//end bindDL

        //commond method 
        var comm = {
            metricDatas: [],

            getDXData: function() {
                var data = items._data;
                var qc_form = $('.qc_form2_1');
               
                var timestamp = "2014-05-26T07:30:00Z";
                comm.metricDatas.splice(0, comm.metricDatas.length);
                for(var j = 0; j < data.array.quantitativeChecks.length; j++) {
                    var metricName = items.DXData[j].items[0].itemname;

                    items.DXDataValue = $('.qc_form').eq(j).find('select :selected').text().split('   ');
                    for(var ii = 0; ii < items.baseMsgData.sampleAmount; ii++) {
                         var dimensions = [
                            {
                                "name": "物料编号", //FIT-RM-900303.A
                                // "value": items.baseMsgData.materialIdNew
                                "value": items.baseMsgData.materialId
                            },
                            {
                                "name": "供应商编号",
                                "value": items.baseMsgData.venderId
                            },
                            {
                                "name": "样品ID",
                                "value": ii + 1
                            },
                            {
                                "name": "批次编号",
                                "value": items.baseMsgData.batchId
                            },
                            {
                                "name": "供应商简称",
                                "value": items.baseMsgData.venderName
                            }
                        ];

                        var o = {
                            "metricName": metricName,
                            "dimensions": dimensions,
                            "value": items.DXDataValue[ii] ? items.DXDataValue[ii] : 'null',
                            "timestamp": timestamp
                        }
                        comm.metricDatas.push(o);
                    }
                    
                }
                // return comm.metricDatas;
            },
            getDLData: function() {
                var data = items._data;
                var qc_form = $('.qc_form2_1');
               
                var timestamp = "2014-05-26T07:30:00Z";
                // comm.metricDatas.splice(0, comm.metricDatas.length);

                for(var j = 0; j < data.array.quantitativeChecks.length; j++) {

                    var metricName = items.DLData[j].inspectionItem
                    var DXDataValueInput = $('.qc_form').eq(j);

                    for(var ii = 0; ii < items.baseMsgData.sampleAmount; ii++) {
                        var DXDataValue = DXDataValueInput.find('input').eq(ii).val();
                         var dimensions = [
                            {
                                "name": "物料编号", //FIT-RM-900303.A
                                "value": items.baseMsgData.materialId
                            },
                            {
                                "name": "供应商编号",
                                "value": items.baseMsgData.venderId
                            },
                            {
                                "name": "样品ID",
                                "value": ii + 1
                            },
                            {
                                "name": "批次编号",
                                "value": items.baseMsgData.batchId
                            },
                            {
                                "name": "供应商简称",
                                "value": items.baseMsgData.venderName
                            }
                        ];

                        var o = {
                            "metricName": metricName,
                            "dimensions": dimensions,
                            "value": DXDataValue,
                            "timestamp": timestamp
                        }
                        comm.metricDatas.push(o);
                    }
                    
                }
                // return metricDatas;
            },

            gatherAllData: function() {
                comm.getDLData();
                return comm.metricDatas;
            },

            //获取当前时间，并将时间格式化
            nowDate: function() {
                var now = new Date();

                var year    = now.getFullYear(),
                    month   = now.getMonth() + 1,
                    day     = now.getDay(),
                    minutes = now.getMinutes(),
                    seconds = now.getSeconds()

            }
        }

        //提交新增记录
        // TODO 绑定 checkoutRecordSid
        items.subData = function() {
            var basicData = {
                "checkoutRecordSid": items.baseMsgData.checkoutRecordId,
                "checkoutRecordId": items.baseMsgData.checkoutRecordId,
                "planId": items.baseMsgData.planId , //QCP-RM-900303.A-0061
                "scope": "物料复杂录入",
                "companyId": window.localStorage.getItem('companyId'),//items.baseMsgData.companyId, //武汉网酷科技有限公司
                "submitCheckoutAmount": items.baseMsgData.submitCheckoutAmount,
                "submitCheckoutTime": items.baseMsgData.submitCheckoutTime + "T07:30:00Z",
                "checkoutTime": items.baseMsgData.submitCheckoutTime + "T07:30:00Z",
                "sampleAmount": items.baseMsgData.sampleAmount,
                "createOperatorId": window.localStorage.getItem('userId')//$rootScope.userId
            };
            var data = {
                BasicData: basicData,
                metricDatas: comm.gatherAllData()
            }
            console.log(data);
            // var 
            $http({
                method: 'POST',
                url: HOST+'/api/1.0/record-manager/saver',
                headers: {"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},
                data:  data
            }).success(function(data) {
                if(data.code != 'N01') {
                    alert(data.message);
                    $location.path("dashboard/subNav/home");
                    $rootScope.$apply();
                } else {
                    alert("添加记录成功");
                    $location.path("dashboard/record");
                    $rootScope.$apply();
                }
               
            });
        }//end subData
	return items;
}]);

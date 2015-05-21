FIMS.controller('qrCodeCtrl',['$scope','$http',function($scope,$http){
	var qrCode = {
	 	"materialId": "",
        "materialVersion": "",
        "materialName": "",
        "vendorId": "",
        "vendorShortName": "" ,
        "companySid": localStorage.getItem("cSid")    	
	};
	var resource = "resource/";

	$scope.genCode = function(){
		if (qrCode.materialId!="" && qrCode.materialVersion!="" && qrCode.materialName!="" && qrCode.vendorId!="" && qrCode.vendorShortName!=""){
			$http({
                method: 'POST',
                url: config.HOST+'/api/2.0/ll/tools/tdcode/resolveTDCode',
                data: qrCode
            })
            .success(function(data){
                if (data.code === "E01") {
                    console.log(data.message)
                }else{
                    resource += data.filename;
                    $("#qrcode").attr("src",resource);
                    resource = "resource/";
                }
            });
		}else {
			alert("请完善信息!");
		}
	}

	$scope.clearCode = function(){
		qrCode.materialId =  "";
        qrCode.materialVersion =  "";
        qrCode.vendorId =  "";
        qrCode.vendorShortName =  "";
        qrCode.materialName =  "";           
        $("#qrcode").attr("src",'');
	}

	$scope.back = function(){
		var a = confirm("您确定要退出吗？退出将丢失填写数据!")
		if (a) {
			history.go(-1);
		}
	}

	$scope.qrCode = qrCode;
}]);

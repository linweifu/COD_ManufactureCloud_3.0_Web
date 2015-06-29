// var FIMS = angular.module("FIMS", []);

// FIMS.controller("PageCtrl",["$scope", function($scope){
//         $scope.pages = 10;
//         $scope.page = 1;
        
//         $scope.selectPage = function(page){
//           console.log("选择的页："+page);  
//         };
// }]);


// FIMS.directive("pagination", function(){
//     return {
//         restrict: "E",
//         scope: {
//             numPages: "=",     
//             currPage: "=",
//             onSelectPage: "&"
//         },
        
//         template: "<ul class="pagination">"
//             +"<li ng-class="{disabled: noPreviousPage()}">"
//             +"<a ng-click="selectPreviousPage()">上一页</a>"
//             +"</li>"
            
//             +"<li ng-repeat="page in pages" ng-class="{active: isActivePage(page)}">"
//             +"<a ng-click="selectPage(page)">{{page}}</a>"
//             +"</li>"
            
//             +"<li ng-class="{disabled: noNextPage()}">"
//             +"<a ng-click="selectNextPage()">下一页</a>"
//             +"</li>"
    
//             +"</ul>",
    
//         replace: true,
//         link: function(s){
//             s.$watch("numPages", function(value){
//                 s.pages = [];
                
//                 for(var i=1;i<=value;i++){
//                     s.pages.push(i);
//                 }
                
//                 if(s.currPage > value){
//                     s.selectPage(value);
//                 }
//             });
            
//             //判读是否有上一页
//             s.noPreviousPage = function(){
//                 return s.currPage === 1;
//             };
            
//             //判断是否有下一页
//             s.noNextPage = function(){
//                 return s.currPage === s.numPages;
//             };
            
//             //判断当前页是否被选中
//             s.isActivePage = function(page){
//                 return s.currPage===page;
//             };
            
//             //选择页数
//             s.selectPage = function(page){
//                 if(!s.isActivePage(page)){
//                     s.currPage = page;
                    
//                     s.onSelectPage({ page:page });
//                 }
//             };
            
//             //选择下一页
//             s.selectNextPage = function(){
//                 if(!s.noNextPage()){
//                     s.selectPage(s.currPage+1);
//                 }
//             };
            
//             //选择上一页
//             s.selectPreviousPage = function(){
//                 if(!s.noPreviousPage()){
//                     s.selectPage(s.currPage-1);
//                 }
//             };
//         }
//     };
// });
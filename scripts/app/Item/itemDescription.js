angular.module("Item").directive("itemDescription",function(){
   return {
      restrict: 'E',
      scope:true,
      controller:['$scope',function($scope){

      }],
      templateUrl: 'scripts/app/Item/views/itemDescription.tpl.html',
      replace: true
   };
})
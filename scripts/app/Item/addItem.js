angular.module("Item").directive("addItem",function(){
   return {
      restrict: 'E',
      scope: {
         item: '=',
         addItemClick: '&',
         isDisabled: '='
      },
      controller:['$scope',function($scope){}],
      templateUrl: 'scripts/app/Item/views/addItem.tpl.html'
   };
})
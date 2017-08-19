angular.module("Item").directive("listItems",function(){
   return {
      restrict: 'E',
      scope: {
         items: '=',
         selectItemClick: '&',
      },
      controller:['$scope',function($scope){
            $scope.selectedItem=null;

            $scope.selectItem=function(item){
                  //вызов обработчика для отображения описани
                  $scope.selectItemClick({name:item});
                  // установка класса стилей выбранного элемента
                  $scope.selectedItem=item;
            }
            $scope.IsSelected=function(item){
                  if ($scope.selectedItem != null && 
                        $scope.selectedItem==item){
                              return true;
                  }
                  else{
                        false;
                  }
            }
      }],
      templateUrl: 'scripts/app/Item/views/listItems.tpl.html',
      replace: true
   };
})

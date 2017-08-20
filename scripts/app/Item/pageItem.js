app.directive("pageItem",['itemsLoadService',function(itemsLoadService){
      return {
         restrict: 'E',
         scope: {},
         controller: ['$scope', '$http', function ($scope, $http) {
             
            //
            // новый элемент
            $scope.newItem={
                  name:"",
                  description:""
               };
            //выбранный элемент
            $scope.currentItem={
                  name: '',
                  description: ''
            };
            // значение контролирующее доступность элементов формы во время добавления нового значения
            $scope.IsItemLoading=false;
            $scope.IsAddDisabled=function(){
                  return $scope.IsItemLoading;
            };
            //
            //загрузка данных
            //
            itemsLoadService.loadPromise.then(function(data){
                  $scope.AllItems=data;
            },function(error){ });
            // инициализация загрузки новых данных
            itemsLoadService.loadedSuccess();
            //
            //
            // Установка выбраного элемента
            $scope.setCurrentItemByName=function(selectItem){
                  if(selectItem!=null){
                        $scope.currentItem=selectItem;
                  }
            };
            // Добавление нового элемента
            $scope.addNewItem=function(addingItem,nameModelController,valueModelController){
                  //
                  // Проверка запоненности двух полей значениями
                  //
                  if(nameModelController.$valid && valueModelController.$valid){
                        // Значение отключающее поля ввода и кнопку при добалении нового значения
                        $scope.IsItemLoading=true;
                        //
                        // настройка сервиса обновления значений
                        itemsLoadService.savePromise().then(function(data){
                              if(data!=null){
                                    $scope.AllItems[$scope.AllItems.length]=data;
                                    $scope.newItem.name="";
                                    $scope.newItem.description="";
                                    alert("Новая запись добавлена");
                              }
                              else{
                                    alert("Ошибка сохранения в локальное хранилище");
                              }
                              $scope.IsItemLoading=false;
                        },function(error){
                              alert("Ошибка сохранения на клиенте");
                              $scope.IsItemLoading=false;
                        });
                        // инициализация сохранение новых данных
                        itemsLoadService.saveSuccess({
                              name:$scope.newItem.name,
                              description:$scope.newItem.description
                        });
                  }
                  else{
                        alert("Оба поля обязательны к заполнению");
                  }
            };
         }],
         templateUrl: 'scripts/app/Item/views/pageItem.tpl.html',
         replace: true,
   };
   }])
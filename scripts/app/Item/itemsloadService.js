
angular.module("Item").provider('itemsLoadService',function(){
      var config={
            destanationUrl:true
      };
      return {
            setLoadDestanation:function (destanationUrl){
            config.destanationUrl=destanationUrl;
            },
            $get:function($q,$rootScope){
                  var loadDeffer=$q.defer();
                  var lStore=localStorage;
                  var saveDeffer=$q.defer();
                  return{
                        loadPromise: loadDeffer.promise,
                        loadedSuccess:function(lStorage){
                              loadDeffer.resolve(lStorage);
                              
                        },
                        loadedFail:function(error){
                              loadDeffer.reject(error);
                              
                        },
                        savePromise: function(){
                              saveDeffer=$q.defer()
                              return saveDeffer.promise;
                        },
                        saveSuccess:function(data,allData,lStorage){
                              if(data!=null && lStorage!=null){
                                    try{
                                          allData[allData.length]=data;
                                          lStorage.setItem("ItemsStorage",JSON.stringify(allData));
                                          saveDeffer.resolve(data);
                                    }
                                    catch(error){
                                          saveDeffer.reject("Ошибка при сохранении в локальное хранилище");      
                                    }
                              }
                              else{
                                    saveDeffer.reject("локальное хранилище не доступно");
                              }
                              
                        }
                  }
            }
      }
      });        
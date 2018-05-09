var angularApp = angular.module("angularApp", []);

angularApp.directive('resultDirective', function() {
    return{
        restrict: 'E',
        scope: {
            firstArg: '@',
            secondArg:'@'
        },
        template:"{{firstArg*secondArg}}",
    }
});

angularApp.controller("AppCtrl", AppCtrl);

AppCtrl.$inject = ["$http"];
function AppCtrl($http){
    var vm = this;
    vm.obj={
        firstArg:undefined,
        secondArg:undefined,
        result:undefined
    };

    console.log("App controller is initialized");
    vm.getData = function(){
        $http.get("/getData")
            .then(function(successResp){
                console.log("success Response:", successResp);
                if(successResp.data.length>0){
                    vm.historyObj = successResp.data.pop();
                    vm.obj = angular.copy(vm.historyObj);
                }
            }, function(errorResp){
                console.log("error response: ", errorResp);
            });
    }

    vm.setData = function(){
        vm.obj.result = vm.obj.firstArg*vm.obj.secondArg;
        $http.post("/sendData", {data:vm.obj})
        .then(function(successResp){
            console.log("success Response:", successResp);
            vm.getData();
        }, function(errorResp){
            console.log("error response: ", errorResp);
        });
    }

    vm.getData();
}
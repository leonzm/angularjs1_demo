(function (angular) {
    "use strict";
    angular.module('app.controllers')
        .controller('WeatherQueryController', WeatherQueryController);

    //////////////////////////////////////
    console.log('WeatherQueryController 加载完毕');
    //////////////////////////////////////

    WeatherQueryController.$inject = ['$http', '$state', '$timeout', 'Notification']

    function WeatherQueryController($http, $state, $timeout, Notification) {

        var vm = this;
        vm.reqProcessing = false;
        vm.searchKey = "上海";
        vm.query = query;
        vm.queryResult = null;
        init();


        function init() {
            query();
        }

        function query() {
            var queryUrl = 'http://wthrcdn.etouch.cn/weather_mini?city=上海';
            //var queryUrl = 'http://apis.baidu.com/thinkpage/weather_api/suggestion?language=zh-Hans&unit=c&start=0&days=3&location=' + vm.searchKey;
            $http({
                method: 'GET',
                url: queryUrl,
                headers: {'apikey': 'aa2a332d940d02c27e1cbe89c14009a8'}
            }).then(function successCallback(response) {
                vm.queryResult = response['results'][0]
                console.log(response);
            },function errorCallback(response) {

            });
        }


    }
})(angular);



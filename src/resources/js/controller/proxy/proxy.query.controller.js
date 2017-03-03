(function (angular) {
    "use strict";
    angular.module('app.controllers')
        .controller('ProxyController', ProxyController);

    //////////////////////////////////////
    console.log('ProxyController 加载完毕');
    //////////////////////////////////////

    ProxyController.$inject = ['$http', '$state', '$timeout', 'Notification']

    function ProxyController($http, $state, $timeout, Notification) {

        var vm = this;
        vm.reqProcessing = false;
        vm.getCaptcha = getCaptcha;
        vm.captchaInfo = null;
        init();


        function init() {
            getCaptcha();
        }

        function getCaptcha() {
            var queryUrl = 'devPlatform/rest/common/captcha';
            $http({
                method: 'GET',
                url: queryUrl,
            }).then(function successCallback(response) {
                vm.captchaInfo = response.data;
                console.log(vm.captchaInfo);
            },function errorCallback(response) {

            });
        }


    }
})(angular);



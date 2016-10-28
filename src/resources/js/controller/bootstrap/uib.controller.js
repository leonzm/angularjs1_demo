(function (angular) {
    "use strict";
    angular.module('app.controllers')
        .controller('UiBootstrapController', UiBootstrapController);

    //////////////////////////////////////
    console.log('UiBootstrapController 加载完毕');
    //////////////////////////////////////

    UiBootstrapController.$inject = ['NOTIFICATION_CONSTANT', 'Notification']

    function UiBootstrapController(NOTIFICATION_CONSTANT, Notification) {
        var vm = this;
        vm.notificationOpts = NOTIFICATION_CONSTANT;
        vm.notificationConfig = {
            message: '默认消息内容',
            title: '默认标题',
            positionY: vm.notificationOpts['NOTIFICATION_VERTICAL'][0],
            positionX: vm.notificationOpts['NOTIFICATION_HORIZONTAL'][0],
            type: vm.notificationOpts['NOTIFICATION_TYPE'][0]
        };
        vm.showNotification = showNotification;

        console.log(NOTIFICATION_CONSTANT)


        function showNotification() {

            var ops = {
                message: vm.notificationConfig.message,
                title: vm.notificationConfig.title,
                positionY: vm.notificationConfig.positionY.key,
                positionX: vm.notificationConfig.positionX.key
            }
            console.log(JSON.stringify(ops), vm.notificationConfig.type.key);
            Notification(ops, vm.notificationConfig.type.key);
        }
    }
})(angular);
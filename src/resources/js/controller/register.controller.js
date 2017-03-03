(function (angular) {
    "use strict";
    angular.module('app.controllers').controller('RegisterController', RegisterController);

    //////////////////////////////////////
    console.log('RegisterController 加载完毕', console.log(angular.module('app.controllers')));
    //////////////////////////////////////

    RegisterController.$inject = ['$state', '$timeout', 'Notification', '$rootScope'];

    function RegisterController($state, $timeout, Notification, $rootScope) {
        var vm = this;
        vm.reqProcessing = false;
        if ($rootScope.users == null || $rootScope.users == undefined) {
            $rootScope.users = new Map();
        }
        var users = $rootScope.users;

        vm.user = {
            reg_email: '906998248@qq.com',
            reg_password: '123456'
        }

        // 点击登录
        vm.login = function () {
            $state.go('login');
        }

        // 点击注册
        vm.reg = function () {
            vm.reqProcessing = true;
            console.log(vm.user);

            // 输入检查
            if (vm.user.reg_email == '' || vm.user.reg_email == undefined) {
                Notification.error({message: '请输入您的邮箱', title: '温馨提示'});
                vm.reqProcessing = false;
                return;
            }
            if (vm.user.reg_password == '' || vm.user.reg_password == undefined) {
                Notification.error({message: '请输入您的密码', title: '温馨提示'});
                vm.reqProcessing = false;
                return;
            }
            if (users.containsKey(vm.user.reg_email)) {
                Notification.error({message: '该邮箱已经注册过', title: '温馨提示'});
                vm.reqProcessing = false;
                return;
            }

            // 模拟异步操作，1秒后提醒注册结果
            $timeout(function () {
                users.put(vm.user.reg_email, vm.user.reg_password);
                Notification.success({message: '注册成功', title: '温馨提示'});
                vm.user.reg_email == '';
                vm.user.reg_password == '';

                vm.reqProcessing = false;
            }, 100);
        }
    }
})(angular);



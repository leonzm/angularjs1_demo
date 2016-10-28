(function (angular) {
    "use strict";
    angular.module('app.controllers').controller('LoginController', LoginController);

    //////////////////////////////////////
    console.log('LoginController 加载完毕', console.log(angular.module('app.controllers')));
    //////////////////////////////////////

    LoginController.$inject = ['$state', '$timeout', 'Notification', '$rootScope']

    function LoginController($state, $timeout, Notification, $rootScope) {
        var vm = this;
        vm.reqProcessing = false;
        if ($rootScope.users == null || $rootScope.users == undefined) {
            $rootScope.users = new Map();
        }
        var users = $rootScope.users;

        vm.user = {
            email: '906998248@qq.com',
            password: '123456'
        }
        Notification.success({message: '请您先登录', title: '温馨提示'});

        // 点击忘记密码
        vm.forget = forget;
        function forget() {
            //Notification.success({message: '邮箱：906998248@qq.com，密码：123456', title: '温馨提示'});
            Notification.success({message: '如果您还未注册，请先注册再登录', title: '温馨提示'});
        }

        // 点击注册
        vm.register = register;
        function register() {
            console.log("点击注册");
            $state.go('register');
        }

        // 点击登录
        vm.auth = auth;
        function auth() {
            vm.reqProcessing = true;
            console.log(vm.user);

            // 输入检查
            if (vm.user.email == '' || vm.user.email == undefined) {
                Notification.error({message: '请输入您的邮箱', title: '用户授权'});
                vm.reqProcessing = false;
                return;
            }
            if (vm.user.password == '' || vm.user.password == undefined) {
                Notification.error({message: '请输入您的密码', title: '用户授权'});
                vm.reqProcessing = false;
                return;
            }

            // 模拟异步操作，2秒后跳转
            $timeout(function () {
                if (users.containsKey(vm.user.email)) {
                    if (users.get(vm.user.email) === vm.user.password) {
                        Notification.success({message: '登录成功', title: '用户授权'});
                        //登录成功
                        $state.go('authorized');
                    } else {
                        Notification.error({message: '登录失败，密码错误', title: '用户授权'});
                    }
                } else {
                    Notification.error({message: '登录失败，账户不存在', title: '用户授权'});
                }

                vm.reqProcessing = false;
            }, 2000);
        }

    }
})(angular);



(function (angular) {
    "use strict";
    angular.module('app.controllers').controller('AccoutController', AccoutController);

    //////////////////////////////////////
    console.log('AccoutController 加载完毕', console.log(angular.module('app.controllers')));
    //////////////////////////////////////

    AccoutController.$inject = ['$state', '$timeout', 'Notification', '$scope', '$rootScope'];

    function AccoutController($state, $timeout, Notification, $scope, $rootScope) {
        var vm = this;
        vm.reqProcessing = false;
        console.log($rootScope.users);
        if ($rootScope.users == null || $rootScope.users == undefined) {
            $rootScope.users = new Map();
        }
        var users = $rootScope.users;
        var vm = $scope.vm = {};

        Notification.success({message: '您可以进行增删改查操作', title: '温馨提示'});
        // 初始化用户
        function initList() {
            var userList = [];
            for (var i = 0; i < users.size(); i ++) {
                var user = {};
                user.email = users.element(i).key;
                user.password = users.element(i).value;
                console.log(user.email + ", " + user.password);
                userList.push(user);
            }
            vm.userList = userList;
        }
        initList();

        // 删除用户
        vm.deleteUser = function(email) {
            if (users.removeByKey(email)) {
                initList();
                Notification.success({message: '删除成功', title: '温馨提示'});
            } else {
                Notification.error({message: '删除失败', title: '温馨提示'});
            }
        }

        // 添加数据
        vm.newUser = {
            email: '',
            password: ''
        };
        vm.addUser = function() {
            vm.reqProcessing = true;
            console.log(vm.newUser);

            // 输入检查
            if (vm.newUser.email == '' || vm.newUser.email == undefined) {
                Notification.warning({message: '请输入您的邮箱', title: '温馨提示'});
                vm.reqProcessing = false;
                return;
            }
            if (users.containsKey(vm.newUser.email)) {
                Notification.warning({message: '该邮箱已经存在', title: '温馨提示'});
                vm.reqProcessing = false;
                return;
            }
            if (vm.newUser.password == '' || vm.newUser.password == undefined) {
                Notification.warning({message: '请输入您的密码', title: '温馨提示'});
                vm.reqProcessing = false;
                return;
            }

            users.put(vm.newUser.email, vm.newUser.password);
            initList();
            Notification.success({message: '添加成功', title: '温馨提示'});
            vm.newUser = {
                email: '',
                password: ''
            };
            vm.reqProcessing = false;
        }

        // 更新用户
        vm.updateUser = function(email, password) {
            if (email == '' || email == undefined) {
                Notification.error({warning: '请输入更新的邮箱', title: '温馨提示'});
                vm.reqProcessing = false;
                return;
            }
            if (password == '' || password == undefined) {
                Notification.error({warning: '请输入更新的密码', title: '温馨提示'});
                vm.reqProcessing = false;
                return;
            }

            if (users.containsKey(email)) {
                users.removeByKey(email);
                users.put(email, password);
                initList();
                Notification.success({message: '更新成功', title: '温馨提示'});
            } else {
                Notification.error({message: '更新成功', title: '温馨提示'});
            }
        }

    }
})(angular);



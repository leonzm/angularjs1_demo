(function (angular) {
    'use strict';

    angular.module('app').config(CoreRouter);

    CoreRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    function CoreRouter($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController as login'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegisterController as register'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'templates/common/404.html'
            })
            .state('50x', {
                url: '/50x',
                templateUrl: 'templates/common/50x.html'
            })
        $urlRouterProvider.otherwise('/login');
    }
})(angular);
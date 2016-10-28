(function (angular) {
    'use strict';

    angular.module('app').config(CoreRouter);

    CoreRouter.$inject = ['$stateProvider'];

    function CoreRouter($stateProvider) {
        $stateProvider
            .state('authorized', {
                url: '/authorized',
                templateUrl: 'templates/authorized.html',
            })
            .state('authorized.weatherQuery', {
                url: '/weather',
                views: {
                    'authorized-content': {
                        templateUrl: 'templates/weather/query.html',
                        controller: 'WeatherQueryController',
                        controllerAs: 'weatherQuery'
                    }
                }
            })
            .state('authorized.proxyApi', {
                url: '/proxy',
                views: {
                    'authorized-content': {
                        templateUrl: 'templates/proxy/captcha.html',
                        controller: 'ProxyController',
                        controllerAs: 'proxy'
                    }
                }
            })
            .state('authorized.bootstrap', {
                url: '/bootstrap',
                views: {
                    'authorized-content': {
                        templateUrl: 'templates/bootstrap/bootstrap.html',
                        controller: 'UiBootstrapController',
                        controllerAs: 'uiBootstrap'
                    }
                }
            })
            .state('authorized.accout', {
                url: '/accout',
                views: {
                    'authorized-content': {
                        templateUrl: 'templates/accout/accout.html',
                        controller: 'AccoutController',
                        controllerAs: 'accout'
                    }
                }
            })

    }
})(angular);
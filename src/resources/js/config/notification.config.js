(function (angular) {
    'use strict';

    angular.module('app').config(NotificationConfig);

    NotificationConfig.$inject = ['NotificationProvider'];

    function NotificationConfig(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 1000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'center',
            positionY: 'top'
        });
    }
})(angular);
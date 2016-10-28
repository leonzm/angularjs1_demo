(function () {
    'use strict';
    angular.module('app.constants')
        .constant('NOTIFICATION_CONSTANT', {
            NOTIFICATION_HORIZONTAL: [
                {key: 'left', label: '左'},
                {key: 'center', label: '中'},
                {key: 'right', label: '右'},
            ],
            NOTIFICATION_VERTICAL: [
                {key: 'top', label: '上'},
                {key: 'bottom', label: '下'},
            ],
            NOTIFICATION_TYPE: [
                {key: 'primary', label: '主要'},
                {key: 'info', label: '提醒'},
                {key: 'success', label: '成功'},
                {key: 'warning', label: '警告'},
                {key: 'error', label: '异常'}
            ]
        })
})();
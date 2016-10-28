(function (angular) {
    'use strict';

    angular.module('app.constants', []);
    angular.module('app.services', []);
    angular.module('app.filters', []);
    angular.module('app.components', []);
    angular.module('app.controllers', ['app.constants']);

    angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        'ui-notification',
        'app.controllers'
    ]);
})(angular);
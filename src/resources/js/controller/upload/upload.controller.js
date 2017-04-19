(function (angular) {
    "use strict";
    angular.module('app.controllers').controller('UploadController', UploadController);

    //////////////////////////////////////
    console.log('UploadController 加载完毕');
    //////////////////////////////////////

    UploadController.$inject = ['$http', '$state', '$timeout', 'Notification']

    function UploadController($http, $state, $timeout, Notification) {

        var vm = this;
        init();

        function init() {
            // 初始化文件上传
            $("#fileUploadInput").fileinput({
                'showUpload':true,
                'enctype':'multipart/form-data',
                'minFileCount':1,
                'maxFileCount':10,
                'previewFileType':'any',
                'allowedFileExtensions':['txt', 'jpg'] //接收的文件后缀
            });

        }

    }
})(angular);

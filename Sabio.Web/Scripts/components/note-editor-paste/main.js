(function () {
    'use strict';
    // Name *TextPaster*
    angular.module('BananaPad')
        .component('noteEditorPaste', {
            templateUrl: '/Scripts/components/note-editor-paste/main.html',
            controller: 'EditorImagePasterController',
            bindings: {
                note: '<',
                onSave: '&'
            }
        });

    angular.module('BananaPad')
        .controller('EditorImagePasterController', EditorImagePasterController);

    EditorImagePasterController.$inject = ['$scope', 'Upload', '$timeout'];

    function EditorImagePasterController($scope, Upload, $timeout) {
        var vm = this;
        $scope.uploadPic = function (file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: { username: $scope.username, file: file },
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }
})();

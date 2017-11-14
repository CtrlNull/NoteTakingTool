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
        $scope.Upload = function (dataUrl, name) {
            Upload.upload({
                url: 'upload/url',
                data: {
                    file: Upload.dataUrltoBlob(dataUrl, name)
                },
            }).then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                    vm.imagePreview = response.data;
                });
            }, function (response) {
                if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }
})();

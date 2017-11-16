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
    //============================== {[ Controller ]} ===================================//
    var app = angular.module('BananaPad')
    app.controller('EditorImagePasterController', function ($scope, fileReader, $window) {
        var vm = this;
        $scope.imageSrc = "";
        vm.btnSave = _btnSave; // places btn to call
        //======= {file Progress}======//
        $scope.$on("fileProgress", function (e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });
        //======== {IndexDB} ======== //
        var request = window.indexedDB.open('mydb.db', 2); // instantiate Indexed DB
        var db = null;
        //~~~[Checks if user is using an unsupported browser]
        if (!window.indexedDB) {
            window.alert("Your browser doesnt support latest stable version of indexedDB");
        };
        //~~~[Check indexed db version]
        var dbPromise = idb.open('mydb.db', 2, function (upgraadeDb) {
            // Database migration portion
            switch (upgradeDb.oldVersion) {
                case 0:
                    var store = upgradeDb.createObjectStore('imageID', { keyPath: 'imageID', unique: true, autoIncrement: true });
                    store.createIndex('image', 'image', { unique: false }); // Defines field and gives indexing capability
                    console.log("case1");
                case 1:
                    upgradeDb.createObjectStore('imageID')
                        .createIndex('imageName', 'imageName', { unique: false, multiEntry: true });
                    console.log("case2");
                case 2:
                    upgraadeDb.createObjectStore('imageID')
                        .createIndex('imageTime', 'imageTime', { unique: false, multiEntry: true });
                    console.log("case3");
            }

        });
        ////~~~[Create New DB]
        //request.onupgradeneeded = function (event) {
        //    console.log("inside on upgrade");
        //    db = event.target.result; // Gives read acces to db
        //    var objectStore = db.createObjectStore('imageID', { autoIncrement: true }); // Adds new Field
        //    // Create Table
        //    objectStore.
        //};

        //~~~[on click btnSave Save Record]
        dbPromise._btnSave = function(imageSrc, dbPromise) {
            // Grab current urlImage and make a blob
            console.log("button");
            var data = imageSrc,
                blob = new Blob([data], { type: 'text/plain' }),
                url = $window.URL || $window.webkitURL;
            $scope.fileUrl = url.createObjectURL(blob);
            var newFile = url.createObjectURL(blob);
            console.log(newFile);
            // Add blob to IndexedDB
            db = event.target.result; // Gives read acces to db
            var transaction = db.transaction(['imageID'], "readwrite");
            transaction.objectStore("imageID").put(newFile);


        }
    });
    //=============== { Config for file uploader}====================//
    app.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
    }]);
    //================ {Paste Image Directive} ======================//
    app.directive("ngFileSelect", function (fileReader, $timeout) {
        return {
            scope: {
                ngModel: '='
            },
            link: function ($scope, el) {
                function getFile(file) {
                    fileReader.readAsDataUrl(file, $scope)
                        .then(function (result) {
                            $timeout(function () {
                                $scope.ngModel = result;
                            });
                        });
                }
                el.bind("change", function (e) {
                    var file = (e.srcElement || e.target).files[0];
                    getFile(file);
                });
            }
        };
    });
    //====================== {File Reader Factory}===================//
    app.factory("fileReader", function ($q, $log) {
        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
        //~~~[on-Error]
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };
        //~~~[Prograess]
        var onProgress = function (reader, scope) {
            return function (event) {
                scope.$broadcast("fileProgress", {
                    total: event.total,
                    loaded: event.loaded
                });
            };
        };
        //~~~[Get Reader]
        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };
        //~~~[Read URL]
        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        };
        //~~~<Return Stantement>
        return {
            readAsDataUrl: readAsDataURL
        };
    });
})();

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

        var app = angular.module('BananaPad')
        app.controller('EditorImagePasterController', function ($scope, fileReader) {
            $scope.imageSrc = "";

            $scope.$on("fileProgress", function (e, progress) {
                $scope.progress = progress.loaded / progress.total;
            });
            var vm = this;
            vm.btnSave = _btnSave;

            // IndexDB
            var request = window.indexedDB.open('mydb.db', 1);
            var db;
            if (!window.indexedDB) {
                window.alert("Your browser doesnt support latest stable version of indexedDB");
            }
            // Already exists
            request.onsuccess = function (event) {
                db = event.target.result;
                console.log("in the data base");
            };
            // if existing
            request.onerror = function (event) {
                console.log("error with indexedDB");
            };
            // newly created db
            request.onupgradeneeded = function (event) {
                console.log("inside on upgrade");
                db = event.target.result; // Gives read acces to db
                var objectStore = db.createObjectStore("imageTbl", { keyPath: "imageTbl", autoIncrement:true }); // Adds new Field
                // Create Table
                objectStore.createIndex('imageName', 'imageName', { unique: false }); // Defines field and gives indexing capability
                objectStore.createIndex('imageSub', 'imageSub', { unique: false }); // Subject
            };
            function _btnSave() {
                console.log("btnSave");
                var transaction = db.transaction(['imageTbl'], 'readwrite');
                var objectStore = transaction.objectStore('imageTbl');

                var randomData = { imageName: "Dev", stdSub: Math.random() };
                var request = objectStore.add(randomData);
                request.onsuccess = function (event) {
                    console.log(event);
                }
            }

        });

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

        app.factory("fileReader", function ($q, $log) {
            var onLoad = function (reader, deferred, scope) {
                return function () {
                    scope.$apply(function () {
                        deferred.resolve(reader.result);
                    });
                };
            };

            var onError = function (reader, deferred, scope) {
                return function () {
                    scope.$apply(function () {
                        deferred.reject(reader.result);
                    });
                };
            };

            var onProgress = function (reader, scope) {
                return function (event) {
                    scope.$broadcast("fileProgress", {
                        total: event.total,
                        loaded: event.loaded
                    });
                };
            };

            var getReader = function (deferred, scope) {
                var reader = new FileReader();
                reader.onload = onLoad(reader, deferred, scope);
                reader.onerror = onError(reader, deferred, scope);
                reader.onprogress = onProgress(reader, scope);
                return reader;
            };

            var readAsDataURL = function (file, scope) {
                var deferred = $q.defer();

                var reader = getReader(deferred, scope);
                reader.readAsDataURL(file);

                return deferred.promise;
            };

            return {
                readAsDataUrl: readAsDataURL
            };
        });
})();

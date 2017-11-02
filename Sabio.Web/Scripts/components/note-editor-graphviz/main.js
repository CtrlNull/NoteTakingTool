(function(){
    'use strict';

    angular.module('BananaPad')
        .component('noteEditorGraphviz', {
            templateUrl: '/Scripts/components/note-editor-graphviz/main.html',
            controller: 'EditorGraphvizController',
            bindings: {
                note: '<',
                onSave: '&'
            }
        });
    

    angular.module('BananaPad')
        .controller('EditorGraphvizController', EditorGraphvizController);

    EditorGraphvizController.$inject = ['$scope', '$sce'];

    function EditorGraphvizController($scope, $sce){
        var vm = this;

        $scope.$watch(
            function(){ return vm.editMode },
            function(editMode){
                if (!editMode){
                    vm.note.svg = Viz(vm.note.body);
                }
            }
        );

        $scope.$watch(
            function(){ return vm.note.svg },
            function(svg){
                vm.svg = $sce.trustAsHtml(svg);
            }
        );
    }
})();

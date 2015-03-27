(function (angular) {
    'use strict';

    angular.module('todo.all')
        .controller('AllCtrl', ['$scope', '$stateParams', 'TodoModel', '$timeout',
            function ($scope, $stateParams, TodoModel, $timeout) {

                TodoModel.init();

                $scope.TodoModel = TodoModel;

                function refresh () {
                    $scope.items = TodoModel.data;
                }

                $scope.$watch(function () {
                    return TodoModel.data.length;
                }, refresh);

                $scope.createItem = function ($event) {
                    if($event.keyCode === 13) {
                        TodoModel.add($scope.newItem);
                        $scope.newItem = null;
                    }
                };

                $scope.removeItem = function (itemIndex) {
                    TodoModel.remove(itemIndex);
                };

                $scope.completeItem = function (itemIndex) {
                    TodoModel.complete(itemIndex);
                };

                $scope.activateItem = function (itemIndex) {
                    TodoModel.activate(itemIndex);
                };

                $scope.enableEdit = function (itemIndex) {
                    // Allow only one editor enabled at a time
                    TodoModel.data.forEach(function (item, i) {
                        if (itemIndex === i) {
                            item.isEdit = true;
                            $timeout(function () {
                                angular.element('#item-editor-' + itemIndex).focus();
                            });
                        } else {
                            item.isEdit = false;
                        }
                    });
                };

                $scope.toggleSelected = function (item) {
                    item.isSelected = !item.isSelected;
                }

            }
        ]);

})(window.angular);

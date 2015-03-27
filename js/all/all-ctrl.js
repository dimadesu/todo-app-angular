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

                /* Bulk operations */

                $scope.selectAll = function () {
                    TodoModel.data.forEach(function (item) {
                        item.isSelected = true;
                    });
                };

                $scope.markSelectedComplete = function () {
                    TodoModel.data.filter(function (item) {
                        return item.isSelected;
                    }).forEach(function (item) {
                        item.isActive = false;
                    });
                };

                $scope.removeCompleted = function () {
                    var completed = TodoModel.getCompleted();
                    for (var i = TodoModel.data.length-1; i >= 0; i--) {
                        completed.some(function (comp) {
                            if (TodoModel.data[i].ts === comp.ts) {
                                TodoModel.data.splice(i, 1);
                                return true;
                            }
                        });
                    }
                };

            }
        ]);

})(window.angular);

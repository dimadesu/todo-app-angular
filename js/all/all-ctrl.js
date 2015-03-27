(function (angular) {
    'use strict';

    var isInited = false;

    angular.module('todo.all')
        .controller('AllCtrl', ['$scope', '$stateParams', 'TodoModel', '$timeout', '$state', '$rootScope',
            function ($scope, $stateParams, TodoModel, $timeout, $state, $rootScope) {

                function stateInit () {

                    if ($state.is('active-state')) {
                        TodoModel.data.forEach(function (item) {
                            item.isVisible = item.isActive;
                        });
                    } else if ($state.is('completed-state')) {
                        TodoModel.data.forEach(function (item) {
                            item.isVisible = !item.isActive;
                        });
                    } else {
                        TodoModel.data.forEach(function (item) {
                            item.isVisible = true;
                        });
                    }

                }

                function init () {

                    TodoModel.init();

                    // Since user can access through any url force checking the state on first load
                    stateInit();

                    $rootScope.$on('$stateChangeSuccess', stateInit);

                    isInited = true;

                }

                if (!isInited) {
                    init();
                }

                $scope.TodoModel = TodoModel;

                $scope.$watch(function () {
                    return TodoModel.data.length;
                }, function () {
                    $scope.items = TodoModel.data;
                });

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

                /* Operations on groups of items */

                $scope.selectAll = function () {
                    TodoModel.data.forEach(function (item) {
                        item.isSelected = true;
                    });
                };

                $scope.markSelectedComplete = function () {
                    TodoModel.data.forEach(function (item, index) {
                        if (item.isSelected) {
                            TodoModel.complete(index);
                        }
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

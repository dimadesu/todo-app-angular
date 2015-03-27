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

                $scope.createItem = function ($event) {
                    if($event.keyCode === 13) {
                        TodoModel.add($scope.newItem);
                        $scope.newItem = null;
                    }
                };

                $scope.enableEdit = function (_item) {
                    // Allow only one editor enabled at a time
                    TodoModel.data.forEach(function (item, i) {
                        if (item.ts === _item.ts) {
                            item.isEdit = true;
                            $timeout(function () {
                                angular.element('#item-editor-' + item.ts).focus();
                            });
                        } else {
                            item.isEdit = false;
                        }
                    });
                };

                $scope.saveEdited = function ($event, item) {
                    if ($event.keyCode === 13) {
                        item.isEdit = false;
                        TodoModel.save();
                    }
                };

            }
        ]);

})(window.angular);

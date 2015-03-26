(function (angular) {
    'use strict';

    angular.module('todo.all')
        .controller('AllCtrl', ['$scope', '$stateParams', 'TodoModel',
            function ($scope, $stateParams, TodoModel) {

                TodoModel.init();

                $scope.TodoModel = TodoModel;

                function refresh () {
                    $scope.items = TodoModel.data;
                }

                $scope.$watch(function () {
                    return TodoModel.data.length;
                }, refresh);

                $scope.createItem = function () {
                    TodoModel.add($scope.newItem);
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

            }
        ]);

})(window.angular);

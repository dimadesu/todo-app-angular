(function (angular) {
    'use strict';

    angular.module('todo.completed', [])
        .config(['$stateProvider', function ($stateProvider) {

            $stateProvider.state('completed-state', {
                url: '/completed',
                controller: 'AllCtrl',
                templateUrl: 'todo.html'
            });

        }]);

})(window.angular);

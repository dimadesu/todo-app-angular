(function (angular) {
    'use strict';

    angular.module('todo.all', [])
        .config(['$stateProvider', function ($stateProvider) {

            $stateProvider.state('all-state', {
                url: '/',
                controller: 'AllCtrl',
                templateUrl: 'todo.html'
            });

        }]);

})(window.angular);

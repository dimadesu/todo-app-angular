(function (angular) {
    'use strict';

    angular.module('todo.active', [])
        .config(['$stateProvider', function ($stateProvider) {

            $stateProvider.state('active-state', {
                url: '/active',
                controller: 'AllCtrl',
                templateUrl: 'todo.html'
            });

        }]);

})(window.angular);

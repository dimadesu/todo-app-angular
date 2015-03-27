(function(angular) {
	'use strict';

	angular.module('todo', [
		'ui.router',
		'ui.bootstrap',
		'LocalStorageModule',
		// Custom modules
        'todo.alerts',
        'todo.all',
        'todo.active',
        'todo.completed'
	]).config(['$urlRouterProvider', '$provide', '$httpProvider',
		function ($urlRouterProvider, $provide, $httpProvider) {

			// Handle unmatched url
			$urlRouterProvider.otherwise("/all");

			$provide.factory('httpInterceptor', function ($q) {
				var interceptor = {
					response: function (response) {
						return response || $q.when(response);
					},
					responseError: function (rejection) {
						interceptor.errors.push('Cannot load ' + rejection.config.url);
						return $q.reject(rejection);
					},
					errors: []
				};
				return interceptor;
			});

			$httpProvider.interceptors.push('httpInterceptor');

		}
	]);

})(window.angular);

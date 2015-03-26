(function (angular) {

    'use strict';

    angular.module('todo.alerts')
        .controller('AlertsCtrl', ['$scope', 'httpInterceptor', function ($scope, httpInterceptor) {

            $scope.$watch(function(){
                return httpInterceptor.errors.length;
            }, function(newVal, oldVal){
                if (newVal > oldVal) {
                    var alerts = [];
                    httpInterceptor.errors.map(function (error) {
                        alerts.push(
                            { type: 'danger', msg: error }
                        );
                    });
                    $scope.alerts = alerts;
                }
            });

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

        }]);

})(window.angular);

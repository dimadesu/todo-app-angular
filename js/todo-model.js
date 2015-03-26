(function (angular) {

    'use strict';

    angular.module('todo')
        .factory('TodoModel', function () {

            var model = {};

            model.init = function (data) {

                this.data = data;

            };

            return model;

        });

})(window.angular);

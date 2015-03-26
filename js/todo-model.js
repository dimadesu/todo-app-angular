(function (angular) {
    'use strict';

    angular.module('todo')
        .factory('TodoModel', ['localStorageService', function (localStorageService) {

            var model = {
                init: function () {
                    var lsData = localStorageService.get('TodoModel');
                    if (lsData && lsData.length > 0) {
                        this.data = lsData;
                    } else {
                        this.create();
                    }
                },
                create: function () {
                    this.data = [];
                    this.set();
                },
                set: function () {
                    localStorageService.set('TodoModel', this.data);
                },
                add: function (item) {
                    this.data.push({
                        content: item,
                        isEdit: false,
                        isActive: true
                    });
                    this.set();
                },
                remove: function (index) {
                    this.data.splice(index, 1);
                    this.set();
                },
                getActive: function () {
                    return this.data.filter(function (item) {
                        return item.isActive;
                    });
                }
            };

            return model;

        }]);

})(window.angular);

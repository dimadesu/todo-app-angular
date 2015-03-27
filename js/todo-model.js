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
                    this.save();
                },
                save: function () {
                    localStorageService.set('TodoModel', this.data.map(function (item) {
                        item.isSelected = false;
                        item.isVisible = true;
                        item.isEdit = false;
                        return item;
                    }));
                },
                add: function (item) {
                    this.data.push({
                        content: item,
                        isEdit: false,
                        isActive: true,
                        isSelected: false,
                        isVisible: true,
                        ts: new Date()
                    });
                    this.save();
                },
                remove: function (index) {
                    this.data.splice(index, 1);
                    this.save();
                },
                complete: function (index) {
                    this.data[index].isActive = false;
                    this.save();
                },
                activate: function (index) {
                    this.data[index].isActive = true;
                    this.save();
                },
                getActive: function () {
                    return this.data.filter(function (item) {
                        return item.isActive;
                    });
                },
                getCompleted: function () {
                    return this.data.filter(function (item) {
                        return !item.isActive;
                    });
                },
                getSelected: function () {
                    return this.data.filter(function (item) {
                        return item.isSelected;
                    });
                }
            };

            return model;

        }]);

})(window.angular);

(function (angular) {
    'use strict';

    angular.module('todo')
        .factory('TodoModel', ['localStorageService', function (localStorageService) {

            return {
                data: null,
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
                        return angular.extend({}, item, {
                            isSelected: false,
                            isVisible: true,
                            isEdit: false
                        });
                    }));
                },
                Item: function (obj) {
                    this.content = obj.content;
                    this.isEdit = false;
                    this.isActive = angular.isDefined(obj.isActive) ? obj.isActive : true;
                    this.isSelected = false;
                    this.isVisible = true;
                    // Timestamp is used as ID
                    this.ts = obj.ts || new Date().valueOf();
                },
                add: function (content) {
                    this.data.push(new this.Item({ content: content }));
                    this.save();
                },
                getItemIndex: function (_item) {
                    return this.data.filter(function (item) {
                        return _item.ts === item.ts;
                    })[0];
                },
                remove: function (item) {
                    this.data.splice(this.getItemIndex(item), 1);
                    this.save();
                },
                complete: function (item) {
                    item.isActive = false;
                    this.save();
                },
                activate: function (item) {
                    item.isActive = true;
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
                },
                /* Operations on groups of items */
                selectAll: function () {
                    this.data.forEach(function (item) {
                        item.isSelected = true;
                    });
                },
                deselectAll: function () {
                    this.data.forEach(function (item) {
                        item.isSelected = false;
                    });
                },
                markSelectedComplete: function () {
                    this.data.forEach(function (item) {
                        if (item.isSelected) {
                            this.complete(item);
                        }
                    }, this);
                },
                removeCompleted: function () {
                    var completed = this.getCompleted();
                    for (var i = this.data.length-1; i >= 0; i--) {
                        completed.some(function (comp) {
                            if (this.data[i].ts === comp.ts) {
                                this.data.splice(i, 1);
                                return true;
                            }
                        }, this);
                    }
                    this.save();
                }
            };

        }]);

})(window.angular);

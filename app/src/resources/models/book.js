'use strict';

angular.module('app').factory('Book', ['Factory',function(Factory) {

    Factory.Book.prototype.getResume = function() {
        return this.id + '#' + this.title + ' (' + this.description + ')';
    };

    return Factory.Book;
}]);
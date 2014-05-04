'use strict';

angular.module('app')
    .controller('BookCtrl', ['$scope', 'book', function ($scope, book) {

        $scope.book = book;

    }]);
'use strict';

angular.module('app').factory('Factory', ['$RestResource',function($RestResource) {

    var endpoint = 'http://localhost:9000/rest-api/';

    return {
        User: $RestResource(endpoint + 'user/:id', {}),
        Book: $RestResource(endpoint + 'book/:id', {})
    };
}]);
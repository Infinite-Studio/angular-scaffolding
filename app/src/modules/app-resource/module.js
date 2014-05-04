'use strict';

angular.module('app.resource', [
    'ngResource'
])
    .factory('$RestResource', ['$q', '$resource', function($q, $resource) {

        return function( url, params, methods ) {

            var customSave = function() {
                if(this.id) {
                    return this.$update();
                }else{
                    return this.$create();
                }
            };

            var obj;
            var defaults = {
                query: {
                    isArray: true,
                    transformResponse: function(data){
                        for(var i in data){
                            data[i].$save = customSave;
                        }
                        return data;
                    }
                },
                create: {
                    method: 'POST',
                    transformRequest: function(data){
                        obj = angular.copy(data);
                    },
                    interceptor: {
                        response: function (response) {
                            var deferred = $q.defer();
                            response.data.then(function(data){
                                if(data.id === 0){ //Random id for Mock mode
                                    obj.id = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
                                }else{
                                    obj.id = data.id;
                                }
                                deferred.resolve(obj);
                            }, deferred.reject);
                            return deferred.promise;
                        }
                    }
                },
                update: {
                    method: 'PUT',
                    transformRequest: function(data){
                        obj = angular.copy(data);
                    },
                    interceptor: {
                        response: function () {
                            return obj;
                        }
                    }
                }
            };

            var Resource = $resource(url, params, angular.extend(defaults, methods));

            Resource.prototype.$save = customSave;

            return Resource;
        };
    }]);
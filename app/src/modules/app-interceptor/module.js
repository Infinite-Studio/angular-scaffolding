'use strict';

angular.module('app.interceptor', [])
    .factory('appInterceptor', ['$q', '$injector', function($q, $injector) {

    return {

        'request': function(config) {
            return config || $q.when(config);
        },

        'requestError': function(rejection) {
            return $q.reject(rejection);
        },

        'response': function(response) {
            return response || $q.when(response);
        },

        'responseError': function(rejection) {
            var $notification = $injector.get('$notification');
            switch(rejection.status){
                case 401:
                    $notification.add({
                        title: rejection.status + ' : Not authorized',
                        content: rejection.data,
                        type: $notification.const.ERROR
                    });
                    break;
                case 404:
                    $notification.add({
                        title: rejection.status + ' : Page Not Found',
                        content: rejection.data,
                        type: $notification.const.WARNING
                    });
                    break;
                case 500:
                    $notification.add({
                        title: rejection.status + ' : Internal Server Error',
                        content: rejection.data,
                        type: $notification.const.ERROR
                    });
                    break;
                default:
                    $notification.add({
                        title: rejection.status,
                        content: rejection.data,
                        type: $notification.const.ERROR
                    });
                    break;
            }
            return $q.reject(rejection);
        }
    };
}])
.factory('appInterceptorMock', ['$q', '$timeout', function($q, $timeout) {

    var getMockedAsyncRespondTime = function(url){
        switch (url.split(/\./).pop()){
            case 'json':
                return 300;
            case 'html':
                return 0; // In production all views are into cachedUrl as JS Templates
            default: // Web Services
                return 1000;
        }
    };

    return {

        'request': function (config) {
            return config || $q.when(config);
        },

        'requestError': function (rejection) {
            return $q.reject(rejection);
        },

        'response': function (response) {
            var defer = $q.defer();
            $timeout(function() {
                defer.resolve(response);
            }, getMockedAsyncRespondTime(response.config.url.toString()));
            return defer.promise;
        },

        'responseError': function (rejection) {
            return $q.reject(rejection);
        }
    };
}]);
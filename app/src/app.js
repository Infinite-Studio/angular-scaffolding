'use strict';

angular.module('app', [
    'ui.router',
    'pascalprecht.translate',
    'ngAnimate',
    'app.interceptor',
    'app.security',
    'app.notification',
    'app.dialog',
    'app.resource',
    'app.table',
    'app.home',
    'app.book'
]).config([
    '$stateProvider',
    '$urlRouterProvider',
    '$translateProvider',
    '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider) {

        /** Routes */
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                abstract: true,
                templateUrl: 'src/main/view.html',
                resolve: {
                    user: ['User', function(User){
                        return User.get({id:'me'}).$promise;
                    }]
                },
                onEnter: ['$rootScope', '$translatePartialLoader', function($rootScope, $translatePartialLoader){
                    $rootScope.ready = true;
                    $translatePartialLoader.addPart('common');
                }]
            });

        /** END Routes */

        /** Translate */

        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '/i18n/{lang}/{part}.json'
        });
        $translateProvider.preferredLanguage('en');

        /** END Translate */

        /** Interceptor **/
        $httpProvider.interceptors.push('appInterceptor');
        /** END OF Interceptor **/

    }
]);
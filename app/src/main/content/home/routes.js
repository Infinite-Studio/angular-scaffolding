'use strict';

angular.module('app.home', [
    'ui.router',
    'ngResource',
    'pascalprecht.translate',
    'app.security',
]).config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'main',
                url: '/',
                templateUrl: 'src/main/content/home/view.html',
                controller: 'HomeCtrl',
                onEnter: ['user', '$security', '$translate', '$translatePartialLoader',
                    function(user, $security, $translate, $translatePartialLoader){
                    $security.secure(user, ['expert']);
                    $translatePartialLoader.addPart('home');
                    $translate.refresh();
                }]
            });

    }
]);
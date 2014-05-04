'use strict';

angular.module('app.book', [
    'ui.router',
    'ngResource',
    'pascalprecht.translate',
    'app.security'
]).config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('book', {
                parent: 'main',
                url: '/book',
                template: '<div ui-view></div>',
                abstract: true,
                onEnter: ['user', '$security', '$translate', '$translatePartialLoader',
                    function(user, $security, $translate, $translatePartialLoader){
                    $security.secure(user, ['expert']);
                    $translatePartialLoader.addPart('book');
                    $translate.refresh();
                }]
            }).state('book-list', {
                parent: 'book',
                url: '',
                templateUrl: 'src/main/content/book/list.html',
                controller: 'BooksCtrl',
                resolve: {
                    books: ['Factory', function(Factory){
                        return Factory.Book.query().$promise;
                    }]
                }
            }).state('book-view', {
                parent: 'book',
                url: '/{id}',
                templateUrl: 'src/main/content/book/view.html',
                controller: 'BookCtrl',
                resolve: {
                    book: ['Book', '$stateParams', function(Book, $stateParams){
                        return Book.get({id: $stateParams.id}).$promise;
                    }]
                }
            });

    }
]);
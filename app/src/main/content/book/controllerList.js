'use strict';

angular.module('app')
    .controller('BooksCtrl', ['$scope', 'books', '$dialog', 'Book', '$notification', '$translate',
        function ($scope, books, $dialog, Book, $notification, $translate) {

        $scope.books = books;

        var bookForm = function(book, success){
            $scope.book = book;
            $dialog.form({
                scope: $scope,
                title: $translate('book.form.title'),
                content: 'src/main/content/book/form.html',
                onSubmit: function(modal){
                    if(this.form.$valid){
                        this.book.$save().then(function(book){
                            $notification.add({
                                title: $translate('book.form.success.title'),
                                content: $translate('book.form.success.description'),
                                type: $notification.const.SUCCESS
                            });
                            success(book);
                            modal.$hide();
                        }, function(){
                            $notification.add({
                                title: $translate('book.form.error.title'),
                                content: $translate('book.form.error.description'),
                                type: $notification.const.ERROR
                            });
                        });
                    }
                }
            });
        };

        $scope.addBookForm = function(){
            bookForm(new Book(), function(book){
                $scope.books.push(book);
            });
        };

        $scope.updateBookForm = function(oldBook, index){
            bookForm(angular.copy(oldBook), function(book){
                $scope.books[index] = book;
            });
        };

        $scope.deleteBookConfirm = function(book, index){
            $dialog.confirmation({
                scope: $scope,
                title: $translate('book.delete.confirmation.title'),
                content: $translate('book.delete.confirmation.content', {title: book.title}),
                onYes: function(modal){
                    Book.delete({id: book.id}, function(){
                        $scope.books.splice(index, 1);
                        modal.$hide();
                        $notification.add({
                            title: $translate('book.deleted.success.title'),
                            content: $translate('book.deleted.success.content'),
                            type: $notification.const.SUCCESS
                        });
                    });
                },
                onNo: function(modal){
                    modal.$hide();
                }
            });
        };

    }]);
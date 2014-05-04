'use strict';

angular.module('app.dialog', [
    'mgcrea.ngStrap'
])

    .factory('$dialog', ['$modal',
        function($modal){

        var service = {
            const: {
                FORM: 'src/modules/app-dialog/form.html',
                CONFIRMATION: 'src/modules/app-dialog/confirmation.html'
            },
            form: function(attr){
                attr.scope = attr.scope.$new();
                attr.title.then(function(title){
                    attr.scope.title = title;
                });
                delete attr.title;
                attr.scope.onSubmit = attr.onSubmit;
                attr.scope.onCancel = attr.onCancel;
                delete attr.onSubmit;
                delete attr.onCancel;
                attr.template = this.const.FORM;
                $modal(attr);
            },
            confirmation: function(attr){
                attr.scope = attr.scope.$new();
                attr.title.then(function(title){
                    attr.scope.title = title;
                });
                attr.content.then(function(content){
                    attr.scope.content = content;
                });
                delete attr.title;
                delete attr.content;
                attr.scope.onYes = attr.onYes;
                attr.scope.onNo = attr.onNo;
                delete attr.onYes;
                delete attr.onNo;
                attr.template = this.const.CONFIRMATION;
                $modal(attr);
            }
        };

        return service;

    }]);
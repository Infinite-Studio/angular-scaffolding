'use strict';

angular.module('app.table', [])
    .directive('appTable', [function () {

        return {
            templateUrl: 'src/modules/app-table/view.html',
            require: 'ngModel',
            link: function($scope, element, attr) {
                $scope.$watch(attr.ngModel, function(data){
                    element.find('.data-table').dataTable(data);
                });
            }
        };

    }]);
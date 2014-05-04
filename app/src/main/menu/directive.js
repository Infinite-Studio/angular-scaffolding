'use strict';

angular.module('app')
    .directive('appMenu', ['$state', '$translatePartialLoader', '$translate',
        function ($state, $translatePartialLoader, $translate) {

        $translatePartialLoader.addPart('menu');
        $translate.refresh();

        return {
            templateUrl: 'src/main/menu/view.html',
            link: function($scope){
                $scope.state = $state;
            }
        };

    }]);
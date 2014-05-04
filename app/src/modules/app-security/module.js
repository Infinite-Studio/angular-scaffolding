'use strict';

angular.module('app.security', [
    'ui.router'
]).config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider) {

        $stateProvider
            .state('ah-security-forbidden', {
                templateUrl: '/view.html'
            });

    }
]).factory('$security', ['$state', function($state){

    return{
        userInRole: function(userRoles, authRoles){
            for(var i in authRoles){
                for(var j in userRoles){
                    if(authRoles[i] === userRoles[j]){
                        return true;
                    }
                }
            }
            return false;
        },
        secure: function(user, authRoles){
            if(!this.userInRole(user.roles, authRoles)){
                $state.go('ah-security-forbidden');
            }
        }
    };
}]);
'use strict';

angular.module('appMock', [
    'ngMockE2E',
    'ngResource',
    'app'
]).config(['$httpProvider', function($httpProvider) {

    /** Interceptor **/
    $httpProvider.interceptors.push('appInterceptorMock');
    /** END OF Interceptor **/

}]).run(['$httpBackend', '$resource', function ($httpBackend, $resource) {

    /** Mocked Resources */
    // User
    $httpBackend.whenGET(/\/rest-api\/user\/me$/).respond($resource('/src/resources/mock/user/GET-me.json').get().$promise);
    // Book
    $httpBackend.whenGET(/\/rest-api\/book$/).respond($resource('/src/resources/mock/book/GET.json').query());
    $httpBackend.whenPOST(/\/rest-api\/book$/).respond($resource('/src/resources/mock/book/POST.json').get().$promise);
    $httpBackend.whenPUT(/\/rest-api\/book$/).respond(200);
    $httpBackend.whenGET(/\/rest-api\/book\/1$/).respond($resource('/src/resources/mock/book/GET-1.json').get().$promise);
    $httpBackend.whenGET(/\/rest-api\/book\/2$/).respond(404);
    $httpBackend.whenGET(/\/rest-api\/book\/3$/).respond(500);
    $httpBackend.whenDELETE(/\/rest-api\/book\/1*$/).respond(200);
    $httpBackend.whenDELETE(/\/rest-api\/book\/2*$/).respond(404);
    $httpBackend.whenDELETE(/\/rest-api\/book\/3*$/).respond(401);
    $httpBackend.whenDELETE(/\/rest-api\/book\/[0-9]*$/).respond(200);

    $httpBackend.whenGET(/.*/).passThrough();
    /** END OF Mocked Resources */

}]);
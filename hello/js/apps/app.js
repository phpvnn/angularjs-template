'use strict';

var app = angular.module('wfiMotor', ['ngAnimate', 'ngRoute', 'ngResource', 'ngSanitize', 'wfiMotor.services', 'wfiMotor.filters', 'wfiMotor.directives', 'wfiMotor.templates']);


app.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/index/home.html'
  }).when('/directives', {
    templateUrl: 'views/index/directives.html',
  }).when('/e-shopping-cart', {
    templateUrl: 'views/index/filters.html',
  }).when('/e-shopping-cart', {
    templateUrl: 'views/index/e-shopping-cart.html',
  }).otherwise({
    redirectTo: '/'
  });
}]);

var directives = angular.module( 'wfiMotor.directives', [] );
var filters = angular.module( 'wfiMotor.filters', [] );
var services = angular.module( 'wfiMotor.services', [] );
var templates = angular.module( 'wfiMotor.templates', [] );

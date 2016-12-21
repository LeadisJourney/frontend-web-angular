'use strict';

var Leadis = angular.module('Leadis', ['ngRoute', 'LeadisControllers', 'ngStorage'])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when("/home", {
        templateUrl: "home.html",
        controller: "homeController"
    })
    .when("/lessons", {
        templateUrl: "lessons.html",
        controller: "lessonsController"
    })
    .when("/contact", {
        templateUrl: "contact.html",
        controller: "contactController"
    })
    .when("/user", {
        templateUrl: "user.html",
        controller: "userController"
    })
    .otherwise({
        redirectTo: '/home'
    })
}])
.run(run);


function run($localStorage) {
    $localStorage.requestURL = "api-leadisjourney.azurewebsites.net";
};

var LeadisControllers = angular.module('LeadisControllers', []);
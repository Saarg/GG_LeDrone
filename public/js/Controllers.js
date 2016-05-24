/**
 *  @author Marine Le Mezo
 *  @author Yoann Fouillard
 *  @author jean milsonneau
 *  @overview controller angular
 */

// Angular
var app = angular.module('GG_LeDrone', ['ui.router']);
var inter = new Interface();

// ROUTE =======================================================================
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/accueil');

    // Accueil STATES AND NESTED VIEWS ========================================
    $stateProvider.state('accueil', {
        url: '/accueil',
        templateUrl: 'html/accueil.html',
        controller:'mainCtrl'
    })

    $stateProvider.state('bureaubase', {
        url: '/bureaubase',
        templateUrl: 'html/mode_bureau.html',
        controller:'bureauCtrl'
    })

    $stateProvider.state('bureaubureau', {
        url: '/bureaubureau',
        templateUrl: 'html/mode_bureau_bureau.html',
        controller:'bureauABureauCtrl'
    })

    $stateProvider.state('manuel', {
        url: '/manuel',
        templateUrl: 'html/mode_manuel.html',
        controller:'manuCtrl'
    })


    /*    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        $stateProvider.state('about', {
            // we'll get to this in a bit
        });*/

});

// INTERFACE ===================================================================
app.controller('mainCtrl', function($scope, $http, $window) {
    $scope.mode_manuel = function() {
        inter.selectMode(0, $window);
    }
    $scope.mode_bureau = function() {
        inter.selectMode(1, $window);
    }
    $scope.mode_bureau_a_bureau = function() {
        inter.selectMode(2, $window);
    }

});

// MANUEL ======================================================================
app.controller('manuCtrl', function($scope, $http, $window) {
    var modeManuel = new ModeManuel();
    modeManuel.display($scope, $http);

    modeManuel.run(inter, $scope, $http, $window);
});

// BUREAU ======================================================================
app.controller('bureauCtrl', function($scope, $http, $window) {
    var modeBureau = new ModeBureau();
    modeBureau.display($scope, $http);

    modeBureau.run(inter, $scope, $http, $window);
});

// BUREAU A Bureau =============================================================
app.controller('bureauABureauCtrl', function($scope, $http, $window) {
    var modeBureauABureau = new ModeBureauABureau();
    modeBureauABureau.display($scope, $http);

    modeBureauABureau.run(inter, $scope, $http, $window);
});

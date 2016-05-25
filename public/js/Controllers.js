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
        controller:'bureauCtrl',
        onEnter: function() {
            inter.selectMode(1)
        }
    })

    $stateProvider.state('bureaubureau', {
        url: '/bureaubureau',
        templateUrl: 'html/mode_bureau_bureau.html',
        controller:'bureauABureauCtrl',
        onEnter: function() {
            inter.selectMode(2)
        }
    })

    $stateProvider.state('manuel', {
        url: '/manuel',
        templateUrl: 'html/mode_manuel.html',
        controller:'manuCtrl',
        onEnter: function() {
            inter.selectMode(0)
        }
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
    var modeManuel = inter.getMode(0);
    modeManuel.display($scope, $http);

    modeManuel.run(inter, $scope, $http, $window);
});

// BUREAU ======================================================================
app.controller('bureauCtrl', function($scope, $http, $window) {
    var modeBureau = inter.getMode(1);
    modeBureau.display($scope, $http);

    modeBureau.run(inter, $scope, $http, $window);
});

// BUREAU A Bureau =============================================================
app.controller('bureauABureauCtrl', function($scope, $http, $window) {
    var modeBureauABureau = inter.getMode(2);
    modeBureauABureau.display($scope, $http);

    modeBureauABureau.run(inter, $scope, $http, $window);
});

/**
 *  @author Marine Le Mezo
 *  @author Yoann Fouillard
 *  @author jean milsonneau
 *  @overview controller angular
 */

// Angular
var app = angular.module('GG_LeDrone', []);
var inter = new Interface();

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

// Angular
var app = angular.module('GG_LeDrone', []);

// INTERFACE ===================================================================
app.controller('mainCtrl', function($scope, $http) {
    var interface = new Interface();

    $http.get('/api/test').then(function(res) {
        console.log(res.data);
    });

    $http.post('/api/test', { data: "is_this_data" }).then(function(res) {
        console.log(res.data);
    });

});

// MANUEL ======================================================================
app.controller('manuCtrl', function($scope, $http) {
    var modeManuel = new ModeManuel();

    $scope.speed = 50;

    $scope.stop = function() {
        modeManuel.interupt($http);
    }

    $scope.forward = function() {
        modeManuel.move($http, 0, $scope.speed);
    }
    $scope.backward = function() {
        modeManuel.move($http, 1, $scope.speed);
    }
    $scope.left = function() {
        modeManuel.move($http, 2, $scope.speed);
    }
    $scope.right = function() {
        modeManuel.move($http, 3, $scope.speed);
    }

});

// BUREAU ======================================================================
app.controller('bureauCtrl', function($scope, $http) {
    var modeBureau = new ModeBureau();

    $http.get('/api/test').then(function(res) {
        console.log(res.data);
    });

    $http.post('/api/test', { data: "is_this_data" }).then(function(res) {
        console.log(res.data);
    });

});

// BUREAU BUREAU================================================================
app.controller('bureauBureauCtrl', function($scope, $http) {
    var modeBureau = new ModeBureau();

    $http.get('/api/test').then(function(res) {
        console.log(res.data);
    });

    $http.post('/api/test', { data: "is_this_data" }).then(function(res) {
        console.log(res.data);
    });

});

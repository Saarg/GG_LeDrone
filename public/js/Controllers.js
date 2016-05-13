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

    $http.get('/api/test').then(function(res) {
        console.log(res.data);
    });

    $http.post('/api/test', { data: "is_this_data" }).then(function(res) {
        console.log(res.data);
    });

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

// Angular
var app = angular.module('GG_LeDrone', ['ui.router']);

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
        controller:'bureauCtrl'
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

    $scope.anim = ["tap", "SlowShake", "Ondulation"];

    $scope.speed = 50;
    $scope.img = null;
    //FAIT PAR YOANN, VERIFIER SI C4EST BON
    $scope.executeAnimation = function(s) {
        console.log(s);
        selected = s;
    };

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

    $scope.arrayBufferToBase64 = function(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    var getPicture = function() {
        $http.get('/api/picture').then(function(res) {
            $scope.img = res.data.img;
        });

        setTimeout(function() {
            getPicture();
        }, 100);
    }
    getPicture();

});

// BUREAU ======================================================================
app.controller('bureauCtrl', function($scope, $http) {
    var modeBureau = new ModeBureau();

    $scope.selected1 = null;
    $scope.selected2 = null;
    $scope.chercheurs = [];
    $http.get('/api/chercheurs').then(function(res) {
        if (res.data.success) {
            $scope.chercheurs = res.data.chercheurs;
        } else {
            console.error("Impossible de charger la liste des chercheurs");
        }
    });

    $scope.selectChercheur1 = function(c) {
        $scope.selected1 = c;
        console.log($scope.selected1 + " et " + $scope.selected2);
    };
    $scope.selectChercheur2 = function(c) {
        $scope.selected2 = c;
        console.log($scope.selected1 + " et " + $scope.selected2);
    };

    $http.get('/api/test').then(function(res) {
        console.log(res.data);
    });

    $http.post('/api/test', { data: "is_this_data" }).then(function(res) {
        console.log(res.data);
    });

    // Image
    $scope.arrayBufferToBase64 = function(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    $scope.img = null;
    var getPicture = function() {
        $http.get('/api/picture').then(function(res) {
            $scope.img = res.data.img;
        });

        setTimeout(function() {
            getPicture();
        }, 100);
    }
    getPicture();
});

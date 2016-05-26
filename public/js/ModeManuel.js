/**
 *  @author Marine Le Mezo
 *  @author Yoann Fouillard
 *  @author jean milsonneau
 *  @overview mode manuel
 */

class ModeManuel extends Mode{
    constructor() {
        super("mode manuel");
        this.url = "/mode_manuel";
    }

    run(inter, $scope, $http, $window) {
        var m = this;
        $http.get('/api/animations').then(function(res) {
            if(res.data.success) {
                $scope.anim = Object.keys(res.data.animations);
            } else {
                console.error("Impossible de charger la liste des chercheurs");
            }
        });

        $scope.speed = 50;
        $scope.img = null;
        //FAIT PAR YOANN, VERIFIER SI C4EST BON
        $scope.executeAnimation = function(s){
            console.log(s);
            $scope.selected = s;
        }

        $scope.stop = function() {
            m.stop($http);
        }

        $scope.forward = function() {
            m.move($http, 0, $scope.speed);
        }
        $scope.backward = function() {
            m.move($http, 1, $scope.speed);
        }
        $scope.left = function() {
            m.move($http, 2, $scope.speed);
        }
        $scope.right = function() {
            m.move($http, 3, $scope.speed);
        }

        $scope.interupt = function() {
            m.interuptMode($window);
        }
    }

    interupt() {
        super.interupt();
    }

    stop($http) {
        $http.get('/api/stop').then(function(res) {
            //console.log(res.data);
        });
    }

    move($http, dir, speed) {
        $http.post('/api/move', { speed: speed, dir: dir }).then(function(res) {
            // Intruction a en fct de la rep du serv
        });
    }

    jump($http, jumpType) {
        console.log("GG est cassé");
    }

    animation($http, animationType) {
        $http.get('/api/tap').then(function(res) {
            // Intruction a en fct de la rep du serv
        });
    }
}

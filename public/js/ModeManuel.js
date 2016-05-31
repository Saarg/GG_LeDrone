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

    /**
     * Variables et fonction du mode
     * @param  {$scope}
     * @param  {$http}
     * @param  {$window}
     * @return {undefined} pas de retour
     */
    run($scope, $http, $window) {
        var m = this;
        $http.get('/api/animations').then(function(res) {
            if(res.data.success) {
                $scope.enumAnim = res.data.animations;
                $scope.anim = Object.keys(res.data.animations);
            } else {
                console.error("Impossible de charger la liste des chercheurs");
            }
        });

        $scope.speed = 50;
        $scope.img = null;

        $scope.executeAnimation = function(a){
            $http.post('/api/animations', { animation: a }).then(function(res) {
                console.log(res.data.success);
            });
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

    /**
     * interuption du mode
     * @return {undefined} pas de retour
     */
    interupt() {
        super.interupt();
    }

    /**
     * stop le drone
     * @param  {$http}
     * @return {undefined} pas de retour
     */
    stop($http) {
        $http.get('/api/stop').then(function(res) {
            //console.log(res.data);
        });
    }

    /**
     * deplace le drone dans une direction donné a une vitesse
     * @param  {$http}
     * @param  {dir}
     * @param  {speed}
     * @return {undefined} pas de retour
     */
    move($http, dir, speed) {
        $http.post('/api/move', { speed: speed, dir: dir }).then(function(res) {
            // Intruction a en fct de la rep du serv
        });
    }

    /**
     * fait sauter le drone HS
     * @param  {$http}
     * @param  {jumpType}
     * @return {undefined} pas de retour
     */
    jump($http, jumpType) {
        console.log("GG est cassé");
    }

    /**
     * execute une animation
     * @param  {$http}
     * @param  {animationType}
     * @return {undefined} pas de retour
     */
    animation($http, animationType) {
        $http.get('/api/tap').then(function(res) {
            // Intruction a en fct de la rep du serv
        });
    }
}

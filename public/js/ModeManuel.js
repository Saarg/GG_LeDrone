/**
 *  @author jean milsonneau
 *  @overview mode manuel
 */

class ModeManuel extends Mode{
    constructor() {
        super("mode manuel");
    }

    interupt($http) {
        $http.get('/api/stop').then(function(res) {
            console.log(res.data);
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

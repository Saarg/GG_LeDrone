var ModeManuel = function() {
    Mode.call("mode manuel");
};

ModeManuel.prototype = new Mode;
ModeManuel.prototype.constructor = ModeManuel;

ModeManuel.prototype.run = function() {

};

ModeManuel.prototype.display = function() {

};

ModeManuel.prototype.interupt = function ($http) {
    $http.get('/api/stop').then(function(res) {
        console.log(res.data);
    });
};

ModeManuel.prototype.move = function ($http, dir, speed) {
    $http.post('/api/move', { speed: speed, dir: dir }).then(function(res) {
        // Intruction a en fct de la rep du serv
    });
};

ModeManuel.prototype.jump = function ($http, jumpType) {
    console.log("GG est cassé");
};

ModeManuel.prototype.animation = function ($http, animationType) {
    $http.get('/api/tap').then(function(res) {
        // Intruction a en fct de la rep du serv
    });
};

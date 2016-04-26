var Drone = function(pos) {
    var speed = 0;
    var direcetion = 0;
    var batteryLevel = -1;

    var position = pos;

    // ENUMS
    var jumps = {hight: 0, long: 1};
    var direcetions = {forward: 0, backward: 1, left: 2, right: 3};
};

Drone.prototype.sumo = require("node-sumo");

Drone.prototype.connect = function () {
    // body...
};

Drone.prototype.move = function (dir, speed) {
    // body...
};

Drone.prototype.stop = function () {
    // body...
};

Drone.prototype.jump = function (type) {
    // body...
};

Drone.prototype.tap = function () {
    // body...
};

Drone.prototype.getPicture = function () {
    // body...
};

module.exports = Drone;

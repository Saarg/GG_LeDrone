var nodeSumo = require('node-sumo');

var Drone = function(pos) {
    this.speed = 0;
    this.direcetion = 0;

    this.batteryLevel = -1;
    this.posture = -1;

    this.position = pos;

    this.drone = nodeSumo.createClient();

    // ENUMS
    this.jumps = {hight: 0, long: 1};
    this.directions = {forward: 0, backward: 1, left: 2, right: 3};
    this.postures = {postureUnknown: -1, postureStanding: 0, postureJumper: 1, postureKicker: 2, postureStuck: 3};
};

Drone.prototype.connect = function (callback) {
    // Connect
    this.drone.connect(function() {
        this.connected = true;
        console.log("Connected...");
        callback(null, null);
    });

    // Update vars
    this.drone.on("battery", function(battery) {
        batteryLevel = battery;
    });
    this.drone.on("postureStanding", function(battery) {
        this.posture = this.postures.postureStanding;
    });
    this.drone.on("postureJumper", function(battery) {
        this.posture = this.postures.postureJumper;
    });
    this.drone.on("postureKicker", function(battery) {
        this.posture = this.postures.postureKicker;
    });
    this.drone.on("postureStuck", function(battery) {
        this.posture = this.postures.postureStuck;
    });
    this.drone.on("postureStuck", function(battery) {
        this.posture = this.postures.postureStuck;
    });
    this.drone.on("ready", function(battery) {
        this.ready = true;

    });

};

Drone.prototype.move = function (dir, speed) {
    this.stop();
    if(dir == this.directions.forward)
        this.drone.forward(50);
    else if(dir == this.directions.forward)
        this.drone.backward(50);
    else if(dir == this.directions.forward)
        this.drone.left(50);
    else if(dir == this.directions.forward)
        this.drone.right(50);
};

Drone.prototype.stop = function () {
    this.drone.stop();
};

Drone.prototype.jump = function (type) {
    this.drone.animationsLongJump();
};

Drone.prototype.tap = function () {
    this.drone.animationsTap();
};

Drone.prototype.getPicture = function () {
    // body...
};

module.exports = Drone;

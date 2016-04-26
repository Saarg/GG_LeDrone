var nodeSumo = require('node-sumo');

var Drone = function(pos) {
    this.speed = 0;
    this.direcetion = 0;
    this.batteryLevel = -1;

    this.position = pos;

    this.drone = nodeSumo.createClient();

    // ENUMS
    this.jumps = {hight: 0, long: 1};
    this.directions = {forward: 0, backward: 1, left: 2, right: 3};
};

Drone.prototype.connect = function () {
    // Connect
    this.drone.connect(function() {
      console.log("Connected...");
    });

    // Update vars
    this.drone.on("battery", function(battery) {
      batteryLevel = battery;
      console.log("Battery Level: "+batteryLevel);
    });
};

Drone.prototype.move = function (dir, speed) {
    stop();
    if(dir == directions.forward)
        this.drone.forward(50);
    else if(dir == directions.forward)
        this.drone.backward(50);
    else if(dir == directions.forward)
        this.drone.left(50);
    else if(dir == directions.forward)
        this.drone.right(50);
};

Drone.prototype.stop = function () {
    this.drone.stop();
};

Drone.prototype.jump = function (type) {
    this.drone.animationsLongJump();
};

Drone.prototype.tap = function () {
    // body...
};

Drone.prototype.getPicture = function () {
    // body...
};

module.exports = Drone;

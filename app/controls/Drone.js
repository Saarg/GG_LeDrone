"use strict"

/*
 *
 * singleton de la classe drone.
 *
 */
var nodeSumo = require('node-sumo');
var fs = require('fs');

var Image = require('./Image.js');

var Drone = function(pos) {
    console.log("Création de l'instance");
    this.speed = 0;
    this.direcetion = 0;

    this.batteryLevel = -1;
    this.posture = -1;

    this.position = pos;
    this.connected = false;
    this.ready = false;

    this.drone = nodeSumo.createClient();

    this.img = new Image();

    // ENUMS
    this.jumps = {
        hight: 0,
        long: 1
    };
    this.directions = {
        forward: 0,
        backward: 1,
        left: 2,
        right: 3
    };
    this.postures = {
        postureUnknown: -1,
        postureStanding: 0,
        postureJumper: 1,
        postureKicker: 2,
        postureStuck: 3
    };
};

Drone.prototype.connect = function(callback) {
    // Connect
    this.drone.connect(function() {
        var d = Drone.getInstance();
        d.connected = true;
        console.log("Connected...");
        callback(null, null);
    });

    this.video = this.drone.getVideoStream();
    this.video.on("data", function(data) {
        var d = Drone.getInstance();
        d.img.setData(data);
    });

    // Update vars
    this.drone.on("battery", function(battery) {
        var d = Drone.getInstance();
        d.batteryLevel = battery;
    });
    this.drone.on("postureStanding", function(battery) {
        var d = Drone.getInstance();
        d.posture = d.postures.postureStanding;
    });
    this.drone.on("postureJumper", function(battery) {
        var d = Drone.getInstance();
        d.posture = d.postures.postureJumper;
    });
    this.drone.on("postureKicker", function(battery) {
        var d = Drone.getInstance();
        d.posture = d.postures.postureKicker;
    });
    this.drone.on("postureStuck", function(battery) {
        var d = Drone.getInstance();
        d.posture = d.postures.postureStuck;
    });
    this.drone.on("postureStuck", function(battery) {
        var d = Drone.getInstance();
        d.posture = d.postures.postureStuck;
    });
    this.drone.on("ready", function() {
        var d = Drone.getInstance();
        d.ready = true;
    });

};

Drone.prototype.move = function(dir, speed) {
    this.stop();
    if (dir == this.directions.forward)
        this.drone.forward(speed);
    else if (dir == this.directions.backward)
        this.drone.backward(speed);
    else if (dir == this.directions.left)
        this.drone.left(speed);
    else if (dir == this.directions.right)
        this.drone.right(speed);
};

Drone.prototype.stop = function() {
    this.drone.stop();
};

Drone.prototype.jump = function(type) {
    console.error("les sauts ne sont pas disponible GG est en panne");
    //this.drone.animationsLongJump();
};

Drone.prototype.tap = function() {
    this.drone.animationsTap();
};

Drone.prototype.getPicture = function() {
    console.log(this.buf);
    fs.writeFile('img', this.img.getData(), function(err) {
        if (err) throw err;
    });
};

Drone.instance = null;

Drone.getInstance = function() {
    if (this.instance === null) {
        this.instance = new Drone();
    }
    return this.instance;
}

module.exports = Drone.getInstance();

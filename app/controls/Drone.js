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
    this.posture = Drone.postureUnknown;
    this.jumpMotorState = Drone.jumpMotorUnknown;

    this.position = pos;
    this.connected = false;
    this.ready = false;
    this.moving=false;
    this.drone = nodeSumo.createClient();

    this.img = new Image();

    // Callbacks
    this.critical = null;
    this.low = null;

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
    this.jumpMotorStates = {
        jumpMotorUnknown: -1,
        jumpMotorOK: 0,
        jumpMotorErrorBlocked: 1,
        jumpMotorErrorOverheated: 2
    };
    this.animations = {
        stop: 0,
        spin: 1,
        tap: 2,
        slowShake: 3,
        metronome: 4,
        ondulation: 5,
        spinJump: 6,
        spinToPosture: 7,
        spiral: 8,
        slalom: 9
    };

};

Drone.prototype.connect = function(callback) {
    var d = this;

    // Connect
    this.drone.connect(function() {
        d.connected = true;
        console.log("Connected...");
        callback(null, null);
    });

    // Gestion des images en provenance de gg
    this.video = this.drone.getVideoStream();
    this.video.on("data", function(data) {
        d.img.setData(data/*, "image/jpeg"*/);
    });

    // Battery updates
    this.drone.on("battery", function(battery) {
        d.batteryLevel = battery;
    });
    this.drone.on("batteryCritical", function() {
        if (d.critical)
            d.critical();
        else {
            d.stop();
        }
    });
    this.drone.on("batteryLow", function() {
        if (d.low)
            d.low();
        else {
            d.stop();
        }
    });

    // PostureHandlers
    this.drone.on("postureStanding", function() {
        d.posture = d.postures.postureStanding;
    });
    this.drone.on("postureJumper", function() {
        d.posture = d.postures.postureJumper;
    });
    this.drone.on("postureKicker", function() {
        d.posture = d.postures.postureKicker;
    });
    this.drone.on("postureStuck", function() {
        d.posture = d.postures.postureStuck;
    });
    this.drone.on("postureStuck", function() {
        d.posture = d.postures.postureStuck;
    });
    this.drone.on("ready", function() {
        d.ready = true;
    });

    // TODO gestion des jumpLoad mais comme le notre est cassé...

    // JumpMotorHandler
    this.drone.on("jumpMotorOK", function() {
        d.jumpMotorState = d.jumpMotorStates.jumpMotorOK;
    });
    this.drone.on("jumpMotorErrorBlocked", function() {
        d.jumpMotorState = d.jumpMotorStates.jumpMotorErrorBlocked;
    });
    this.drone.on("jumpMotorErrorOverheated", function() {
        d.jumpMotorState = d.jumpMotorStates.jumpMotorErrorOverheated;
    });

};

Drone.prototype.move = function(dir, speed) {
    this.stop();
    this.moving=true;
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
    this.moving=false;
};

Drone.prototype.jump = function(type) {
    console.error("les sauts ne sont pas disponible GG est en panne");
    //this.drone.postureJumper();
    //this.drone.animationsLongJump();
};

Drone.prototype.tap = function() {
    this.drone.animationsTap();
};

Drone.prototype.animation = function(a) {
    this.drone.stop();
    switch(a) {
        case 0:
            this.drone.animationsStop();
            break;
        case 1:
            this.drone.animationsSpin();
            break;
        case 2:
            this.drone.animationsTap();
            break;
        case 3:
            this.drone.animationsSlowShake();
            break;
        case 4:
            this.drone.animationsMetronome();
            break;
        case 5:
            this.drone.animationOndulation();
            break;
        case 6:
            this.drone.animationSpinJump();
            break;
        case 7:
            this.drone.animationSpinToPosture();
            break;
        case 8:
            this.drone.animationSpiral();
            break;
        case 9:
            this.drone.animationSlalom();
            break;
    }
};

Drone.prototype.getPicture = function() {
    return this.img.getData();
};

Drone.prototype.toString = function() {
    return "Drone connecte: " + this.connected + " ready: " + this.ready + " batterie: " + this.batteryLevel + "%";
};

// SINGLETON
Drone.instance = null;

Drone.getInstance = function() {
    if (this.instance === null) {
        this.instance = new Drone();
    }
    return this.instance;
}

module.exports = Drone.getInstance();

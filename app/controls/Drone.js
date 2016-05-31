"use strict"
/**
 * @author jean milsonneau
 * @overview singleton de la classe drone.
 * @overview Permet de controller le drone et ses caractéristiques et son comportement
 */
var nodeSumo = require('node-sumo');
var fs = require('fs');

var Image = require('./Image.js');

class Drone {
    constructor(pos) {
        console.log("Creating Drone Instance");
        this.speed = 0;
        this.direction = 0;

        this.batteryLevel = -1;
        this.posture = Drone.postureUnknown;
        this.jumpMotorState = Drone.jumpMotorUnknown;

        this.position = pos || null;
        this.connected = false;
        this.connecting = false;
        this.ready = false;
        this.moving=false;
        this.drone = nodeSumo.createClient();

        this.img = new Image();

        // Callbacks
        this.critical = null;
        this.low = null;

        // ENUMS
        this.jumps = {
            height: 0,
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
    }

    /**
     * connection au sumo
     * @param  {function} callback a executer quand la connection est faite
     * @return {undefined} pas de retour
     */
    connect(callback) {
        var d = this;
        d.connecting = true;

        // Connect
        this.drone.connect(function() {
            d.connecting = false;
            d.connected = true;
            console.log("Connected...");
            callback(null, null);
        });

        // Gestion des images en provenance de gg
        this.video = this.drone.getVideoStream();
        this.video.on("data", function(data) {
            d.img.setData(data, "image/jpeg");
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
    }

    /**
     * deplacement du sumo
     * @param  {int} direction enum: Drone.directions
     * @param  {int} vitesse entre 0 et 100
     * @return {undefined} pas de retour
     */
    move(dir, speed) {
        this.stop();
        this.moving=true;
        if (dir == this.directions.forward)
            this.drone.forward(speed);
        else if (dir == this.directions.backward)
            this.drone.backward(speed);
        else if (dir == this.directions.left) {
            this.drone.left(speed);
			this.direction += 1;
			if (this.direction == 4) this.direction = 0;
		}
        else if (dir == this.directions.right) {
            this.drone.right(speed);
			this.direction -=1;
			if (this.direction == -1) this.direction = 3;
		}
    };

    /**
     * stop toute action du drone
     * @return {undefined} pas de retour
     */
    stop() {
        this.drone.stop();
        this.moving=false;
    }

    /**
     * !drone HS
     * @return {undefined} pas de retour
     */
    jump() {
        console.error("les sauts ne sont pas disponible GG est en panne");
        //this.drone.postureJumper();
        //this.drone.animationsLongJump();
    }

    /**
     * fait taper le drone
     * @return {undefined} pas de retour
     */
    tap() {
        this.drone.animationsTap();
    }

    /**
     * animation du sumo
     * @param  {int} animation enum: Drone.animations
     * @return {undefined} pas de retour
     */
    animation(a) {
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
                this.drone.animationsOndulation();
                break;
            case 6:
                this.drone.animationsSpinJump();
                break;
            case 7:
                this.drone.animationsSpinToPosture();
                break;
            case 8:
                this.drone.animationsSpiral();
                break;
            case 9:
                this.drone.animationsSlalom();
                break;
        }
    }

    /**
     * getPicture
     * @return {Image} retourne la derniere image envoyé par le drone
     */
    getPicture() {
        return this.img;
    }

    /**
     * getBatteryLevel
     * @return {int} batterie en %
     */
    getBatteryLevel() {
        return this.batteryLevel;
    }

    /**
     * isReady
     * @return {boolean}
     */
    isReady() {
        return this.ready;
    }

    /**
     * isConnected
     * @return {boolean}
     */
    isConnected() {
        return this.connected;
    }

    /**
     * isMoving
     * @return {boolean}
     */
    isMoving() {
        return this.moving;
    }

    /**
     * Retourne un string decrivant la classe
     * @return {string}
     */
    toString() {
        return "Drone connecte: " + this.connected + " ready: " + this.ready + " batterie: " + this.batteryLevel + "%";
    }

}

// SINGLETON
Drone.instance = null;

Drone.getInstance = function() {
    if (this.instance === null) {
        this.instance = new Drone();
    }
    return this.instance;
}

module.exports = Drone.getInstance();

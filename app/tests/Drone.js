var assert = require('assert');
var expect = require("chai").expect;
var Drone  = require("./../controls/Drone.js");

describe('Drone connect', function(){
    this.timeout(5000);
    var d = new Drone();
    it('connection au drone', function(done) {
        d.connect(function(err, data) {
            console.log("prout");
            assert.equal(d.connected, true);
            done();
        });

    });
    it('drone ready', function() {
        assert.equal(d.ready, true);
    });
    it('battery level', function() {
        assert.isAbove(d.batteryLevel, 10, 'niveau de battery trop basse');
    });
    it('test animation', function(){
        d.tap();
        d.move(d.directions.forward, 50);
        d.stop();
    });
})

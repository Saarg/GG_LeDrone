/*
*
*   Toute les commandes possible du client vers le drone
*
*/
var DroneHandler = require ('./controls/DroneHandler.js');
var Drone = require ('./controls/Drone.js');

module.exports = function(app) {

    // DroneHandler
    app.post('api/findPath', function(req, res){ DroneHandler.findPath(req, res); });
    app.post('api/runPath', function(req, res){ DroneHandler.runPath(req, res) });
    app.post('api/goHome', function(req, res){ DroneHandler.goHome(req, res) });
    app.post('api/getResearshers', function(req, res){ DroneHandler.getResearshers(req, res) });

    // Drone
    app.get('api/stop', function(req, res) { Drine.stop() })
    app.post('api/move', function(req, res) { Drone.move(req, res); });
    app.post('api/jump', function(req, res) { Drone.jump(req, res); });
    app.post('api/tap', function(req, res) { Drone.tap(req, res); });
};

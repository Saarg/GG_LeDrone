/*
*
*   Toute les commandes possible du client vers le drone
*
*/
var DroneHandler = require ('./controls/DroneHandler.js');
var Drone = require ('./controls/Drone.js');

module.exports = function(app) {
    var DH = new DroneHandler();
    var D = new Drone();

    // DroneHandler
    app.post('api/findPath', function(req, res){ DH.findPath(req, res); });
    app.post('api/runPath', function(req, res){ DH.runPath(req, res) });
    app.post('api/goHome', function(req, res){ DH.goHome(req, res) });
    app.post('api/getResearshers', function(req, res){ DH.getResearshers(req, res) });

    // Drone
    app.get('api/stop', function(req, res) { D.stop() })
    app.post('api/move', function(req, res) { D.move(req, res); });
    app.post('api/jump', function(req, res) { D.jump(req, res); });
    app.post('api/tap', function(req, res) { D.tap(req, res); });
};

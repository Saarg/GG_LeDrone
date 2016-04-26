var DroneHandler = function() {
    var offices = [];
    //TODO chargement de la liste des bureaux
    var base = offices[0];
    var path = [];
    var dest;

    var drone = new Drone(base)
};

DroneHandler.prototype.droneConnect = function() {
    drone.connect();
};

DroneHandler.prototype.dijkstra = function() {

};


DroneHandler.prototype.findPath = function(req, res) {

};


DroneHandler.prototype.runPath = function(req, res) {

};


DroneHandler.prototype.goHome = function(req, res) {

};

DroneHandler.prototype.getResearshers = function(req, res) {

};

module.exports = DroneHandler;

/*
*
*   Toute les commandes possible du client vers le drone
*
*/
var DroneHandler = require ('./controls/DroneHandler.js');
var Drone = require ('./controls/Drone.js');

module.exports = function(app) {
    var DH = new DroneHandler();

    /*Drone.connect(function(err, data) {
        console.log("GG est on");
    });*/

    app.get('/api/chercheurs', function(req, res) {
        res.json({success: true, message: "liste des chercheurs du CERV", chercheurs: ["Mr Querrec", "Mr Redou", "Mr Gaubert","Mr Nedelec","Mr Buche","Mr Kubicki","Mr Maisel","Mr Parenthoen"]});
    });

//FAIT PAR YOANN VOIR SI CA FONCTIONNE BIEN 
    app.get('/api/animations', function(req, res) {
        res.json({success: true, message: "liste des animations", animations: ["tap", "SlowShake", "Ondulation"]});
    });

    // DroneHandler
    app.post('/api/findPath', function(req, res){ DH.findPath(req, res); });
    app.post('/api/runPath', function(req, res){ DH.runPath(req, res) });
    app.post('/api/goHome', function(req, res){ DH.goHome(req, res) });
    app.post('/api/getResearshers', function(req, res){ DH.getResearshers(req, res) });

    // Drone
    app.get('/api/stop', function(req, res) {
        Drone.stop();
        res.json({success: true, message: "stop!"});
    });
    app.post('/api/move', function(req, res) {
        Drone.move(req.body.dir, req.body.speed);
        res.json({success: true, message: "ca bouge!"});
    });
    app.post('/api/jump', function(req, res) {
        Drone.jump(req.data.jumpType);
        res.json({success: true, message: "ca saute!"});
    });
    app.get('/api/tap', function(req, res) {
        Drone.tap();
        res.json({succes: true, message: "tap tap!"});
    });
    app.get('/api/picture', function(req, res) {
        var img = Drone.getPicture();
        res.json({succes: true, img: img});
    });
};

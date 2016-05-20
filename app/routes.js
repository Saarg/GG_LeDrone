/*
*
*   Toute les commandes possible du client vers le drone
*
*/
var DroneHandler = require ('./controls/DroneHandler.js');
var Drone = require ('./controls/Drone.js');
var CERV = require ('./../config/CERV.js')

module.exports = function(app) {
    // Initialisation du DroneHandler ==========================================
    var DH = new DroneHandler();

    // Gestion de la batterie ==================================================
    Drone.low = function() {
        console.log("niveau de batterie faible!");
    };

    Drone.critical = function() {
        console.log("niveau de batterie critique!!!");
    };

    // Connect =================================================================
    /*Drone.connect(function(err, data) {
        console.log("GG est on");
    });*/

    // Infos CERV ==============================================================
    app.get('/api/chercheurs', function(req, res) {
        // chercheurs
        res.json({success: true, message: "liste des chercheurs du CERV", chercheurs: CERV.chercheurs});
    });

    // DroneHandler ============================================================
    app.post('/api/findPath', function(req, res){ DH.findPath(req, res); });
    app.post('/api/runPath', function(req, res){ DH.runPath(req, res) });
    app.post('/api/goHome', function(req, res){ DH.goHome(req, res) });
    app.post('/api/getResearshers', function(req, res){ DH.getResearshers(req, res) });

    // Drone movement ==========================================================
    app.get('/api/stop', function(req, res) {
        // none
        Drone.stop();
        res.json({success: true, message: "stop!"});
    });
    app.post('/api/move', function(req, res) {
        // speed dir || none
        Drone.move(req.body.dir, req.body.speed);
        res.json({success: true, message: "ca bouge!"});
    });
    app.post('/api/jump', function(req, res) {
        // jumpType(0, 1) || none
        Drone.jump(req.data.jumpType);
        res.json({success: true, message: "ca saute!"});
    });
    app.get('/api/tap', function(req, res) {
        // none
        Drone.tap();
        res.json({succes: true, message: "tap tap!"});
    });

    // Animations ==============================================================
    app.get('/api/animations', function(req, res) {
        // animations
        res.json({succes: true, message: "liste des animations dispo", animations: Drone.animations});
    });
    app.post('/api/animation', function(req, res) {
        // none || animations
        Drone.animation(req.body.animation);
        res.json({succes: true, message: "je fais l'animation"});
    });

    // Image ===================================================================
    app.get('/api/picture', function(req, res) {
        var img = Drone.getPicture();
        res.json({succes: true, img: img});
    });
};

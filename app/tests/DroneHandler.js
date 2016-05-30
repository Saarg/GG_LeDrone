var Drone = require("./../controls/Drone.js");
var DroneHandler = require("./../controls/DroneHandler.js");
var Office = require("./../controls/Office.js");
var Ark = require("./../controls/Ark.js");
var CERV = require ('./../../config/CERV.js');

Drone.connect(function(err, data) {
    //callback quand le drone se connecte
    Drone.move(Drone.directions.left);
    setTimeout(function() {
        Drone.move(Drone.directions.right);
        setTimeout(function() {
            Drone.stop();
            Drone.getPicture();

            test();
        }, 500);
    }, 500);

});

var test = function() {
	console.log("\n\n\n\n\nStarting application, instantiating DroneHandler ...\n");
	var handler = new DroneHandler();			//Will instantiate the handler, read Offices, Arks and moves from file and instantiate them.

    Drone.position = handler.offices[0];
    handler.destination = handler.offices[8];
	handler.findPath(CERV.offices[8]);

	var ark = handler.offices[0].arks[0];
	console.log(ark.name);
	ark.getMoves(ark.getExtremity(handler.offices[0]));

	console.log(handler.getResearchers());			//work as it should up to there

    handler.runPath(0, 0, null);					//should work now
	//console.log("coming back home");
	//handler.goHome();
    return;
};

test();

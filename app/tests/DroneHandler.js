var Drone = require("./../controls/Drone.js");
var DroneHandler = require("./../controls/DroneHandler.js");
var Office = require("./../controls/Office.js");
var Ark = require("./../controls/Ark.js");

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
    console.log("Instanciation Offices");
    var officeA = new Office(1, "A");
    var officeB = new Office(2, "B");
    var officeC = new Office(3, "C");
    var officeD = new Office(5, "D");
    var officeE = new Office(6, "E");
    var officeF = new Office(7, "F");
    var officeG = new Office(8, "G");
    var officeH = new Office(9, "H");

    console.log("Instanciation arcs");
    var arcAB = new Ark(1, officeA, officeB);
    var arcAC = new Ark(2, officeA, officeC);
    var arcAD = new Ark(3, officeA, officeD);
    var arcAE = new Ark(7, officeA, officeE);
    var arcBC = new Ark(3, officeB, officeC);
    var arcBE = new Ark(6, officeB, officeE);
    var arcBG = new Ark(2, officeB, officeG);
    var arcCE = new Ark(4, officeC, officeE);
    var arcCH = new Ark(9, officeC, officeH);
    var arcDH = new Ark(8, officeD, officeH);
    var arcEF = new Ark(1, officeE, officeF);
    var arcEG = new Ark(1, officeE, officeG);
    var arcEH = new Ark(3, officeE, officeH);

    console.log("Création liste offices");

    console.log("Assignation des mouvements");
    arcAB.moves = [
        [Drone.directions.forward],
        [500]
    ];
    arcBG.moves = [
        [Drone.directions.left,Drone.directions.right],
        [240,480]
    ];
    arcEG.moves = [
        [Drone.directions.forward],
        [2000]
    ];
    arcEF.moves = [
        [Drone.directions.backward],
        [2000]
    ];
    var offices = [officeA, officeB, officeC, officeD, officeE, officeF, officeG, officeH];

    console.log("Création du DroneHandler");
    var handler = new DroneHandler(offices);
    Drone.position = officeA;
    handler.drone = Drone;
    handler.destination = officeF;
    handler.offices = offices;
    console.log("offices : " + handler.offices.researcher);

    console.log("Appel Djikstra");
    var arkVec = handler.dijkstra();
    console.log("sortie dijkstra: " + arkVec);
    console.log("Convertion chemin");
    handler.convertPath(arkVec, officeF);
    console.log("Liste des sommets:");
    for (var i in handler.path) console.log(handler.path[i].researcher);
    console.log("RunPath");
    handler.runPath(0, 0, 0, 0, null);
    //  handler.readOfficeTxt("offices.txt");
  //console.log("coming back home");
 //  handler.goHome();
    return;
};

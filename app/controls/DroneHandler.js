'use strict'
var Drone = require("./Drone.js");
var Office = require("./Office.js");
var Ark = require("./Ark.js");

var DroneHandler = function(offices) {
    this.offices = offices;
    //this.offices.prototype=new Office() //c'est fait en mode crassou : lors de l'instanciation d'un office, il s'ajoute au handler A CHANGER
    //TODO chargement de la liste des bureaux
    //this.base = this.offices[0];
    this.path = [];
    this.destination;

    this.drone = Drone;
};

DroneHandler.prototype.droneConnect = function() {
    drone.connect();
};

DroneHandler.prototype.dijkstra = function() { //boucle infinie
    var sumMarks = 0;
    var len = this.offices.length;
    var marks = []; //vecteur de marquage
    var distance = []; //vecteur distances
    var incArks = []; //vecteur arcs entrants

    for (var i = 0; i < len; i++) { /*-------------------------------------------------*/
        marks[i] = 0;
        distance[i] = 99999999; /*Initialisation des sommets*/
    }

    var pos = this.offices.indexOf(this.drone.position); /*Sommet de départ*/
    //  var pos = 0; //à remplacer par la ligne, test drone batterie à plat

    distance[pos] = 0;
    /*-------------------------------------------------*/

    while (sumMarks < len) { /*tant que tous les sommets ne sont pas traités*/
        sumMarks = 0;
        var officeIndex;
        var min = 9999999999;
        /*-------------------------------------------------*/
        for (var i in this.offices) {
            if ((marks[i] == 0) && (distance[i] < min)) {
                min = distance[i];
                officeIndex = i; /*Recherche du sommet non marqué le plus proche*/
            }
        }
        var currOffice = this.offices[officeIndex]; //sommet a traite

        /*-------------------------------------------------*/

        for (var j in currOffice.arks) { /*Parcours des arcs de ce sommet*/
            var nextOffice = currOffice.arks[j].getExtremity(currOffice);
            var nextPos = this.offices.indexOf(nextOffice); /*On prends l'extremite de l'arc*/
            if (distance[nextPos] > currOffice.arks[j].length + distance[officeIndex]) {
                distance[nextPos] = distance[officeIndex] + currOffice.arks[j].length;
                incArks[nextPos] = currOffice.arks[j]; //on stocke l'arc entrant dans un vecteur
            }
        }

        marks[officeIndex] = 1; /*on marque le sommet quand on a fini*/
        for (var l in marks) sumMarks += marks[l]; //on compte le nb de sommets marques
    }

    for (var j in this.offices) {
        this.offices[j].distance = distance[j];
    } //recopie de la distance dans chaque sommet (utile ?)
    return incArks; //CECI N'EST PAS LE PATH
}


DroneHandler.prototype.convertPath = function(arksVec, destination) { /*convertit le vecteur d'arc en sortie de dijkstra*/
    var pos = destination;
    var start = this.drone.position; /*renvoie le chemin à parcourir*/
    this.path = [];
    this.path.push(destination); //path contient l'arrivee
    var posNbr = this.offices.indexOf(destination);

    while (pos != start && arksVec[posNbr]) {
        pos = arksVec[posNbr].getExtremity(pos);
        if (pos == start) break;
        posNbr = this.offices.indexOf(pos);
        this.path.push(this.offices[posNbr]); //apres cette boucle, path contient tous les sommets
    }
    this.path.push(this.drone.position);
    this.path.reverse(); //CECI EST LE PATH

}






DroneHandler.prototype.findPath = function(req, res) {
    arks = this.dijkstra();
    this.path = this.convertPath(arks, req);
    res.json({
        success: true,
        message: "patate"
    })

};



DroneHandler.prototype.runPath = function(req, res, officeIndex, moveIndex) {
    if (this.drone.connected && this.drone.posture == 1) {

        console.log("\nentering runPath");
        console.log("position : " + this.drone.position.researcher);
        this.drone.stop();

        var thisHandler = this; //this pas accessible dans le setTimeout;

        if (this.drone.position != this.destination) {
            var moves = this.path[officeIndex].findArk(this.path[officeIndex + 1]).moves;
            this.drone.move(moves[moveIndex], 50);
            setTimeout(function() {
                thisHandler.pathRecursion(officeIndex, moveIndex, moves);
            }, 500);
        }
        if (this.drone.position == this.destination) {
            setTimeout(function() {
                console.log("end")
                thisHandler.endPath(req, res);
            }, 500);
        }
    }
}




DroneHandler.prototype.endPath = function(req, res) {
    console.log("entering endPath");
    //json.res();
    process.exit(); ////////////////////////////////////on peut faire comme ça ?
};

DroneHandler.prototype.pathRecursion = function(officeIndex, moveIndex, moves) {
    console.log("move :" + moves[moveIndex])
    if (moveIndex == moves.length - 1) {
        this.drone.position = this.path[officeIndex + 1];
        this.runPath(0, 0, officeIndex + 1, 0);
    } else {
        this.runPath(0, 0, officeIndex, moveIndex + 1);
    }
    console.log("end recursion");
};

DroneHandler.prototype.goHome = function(req, res) {

};

DroneHandler.prototype.getResearshers = function(req, res) {

};

module.exports = DroneHandler;

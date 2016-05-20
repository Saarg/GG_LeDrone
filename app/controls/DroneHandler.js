'use strict'
var Drone = require("./Drone.js");
var Office = require("./Office.js");
var Ark = require("./Ark.js");
var fs = require('fs');
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
    // res.json({success: true, message: "chemins trouvés"});
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
    // res.json({success: true, message: "chemin convertit"});

}






DroneHandler.prototype.findPath = function(req, res) {
    //req : destination désirée
    var arks = this.dijkstra();
    // this.path = this.convertPath(arks, req.body.dest);
    this.path = this.convertPath(arks, req);

    // res.json({
    //     success: true,
    //     message: "chemin trouvé"
    // })

};

DroneHandler.prototype.runPath = function(req, res, officeIndex, moveIndex, callback) {
        console.log("\nentering runPath");
        console.log("position : "+this.drone.position.researcher);
        this.drone.stop();

        var thisHandler = this; //this pas accessible dans le setTimeout;

        if (this.drone.position == this.destination) {
            console.log("end");
            //res.json...
            return;

        }

        if (this.drone.position != this.destination) {
            var moves = thisHandler.path[officeIndex].findArk(thisHandler.path[officeIndex + 1]).moves;
            console.log("moving "+moves);
            console.log("temp move : " + moves[0][moveIndex] + " => " + moves[1][moveIndex]);

            this.drone.move(moves[0][moveIndex], 50);
            callback = function() {
                setTimeout(function() {
                  if (moveIndex == moves.length - 1) {
                      moveIndex=0;
                      officeIndex++;
                      thisHandler.drone.position=thisHandler.path[officeIndex];
                    //  thisHandler.runPath(req,res, 0, officeIndex + 1, 0, callback);
                  } else {
                      //thisHandler.runPath(req,res, officeIndex, moveIndex + 1, callback);
                      moveIndex++;
                  }
                  thisHandler.runPath(req, res, officeIndex, moveIndex, null)
                }, moves[1][moveIndex] || 500);
                return;
            }
        }
        console.log("end recursion");
        if (callback) callback();

}


DroneHandler.prototype.goHome = function(req, res) {
    if (this.drone.moving) {
        var posIndex = this.path.indexOf(this.drone.position);
        this.path.splice(posIndex + 1, this.path.length);
    }

    this.findPath(this.offices[0]);
    this.runPath(req, res);
};

DroneHandler.prototype.getResearshers = function(req, res) {

};

DroneHandler.prototype.readOfficeTxt = function(file) {
    require('fs').readFile('./../config/offices.json', 'utf8', function(err, data) {
        if (err) throw err; // we'll not consider error handling for now
        var offices = JSON.parse(data);
    });
    return offices;
}

module.exports = DroneHandler;

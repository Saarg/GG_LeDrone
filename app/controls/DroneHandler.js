'use strict'
/**
 * @author CREACH Yohann PIGUEL Jeremy
 * @overview Define DroneHandler which is responsible for operating the drone.
 */
 
var Drone = require("./Drone.js");
var Office = require("./Office.js");
var Ark = require("./Ark.js");
var CERV = require ('./../../config/CERV.js');
var fs = require('fs');

class DroneHandler {
    constructor(file) {
        //TODO chargement de la liste des bureaux
		file = file || "./../../config/OfficesData.json";
		this.offices = Office.getOfficesFromJSON(file);
        this.path = [];
        this.destination;
    };

    /**
     * connection au sumo
     * @return {undefined} pas de retour
     */
    droneConnect() {
        Drone.connect();
    };

    /**
	 * @parameter {Office} Destination, allows the function to end sooner. If used, will not allow convertPath to induce path for unmarked Offices.
     * @return {Ark} Incoming arks vector for all (if destination is not given) or some (including all needed to induce path for destination) Offices.
     */
    dijkstra(destination) {
		console.log("\nEntering dijkstra() function ...");
        var sumMarks = 0;
        var len = this.offices.length;
        var marks = []; 	//Marks vector
        var distance = []; 	//Lengths vector
        var incArks = []; 	//Incoming Arks vector
		var destIndex = this.offices.indexOf(destination);

        for (var i = 0; i < len; i++) { 	//Initialisation
            marks[i] = 0;
            distance[i] = 99999999;
        };

        var pos = this.offices.indexOf(Drone.position); //Dijkstra is calculated from the drone's current position.
        distance[pos] = 0;

        while (sumMarks < len) { 	//We wait for all Offices to be marked or the destination to be marked
            sumMarks = 0;
            var officeIndex;
            var min = 9999999999;
			
            for (var i in this.offices) {	//We look for the closest unmarked Office.
                if ((marks[i] == 0) && (distance[i] < min)) {
                    min = distance[i];
                    officeIndex = i;
                }
            }
            var currOffice = this.offices[officeIndex]; 	//Current office being worked on

            /*-------------------------------------------------*/

            for (var j in currOffice.arks) { 	//We go through every ark
                var nextOffice = currOffice.arks[j].getExtremity(currOffice);	//Looking for other extremity
                var nextPos = this.offices.indexOf(nextOffice);
                if ((!marks[nextPos]) && (distance[nextPos] > currOffice.arks[j].length + distance[officeIndex])) {
                    distance[nextPos] = distance[officeIndex] + currOffice.arks[j].length;
                    incArks[nextPos] = currOffice.arks[j]; 	//Incoming ark is stored into the vector
                };
            };

            marks[officeIndex] = 1; //Marking Office when done
			if ((destIndex != -1) && (marks[destIndex])) sumMarks = len;
            for (var l in marks) sumMarks += marks[l]; //Checking whether all Offices are marked.
        };

        for (var j in this.offices) this.offices[j].distance = distance[j]; //Length is stored into the Office
		console.log("\n\nIncoming Arks vector :\n");
		for (var z in incArks) {
			console.log("Ark : " + incArks[z].name + "   Length : " + incArks[z].length);
		};
		console.log("\nExiting Dijkstra function ...");
        return incArks; //Incoming arks vector
    };

    /**
     * @param  {Ark} Incoming arks vector for required Offices.
     * @param  {Office} Destination.
     * @return {undefined} No return.
     */
    convertPath(arksVec, destination) {
		console.log("\nEntering convertPath() function ...");
        var pos = destination;
        var start = Drone.position;
        this.path = [];	//We'll store the path there in reverse order (from end to beginning).
        this.path.push(destination); //We start by storing the destination
        var posNbr = this.offices.indexOf(destination);

        while (pos != start && arksVec[posNbr]) { //We induce previous Office from incoming arks vector.
            pos = arksVec[posNbr].getExtremity(pos);
            posNbr = this.offices.indexOf(pos);
            this.path.push(this.offices[posNbr]);
        };
		
        this.path.reverse(); //We reverse the array to get the order right.
		console.log("Path has been found :\n" );
		for (var z in this.path) {
			console.log("Office : " + this.path[z].researcher);
		};
		console.log("\nExiting convertPath() function");
    };

    /**
	 * @parameter {Office} Destination, may be used as parameter for dijkstra(), must be used for convertPath.
     * @return {undefined} No return.
     */
    findPath() {
        var incArks = this.dijkstra(this.destination);
        this.path = this.convertPath(incArks, this.destination);
    };

    /**
     * parcour du chemin
     * @param  {Ark} officeIndex TODO definir la valeur
     * @param  {undefined} moveIndex TODO definir la valeur
     * @param  {function} callback TODO definir la valeur
     * @return {undefined} pas de retour
     */
    runPath(officeIndex, moveIndex, callback) {
            console.log("\Entering runPath");
            console.log("position : "+Drone.position.researcher);
            Drone.stop();

            var thisHandler = this; //this pas accessible dans le setTimeout;

            if (Drone.position == this.destination) {
                console.log("end");
                return;
            };

            if (Drone.position != this.destination) {
                var moves = thisHandler.path[officeIndex].findArk(thisHandler.path[officeIndex + 1]).moves;
                console.log("moving "+moves);
                console.log("temp move : " + moves[0][moveIndex] + " => " + moves[1][moveIndex]);

                Drone.move(moves[0][moveIndex], 50);
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

    /**
     * @return {undefined} No return.
     */
    goHome() {
        if (Drone.moving) {	//We need to wait for the drone to get to the next Office if he isn't done with his previous order.
            this.path.splice(this.path.indexOf(Drone.position)++);	//We stop the drone at the next office
        };
		while (Drone.moving) {};
        this.findPath(this.offices[0]);	//We recalculate the path to home.
        this.runPath();					//We send the drone back.
    }

    /**
     * Returns researchers list in alphabetical order (except for special characters).
     * @return {array} Researchers list in alphabetical order.
     */
    getResearchers() {
		var array = CERV.chercheurs;
		array.sort(alphabetical(a,b)); //Sort using alphabetical order (except for special characters such as é or ç).
        return array;
    };
	
	/**
     * Returns researchers list in Unicode order.
     * @return {number} 1 if a > b, -1 i a < b else 0.
     */
	static sortingAlphabetical(a, b) {
		if (a == b) return 0;
		var c = (a > b) ? a : b;
		if ((a >= "a") && (a <= "z") && (a-32==b)) return 0;	//Letter case
		if ((b >= "a") && (b <= "z") && (b-32==a)) return 0;
		//Specials characters are a pain
		if (a > b) return 1;
		else return -1;
	};
	
	/**
     * Can be used to sort Offices by id.
     * @return {number} 1 if a.id > b.id, -1 if a.id < b.id else 0.
     */
	static sortingId(a,b) {
		if (a.id > b.id) return 1;
		if (a.id < b.id) return -1;
		return 0;
	};
	
	/**
     * Can be used to sort Offices by researcher.
     * @return {number} 1 if a.researcher > b.researcher, -1 if a.researcher < b.researcher else 0.
     */
	static sortingResearcher(a,b) {
		a = a.researcher;
		b = b.researcher;
		if (a == b) return 0;
		if ((a >= "a") && (a <= "z") && (a-32==b)) return 0;	//Letter case
		if ((b >= "a") && (b <= "z") && (b-32==a)) return 0;
		//Specials characters are a pain
		if (a > b) return 1;
		else return -1;
	};
};

module.exports = DroneHandler;
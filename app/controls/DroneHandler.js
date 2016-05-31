'use strict'
/**
 * @author CREACH Yohann PIGUEL Jeremy
 * @overview Define DroneHandler which is responsible for operating the drone.
 */

var Drone = require("./Drone.js");
var Office = require("./Office.js");
var Ark = require("./Ark.js");
var CERV = require('./../../config/CERV.js');
var fs = require('fs');

class DroneHandler {
    constructor() {
		this.offices = Office.getOfficesFromJSON(CERV);
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
     * Computes shortest paths from Drone's current position to all other Offices (unless destination parameter is used).
	 * @param {Office} Destination, allows the function to end sooner. If used, will not allow convertPath to induce path for unmarked Offices.
     * @return {Ark} Incoming arks vector for all (if destination is not given) or some (including all needed to induce path for destination) Offices.
     */
    dijkstra(destination) {
		//console.log("\nEntering dijkstra() function ...");
        var sumMarks = 0;
        var len = this.offices.length;
        var marks = []; 	//Marks vector
        var distance = []; 	//Lengths vector
        var incArks = []; 	//Incoming Arks vector
		var destIndex = destination.id;

        for (var i = 0; i < len; i++) { //Initialisation
            marks[i] = 0;
            distance[i] = 99999999;
        };

        var pos = this.offices.indexOf(Drone.position); //Dijkstra is calculated from the drone's current position.
        distance[pos] = 0;

        while (sumMarks < len) { //We wait for all Offices to be marked or the destination to be marked
            sumMarks = 0;
            var officeIndex;
            var min = 9999999999;

            for (var i in this.offices) { //We look for the closest unmarked Office.
                if ((marks[i] == 0) && (distance[i] < min)) {
                    min = distance[i];
                    officeIndex = i;
                }
            }
            var currOffice = this.offices[officeIndex]; //Current office being worked on

            /*-------------------------------------------------*/

            for (var j in currOffice.arks) { //We go through every ark
                var nextOffice = currOffice.arks[j].getExtremity(currOffice); //Looking for other extremity
                var nextPos = this.offices.indexOf(nextOffice);
                if ((!marks[nextPos]) && (distance[nextPos] > currOffice.arks[j].length + distance[officeIndex])) {
                    distance[nextPos] = distance[officeIndex] + currOffice.arks[j].length;
                    incArks[nextPos] = currOffice.arks[j]; //Incoming ark is stored into the vector
                };
            };

            marks[officeIndex] = 1; //Marking Office when done
            if ((destIndex != -1) && (marks[destIndex])) sumMarks = len;
            for (var l in marks) sumMarks += marks[l]; //Checking whether all Offices are marked.
        };

        for (var j in this.offices) this.offices[j].distance = distance[j]; //Length is stored into the Office

		//console.log("\n\nIncoming Arks vector :\n");
		//for (var z in incArks) {
			//console.log("Ark : " + incArks[z].name + "   Length : " + incArks[z].length);
		//};
		//console.log("\nExiting Dijkstra function ...");
        return incArks; //Incoming arks vector
    };

    /**
     * Induces path from incoming arks vector produced by dijkstra() function.
     * @param  {Ark} Incoming arks vector for required Offices.
     * @param  {Office} Destination.
     * @return {undefined} No return.
     */
    convertPath(arksVec, destination) {
		//console.log("\nEntering convertPath() function ...");
        var pos = destination;
        var start = Drone.position;
        this.path = []; //We'll store the path there in reverse order (from end to beginning).
        this.path.push(destination); //We start by storing the destination
        var posNbr = this.offices.indexOf(destination);

        while (pos != start && arksVec[posNbr]) { //We induce previous Office from incoming arks vector.
            pos = arksVec[posNbr].getExtremity(pos);
            posNbr = this.offices.indexOf(pos);
            this.path.push(this.offices[posNbr]);
        };

        this.path.reverse(); //We reverse the array to get the order right.
		/*console.log("Path has been found :\n" );
		for (var z in this.path) {
			console.log("Office : " + this.path[z].researcher);
		};
		console.log("\nExiting convertPath() function ...\n");*/
	};

	/**
	 * Finds shortest path, essentially calls dijkstra() followed by convertPath() functions.
	 * @param {Office} Destination, may be used as parameter for dijkstra(), must be used for convertPath.
	 * @return {undefined} No return.
	 */
	findPath(dest) {
        //console.log(dest);
        //console.log(this.offices[dest.id]);
        this.destination = this.offices[dest.id];

		var incArks = this.dijkstra(this.destination);
		this.convertPath(incArks, this.destination);

        //var ark = this.offices[0].arks[0];
    	//console.log(ark.name);
    	//ark.getMoves(ark.getExtremity(this.offices[0]));
	};

    /**
     * Send the drone to its destination.
     * @param  {number} officeIndex corresponds to the current Ark
     * @param  {number} moveIndex corresponds to current move in current Ark
     * @param  {function} callback TODO definir la valeur
     * @return {undefined} No return.
     */
    runPath(officeIndex, moveIndex, callback, moves) {
        if (!officeIndex && !moveIndex) {
            console.log("GG is going toward " + this.destination.researcher + "'s office.");
            this.endCb = callback;
        }
        //if (moveIndex == 0) console.log("\n\nDrone is currently at " + Drone.position.researcher + "'s office.\n");
        Drone.stop();
        var handler = this; //this not accessible in setTimeout;

        if (Drone.position == this.destination) { 	//Drone arrived to destination
			console.log("Drone arrived at destination : " + this.destination.researcher + "'s office.\n");
            if(handler.endCb) {
                handler.endCb();
            }
            return;
		};


		if (!moves || moveIndex == 0) {
            moves = JSON.parse(JSON.stringify(handler.path[officeIndex].findArk(handler.path[officeIndex + 1]).getMoves(Drone.position))); //can probably be optimized
			var arkDirection = Drone.position.findArk(handler.path[officeIndex + 1]).getDirection(Drone.position);
			if ((Drone.direction - arkDirection == 1) || ((Drone.direction == 0) && (arkDirection == 3))) {
				moves[0].unshift(Drone.directions.right);
				moves[1].unshift(620);
				moves[2].unshift(20);
			} else if ((Drone.direction - arkDirection == -1) || ((Drone.direction == 3) && (arkDirection == 0))) {
				moves[0].unshift(Drone.directions.left);
				moves[1].unshift(620);
				moves[2].unshift(20);
			} else if (Math.abs(Drone.direction - arkDirection) == 2) { //180° turn WILL NOT WORK
				moves[0].unshift(Drone.directions.left);
				moves[1].unshift(620);
				moves[2].unshift(20);
				moves[0].unshift(Drone.directions.left);
				moves[1].unshift(620);
				moves[2].unshift(20);
			};
		};
		if (moves[1][moveIndex] != 1) {
			Drone.move(moves[0][moveIndex], moves[2][moveIndex]);
		};
        callback = function() {
			setTimeout(function() {
				if (moveIndex == moves[0].length - 1) {
					moveIndex = 0;
					officeIndex++;
					Drone.position = handler.path[officeIndex];
				} else moveIndex++;
				handler.runPath(officeIndex, moveIndex, callback, moves);
				}, moves[1][moveIndex] || 500);
				return;
			}
		if (callback) callback();
    };

    /**
     * Sends the drone back to his place, can be used while the drone is running.
     * @return {undefined} No return.
     */
    goHome() {
        var handler = this;
        if (Drone.moving) {	//We need to wait for the drone to get to the next Office if he isn't done with his previous order.
            this.path.splice(this.path.indexOf(Drone.position)+1);	//We stop the drone at the next office
            setTimeout(function () {
                handler.goHome();
            }, 500);
        } else	{
            this.findPath(this.offices[0]);		//We recalculate the path to home.
            this.runPath(0, 0, function() {
                //Drone.move(3, 20);
                //console.log(Drone.direction);
                /*setTimeout(function () {
                    Drone.stop();
                    //Drone.direction = 0;
                }, 620*(Drone.direction+1));// retour a la position 0*/
            });
        }
    };

    /**
     * Returns researchers list in alphabetical order (except for special characters).
     * @return {array} Researchers list in alphabetical order.
     */
    getResearchers() {
        return DroneHandler.sortAlphabetical(CERV.offices.slice(1, CERV.offices.length));
    };

	/**
     * Returns researchers list in Unicode order.
     * @return {number} 1 if a > b, -1 i a < b else 0.
     */
	static sortAlphabetical(array) {
		array.sort(function (a, b) {
			if (a == b) return 0;
			if ((a >= "a") && (a <= "z") && (a-32==b)) return 0;	//Letter case
			if ((b >= "a") && (b <= "z") && (b-32==a)) return 0;
			//Specials characters are a pain
			if (a > b) return 1;
			else return -1;
		});
		return array;
	};


	/**
     * Can be used to sort array by increasing or decreasing numbers.
	 * @param {array} Array to be sorted.
	 * @param {number} If 1 decreasing order, else increasing.
     * @return {number} positive if a.id > b.id, negative if a.id < b.id else 0.
     */
	static sortNumbers (array, order){
		array.sort(function(a,b) {
			if(order) return b - a;
			else return a - b;
		});
		return array;
	};

	/**
     * Can be used to sort Offices by increasing or decreasing id.
	 * @param {Office} Array of offices to be sorted.
	 * @param {number} If 1 decreasing order, else increasing.
     * @return {number} positive if a.id > b.id, negative if a.id < b.id else 0.
     */
	static sortById(offices, order) {
		offices.sort(function(a,b) {
			if(order) return b.id - a.id;
			return a.id - b.id;
		});
		return offices;
	};

	/**
     * Can be used to sort Offices by researcher.
     * @return {number} 1 if a.researcher > b.researcher, -1 if a.researcher < b.researcher else 0.
     */
	static sortByResearcher(offices) {
		offices.sort(function(a,b) {
			a = a.researcher;
			b = b.researcher;
			if (a == b) return 0;
			if ((a >= "a") && (a <= "z") && (a-32==b)) return 0;	//Letter case
			if ((b >= "a") && (b <= "z") && (b-32==a)) return 0;
			//Specials characters are a pain
			if (a > b) return 1;
			else return -1;
		});
		return array;
	};
};

module.exports = DroneHandler;

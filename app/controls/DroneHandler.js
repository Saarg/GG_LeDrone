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
    constructor(file) {
        file = file || "config/OfficesData.json";	//path is dependant from where the file who was called with node was
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
     * Computes shortest paths from Drone's current position to all other Offices (unless destination parameter is used).
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
        console.log("\n\nIncoming Arks vector :\n");
        for (var z in incArks) {
            console.log("Ark : " + incArks[z].name + "   Length : " + incArks[z].length);
        };
        console.log("\nExiting Dijkstra function ...");
        return incArks; //Incoming arks vector
    };

    /**
     * Induces path from incoming arks vector produced by dijkstra() function.
     * @param  {Ark} Incoming arks vector for required Offices.
     * @param  {Office} Destination.
     * @return {undefined} No return.
     */
    convertPath(arksVec, destination) {
        console.log("\nEntering convertPath() function ...");
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
        console.log("Path has been found :\n");
        for (var z in this.path) {
            console.log("Office : " + this.path[z].researcher);
        };
        console.log("\nExiting convertPath() function ...\n");
    };

    /**
     * Finds shortest path, essentially calls dijkstra() followed by convertPath() functions.
     * @parameter {Office} Destination, may be used as parameter for dijkstra(), must be used for convertPath.
     * @return {undefined} No return.
     */
    findPath() {
        var incArks = this.dijkstra(this.destination);
        this.convertPath(incArks, this.destination);
    };

    /**
     * Send the drone to its destination.
     * @param  {number} officeIndex corresponds to the current Ark
     * @param  {number} moveIndex corresponds to current move in current Ark
     * @param  {function} callback TODO definir la valeur
     * @return {undefined} No return.
     */
    runPath(officeIndex, moveIndex, callback, moves) {
        if (!officeIndex && !moveIndex) console.log("\n\nEntering runPath function() ...\n\nGG is going toward " + this.destination.researcher + "'s office.");
        if (moveIndex == 0) console.log("\n\nDrone is currently at " + Drone.position.researcher + "'s office.\n");
        Drone.stop();
        var handler = this; //this not accessible in setTimeout;

        if (Drone.position == this.destination) { //Drone arrived to destination
            console.log("Drone arrived at destination : " + this.destination.researcher + "'s office.\nExiting runPath() ...");
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
			console.log(moves);
		};
		var dirStr = "Drone is ";
		if (moves[1][moveIndex] != 1) {
			switch (moves[0][moveIndex]) {
				case 0:
					dirStr += "going forward for ";
					break;
				case 1:
					dirStr += "going backward for ";
					break;
				case 2:
					dirStr += "turning left for ";
					break;
				case 3:
					dirStr += "turning right for ";
					break;
				default:
					dirStr += "going nowhere for ";
				};
			console.log(dirStr + moves[1][moveIndex] + " milliseconds at speed " + moves[2][moveIndex] + ".");
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
        if (Drone.moving) { //We need to wait for the drone to get to the next Office if he isn't done with his previous order.
            this.path.splice(this.path.indexOf(Drone.position) + 1); //We stop the drone at the next office
            callback = function() { // callback :
                setTimeout(function() { //we wait 0.5s before calling back the function and retest if the drone is stopped
                    handler.goHome();
                }, 500);
            }
        }
        else {
            this.destination = Office.findOfficeFromResearcher(this.offices, "_Home");
            this.findPath(); //We recalculate the path to home.
            this.runPath(0, 0, null); //We send the drone back.
        }

        if (callback) callback();
    };

    /**
     * Returns researchers list in alphabetical order (except for special characters).
     * @return {array} Researchers list in alphabetical order.
     */
    getResearchers() {
        return DroneHandler.sortAlphabetical(CERV.chercheurs);
    };

    /**
     * Returns researchers list in Unicode order.
     * @return {number} 1 if a > b, -1 i a < b else 0.
     */
    static sortAlphabetical(array) {
        array.sort(function(a, b) {
            if (a == b) return 0;
            if ((a >= "a") && (a <= "z") && (a - 32 == b)) return 0; //Letter case
            if ((b >= "a") && (b <= "z") && (b - 32 == a)) return 0;
            //Specials characters are a pain
            if (a > b) return 1;
            else return -1;
        });
        return array;
    };
    /**
     * Send the drone to its destination using the camera.
     * @param  {number} index corresponds to the current Ark
     * @param  {array} colorGrid corresponds to the patern you want the camera to match
     * @param  {function} callback TODO definir la valeur
     * @return {undefined} No return.
     */
    runPathImg(index, colorGrid, callback) {
        this.moving = true;

        console.log("\nentering runPath");
        console.log("position : " + Drone.position.researcher);
        Drone.stop();


        var thisHandler = this; //this pas accessible dans le setTimeout;

        if (Drone.position == this.destination) {
            Drone.moving = false; //si le drone est arrivé, on quitte la fonction ...
            //this.goHome()
            console.log("end");
            return;

        }

        if (Drone.position != this.destination) {

            var currArk = Drone.position.findArk(thisHandler.path[index + 1]);
            var currColor = currArk.color;

            var nextArk = thisHandler.path[index + 1].findArk(thisHandler.path[index + 2]);
            var nextColor = nextArk.color;
            console.log(nextArk)

            for (var i in colorGrid) {
                colorGrid[i].r = nextColor.r;
                colorGrid[i].g = nextColor.g;
                colorGrid[i].b = nextColor.b;
            }

            var img = Drone.getPicture();
            var grid = img.imageAnalysis(colorGrid, 50)
            console.log(grid);

            var nextColorFound = false;
            for (var i in grid) {
                if (grid[i] == true) nextColorFound = true;
            }

            if (!nextColorFound) {
                for (var i in colorGrid) {
                    colorGrid[i].r = currColor.r;
                    colorGrid[i].g = currColor.g;
                    colorGrid[i].b = currColor.b;
                }



                var grid = img.imageAnalysis(colorGrid, 50)


            }
            console.log(grid);
            var time = null;
            var move = img.interprete(grid);
            if ((move == 2) || (move == 3)) time = 620; console.log(move); Drone.move(move, 20); //on effectue le mouvements pour se rendre au prochain bureau
                if (nextColorFound) {
                    callback = function() {
                        setTimeout(function() { //on attend le temps correspondant au mouvement
                            Drone.position = thisHandler.path[index + 1]
                            thisHandler.runPathImg(index + 1, colorGrid, null) //à la fin cette callback, on fait une recursion avec les nouveaux parametres
                        }, time || 50);
                        return;
                    }

                } else {
                    callback = function() {
                        setTimeout(function() { //on attend le temps correspondant au mouvement
                            thisHandler.runPathImg(index, colorGrid, null) //à la fin cette callback, on fait une recursion avec les nouveaux parametres
                        }, 50);
                        return;
                    }
                }
            }

            console.log("end recursion");
            if (callback) callback(); //on appelle la callback
            else thisHandler.runPathImg(index, colorGrid, null)

        }









        /**
         * Can be used to sort array by increasing or decreasing numbers.
         * @parameter {array} Array to be sorted.
         * @parameter {number} If 1 decreasing order, else increasing.
         * @return {number} positive if a.id > b.id, negative if a.id < b.id else 0.
         */
        static sortNumbers(array, order) {
            array.sort(function(a, b) {
                if (order) return b - a;
                else return a - b;
            });
            return array;
        };



        /**
         * Can be used to sort Offices by increasing or decreasing id.
         * @parameter {Office} Array of offices to be sorted.
         * @parameter {number} If 1 decreasing order, else increasing.
         * @return {number} positive if a.id > b.id, negative if a.id < b.id else 0.
         */
        static sortById(offices, order) {
            offices.sort(function(a, b) {
                if (order) return b.id - a.id;
                return a.id - b.id;
            });
            return offices;
        };

        /**
         * Can be used to sort Offices by researcher.
         * @return {number} 1 if a.researcher > b.researcher, -1 if a.researcher < b.researcher else 0.
         */
        static sortByResearcher(offices) {
            offices.sort(function(a, b) {
                a = a.researcher;
                b = b.researcher;
                if (a == b) return 0;
                if ((a >= "a") && (a <= "z") && (a - 32 == b)) return 0; //Letter case
                if ((b >= "a") && (b <= "z") && (b - 32 == a)) return 0;
                //Specials characters are a pain
                if (a > b) return 1;
                else return -1;
            });
            return array;
        };
    };

    module.exports = DroneHandler;

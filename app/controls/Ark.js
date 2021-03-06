"use strict"
/**
 * @author CREACH Yohann PIGUEL Jeremy
 * @overview Define arks.
 */

var Drone = require("./Drone.js");

class Ark {
    constructor(office1, office2, direction1, direction2) {
		this.length;
        this.office1 = office1;
        this.office2 = office2;
		this.direction1 = direction1;	//required drone direction when drone is coming from office1
		this.direction2 = direction2;
		this.name = office1.researcher + " - " + office2.researcher;
        this.office1.arks.push(this); 	//Arks add themselves to corresponding offices.
        this.office2.arks.push(this);
        this.moves = [[],[],[]];			//[[directions],[durations],[speed]]	//try not to use speed parameter for turns
    };

    /**
     * Returns other extremity of ark
     * @param  {Office} Extremity
     * @return {Office} Other extremity
     */
    getExtremity(office) {
        if(office == this.office1) return this.office2;
        if(office == this.office2) return this.office1;
        else return null;
    };

	 /**
     * Read arks from data. Data is from previously read .json file.
	 * @parameter {string} Data parsed in getOfficesFromJSON() function. Must be called with data.arks.
	 * @parameter {string} Data parsed in getOfficesFromJSON() function. Must be called with data.arkMoves.
	 * @parameter {Office} List of Offices.
     * @return {undefined} No return.
     */
	static getArksFromData(dataArks, offices) {
		//console.log("\nInstantiating arks ...");
		var office1, office2;
		var ark;
        for (var i in dataArks) {
			office1 = 0, office2 = 0;

			for (var j in offices) {
				if ((!office1) && (dataArks[i].researcher1 == offices[j].researcher)) office1 = offices[j];		//we look for both extremities of Ark
				else if ((!office2) && (dataArks[i].researcher2 == offices[j].researcher)) office2 = offices[j];
				if (office1 && office2) {			//when found we instantiate a new Ark
					ark = new Ark(office1, office2, dataArks[i].direction1, dataArks[i].direction2);
					//console.log("\nArk name : " + ark.name);

					for (var k in dataArks[i].moves) {		//we then add its moves
						var move = dataArks[i].moves[k].move;
						if (move == "forward") ark.moves[0].push(Drone.directions.forward);				//forward
						else if (move == "backward") ark.moves[0].push(Drone.directions.backward);		//backward
						else if (move == "left") ark.moves[0].push(Drone.directions.left);				//left
						else if (move == "right") ark.moves[0].push(Drone.directions.right);			//right
						ark.moves[1].push(dataArks[i].moves[k].duration);								//duration
						ark.moves[2].push(dataArks[i].moves[k].speed);
						//console.log(move + " for " + dataArks[i].moves[k].duration);
					};
					ark.updateLength();
					//console.log("Ark total duration : " + ark.length);
				break;
				};
			};
		};
		//console.log("\nArks instantiation done ...");
    };


	/**
     * Computes moves in the opposite way if needed, else do nothing.
	 * @parameter {office} Extremity of the ark, the drone is coming from.
     * @return {undefined} No return.
     */
	getMoves(office) {
		var moves = JSON.parse(JSON.stringify(this.moves)); //we need to copy the array
		if (office == this.office2) {
			moves[0] = moves[0].reverse();	//we reverse all moves
			moves[1] = moves[1].reverse();	//we reverse all durations
			for (var i in moves[0]) {
				if (moves[0][i] == Drone.directions.left) {
					moves[0][i] = Drone.directions.right;
				}
				else if (moves[0][i] == Drone.directions.right) {
					moves[0][i] = Drone.directions.left;
				};
			};
		};
		return moves;
	};

	/**
     * Computes length of ark from durations of move associated with this ark.
     * @return {undefined} No return.
     */
	updateLength() {
		this.length = 0;
		for (var i in this.moves[1]) {
			this.length += this.moves[1][i];
		};
	};

	/**
     * Returns ark direction corresponding to the office passed in parameter
	 * @parameter {Office} Office we want to know which direction we need to go to turn.
     * @return {number} Ark direction.
     */
	getDirection(office) {
		if(office == this.office1) return this.direction1;
		if(office == this.office2) return this.direction2;
		return null;
	}
};

module.exports = Ark;

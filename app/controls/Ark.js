"use strict"
/**
 * @author CREACH Yohann PIGUEL Jeremy
 * @overview Define arks.
 */
 
var Drone = require("./Drone.js");
 
class Ark {
    constructor(office1, office2) {
		this.length;
        this.office1 = office1;
        this.office2 = office2;
		this.name = office1.researcher + " - " + office2.researcher;
        this.office1.arks.push(this); 	//Arks add themselves to corresponding offices.
        this.office2.arks.push(this);
        this.moves = [[],[]];			//[[directions],[durations]]
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
	static getArksFromData(dataArks, dataMoves, offices) {
		console.log("\nInstantiating arks ...");
		var office1, office2;
		var ark;
        for (var i in dataArks) {
			office1 = 0, office2 = 0;
			
			for (var j in offices) {
				if ((!office1) && (dataArks[i].researcher1 == offices[j].researcher)) office1 = offices[j];		//we look for both extremities of Ark
				else if ((!office2) && (dataArks[i].researcher2 == offices[j].researcher)) office2 = offices[j];
				if (office1 && office2) {			//when found we instantiate a new Ark
					ark = new Ark(office1, office2);
					console.log("\nArk name : " + ark.name);
					
					for (var k in dataMoves) {		//we then add its moves
						if (dataMoves[k].ark == ark.name) {
							
							for (var l in dataMoves[k].moves) {
								var move = dataMoves[k].moves[l].move;
								if (move == "forward") ark.moves[0].push(Drone.directions.forward);				//forward
								else if (move == "backward") ark.moves[0].push(Drone.directions.backward);		//backward
								else if (move == "left") ark.moves[0].push(Drone.directions.left);				//left
								else ark.moves[0].push(Drone.directions.right);									//right						
								ark.moves[1].push(dataMoves[k].moves[l].duration);								//duration
								console.log(move + " for " + dataMoves[k].moves[l].duration);
							};
							ark.updateLength();
							console.log("Ark total duration : " + ark.length);	
							break;
						};
					};
					break;
				};
			};
		};
		console.log("\nArks instantiation done ...")
    };
	
	
	/**
     * Computes length of ark from durations of move associated with this ark.
     * @return {undefined} No return.
     */
	updateLength() {
		this.length = 0;
		for (var i in this.moves[1]) {
			this.length += this.moves[1][i]
		};
	};
};

module.exports = Ark;

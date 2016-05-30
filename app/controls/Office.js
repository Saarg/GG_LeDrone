"use strict"
/**
 * @author CREACH Yohann PIGUEL Jeremy
 * @overview Define Offices.
 */

var fs = require('fs');
var Ark = require("./Ark.js");
var Drone = require("./Drone.js");
var CERV = require ('./../../config/CERV.js');

class Office {
    constructor(id, researcher) {
        this.id = id;
        this.researcher = researcher;
        this.distance = -1;
        this.arks = [];
    };

    /**
     * Returns ark from this to parameter.
     * @param  {Office} Other extremity.
     * @return {Ark} Ark from this to parameter.
     */
    findArk(office) {
        for(var i in this.arks){
            if(this.arks[i].getExtremity(this)==office) {
                return this.arks[i];
            };
        };
		return null;
	};

	 /**
     * Read offices from .json file. Must be used at the start of the application.
	 * @parameter {string} Path to .json file.
     * @return {Office} Return offices read from file.
     */
	static getOfficesFromJSON(file) {
		var offices = [];
		console.log("Instantiating Offices ...\n");
		for (var i in CERV.offices) {
			offices.push(new Office(CERV.offices[i].id, CERV.offices[i].researcher));	//Instantiating new Offices
			console.log("Id : " + offices[i].id + "    Researcher : " + offices[i].researcher);
		};
		console.log("Offices instantiation done ...");
		Ark.getArksFromData(CERV.arks, offices);							//Instantiating new Arks
        return offices;
    };



	/**
     * Given a researcher and a list of Office, returns the researcher's office if found, null otherwise.
	 * @parameter {Office} Array of offices.
	 * @parameter {string} Researcher whose office we're looking for.
     * @return {Office} Return offices read from file.
     */
	static findOfficeFromResearcher(offices, researcher){
		for (var i in offices) {
			if (researcher == offices[i].researcher) return offices[i];
		}
		return null;
	};
};

module.exports = Office;

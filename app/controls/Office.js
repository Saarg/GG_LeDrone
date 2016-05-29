"use strict"
/**
 * @author CREACH Yohann PIGUEL Jeremy
 * @overview Define Offices.
 */
 
var fs = require('fs');
var Ark = require("./Ark.js");
var Drone = require("./Drone.js");
 
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
		console.log("Reading Office Data from file : " + file);
        var data = fs.readFileSync(file, 'utf8');
		if (!data) {	//We don't want to go there.
			console.log("Issue when looking for offices file. \n Application will close.")
			alert("Issue when looking for offices file. \n Application will close.");
				throw 1;
		};
		console.log("Parsing data ...");
        data = JSON.parse(data);
		console.log("Instantiating Offices ...\n");
		for (var i in data.offices) {
			offices.push(new Office(data.offices[i].id, data.offices[i].researcher));	//Instantiating new Offices
			console.log("Id : " + offices[i].id + "    Researcher : " + offices[i].researcher);
		};
		console.log("Offices instantiation done ...");
		Ark.getArksFromData(data.arks, data.arkMoves, offices);							//Instantiating new Arks
        return offices;
    };
};

module.exports = Office;

"use strict"
/**
 * @author yohann creach piguel jeremy
 * @overview definis les arcs 
 */
class Ark {
    constructor() {
        this.length = length;
        this.office1 = office1;
        this.office2 = office2;
        this.office1.arks.push(this); //les arcs s'ajoutent tous ceuls aux bureaux
        this.office2.arks.push(this);
        this.moves = [[],[]];//[[directions],[time]]
        console.log("fin ark");
    }

    /**
     * retourne l'autre extremite de l'arc
     * @param  {Office} extremite1
     * @return {Office} extremite2
     */
    getExtremity(office) {
        if(office == this.office1) return this.office2;
        if(office == this.office2) return this.office1;
        else return null;
    }
}

module.exports = Ark;

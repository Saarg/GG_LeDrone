"use strict"
/**
 * @author yohann creach piguel jeremy
 * @overview definis les sommets aka bureaux 
 */
class Office {
    constructor(id, researcher) {
        this.id = id;
        this.researcher = researcher;
        this.distance = 0;
        this.arks = [];
    }

    /**
     * retourne l'arc avec le bureau en param TODO confirmer ce que j'ai noté ici
     * @param  {Office} extremite1
     * @return {Ark} arc entre this et offices
     */
    findArk(office) {
        for(var i in this.arks){
            if(this.arks[i].getExtremity(this)==office) {
                return this.arks[i];
            }
        }
    }
}

module.exports = Office;

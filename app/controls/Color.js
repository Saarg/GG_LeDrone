"use strict"
/**
 *  @author jean milsonneau
 *  @overview Define Color class.
 */
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    };

    /**
     * Compare cette couleur a une autre couleur
     * @param  {Color} couleur a comparer
     * @return {boolean} meme couleur ou non
     */
    isColor(c) {
        if(c.r == this.r && c.g == this.g && c.b == this.b)	
            return true;
        return false;
    };

    /**
     * Retourne un string decrivant la classe
     * @return {string}
     */
    toString() {
        return "R:"+this.r+" G:"+this.g+" B:"+this.b;
    };
};

Color.white = new Color(255, 255, 255);
Color.black = new Color(0, 0, 0);
Color.red = new Color(255, 0, 0);
Color.green = new Color(0, 255, 0);
Color.blue = new Color(0, 0, 255);

module.exports = Color;
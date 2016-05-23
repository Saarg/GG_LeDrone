"use strict"
/**
 * @author jean milsonneau
 * @overview Image permet d'interpreter et de stocker une image a partir d'un buffer et de l'analyser
 */
var getPixels   = require("get-pixels");
var Color    = require("./Color.js");

class Image {
    constructor(w, h) {
        this.width = w | 640;
        this.height = h | 480;
        this.channels = 3;

        this.raw = null;
        this.data = new Buffer(this.width*this.height*this.channel);
    }

    /**
     * Recherche des couleurs dans des zones passée en parametre
     * @param  {array} liste des zones a comparer a un couleur
     * @param  {float} precision pour la comparaison
     * @return {array} array de boolean
     */
    imageAnalysis(colorGrid, precision) {
        var precision = precision || 10;

        var retour = [colorGrid.length];
        for(var r in colorGrid){
            var moyColor = new Color(0, 0, 0);
            for(var x = colorGrid[r].x ; x < colorGrid[r].x+colorGrid[r].w ; x++) {
                for(var y = colorGrid[r].y ; y < colorGrid[r].y+colorGrid[r].h ; y++) {
                    //console.log(this.data[y*this.width*this.channels + x*this.channels]);
                    moyColor.r += this.data[y*this.width*this.channels + x*this.channels];
                    moyColor.g += this.data[y*this.width*this.channels + x*this.channels + 1];
                    moyColor.b += this.data[y*this.width*this.channels + x*this.channels + 2];
                }
            }
            moyColor.r = Math.round(moyColor.r/(colorGrid[r].w*colorGrid[r].h));
            moyColor.g = Math.round(moyColor.g/(colorGrid[r].w*colorGrid[r].h));
            moyColor.b = Math.round(moyColor.b/(colorGrid[r].w*colorGrid[r].h));

            retour[r] =(((colorGrid[r].r - precision) <= moyColor.r) && (moyColor.r <= (colorGrid[r].r + precision)) &&
                        ((colorGrid[r].g - precision) <= moyColor.g) && (moyColor.g <= (colorGrid[r].g + precision)) &&
                        ((colorGrid[r].b - precision) <= moyColor.b) && (moyColor.b <= (colorGrid[r].b + precision)) );
        }

        return retour;
    }

    /**
     * set image data
     * @param  {buffer} liste des zones a comparer a un couleur
     * @param  {string} type d'image eg: image/jpeg
     * @return {undefined} pas de retour
     */
    setData(data, type) {
        //console.log(data);
        this.raw = data;
        if(type) {
            var img = this;
            getPixels(data, type, function(err, pixels) {
                if(err) {
                    console.error(err);
                    return;
                }
                img.width = pixels.shape[0];
                img.height = pixels.shape[1];
                img.channels = pixels.shape[2];
                img.data = pixels.data;
          })
        } else {
            this.data = data;
        }
    }

    /**
     * rend la liste des pixels
     * @return {buffer} retourne les pixels
     */
    getData() {
        return this.data;
    }

    /**
     * rend le buffer fournis sans decompression
     * @return {buffer} image
     */
    getRawData() {
        return this.data;
    }

    /**
     * Retourne un string decrivant la classe
     * @return {string}
     */
    toString() {
        return "width: " + this.width + " height: " + this.height + " channels: " + this.channels + "\ndata: " + this.data;
    }
}

module.exports = Image;

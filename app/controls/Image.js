"use strict"

/*
 *
 * Image permet d'interpreter et de stocker une image a partir d'un buffer et de l'analyser
 *
 */

//var getPixels   = require("get-pixels");

var Color    = require("./Color.js");

var Image = function(w, h) {
    this.width = w | 640;
    this.height = h | 480;
    this.channels = 3;

    this.rawData = null;
    this.data = new Buffer(this.width*this.height*this.channel);
};

Image.prototype.imageAnalysis = function (colorGrid, precision) {
    var precision = precision || 10;

    // Calcul des couleurs moyennes par zones en fonction de la colorGrid
    var moyGrid = [colorGrid.length];
    for(var i = 0 ; i < colorGrid.length ; i++){
        moyGrid[i] = [colorGrid[i].length];

        for(var j = 0 ; j < colorGrid[i].length ; j++){
            // definition de la zone
            var sizeY = Math.round(this.height/colorGrid.length);
            var sizeX = Math.round(this.width/colorGrid[i].length);

            // somme des pixels
            moyGrid[i][j] = new Color(0, 0, 0);
            for(var y = i*sizeY ; y < (i+1)*sizeY ; y++){

                for(var x = j*sizeX ; x < (j+1)*sizeX ; x++){
                    moyGrid[i][j].r += this.data[y*this.width*this.channels + x*this.channels];
                    moyGrid[i][j].g += this.data[y*this.width*this.channels + x*this.channels + 1];
                    moyGrid[i][j].b += this.data[y*this.width*this.channels + x*this.channels + 2];
                }
            }
            // calcul de la moyenne
            moyGrid[i][j].r = Math.round(moyGrid[i][j].r/(sizeY*sizeX));
            moyGrid[i][j].g = Math.round(moyGrid[i][j].g/(sizeY*sizeX));
            moyGrid[i][j].b = Math.round(moyGrid[i][j].b/(sizeY*sizeX));
            console.log(moyGrid[i][j].r);
            console.log(moyGrid[i][j].g);
            console.log(moyGrid[i][j].b);
        }
    }

    // comparaison des moyennes avec les resultats demandé
    var retour = [colorGrid.length];
    for(var i = 0 ; i < colorGrid.length ; i++){
        retour[i] = [colorGrid[i].length];

        for(var j = 0 ; j < colorGrid[i].length ; j++){
            if( ((colorGrid[i][j].r - precision) <= moyGrid[i][j].r) && (moyGrid[i][j].r <= (colorGrid[i][j].r + precision)) &&
                ((colorGrid[i][j].g - precision) <= moyGrid[i][j].g) && (moyGrid[i][j].g <= (colorGrid[i][j].g + precision)) &&
                ((colorGrid[i][j].b - precision) <= moyGrid[i][j].b) && (moyGrid[i][j].b <= (colorGrid[i][j].b + precision)) )
                retour[i][j] = true;
            else {
                retour[i][j] = false;
            }
        }
    }
    return retour;
};

Image.prototype.setData = function (data, type) {
    if(type) {
        var img = this;
        img.rawData = data;
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
        if(data.length == this.width*this.height*this.channel) {
            this.data = data;
        } else {
            console.error("taille du buffer != de la taille correspondant au dimensions de l'image!");
        }
    }
};
Image.prototype.getData = function () {
    return this.data;
};

Image.prototype.toString = function () {
    return "width: " + this.width + " height: " + this.height + " channels: " + this.channels + "\ndata: " + this.data;
};

module.exports = Image;

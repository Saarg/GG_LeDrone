var Color    = require("./../controls/Color.js");

var Image = function(w, h) {
    this.width = w | 640;
    this.height = h | 480;

    this.data = null;
};

Image.prototype.imageAnalysis = function (colorGrid) {
    var moyGrid = [colorGrid.length];
    for(var i = 0 ; i < colorGrid.length ; i++){
        moyGrid[i] = [colorGrid[i].length];

        for(var j = 0 ; j < colorGrid[i].length ; j++){
            var sizeY = this.height/colorGrid.length;
            var sizeX = this.width/colorGrid[i].length;

            moyGrid[i][j] = new Color(0, 0, 0);
            for(y = i*sizeY ; y < (i+1)*sizeY ; y++){

                for(x = j*sizeX ; x < (j+1)*sizeX ; x++){
                    console.log(this.data[y*this.width + x*3]);
                    moyGrid[i][j].r += this.data[y*this.width + x*3];
                    moyGrid[i][j].g += this.data[y*this.width + x*3 + 1];
                    moyGrid[i][j].b += this.data[y*this.width + x*3 + 2];
                }
            }
            moyGrid[i][j].r /= sizeY*sizeX;
            moyGrid[i][j].g /= sizeY*sizeX;;
            moyGrid[i][j].b /= sizeY*sizeX;;
        }
    }
    return moyGrid;
};

Image.prototype.setData = function (data) {
    this.data = data;
};
Image.prototype.getData = function () {
    return this.data;
};

module.exports = Image;

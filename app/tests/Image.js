var fs          = require('fs');

var Image       = require("./../controls/Image.js");
var Color       = require("./../controls/Color.js");


var img = new Image();

img.setData(fs.readFileSync(__dirname+"/img.jpeg"), "image/jpeg");
console.log("\n\nRaw data: ");
console.log(img.getData());


var colorGrid = [3];
for (var i = 0 ; i < 3 ; i++) {
    colorGrid[i] = [3];

    colorGrid[i][0] = Color.red;
    colorGrid[i][1] = Color.green;
    colorGrid[i][2] = Color.blue;
}

console.log("\n\nColorGrid:");
for (var i = 0 ; i < 3 ; i++) {
    console.log("|| "+colorGrid[i][0].toString()+" | "+colorGrid[i][1].toString()+" | "+colorGrid[i][2].toString()+" ||");
}


var moyGrid = img.imageAnalysis(colorGrid, 20);

console.log("\n\ngrille de comparaison:");
for (var i = 0 ; i < 3 ; i++) {
    console.log("|| "+moyGrid[i][0].toString()+" | "+moyGrid[i][1].toString()+" | "+moyGrid[i][2].toString()+" ||");
}

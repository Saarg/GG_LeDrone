var fs          = require('fs');

var Image       = require("./../controls/Image.js");
var Color       = require("./../controls/Color.js");


var img = new Image();

img.setData(fs.readFileSync(__dirname+"/img.jpeg"), "image/jpeg");
console.log("\n\nRaw data: ");
console.log(img.raw);
console.log("\n\ndata: ");
console.log(img.getData());

var colorGrid = [
    {r: 255, g: 0, b: 0, x: 0, y: 0, w: 10, h: 10},
    {r: 255, g: 200, b: 0, x: 0, y: 0, w: 10, h: 10},
    {r: 255, g: 200, b: 0, x: 0, y: 0, w: 10, h: 10},
];// R G B X Y W H

console.log("\n\nColorGrid: ");
console.log(colorGrid);

var retour = img.imageAnalysis(colorGrid, 20);

console.log("\n\nRetour: ");
console.log(retour);

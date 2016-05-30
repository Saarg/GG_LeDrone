var fs = require('fs');

var Image = require("./../controls/Image.js");
var Color = require("./../controls/Color.js");

var Drone = require("./../controls/Drone.js");
var DroneHandler = require("./../controls/DroneHandler.js");

Drone.connect(function(err, data) {
    //callback quand le drone se connecte
    Drone.move(Drone.directions.left);
    setTimeout(function() {
        Drone.move(Drone.directions.right);
        setTimeout(function() {
            Drone.stop();
            test();
        }, 500);
    }, 500);

});
var test = function() {
    //var img = new Image();
    //img.setData(Drone.getPicture())
    var pic = Drone.getPicture();
    var snap = new Image(640, 480);

    snap.setData(pic);

    // img.setData(fs.readFileSync(__dirname+"/test_photo.jpeg"), "image/jpeg");
    console.log("\n\nRaw data: ");
    console.log(snap.raw);
    console.log("\n\ndata: ");
    console.log(snap.getData());

        var colorGrid = [{
            r: 154,
            g: 32,
            b: 56,
            x: 0,
            y: 460,
            w: 10,
            h: 10
        }, {
            r: 154,
            g: 32,
            b: 56,
            x: 360,
            y: 460,
            w: 10,
            h: 10
        }, {
            r: 154,
            g: 32,
            b: 56,
            x: 460,
            y: 460,
            w: 10,
            h: 10
        }, ]; // R G B X Y W H

    console.log("\n\nColorGrid: ");
    console.log(colorGrid);
    /// l'imageAnalysis ne marche pas avec le buffer ...
    // var retour = snap.imageAnalysis(colorGrid, 50);
    //
    // console.log("\n\nRetour: ");
    // console.log(retour);
    //
    // var dir = snap.interprete(retour);
    // console.log("direction a prendre :");
    // console.log(dir);
    fs.writeFile(__dirname + "/saved.jpeg", snap.getData(), function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
        ////////////////////
        //fonctionne comme ça mais pas toujours et ça me semble pas normal de passer par là ...
        ///////////////////

        var img = new Image(640, 480);
        img.setData(fs.readFileSync(__dirname + "/saved.jpeg"), "image/jpeg");



        var retour = img.imageAnalysis(colorGrid, 50);

        console.log("\n\nRetour: ");
        console.log(retour);

        var dir = img.interprete(retour);
        console.log("direction a prendre :");
        console.log(dir);
        ///////////////////////////
    });




    //

}

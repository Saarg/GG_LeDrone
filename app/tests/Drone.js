var Drone  = require("./../controls/Drone.js");

Drone.low = function() {
    console.log("niveau de batterie faible!");
};

Drone.critical = function() {
    console.log("niveau de batterie critique!!!");
};

Drone.connect(function(err, data) {
    //callback quand le drone se connecte
    Drone.move(Drone.directions.left);
    setTimeout(function () {
        Drone.move(Drone.directions.right);
        setTimeout(function () {
            Drone.stop();
            Drone.getPicture();
            go();
        }, 500);
    }, 500);
});

var go = function() {
    if(!Drone.connected) {
        console.error("GG ne repond pas!");
    }
    else if(!Drone.ready) {
        console.error("Le drone n'est pas pret");
    } else {
        console.log(Drone.toString());
    }
}
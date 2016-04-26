function DroneHandler(drone,offices){
  this.drone=drone;
  this.offices=offices
}

DroneHandler.prototype.dijkstra=function(destOffice){
  var markSize = this.offices.length();
  var marks[markSize];        //vecteur de marquage
  var distance[markSize];     //vecteur distances
  var incArks[markSize];      //vecteur arcs entrants "optimaux"

  for (let i in marks) {       ///////////////////////////////////////////
    marks[i] = 0;
    distance[i] = 9999999;
  };
                                            //initialisation
  for (var pos in this.offices) {
    if (this.offices[pos] === this.drone.position) break;
  };
  distance[pos] = 0;
                              ///////////////////////////////////////////
  var sumMarks;
  while (sumMarks < markSize) {  //on execute tant que tous les sommets ne sont
    sumMarks=0;                           //pas marques
    var officeIndex;
    var min = 99999;

      for (let i in this.offices){        //recherche du sommet le plus proche
        if((marks[i] == 0) && (distance[i] < min)) {
          min = distance[i];
          officeIndex=i;
        }

        var currOffice=this.offices[officeIndex];
        for(let i in currOffice.arcs){ //parcours des arcs de ce sommet
          var nextOffice = currOffice.arcs.getExtremity(currOffice);
          for (var posNext in this.offices) {
            if (this.offices[posNext] === nextOffice) break; //on recupere l'index
          };

          //test dijkstra
          if ((distance[posNext]- distance[officeIndex]) > currOffice.arcs[i].length) {
            distance[posNext] = distance[officeIndex] + currOffice.arcs[i].length;
            incArks[i] = currOffice.arcs[i]);
          }
        };
        marks[officeIndex] = 1;
        if (destOffice === this.offices[officeIndex]) sumMarks=markSize; //on force l'arret si le chemin est trouve
    };


    for(let l in marks) sumMarks += marks[l]; //si tous les sommets sont marques on finit
  }

  for (let j in this.offices) this.offices[j].distance = distance[j];

  return incArks;
};


DroneHandler.prototype.convertIntoPath=function(incArks,destOffice){
  for (var destIndex in this.offices) {
    if (this.offices[destIndex] === destOffice) break;
  };

}

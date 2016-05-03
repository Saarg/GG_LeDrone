function test ()
{
	var officeA = new Office(1, "A");
	var officeB = new Office(2, "B");
	var officeC = new Office(3, "C");
	var officeD = new Office(5, "D");
	var officeE = new Office(6, "E");
	var officeF = new Office(7, "F");
	var officeG = new Office(8, "G");
	var officeH = new Office(9, "H");

	var arcAB = new Ark(1, officeA, officeB);
	var arcAC = new Ark(2, officeA, officeC);
	var arcAD = new Ark(3, officeA, officeD);
	var arcAE = new Ark(7, officeA, officeE);
	var arcBC = new Ark(3, officeB, officeC);
	var arcBE = new Ark(6, officeB, officeE);
	var arcBG = new Ark(2, officeB, officeG);
	var arcCE = new Ark(4, officeC, officeE);
	var arcCH = new Ark(9, officeC, officeH);
	var arcDH = new Ark(8, officeD, officeH);
	var arcEF = new Ark(1, officeE, officeF);
	var arcEG = new Ark(1, officeE, officeG);
	var arcEH = new Ark(3, officeE, officeH);

	var offices = [officeA,officeB,officeC,officeD,officeE,officeF,officeG,officeH];


	var drone = new Drone(officeA);
	var handler = new DroneHandler(offices);
	handler.drone = drone;

	var arkVec = handler.dijkstra();
	console.log(arkVec)
	//for(var i in arkVec) console.log("arks path : "+arkVec[i].office1.researcher + " "+arkVec[i].office2.researcher);
	handler.convertPath(arkVec, officeF);
	for(var i in handler.path) console.log(handler.path[i].researcher);
}

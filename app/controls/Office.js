var Office = function(id, researcher) {
    this.id = id || 0;
    this.researcher = researcher || "Patate";
    this.distance = 0;
    this.arks = [];
};

Office.prototype.findArk=function(office){
  for(var i in this.arks){
    if(this.arks[i].getExtremity(this)==office)
      return this.arks[i];
  }
}
module.exports = Office;

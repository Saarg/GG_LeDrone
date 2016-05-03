var Office = function() {
    var id = 0;
    var researcher = "Patate";
    var distance = 0;
    var arcs = [];
};

Office.prototype.findArk=function(office){
  for(var i in this.arks){
    if(this.arks[i].getOtherExtremity(this)==office)
      return this.arks[i];
  }
}
module.exports = Office;

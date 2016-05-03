var Ark = function(length, office1, office2){
  this.length = length;
  this.office1 = office1;
  this.office2 = office2;
  this.office1.arks.push(this); //les arcs s'ajoutent tous ceuls aux bureaux
  this.office2.arks.push(this);
}


Ark.prototype.getExtremity = function(office){
  if(office == this.office1) return this.office2;
  if(office == this.office2) return this.office1;
  else return false;
}

module.exports = Ark;

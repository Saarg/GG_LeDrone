function Ark(length, office1, office2){
  this.length = length;
  this.office1 = office1;
  this.office2 = office2;
}


Ark.prototype.getExtremity = function(office){
  if(office == this.office1) return this.office2;
  if(office == this.office2) return this.office1;
  else return false;
}

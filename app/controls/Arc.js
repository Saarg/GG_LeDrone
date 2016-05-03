var Arc = function(offices) {
    var length = 0;
    var offices = offices;
}

Arc.prototype.getExtremity = function(office){
  if(office == this.office1) return this.office2;
  if(office == this.office2) return this.office1;
  else return false;
}


module.exports = Arc;

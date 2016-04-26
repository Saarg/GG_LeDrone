function Color(red,green,blue){
  this.red=red;
  this.green=green;
  this.blue=blue;
}

Color.prototype.isColor = function(color){
    var dr = Math.abs(this.red-color.red);
    var dg = Math.abs(this.green-color.green);
    var db = Math.abs(this.blue-color.blue);

    var delta = dr+dg+db;

    if(delta <= 15) return TRUE; //valeur a remplacer par le seuil de tolerance
    return FALSE;
}


Color.prototype.isColor = function(r,g,b){
    var dr = Math.abs(this.red-r);
    var dg = Math.abs(this.green-g);
    var db = Math.abs(this.blue-b);

    var delta = dr+dg+db;

    if(delta <= 15) return TRUE; //valeur a remplacer par le seuil de tolerance
    return FALSE;
}

var Color = function(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
};

Color.prototype.isColor = function (c) {
    if(c.r == this.r && c.g == this.g && c.b == this.b)
        return true;

    return false;
};

Color.prototype.toString = function () {
    return "R:"+this.r+" G:"+this.g+" B:"+this.b;
};

Color.white = new Color(255, 255, 255);
Color.black = new Color(0, 0, 0);
Color.red = new Color(255, 0, 0);
Color.green = new Color(0, 255, 0);
Color.blue = new Color(0, 0, 255);

module.exports = Color;

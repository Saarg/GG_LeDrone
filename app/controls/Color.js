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

module.exports = Color;

var Color = function(r, g, b) {
        var r = r;
        var g = g;
        var b = b;
};

Color.prototype.isColor = function (c) {
    if(c.r == this.r && c.g == this.g && c.b == this.b)
        return true;

    return false;
};

module.exports = Color;

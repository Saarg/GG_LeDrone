var ModeManuel = function() {
    Mode.call("mode manuel");
};

ModeManuel.prototype = new Mode;
ModeManuel.prototype.constructor = ModeManuel;

ModeManuel.prototype.run = function() {

};

ModeManuel.prototype.display = function() {

};

ModeManuel.prototype.interupt = function () {

};

ModeManuel.prototype.move = function (dir, speed) {

};

ModeManuel.prototype.jump = function (jumpType) {

};

ModeManuel.prototype.animation = function (animationType) {

};

function httpGet(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
};

function httpPost(url, params)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", url, false ); // false for synchronous request
    xmlHttp.setRequestHeader('Content-type','application/json; charset=utf-8');
    xmlHttp.setRequestHeader("Content-length", params.length);
    xmlHttp.send( params );
    return xmlHttp.responseText;
};

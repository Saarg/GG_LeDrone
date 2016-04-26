var express        	= require('express');
var app            	= express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendFile(__dirname+'/public/html/index.html');
});

var server = app.listen(port);
console.log('Magic happens on port ' + port);

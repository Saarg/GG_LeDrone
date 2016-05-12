var express        	= require('express');
var app            	= express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

// API
require('./app/routes')(app);

app.get('/test', function(req, res) {
    res.json({ succes: true, message: "patate"});
});

// Public routes
app.get('/mode_manuel', function(req, res) {
    res.sendFile(__dirname+'/public/html/mode_manuel.html');
});

app.get('/mode_bureau', function(req, res) {
    res.sendFile(__dirname+'/public/html/mode_bureau.html');
});

app.get('/mode_bureau_a_bureau', function(req, res) {
    res.sendFile(__dirname+'/public/html/mode_bureau_a_bureau.html');
});

app.get('*', function(req, res) {
    res.sendFile(__dirname+'/public/html/index.html');
});

var server = app.listen(port);
console.log('Magic happens on port ' + port);

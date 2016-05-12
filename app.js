var express        	= require('express');
var bodyParser     	= require('body-parser');
var app            	= express();


var port = process.env.PORT || 8080;

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static(__dirname + '/public'));

// API
require('./app/routes')(app);

app.get('/api/test', function(req, res) {
    res.json({ success: true, message: "patate"});
});
app.post('/api/test', function(req, res) {
    if(req.body.data == "is_this_data")
        res.json({ success: true, message: "this_is_data"});
    else {
        res.json({ success: false, message: "is_this_real_life"})
    }
});

// Public routes
app.get('/mode_manuel', function(req, res) {
    res.sendFile(__dirname+'/public/html/mode_manuel.html');
});

app.get('/mode_bureau', function(req, res) {
    res.sendFile(__dirname+'/public/html/mode_bureau.html');
});

app.get('/mode_bureau_a_bureau', function(req, res) {
    res.sendFile(__dirname+'/public/html/mode_bureau_bureau.html');
});

app.get('*', function(req, res) {
    res.sendFile(__dirname+'/public/html/index.html');
});

var server = app.listen(port);
console.log('Magic happens on port ' + port);

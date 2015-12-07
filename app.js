var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var jwt             = require('jwt-simple');

var config          = require('./app/config/config');
var db              = require('./app/config/db');
var app             = express();
app.set('jwtTokenSecret', config.secret);
app.set('port', config.port);

if (process.env.NODE_ENV !== 'test') {
    db.connect(function() {
        console.log('Connected');
    });
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});

var routing = require('./app/config/routing')
routing.set(app);

var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log('App listening at port %s', port);
});

module.exports = server;

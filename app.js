// ====================================
//          Liste des packages
// ====================================
var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var jwt             = require('jwt-simple');

// Prise en charge du fichier de configuration
var config          = require('./app/config/config');

// ====================================
//          Configuration
// ====================================
var app = express();
app.set('jwtTokenSecret', config.secret);
app.set('port', config.port);

// ====================================
//          Base de données
// ====================================
if (process.env.NODE_ENV !== 'test') {
    urlDb = config.database.dev;
    mongoose.connect(urlDb);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        console.log("Connected !");
    });
};

// ====================================
//          Initialisation
// ====================================

// Prise en charge des packages
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Paramétrage du header
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
next();
});

// Pris en charge du router
var routing = require('./app/config/routing')
routing.set(app);

// ====================================
//          Démarrage du serveur
// ====================================

var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log('App listening at port %s', port);
});

module.exports = server;

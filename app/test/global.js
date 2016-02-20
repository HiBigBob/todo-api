'use strict';

var db          = require('../config/db');
var mongoose    = require('mongoose');
var config      = require('../config/config');
var fixture     = require('../config/fixture');
require         = require('really-need');

process.env.NODE_ENV = 'test';
var app = require('../../app', { bustCache: true });

before(function(done) {
    db.connect(function() {
        console.log('Connected');
    });
    db.clearDb(done);
});

after(function(done) {
    db.disconnect(done);
});

module.exports = app;



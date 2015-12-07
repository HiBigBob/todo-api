'use strict';

var config              = require('./config');
var fixture             = require('./fixture');
var mongoose            = require('mongoose');

module.exports = {
    clearDb: function (done) {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove();
        }

        return fixture(done);
    },
    connect: function (callback) {
        var url = this.urlDb();
        mongoose.connect(url);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', callback);
    },
    disconnect: function (done) {
        mongoose.disconnect();
        return done();
    },
    urlDb: function () {
        var url = config.database.dev;
        if(process.env.NODE_ENV == 'test')  {
            url = config.database.test;
        }

        return url;
    } 
};

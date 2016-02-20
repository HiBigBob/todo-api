'use strict';

var app         = require('./global');
var supertest   = require('supertest');
var should      = require('should');

describe('Authentication', function () {
    var user = {
        username: 'John',
        password: 'password',
        token: null 
    };

    it('Authentication - with no username/password', function (done) {
        supertest(app)
            .post('/authenticate')
            .send({})
            .expect(401)
            .end(function(err, res) {
                res.body.error.should.equal('Authentication errors');
                done();
            });
    });
 
    it('Authentication - with bad username', function (done) {
        supertest(app)
            .post('/authenticate')
            .send({username: 'test'})
            .expect(401)
            .end(function(err, res) {
                res.body.error.should.equal('Authentication errors');
                done();
            });
    });
    
    it('Authentication - with bad password', function (done) {
        supertest(app)
            .post('/authenticate')
            .send({username: 'John', password: 'test'})
            .expect(401)
            .end(function(err, res) {
                res.body.error.should.equal('Authentication failed. Wrong password.');
                done();
            });
    });

    it('Authentication', function (done) {
        supertest(app)
            .post('/authenticate')
            .send(user)
            .expect(200)
            .end(function(err, res) {
                if (err) return next(err);

                var response = JSON.parse(res.text);
                user.token = response.access_token.token; 
                done();
            });
    });
});

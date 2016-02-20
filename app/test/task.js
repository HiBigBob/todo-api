'use strict';

var app         = require('./global');
var supertest   = require('supertest');
var should      = require('should');

describe('Tasks', function () {
    var user = {
        username: 'John',
        password: 'password',
        token: null 
    };
    var tasks = null;

    it('Authentication', function (done) {
        supertest(app)
            .post('/authenticate')
            .send(user)
            .expect(200)
            .end(function(err, res) {
                var response = JSON.parse(res.text);
                user.token = response.access_token.token; 
                done();
            });
    });

    it('Get tasks no authentified', function (done) {
        supertest(app)
            .get('/tasks')
            .expect(401, done);
    });

    it('Get tasks authentified', function (done) {
        supertest(app)
            .get('/tasks')
            .set('Accept', 'application/json')
            .set('x-access-token', user.token)
            .expect(200)
            .end(function(err, res) {
                tasks = JSON.parse(res.text);
                done();
            });
    });

    it('Get task no authentified', function (done) {
        supertest(app)
            .get('/tasks/' + tasks[0]._id)
            .set('Accept', 'application/json')
            .expect(401, done);
    });

    it('Get task authentified', function (done) {
        supertest(app)
            .get('/tasks/' + tasks[0]._id)
            .set('Accept', 'application/json')
            .set('x-access-token', user.token)
            .expect(200)
            .end(function(err, res) {
                var task = JSON.parse(res.text);
                if (task[0]._id === tasks[0]._id) {
                    done();
                }
            });
    });

    it('Get task authentified with bad identifier', function (done) {
        supertest(app)
            .get('/tasks/' + '1234')
            .set('Accept', 'application/json')
            .set('x-access-token', user.token)
            .expect(404)
            .end(function(err, res) {
                res.body.error.should.equal('Not found'); 
                res.status.should.equal(404); 
                done();
            });
    });
});

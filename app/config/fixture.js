var User    = require('../models/user');
var List    = require('../models/list');
var Tag     = require('../models/tag');
var Task    = require('../models/task');
var getSlug = require('../utils/slug');

function loadFixture(callback) {
    // create the first user
    var john = new User({
        username: 'John',
        password: 'password'
    });

    var tag1 = new Tag({
        title: 'Warning'
    });

    var tag2 = new Tag({
        title: 'Danger'
    });

    var tag3 = new Tag({
        title: 'Default'
    });

    var title = 'Call john';
    var list1 = new List({
        userId: john._id,
        title: title,
        slug: getSlug(title), 
    });

    var title = 'Learn EmberJs';
    var list2 = new List({
        userId: john._id,
        title: title,
        slug: getSlug(title), 
    });

    var title = 'FullMetal Alchimist';
    var list3 = new List({
        userId: john._id,
        title: title,
        slug: getSlug(title), 
    });

    var task1 = new Task({
        listId: list1._id,
        title: 'EmberJs',
    });

    var task2 = new Task({
        listId: list2._id,
        title: 'ReactJs',
    });

    var task3 = new Task({
        listId: list3._id,
        title: 'Angular2.Js',
    });

    john.save(function(err) {
        if (err) console.log(err);
    });

    tag1.save(function(err) {
        if (err) console.log(err);
    });

    tag2.save(function(err) {
        if (err) console.log(err);
    });

    tag3.save(function(err) {
        if (err) console.log(err);
    });

    list1.save(function(err) {
        if (err) console.log(err);
    });

    list2.save(function(err) {
        if (err) console.log(err);
    });

    list3.save(function(err) {
        if (err) console.log(err);
    });

    task1.save(function(err) {
        if (err) console.log(err);
    });

    task1.save(function(err) {
        if (err) console.log(err);
    });

    task3.save(function(err) {
        if (err) console.log(err);
    });

    return callback();
};

module.exports = loadFixture;

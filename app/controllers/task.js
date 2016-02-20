var express     = require('express');
var router      = express.Router();
var Task        = require('../models/task');

router.param('id', function(req, res, next, value){
    Task.find({_id: value}, function (err, task) {
        if (err) res.status(404).json({error: 'Not found'});
        req.task = task;
        next();
    });
});

router.get('/', function(req, res, next){
    Task.find({}, function (err, tasks) {
        if (err) return next(new Error(err));
        res.json(tasks);
    });
});

router.get('/:id', function(req, res){
    res.json(req.task);
});

router.post('/', function(req, res, next){
    if (!req.body.title && !req.body.listId) return next(new Error('No data provided.'));

    var task = new Task({
        listId: req.body.listId,
        title: req.body.title,
    });

    task.save(function(err) {
        if (err) return next(new Error(err));
    });

    res.status(200).json(task);
});

router.put('/:id', function(req, res, next) {
    if (!req.body.title && !req.body.tags) return next(new Error('Param is missing.'));
    Task.update({_id: req.task._id}, {$set: {title: req.body.title, tags: req.body.tags}}, function(err) {
        if (err) return next(new Error(err));

        Task.findOne({ _id: value}, function(err, task) {
            if (err) return next(new Error(err));
            res.status(200).json(task);
        });
    });
});

router.delete('/:id', function(req, res, next) {
    Task.remove({_id: req.task._id}, function(err) {
        if (err) return next(new Error(err));
        res.status(204).send();
    });
});

module.exports = router;

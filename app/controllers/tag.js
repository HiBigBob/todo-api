var express     = require('express');
var router      = express.Router();
var Tag         = require('../models/tag');
var auth        = require('../middlewares/auth');
var required    = require('../middlewares/required');

router.param("tag_id", function (req, res, next, value) {
    Tag.findOne({ _id: value}, function(err, tag) {
        if (err) { res.status(403); }
        req.tag = tag;
        next();
    });
});

router.get('/', function(req, res, next){
    Tag.find({}, function(err, tags) {
        res.json(tags);
    })
});

router.get('/:tag_id', function(req, res, next, value){
    Tag.findOne({ _id: value}, function(err, tag) {
        if (err) { res.status(403); }
        res.json(tag);
    });
});

router.post('/', function(req, res, next){
    if (!req.body.title) return next(new Error('No data provided.'));

    var tag = new Tag({
        title: req.body.title
    });

    tag.save(function(err) {
        if (err) return next(new Error(err));
    });

    res.status(200).json(tag);
});

router.put('/:tag_id', auth, required, function(req, res, next, value) {
    if (!req.body.title) return next(new Error('Param is missing.'));
    Tag.update({_id: value}, {$set: {title: req.body.title}}, function(err, count) {
        if (err) return next(new Error(err));
        res.status(200).send();
    });
});

router.delete('/:tag_id', auth, required, function(req, res, next, value) {
    Tag.remove({_id: value}, function(err) {
        if (err) return next(new Error(err));
        res.status(204).send();
    });
});

module.exports = router;

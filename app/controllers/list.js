var express     = require('express');
var router      = express.Router();
var List        = require('../models/list');
var auth        = require('../middlewares/auth');
var required    = require('../middlewares/required');
var getSlug     = require('../utils/slug');

router.get('/', function(req, res, next){
    List.find({}, function (err, lists) {
        if (err) return next(new Error(err));
        res.json(lists);
    });
});

router.get('/:id', function(req, res, next, value){
    List.findOne({_id: value}, function(err, list) {
        if (err) { res.status(403); }
        res.json(list);
    });
});

router.post('/', function(req, res, next){
    if (!req.body.title) return next(new Error('No data provided.'));

    var list = new List({
        userId: req.user._id,
        title: req.body.title,
        slug: getSlug(req.body.title),
    });

    list.save(function(err) {
        if (err) return next(new Error(err));
    });

    res.status(200).json(list);
});

router.put('/:id', auth, required, function(req, res, next, value) {
    if (!req.body.title) return next(new Error('Param is missing.'));
    List.update({_id: value}, {$set: {title: req.body.title}}, function(err) {
        if (err) return next(new Error(err));

        List.findOne({ _id: value}, function(err, list) {
            res.status(200).json(list);
        });
    });
});

router.delete('/:id', auth, required, function(req, res, next, value) {
    List.remove({_id: value}, function(err) {
        if (err) return next(new Error(err));
        res.status(204).send();
    });
});

module.exports = router;

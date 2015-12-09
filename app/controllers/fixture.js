var express     = require('express');
var router      = express.Router();
var db          = require('../config/db');

router.get('/', function(req, res, next){
    db.clearDb(function(){
        console.log('Fixture Loaded')
    });
});

module.exports = router;


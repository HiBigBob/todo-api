var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

module.exports = mongoose.model('List', new Schema({
    userId: String,
    title: String,
    createTime: { type: Date, default: Date.now },
    slug: String,
}));

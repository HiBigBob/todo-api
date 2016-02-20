var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

module.exports = mongoose.model('Task', new Schema({
    listId: String,
    title: String,
    createTime: { type: Date, default: Date.now },
    tags : [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
}));

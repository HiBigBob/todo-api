module.exports = function(Text){
	return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
}

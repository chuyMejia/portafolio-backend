'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var RefSchema = Schema({
	cliente:String,
	referencia:String

});

module.exports = mongoose.model('Ref',RefSchema);
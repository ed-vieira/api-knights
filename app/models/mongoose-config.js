var mongoose = require('mongoose');
//importa os schemas
var Schemas = require('./Schemas');

//MongoDB URL 
const url= 'mongodb://localhost:27017/knights_db';

// Instancia o mongoose e faz a conexão
exports= mongoose.Promise = global.Promise;
exports=  mongoose.connect(url, { useNewUrlParser: true }); 

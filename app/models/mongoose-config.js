var mongoose = require('mongoose');
var Schemas = require('./Schemas');

//MongoDB URL 
const url= 'mongodb://localhost:27017/knights_db';
// mongoose instance connection url connection
exports= mongoose.Promise = global.Promise;
exports=  mongoose.connect(url, { useNewUrlParser: true }); 

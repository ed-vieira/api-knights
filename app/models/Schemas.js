var mongoose = require('mongoose');

//Schemas
const KnightSchema = require('./KnightModel');


//registrando models
exports= mongoose.model('Knights', KnightSchema);

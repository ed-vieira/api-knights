var mongoose = require('mongoose');

//Schemas

const KnightSchema = require('./KnightModel');
const HeroesSchema = require('./KnightModel');

//registrando models

exports= mongoose.model('Knights', KnightSchema);
exports= mongoose.model('Heroes', HeroesSchema); 
var mongoose = require('mongoose');

//Schemas
const WeaponSchema= require('./WeaponModel');
const KnightSchema = require('./KnightModel');
const HeroesSchema = require('./KnightModel');

//registrando models
exports= mongoose.model('Weapons', WeaponSchema);
exports= mongoose.model('Knights', KnightSchema);
exports= mongoose.model('Heroes', HeroesSchema); 
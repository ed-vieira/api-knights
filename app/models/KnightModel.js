'use strict'
/**
 *  Model Knight dados de knight
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const KnightSchema = new Schema({
   name:  String,
   nickname: String,
   birthday: Date,
   keyAttribute: String,
   exp: Number,

   weapons: [{
    type: Schema.Types.ObjectId, ref: 'Weapons'
   }],

   attributes: {
     strenght: Number,
     dexterity: Number,
     constitution: Number,
     intelligence: Number,
     wisdom: Number,
     charisma: Number,
   },
   

});


module.exports = KnightSchema;



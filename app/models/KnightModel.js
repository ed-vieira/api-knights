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
      name: String,
      mod: Number,
      attr: String,
      equipped: Boolean,
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



function softDeleteMiddleware(next) {
  // If `isDeleted` is not set on the query, set it to `false` so we only
  // get docs that haven't been deleted by default
  var filter = this.getQuery();
  if (filter.isHero == null) {
    filter.isHero = false;
  }
  next();
}


KnightSchema.pre('find', softDeleteMiddleware);
KnightSchema.pre('findOne', softDeleteMiddleware);


module.exports = KnightSchema;



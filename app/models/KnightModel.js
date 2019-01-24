'use strict'
/**
 *  Model Knight dados de knight
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment');

const KnightSchema = new Schema({
   
   name:  String,
   nickname: String,
   birthday: Date,
   keyAttribute: String,
   

   isHero:{
      type: Boolean,
      required: true,
      default: false
   },

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
   


},{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
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



KnightSchema.virtual('age').get(function(){
  return moment().diff(moment(this.birthday, 'YYYYMMDD'), 'years')
});



KnightSchema.virtual('exp').get(function(){
    return Math.floor(( this.age - 7) * Math.pow(22, 1.45));
});




module.exports = KnightSchema;







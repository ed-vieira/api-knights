'use strict'
/**
 *  Model Heroes dados de knight
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const HeroesSchema = new Schema({
  
   knights: [{
    type: Schema.Types.ObjectId, ref: 'Knights'
   }],
   

});


module.exports = HeroesSchema;
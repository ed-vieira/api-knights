'use strict'

/**
 *  Model  dados Weapons.. 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeaponSchema = new Schema({
    name: String,
    mod: Number,
    attr: String,
    equipped: Boolean,
    
 });



module.exports= WeaponSchema;




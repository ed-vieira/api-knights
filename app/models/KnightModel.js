'use strict'
/**
 *  Model Knight dados de knight
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment');

/**
 * Define o esquema e habilita o uso de atributos 'virtuais' que são gerados
 * apartir de combinações e calculos de atributos existentes
 */
const KnightSchema = new Schema({
   
   name:  {
    type: String,
    required: true
    },
   nickname: {
     type: String,
     required: true
  },
   birthday: {
     type: Date,
     required: true
    },

   keyAttribute: {
    type: String,
    required: true
   },
   
   isHero:{
      type: Boolean,
      required: true,
      default: false
   },

   weapons: [{
      name:{
        type: String,
        required: true
      }, 
      mod: {
        type: Number,
        required: true
      }, 
      attr: {
        type: String,
        required: true
      }, 
      equipped: {
        type: Boolean,
        required: true
      } 
   }],

   attributes: {
     strenght:{ type: Number, required: true},
     dexterity: { type: Number, required: true},
     constitution: { type: Number, required: true},
     intelligence: { type: Number, required: true},
     wisdom: { type: Number, required: true},
     charisma: { type: Number, required: true},
   },
   


},{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});


/**
 * SoftDelete é um middleware que simula a exclusão de um elemento
 * de forma que ele não seja exibido na query padrão
 * sendo apenas exibido quando especificado 
 */   
function softDelete(next) {
  var filter = this.getQuery();
  if (filter.isHero == null) {
    filter.isHero = false;
  }
  next();
}



//Passando o Middleware para as os metodos 'find' e 'findOne' do mongoose
KnightSchema.pre('find', softDelete);
KnightSchema.pre('findOne', softDelete);



/**
 * Modificadores de atributos
 */
KnightSchema.methods.mod = function mod(attr){
    if(attr <= 8){
     return -2;
   }  
    if(attr >= 9 && attr <= 10){
    return -1;
   } 
    if(attr >= 11 && attr <= 12){
     return 0;
   } 
    if(attr >= 13 && attr <= 15){
     return 1;
   } 
   if(attr >= 16 && attr <= 18){
     return 2;
   } 
  if(attr >= 19){
    return 3;
  }
}





KnightSchema.virtual('age').get(function(){
  //calcula a idade com base na data de nascimento 
  return moment().diff(moment(this.birthday, 'YYYYMMDD'), 'years')
});



KnightSchema.virtual('exp').get(function(){
  //Calcula o valor da experiencia 
    return Math.floor(( this.age - 7) * Math.pow(22, 1.45));
});



KnightSchema.virtual('keyAttr').get(function(){
  //Verifica entre os atributos qual é o atributo chave
  return this.attributes[this.keyAttribute];
});



KnightSchema.virtual('equippedWeapon').get(function(){
  //retorna a arma equipada
  var arr=[];
  this.weapons.forEach(element => {
      if (element.equipped === true){
        arr.push(element);
      }
  });

  return arr[0];
    
});



KnightSchema.virtual('attack').get(function(){
   //calcula o poder de attack
  return 10 + this.mod(this.keyAttr) + this.equippedWeapon.mod;
});




//exporta o Schema
module.exports = KnightSchema;







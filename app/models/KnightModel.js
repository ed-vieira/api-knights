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



function softDelete(next) {
  // SoftDelete é um middleware que simula a exclusão de um elemento de forma que ele não seja exibido na query padrão
  // E é apenas exibido quando especificado    
  var filter = this.getQuery();
  if (filter.isHero == null) {
    filter.isHero = false;
  }
  next();
}

//Passando o Middleware para as os metodos 'find' e 'findOne' do mongoose
KnightSchema.pre('find', softDelete);
KnightSchema.pre('findOne', softDelete);


function mod(attr){
  //Modificadores de atributos
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
  return 10 + mod(this.keyAttr) + this.equippedWeapon.mod;
});




//exporta o Schema
module.exports = KnightSchema;







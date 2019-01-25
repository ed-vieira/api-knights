'use strict';

var mongoose = require('mongoose'); 
var KnightModel= mongoose.model('Knights');




/**
 *  Listar todos os knghts 
 */
exports.getAllKnights= function(req, res){

      KnightModel.find({}, 
            " _id name nickname birthday age keyAttribute weapons.name weapons.mod "  
            +" weapons.attr weapons.equipped attributes exp "
            +" equippedWeapon attack ", 
        function(error, objects){
          if(error){
             res.send(error);
          }else{       
           
            res.json(objects);
         }
      })
}



/**
 * seleciona um elemento por id
 */
exports.getById= function(req, res){
  KnightModel.findById(req.params.id, function(error, object){
      if(error){
         res.send({
            message: "Knight não encontrado",
            details: "Busca por id= "+req.params.id+" não retornou nenhum resultado.",
             default:{error}
         });
      }else{
         res.json(object);
      }

  });
}



/**
 *  Atualiza os dados do knight
 */
exports.update = function(req, res) {
    KnightModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(error, object) {
      if(error){
        res.send(error);
      }else{
        res.json(object);
      }
    });
  }
  



  /**
   *  Exclui um elemento da lista principal 'Knights' fazendo com que passe para lista 'Hall of Heroes'  
   */
  exports.softDelete = function (req, res) {

    KnightModel.findOneAndUpdate({_id: req.params.id}, {isHero : true},  function(error, object) {
      if(error){
        res.send(error);
      }else{
        res.json(object);
      }
    });
    
}




/**
 *  Retorna A lista Hall of Heroes 
 */
exports.getHeroes = function(req, res){
  
  KnightModel.find({isHero: true}, function(error, objects){
    if(error){
        res.send(error);
    }else{
      res.json(objects);
    }
})
}


/**
 * seleciona um elemento por id
 */
exports.getHeroById= function(req, res){
  KnightModel.findOne({ _id: req.params.id, isHero: true}, function(error, object){
      if(error){
         res.send({
            message: "Knight não encontrado",
            details: "Busca por id= "+req.params.id+" não retornou nenhum resultado.",
             default:{error}
         });
      }else{
         res.json(object);
      }

  });
}


  /**
   *  Exclui definitivamente um elemento
   */
  exports.deleteKnight = function(req, res) {

    KnightModel.deleteOne({_id: req.params.id}, function(err, object) {
        if(err){
          res.send(err);
        }else{
          res.json({ message: `Knigth deletado com sucesso. ID  ${req.params.id}` });
        } 
    })
   }





/**
 *  Adiciona um novo knight
 */
  exports.add = function(req, res) {
    var knight = new KnightModel(req.body);
      knight.save(function(err, object) {
      if(err){
        res.send(err);
      }else{
        res.json(object);
      }    
    });
  }

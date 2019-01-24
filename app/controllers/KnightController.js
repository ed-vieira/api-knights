'use strict';

var mongoose = require('mongoose'); 
var KnightModel= mongoose.model('Knights');
var HeroesModel= mongoose.model('Heroes');



/**
 * 
 */
exports.getAllKnights= function(req, res){

      KnightModel.find({}, 
            " name nickname birthday age keyAttribute weapons.name weapons.mod "  
            +" weapons.attr weapons.equipped attributes exp", 
        function(error, objects){
          if(error){
             res.send(error);
          }else{       
           
            res.json(objects);
         }
      })
}



/**
 * 
 */
exports.getById= function(req, res){
  KnightModel.findById(req.params.id, function(error, object){
      if(error){
         res.send({
            message: "Knight não encontrado",
            details: "Busca por id= "+req.params.knight_id+" não retornou nenhum resultado.",
             default:{error}
         });
      }else{
         res.json(object);
      }

  });
}



/**
 * 
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
   * 
   */
exports.deleteUpdate = function (req, res) {

  KnightModel.findById(req.params.id, function(error, object){
    if(error){
       res.send({
          message: "Knight não encontrado",
          details: "Busca por id= "+req.params.knight_id+" não retornou nenhum resultado.",
           default:{error}
       });
    }else{

      object.hero= true;
      object.save(function(err, object) {
        if(err){
          res.send(err);
        }else{

          res.json(object);
        }    
      });
       
    }

});

}
  

  /**
   * 
   */
  exports.delete = function (req, res) {

    KnightModel.findById(req.params.id, function(error, object){
      if(error){
         res.send({
            message: "Knight não encontrado",
            details: `Busca por id= ${req.params.knight_id} não retornou nenhum resultado.`,
             default:{error}
         });
      }else{
  
        object.isHero= true;
        object.save(function(err, object) {
          if(err){
            res.send(err);
          }else{
  
            res.json({
              message: "Knight Removido",
              object
            });
          }    
        });
         
      }
  
  });
    
}



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
   * 
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

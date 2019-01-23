'use strict';

var mongoose = require('mongoose'); 
var KnightModel= mongoose.model('Knights');


/**
 * 
 */
exports.getAllKnights= function(req, res){
 KnightModel.find({}, function(error, objects){
       if(error){
           res.send(error);
       }else{
         res.json({knights : objects});
       }
 }).populate('weapons');
}



/**
 * 
 */
exports.getById= function(req, res){
  KnightModel.findById(req.params.knight_id, function(error, object){
      if(error){
         res.send({
            message: "Knight não encontrado",
            details: "Busca por id= "+req.params.knight_id+" não retornou nenhum resultado.",
             default:{error}
         });
      }else{
         res.json({knight: object});
      }

  }).populate('weapons');
}



/**
 * 
 */
exports.update = function(req, res) {
    KnightModel.findOneAndUpdate({_id: req.params.knight_id}, req.body, {new: true}, function(error, object) {
      if(error){
        res.send(error);
      }else{
        res.json(object);
      }
    });
  };
  


  /**
   * 
   */
  exports.delete = function(req, res) {
    KnightModel.deleteOne({_id: req.params.knight_id}, function(err, object) {
        if(err){
          res.send(err);
        }else{
          res.json({ message: 'Dados deletados com sucesso. ID ' + req.params.knight_id });
        } 
    });
  };


 

'use strict'
module.exports = function(app){

    var KnightCtrl = require('../controllers/KnightController');
 
    const url ="/api/knights"

    app.route(url)
      .get(KnightCtrl.getAllKnights)
        .post(KnightCtrl.add);

    app.route( url+'/:id')
       .get(KnightCtrl.getById)
         .put(KnightCtrl.update)
           .delete(KnightCtrl.softDelete);
 
    app.route(url+'/filter/:param').get(KnightCtrl.getHeroes);  

    app.route(url+'/filter/:param/:id').get(KnightCtrl.getHeroById); 


};

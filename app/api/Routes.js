'use strict'
module.exports = function(app){

    var KnightCtrl = require('../controllers/KnightController');

    app.route('/knights')
      .get(KnightCtrl.getAllKnights)
        .post(KnightCtrl.add);

    app.route('/knights/:id')
       .get(KnightCtrl.getById)
         .put(KnightCtrl.update)
           .delete(KnightCtrl.softDelete);
 
    app.route('/knights/filter/:param').get(KnightCtrl.getHeroes);  

    app.route('/knights/filter/:param/:id').get(KnightCtrl.getHeroById); 


};

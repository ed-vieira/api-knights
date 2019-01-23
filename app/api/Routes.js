'use strict'
module.exports = function(app){

    var KnightCtrl = require('../controllers/KnightController');

    app.route('/knights').get(KnightCtrl.getAllKnights);

    app.route('/knights/:id').get(KnightCtrl.getById);

    app.route('/knights/:id').put(KnightCtrl.update);
     
    app.route('/knights').post(KnightCtrl.add);
     
    app.route('/knights/:id').delete(KnightCtrl.delete)  

    app.route('/knights/?filter=heroes').get(KnightCtrl.filter)  


};

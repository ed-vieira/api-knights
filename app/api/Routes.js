'use strict'
module.exports = function(app){

    var KnightCtrl = require('../controllers/KnightController');

    app.route('/list/knights').get(KnightCtrl.getAllKnights);

    app.route('/knight/:knight_id').get(KnightCtrl.getById);

};

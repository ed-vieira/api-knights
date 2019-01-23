const express = require('express'),
  app = express(),
   port = process.env.PORT || 3300,
    dbConfig= require('./app/models/mongoose-config'),
      bodyParser = require('body-parser');
 

//headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
       res.setHeader('Access-Control-Allow-Credentials', true);
         next();
  });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/api/Routes'); 

routes(app); 

app.use(function(req, res) {
    res.status(404).send({url: 'URL: '+ req.originalUrl + ' não encontrada'})
  });


app.listen(port, function(){
    console.log(`Knights Server iniciado em: http://localhost:${port}`);
});



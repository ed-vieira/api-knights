const express = require('express'),
  app = express(),
  cors = require('cors'),
   port = process.env.PORT || 3300,
    dbConfig= require('./app/config/mongoose-config'),
      bodyParser = require('body-parser');
 
//Habilita CORS  
app.use(cors());
//Habilita JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/config/Routes'); 

routes(app); 

app.use(function(req, res) {
    res.status(404).send({url: 'URL: '+ req.originalUrl + ' não encontrada'})
  });


app.listen(port, function(){
    console.log(`Knights Server iniciado em: http://localhost:${port}`);
});



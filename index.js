var sessionStorage = require('sessionstorage');
var bodyParser = require('body-parser');
var express = require('express'),
app = express(),
port = process.env.PORT || 3000;



app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
app.listen(port);
console.log('RestFull API QUASAR started on: ' + port);


/************************************************************************************
 *                                API POST TOP SECRET                               *
 *    Obtiene la posicion y mensaje de la nave, a partir del payload de entrada,    *
 *    si no es posible obtenerlos responde un codigo HTTP 404                       *
 ************************************************************************************/
app.post('/distribution',function(request, response) {
    response.status(200).send({
      position: {
        x: 'coordinates[0]',
        y: 'coordinates[1']
      },
      message:'HOLA MUNDO'
    });
});


/************************************************************************************
 *                           API GET TOP SECRET SPLIT                               *
 *    Permite obtener la posicion y mensaje de la nave a partir de minimo 3         *
 *    satelites almacenados en el sessionStorage, de no tener la cantidad de        *
 *    satelites, generara un codigo HTTP 404 - no hay informacion suficiente        *
 ************************************************************************************/
app.get('/distribution',function(request, response) {
  response.status(200).send({
      message:'GET MESSAGE'
    });
});

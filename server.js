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
console.log('RestFull API ENVIA started on: ' + port);


app.post('/distribution',function(request, response) {
  console.log(request.body);
  let message = 'STATUS 200';
  if (request.body === null) {
    response.status(404).send({error: 'no position - no message'});
  } else {
    response.status(200).send({
      position: {
        x: 'X',
        y: 'Y'
      },
      message: message
    });
  }
});


app.get('/distribution',function(request, response) {

});

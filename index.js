require('@babel/register')({
  presets: ['@babel/preset-env'],
});

import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors())
app.use(express.json({ limit: '200MB' }));
app.use(
  express.urlencoded({ extended: true, limit: '200MB', parameterLimit: 50000 })
);
app.use(cookieParser());

const server = http.createServer(app);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('RestFull API ENVIA started on: ' + port);
});

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.post('/topsecret',function(request, response) {
  
    response.status(200).send({
      position: {
        x:' coordinates[0],'
        y: 'coordinates[1]'
      },
      message: 'SI'
    });
});
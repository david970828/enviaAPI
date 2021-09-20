import http from 'http';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { api } from './api';

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv');
  dotenv.config();
}
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());
app.use(express.json({ limit: '200MB' }));
app.use(
  express.urlencoded({ extended: true, limit: '200MB', parameterLimit: 50000 })
);
app.use(cookieParser());

server.listen(port, () => {
  console.log('RestFull API ENVIA started on: ' + port);
});

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.use('/api', api);

export default app;

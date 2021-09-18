import http from 'http'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { api } from "./api";
import dotenv from 'dotenv'

const app = express()
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json({ limit: '200MB' }));
app.use(
  express.urlencoded({ extended: true, limit: '200MB', parameterLimit: 50000 })
);
app.use(cookieParser());
dotenv.config()

server.listen(port, () => {
  console.log('RestFull API ENVIA started on: ' + port);
});

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.use('/api',api)

export default app
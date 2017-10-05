import express from 'express';
import path from 'path';
const http = require('http').Server(app)

const app = express();
const PORT = 8000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

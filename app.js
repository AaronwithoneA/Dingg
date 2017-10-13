import express from 'express';
import path from 'path';
const http = require('http').Server(app)
import chatServer from './lib/chatServer';
const app = express();
const PORT = 8000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

chatServer.listen(http);

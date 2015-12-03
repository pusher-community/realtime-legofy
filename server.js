import dotenv from 'dotenv';
dotenv.load();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import request from 'request';

import { fetchImages, pushImage } from './streamer';


const app = express();

app.use(express.static('.'));
app.use(express.static('assets'));


// Twitter's img server doesn't allow CORS (sensible)
// which we need to manipulate images
// so we serve them on our own server, and pipe them from Twitter
app.get('/image/*', (req, res) => {
  const rest = req.url.replace('/image/', '');
  const path = `https://drscdn.500px.org/photo/${rest}`;
  request.get(path).pipe(res);
});

const server = http.createServer(app);

const port = process.env.PORT || '3002';

server.listen(port);

server.on('listening', () => {
  console.log('Server listening', port);
  fetchImages();
  pushImage();
});


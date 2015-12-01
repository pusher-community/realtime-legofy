import dotenv from 'dotenv';
dotenv.load();

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import request from 'request';
import Streamer from 'pusher-twitter-streamer';

const tweetHasImage = (tweet) => {
  if (!(tweet.entities && tweet.entities.media)) return false;
  const media = tweet.entities.media;
  return media.length > 0 && media[0].type === 'photo';
}

Streamer.prototype.publishFilter = (tweet) => {
  return tweetHasImage(tweet) ? tweet : undefined;
}

const streamer = new Streamer({
  twitter: {
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    accessTokenKey: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_SECRET
  },
  pusher: {
    appId: process.env.PUSHER_APP_ID,
    appKey: process.env.PUSHER_APP_KEY,
    appSecret: process.env.PUSHER_APP_SECRET,
    channelName: 'tweets',
    eventName: 'new_tweet'
  }
});

streamer.stream('christmas', 'santa');

const app = express();

app.use(express.static('.'));
app.use(express.static('assets'));

// Twitter's img server doesn't allow CORS (sensible)
// which we need to manipulate images
// so we serve them on our own server, and pipe them from Twitter
app.get('/image/:id', (req, res) => {
  const { id } = req.params;
  const path = `http://pbs.twimg.com/media/${id}.jpg`;

  request.get(path).pipe(res);
});

const server = http.createServer(app);

const port = process.env.PORT || '3002';

server.listen(port);

server.on('listening', () => {
  console.log('Server listening', port);
});

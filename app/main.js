import $ from 'jquery';
import Pusher from 'pusher';
import { transform }  from 'legofy';

const pusher = new Pusher('00c975725cd4801f6acc');

const mediaIdRegex = /http:\/\/pbs.twimg.com\/media\/([\w-]+)/;
const processTweet = (tweet) => {
  const url = tweet.entities.media[0].media_url;
  const id = url.match(mediaIdRegex);

  if (!id || !id[1]) {
    // URL didn't match regex, so discard this tweet
    return;
  }

  const serverUrl = `/image/${id[1]}`;

  const template = `
  <p>${tweet.text} from ${tweet.user.screen_name}</p>
  <img class="no-legofy" src="${serverUrl}"></img>
  <img class="legofy" width="600" height="500" src="${serverUrl}"></img>
  `;

  $('body').append(`<div>${template}</div>`);

  const lastImage = $('img.no-legofy').last();
  const { h, w } = tweet.entities.media[0].sizes.medium;
  const toLegofy = $('img.legofy').last();
  toLegofy.attr('height', h).attr('width', w);
  transform(toLegofy[0]);
}

const channel = pusher.subscribe('tweets');
channel.bind('new_tweet', (tweet) => {
  processTweet(tweet);
});

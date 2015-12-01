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

  const { h, w } = tweet.entities.media[0].sizes.small;

  const serverUrl = `/image/${id[1]}`;

  const template = `
  <p class="tweet-text white light">${tweet.text} from ${tweet.user.screen_name}</p>
  <img class="no-legofy" height=${h} width=${w} src="${serverUrl}"></img>
  <img class="legofy" src="${serverUrl}"></img>
  `;

  $('.tweets-container').append(`<div class="tweet">${template}</div>`);

  const lastImage = $('img.no-legofy').last();
  const toLegofy = $('img.legofy').last();
  toLegofy.attr('height', h).attr('width', w);
  transform(toLegofy[0]);
}

const channel = pusher.subscribe('tweets');
channel.bind('new_tweet', (tweet) => {
  processTweet(tweet);
});

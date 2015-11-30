import $ from 'jquery';
import Pusher from 'pusher';

const pusher = new Pusher('00c975725cd4801f6acc');

const processTweet = (tweet) => {
  console.log('tweet', tweet.entities.media[0]);
  const template = `
  <p>${tweet.text} from ${tweet.user.screen_name}</p>
  <img src="${tweet.entities.media[0].media_url}"></img>
  `;

  $('body').append(`<div>${template}</div>`);
}

const channel = pusher.subscribe('tweets');
channel.bind('new_tweet', (tweet) => {
  processTweet(tweet);
});

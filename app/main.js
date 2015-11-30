import Pusher from 'pusher';

const pusher = new Pusher('00c975725cd4801f6acc');

const channel = pusher.subscribe('tweets');
channel.bind('new_tweet', (tweet) => {
  console.log('got tweet', tweet);
});

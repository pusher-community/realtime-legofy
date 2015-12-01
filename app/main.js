import Pusher from 'pusher';
import $ from 'jquery';
import throttle from 'lodash.throttle';

import { processTweet } from './processTweet';

const pusher = new Pusher('00c975725cd4801f6acc');

const channel = pusher.subscribe('tweets');

let processing = false;

channel.bind('new_tweet', throttle(processTweet, 3000));

$('.tweets-container').on('mouseenter mouseleave', '.tweet', function() {
  $(this).find('img').toggle();
});



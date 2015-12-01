import Pusher from 'pusher';
import throttle from 'lodash.throttle';

import { processTweet } from './processTweet';

const pusher = new Pusher('00c975725cd4801f6acc');

const channel = pusher.subscribe('tweets');

let processing = false;

channel.bind('new_tweet', throttle(processTweet, 2000));




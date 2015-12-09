import Pusher from 'pusher';
import $ from 'jquery';

import { processPicture } from './process-picture';

const pusher = new Pusher('1dd86a2d2f3cf58165ad');

const channel = pusher.subscribe('pictures');

channel.bind('new_picture', processPicture);

$('.pictures-container').on('mouseenter mouseleave', '.picture', function() {
  $(this).find('img').toggle();
});



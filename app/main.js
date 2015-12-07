import Pusher from 'pusher';
import $ from 'jquery';

import { processPicture } from './process-picture';

const pusher = new Pusher('00c975725cd4801f6acc');

const channel = pusher.subscribe('pictures');

channel.bind('new_picture', processPicture);

$('.pictures-container').on('mouseenter mouseleave', '.picture', function() {
  $(this).find('img').toggle();
});



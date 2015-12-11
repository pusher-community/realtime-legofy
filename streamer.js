import dotenv from 'dotenv';
dotenv.load();
import fetch from 'isomorphic-fetch';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET
});

const BASE_URL = `https://api.500px.com/v1`;

const URL_PARAMS = `tag=christmas&sort=created_at&image_size=600&consumer_key=${process.env.FIVE_HUNDRED_PX_KEY}&exclude=People,Nude,Fashion&tags=1&rpp=100`;

let pictures = [];
let pageIndex = 1;
let pictureIndex = 0;

function fetchImages() {
  const url = `${BASE_URL}/photos/search?${URL_PARAMS}&page=${pageIndex}`;
  console.log('making req', url);
  fetch(
    url
  ).then((response) => {
    return response.json();
  }).then((response) => {
    const sfw = response.photos.filter((p) => p.nsfw === false);
    pictures = pictures.concat(sfw);
    console.log('new pictures length', pictures.length);
  }).catch((err) => {
    console.log('error with request', err);
  }).then((response) => {
    pageIndex++;

    setTimeout(() => {
      fetchImages();
    }, 60000); // one req a minute
  });
}

function pushImage() {
  console.log('pushImage called');
  if (pictures.length === 0 || pictures.length  === pictureIndex) {
    console.log('no pictures, setting timeout', pictures.length);
    setTimeout(pushImage, 2000);
    return;
  }

  const pic = pictures[pictureIndex];
  console.log('Pushing to Pusher channel', pictureIndex);

  try {
    pusher.trigger('pictures', 'new_picture', pic);
  } finally {
    // even if something goes wrong we need to do this
    // hence the try {} finally {}
    pictureIndex++;
    setTimeout(pushImage, 4000);
  }

}

export { fetchImages, pushImage };

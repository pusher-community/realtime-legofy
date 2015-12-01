import $ from 'jquery';
import { transform }  from 'legofy';

const mediaIdRegex = /http:\/\/pbs.twimg.com\/media\/([\w-]+)/;

const getImageIdFromTweet = (tweet) => {
  const url = tweet.entities.media[0].media_url;
  const match = url.match(mediaIdRegex);
  return match && match[1];
}

const getImageDimensionsFromTweet = (tweet) => {
  const { h: height, w: width } = tweet.entities.media[0].sizes.small;
  return { height, width };
}

const tweetTemplate = (tweet) => {
  const id = getImageIdFromTweet(tweet);

  const { height, width} = getImageDimensionsFromTweet(tweet);

  const serverUrl = `/image/${id}`;

  return (`
    <div class="tweet">
      <img style="display: none;" class="no-legofy no-legofy-${tweet.id}" src="${serverUrl}" height="${height}" width="${width}" />
      <img src="${serverUrl}" height="${height}" width="${width}" class="legofy legofy-${tweet.id}" />
    </div>
  `);
};

const renderTweet = (tweet) => {
  const elem = $(tweetTemplate(tweet));
  $('.tweets-container').prepend(elem);
  const lastImg = document.querySelector(`.no-legofy-${tweet.id}`);
  const imgToLegofy = document.querySelector(`.legofy-${tweet.id}`);
  transform(imgToLegofy);
  imgToLegofy.setAttribute('height', lastImg.getAttribute('height'));
  imgToLegofy.setAttribute('width', lastImg.getAttribute('width'));
}


export const processTweet = (tweet) => {
  const id = getImageIdFromTweet(tweet);
  const { height } = getImageDimensionsFromTweet(tweet);

  // no IMG or too small
  if (!id || height < 300) {
    return;
  } else {
    renderTweet(tweet);
  }
}



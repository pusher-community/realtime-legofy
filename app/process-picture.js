import $ from 'jquery';
import { transform }  from 'legofy';

const IMAGE_SIZE = 330;

const pictureTemplate = (picture) => {
  const url = picture.image_url.split('/').slice(4).join('/');
  const serverUrl = `/image/${url}`;
  return (`
    <div class="picture">
      <img style="display: none;" class="no-legofy no-legofy-${picture.id}" src="${serverUrl}" width="${IMAGE_SIZE}" height="${IMAGE_SIZE}"/>
      <img src="${serverUrl}" class="legofy legofy-${picture.id}" />
    </div>
  `);
};

const renderPicture = (picture) => {
  const elem = $(pictureTemplate(picture));
  $('.pictures-container').prepend(elem);
  const lastImg = document.querySelector(`.no-legofy-${picture.id}`);
  const imgToLegofy = document.querySelector(`.legofy-${picture.id}`);
  transform(imgToLegofy, { factor: 0.025 });
  imgToLegofy.setAttribute('height', IMAGE_SIZE);
  imgToLegofy.setAttribute('width', IMAGE_SIZE);
}


export const processPicture = (picture) => {
  console.log('got picture', picture.rating);
  renderPicture(picture);
}



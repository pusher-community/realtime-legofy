import $ from 'jquery';
import { transform }  from 'legofy';
import Masonry from 'masonry';

const IMAGE_SIZE = 330;

const IMAGE_SIZES = [300, 350, 400, 450, 500];

const pictureTemplate = (picture, imageSize) => {
  const url = picture.image_url.split('/').slice(4).join('/');
  const serverUrl = `/image/${url}`;
  return (`
    <div class="picture picture-${imageSize}">
      <img style="display: none;" class="no-legofy no-legofy-${picture.id}" src="${serverUrl}" width="${imageSize}" height="${imageSize}"/>
      <img src="${serverUrl}" class="legofy legofy-${picture.id}" />
    </div>
  `);
};

let currentRowIndex = 0;

const masonry = new Masonry(
  document.querySelector('.pictures-container'),
  {
    itemSelector: '.picture',
    columnWidth: 10,
    gutter: 0
  }
);

const addPictureToRow = (picture, rowIndex) => {
  const size = IMAGE_SIZES[Math.floor(Math.random() * IMAGE_SIZES.length)];
  const elem = $(pictureTemplate(picture, size));
  $('.pictures-container').prepend(elem);
  const lastImg = $(`.no-legofy-${picture.id}`).first();
  const imgToLegofy = $(`.legofy-${picture.id}`).first();
  transform(imgToLegofy[0], { factor: 0.025 });
  imgToLegofy.attr('height', size);
  imgToLegofy.attr('width', size);
  masonry.prepended(elem);

}

export const processPicture = (picture) => {
  addPictureToRow(picture);
}



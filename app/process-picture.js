import $ from 'jquery';
import { transform }  from 'legofy';

const IMAGE_SIZE = 330;

const pictureTemplate = (picture) => {
  const url = picture.image_url.split('/').slice(4).join('/');
  const serverUrl = `/image/${url}`;
  return (`
    <div class="picture">
      <img class="no-legofy no-legofy-${picture.id}" src="${serverUrl}" width="${IMAGE_SIZE}" height="${IMAGE_SIZE}"/>
      <img style="display: none;" src="${serverUrl}" class="legofy legofy-${picture.id}" />
    </div>
  `);
};

let currentRowIndex = 0;
let numRows = Math.floor($(window).height() / 330);

const addPictureToRow = (picture, rowIndex) => {
  const elem = $(pictureTemplate(picture));
  $('.pictures-row').eq(rowIndex).prepend(elem);
  const lastImg = $(`.no-legofy-${picture.id}`).first();
  const imgToLegofy = $(`.legofy-${picture.id}`).first();
  elem.animate({ width: IMAGE_SIZE, height: IMAGE_SIZE }, function() {
    transform(imgToLegofy[0], { factor: 0.025 });
    imgToLegofy.attr('height', IMAGE_SIZE);
    imgToLegofy.attr('width', IMAGE_SIZE);
    $(elem).find('img').toggle();
  });
}

export const processPicture = (picture) => {
  addPictureToRow(picture, currentRowIndex);
  if (currentRowIndex === numRows - 1) {
    currentRowIndex = 0;
  } else {
    currentRowIndex++;
  }
}



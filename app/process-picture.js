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

const renderPicture = (picture) => {
  const elem = $(pictureTemplate(picture));
  $('.pictures-container').prepend(elem);
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
  renderPicture(picture);
}



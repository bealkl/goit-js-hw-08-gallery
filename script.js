//GOIT javascript homework 08

import img from './gallery-items.js';

// const imgCount= img.length;
const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  imageLarge: document.querySelector('.lightbox__image'),
  closeButton: document.querySelector('button[data-action="close-lightbox"]'),
  overlayWindow: document.querySelector('div.lightbox__overlay'),
};

//add image content table
const imageList = img.map(slide => {
  const newLiElement = document.createElement('li');

  newLiElement.insertAdjacentHTML(
    'beforeend',
    `<a class="gallery__link" href="${slide.original}"><img class="gallery__image" src="${slide.preview}" data-source="${slide.original}" alt="${slide.description}"/></a>`,
  );
  return newLiElement;
});
refs.gallery.append(...imageList);

//addEventListener-s
refs.closeButton.addEventListener('click', closeModalImageWindow);
refs.modal.addEventListener('click', closeModalImageWindowWithOverlay);
refs.gallery.addEventListener('click', makeModalImageWindow);

//Functions for Listener-s
function closeModalImageWindow() {
  window.removeEventListener('keydown', closeModalWithEscape);
  refs.modal.classList.remove('is-open');
  refs.imageLarge.setAttribute('src', '');
}

function closeModalImageWindowWithOverlay(e) {
  if (e.target !== refs.imageLarge) return;
  closeModalImageWindow();
}

function makeModalImageWindow(e) {
  if (e.target.tagName !== "IMG") return;
  e.preventDefault();
  window.addEventListener('keydown', closeModalWithEscape);
  refs.imageLarge.setAttribute('src', `${e.target.dataset.source}`);
  refs.modal.classList.add('is-open');
}

function closeModalWithEscape(e) {
  if (e.code === 'Escape') closeModalImageWindow();
}
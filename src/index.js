
import * as basicLightbox from 'basiclightbox';
import debounce from 'lodash.debounce';
import { alert, notice, info, success, error } from '@pnotify/core';
import { defaults } from '@pnotify/core';


import NewsApiService from './apiService.js';

import imagesCardTpl from './templates/image-card.hbs';
import modalImageTpl from './templates/modal-image.hbs';




const refs = {
    inputSearch: document.querySelector("#search-form input"),
    galleryLists: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),


};

const newsApiService = new NewsApiService();


refs.inputSearch.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener('click', loadMoreArticles);


function onSearch(e) {
     e.preventDefault();

    newsApiService.query = refs.inputSearch.value;

    if (newsApiService.query.trim() === '') {
        error();
        return;
        
    };
    newsApiService.resetPage();
    clearArticlesContainer();
    fetchArticles();
    refs.loadMoreBtn.classList.remove('is-hidden')
    
  
};

function fetchArticles() {
    info()
     newsApiService.fetchImages().then(articles => { renderImagesCard(articles)});
    
};

function loadMoreArticles() {
   
    fetchArticles();
    scrollImages();
        
};

function renderImagesCard(articles) {
    const markup = imagesCardTpl(articles.hits);

    refs.galleryLists.insertAdjacentHTML('beforeend', markup);
};

function scrollImages() {
    


 const element = document.querySelector('.gallery');
    setTimeout(() => {
        window.scrollTo({
         top: element.clientHeight,
         behavior: 'smooth',
       });
    }, 500);
};
function clearArticlesContainer() {
  refs.galleryLists.innerHTML = '';
}


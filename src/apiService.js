const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '21756599-0afd71203aca16b66ad6b1f5f';

export default class NewsApiService {
    constructor() {
        this.inputValue = '';
        this.pageNumber = 1;
        
    };

    fetchImages() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.inputValue}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`;

        return fetch(url).then(response => response.json()).then(this.incrementPage());
    };

    incrementPage() {
        this.pageNumber += 1;
    };

    resetPage() {
    this.pageNumber = 1;
  }

    get query() {
        return this.inputValue;
    };

    set query(newValue) {
        this.inputValue = newValue;
    };
 };
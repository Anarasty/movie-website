// console.log('Hello');

const API_KEY = "api_key=f6c03d0e606f4afeb08c4de4db25ae32";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&"+API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const searchURL = BASE_URL + '/search/movie?' + API_KEY;

// const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
// const BASE_URL = "https://api.themoviedb.org/3";
// const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
// const IMG_URL = "https://image.tmdb.org/t/p/w500";


const main = document.getElementById('main');
const searchForm = document.getElementById('searchForm');
const searchField= document.getElementById('searchField');


getData(API_URL);

function getData(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        showMovie(data.results);
    })
}

function showMovie(data) {
    main.innerHTML = '';

    data.forEach(movieSection => {
      const { title, poster_path, vote_average, release_date } = movieSection;
      const movieElement = document.createElement("div");
      movieElement.classList.add("movieSection");
      movieElement.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
                <div class="movieInfo">
                    <h3>${title}</h3>
                    <div class="movieInfoContent">
                        <h4>${release_date}</h4>
                        <span>${vote_average}</span>
                    </div>
                </div>
      `;

      main.appendChild(movieElement);
    })
}   

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = searchField.value;

    if(searchTerm) {
        getData(searchURL+"&query="+searchTerm)
    }
})
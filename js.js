const apiKey = '5230a42f11a0dd71788f9e055a1f7249';
const baseUrl = 'https://api.themoviedb.org/3/';

const imagesUrl = 'https://image.tmdb.org/t/p/w500';


const fragment = document.createDocumentFragment();


const loader_container = document.querySelector('.loader-container');
const loader = document.createElement('div');
loader.classList.add('loader');

loader_container.appendChild(loader);


async function myAsyncFunction() {

    const searchTerm = document.querySelector('#search').value;

    let url;

    if (searchTerm) {
        url = `${baseUrl}search/movie?api_key=${apiKey}&query=${searchTerm}`;
    } else {
        url = `${baseUrl}discover/movie?api_key=${apiKey}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        const movie_container = document.querySelector('.movie-container');

        movie_container.innerHTML = '';

        data.results.map((movie) => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');


            const movieImage = document.createElement('img');
            movieImage.src = `${imagesUrl}${movie.backdrop_path}`;
            movieImage.alt = movie.title;

            const movieTitle = document.createElement('h3');
            movieTitle.textContent = movie.title;

            const movieRelease = document.createElement('span');
            movieRelease.textContent = `Released: ${movie.release_date}`;



            fragment.appendChild(movieImage);
            fragment.appendChild(movieTitle);
            fragment.appendChild(movieRelease);
            movieCard.appendChild(fragment);
            movie_container.appendChild(movieCard);
        })

    } catch (error) {
        console.error(error.message);
    } finally {
        setTimeout(() => {
            
            const loader = document.querySelector('.loader');
            if (loader) {
                loader_container.remove();
            }
        }, 2000);
    }
}

const searchInput = document.querySelector('#search')

searchInput.addEventListener('input', () => {
    myAsyncFunction();
})

myAsyncFunction();
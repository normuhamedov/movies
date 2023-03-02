const apiKeys = '5230a42f11a0dd71788f9e055a1f7249';
const moviesUrl = 'https://api.themoviedb.org/3/';

const imgUrl = 'https://image.tmdb.org/t/p/w500';


const fragment = document.createDocumentFragment();


const loaderContainer = document.querySelector('.loader-container');
const loader = document.createElement('div');
loader.classList.add('loader');

loaderContainer.appendChild(loader);


async function myAsyncFunction() {

    const search = document.querySelector('#search').value;

    let url;

    if (search) {
        url = `${moviesUrl}search/movie?api_key=${apiKeys}&query=${search}`;
    } else {
        url = `${moviesUrl}discover/movie?api_key=${apiKeys}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        const movieContainer = document.querySelector('.movie-container');

        movieContainer.innerHTML = '';

        data.results.map((movie) => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');


            const movieImg = document.createElement('img');
            movieImg.src = `${imgUrl}${movie.backdrop_path}`;
            movieImg.alt = movie.title;

            const movieTitle = document.createElement('h3');
            movieTitle.textContent = movie.title;

            const movieRelease = document.createElement('span');
            movieRelease.textContent = `Released: ${movie.release_date}`;



            fragment.appendChild(movieImg);
            fragment.appendChild(movieTitle);
            fragment.appendChild(movieRelease);
            movieCard.appendChild(fragment);
            movieContainer.appendChild(movieCard);
        })

    } catch (error) {
        console.error(error.message);
    } finally {
        setTimeout(() => {
            
            const kunfu = document.querySelector('.loader');
            if (kunfu) {
                loaderContainer.remove();
            }
        }, 2000);
    }
}

const searchInput = document.querySelector('#search')

searchInput.addEventListener('input', () => {
    myAsyncFunction();
})

myAsyncFunction();
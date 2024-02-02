const imageContainer = document.getElementById('image-container');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photos = [];

const count = 10;
const API_KEY = 'hW_hV-NsbHRi5SsH3o48zdWP8YmNJdz_7VTYLPAYaZc';
const url = `https://api.unsplash.com/photos/random?count=${count}&client_id=${API_KEY}`;

const generateMarkup = function (photo) {
    return `
      <a href="${photo.links?.html}">
        <img 
          src="${photo.urls?.regular}" 
          onload="loadImage()"
          alt="${photo.alt_description}" 
          title="${photo.alt_description}" />
      </a>
    `;
};

function loadImage() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) ready = true;
}

const displayPhotos = function () {
    imagesLoaded = 0;
    totalImages = photos.length;
    const photoList = photos.map(generateMarkup).join('');
    imageContainer.insertAdjacentHTML('beforeend', photoList);
};

const getPhotos = async function () {
    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('Something went wrong!');

        photos = await response.json();

        displayPhotos();
    } catch (e) {
        console.error(e);
    }
};

getPhotos();

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500 && ready) {
        ready = false;
        getPhotos();
    }
});
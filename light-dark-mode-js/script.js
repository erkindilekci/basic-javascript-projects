const documentElement = document.documentElement;
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

const setImageSrc = function (theme) {
    image1.src = `img/undraw_proud_coder_${theme}.svg`;
    image2.src = `img/undraw_feeling_proud_${theme}.svg`;
    image3.src = `img/undraw_conceptual_idea_${theme}.svg`;
};

const toggleTheme = function (isLight) {
    localStorage.setItem('theme', isLight ? 'light': 'dark');
    documentElement.setAttribute('data-theme', isLight ? 'light': 'dark');

    nav.style.backgroundColor = isLight ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    textBox.style.backgroundColor = isLight ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';

    toggleIcon.children[0].textContent = isLight ? 'Light Mode' : 'Dark Mode';
    isLight
        ? toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun')
        : toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');

    setImageSrc(isLight ? 'light' : 'dark');
}

const switchTheme = function (event) {
    const checked = event.target.checked;
    toggleTheme(!checked)
};

toggleSwitch.addEventListener('change', switchTheme);

const checkTheme = function () {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') toggleTheme(true);
    if (theme === 'dark') {
        toggleSwitch.checked = true;
        toggleTheme(false)
    }
};

window.addEventListener('load', checkTheme);
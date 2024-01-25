const quoteContainer = document.getElementById('quote-container');
const footer = document.getElementById('footer');
const quoteTxt = document.getElementById('quote');
const authorTxt = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quote;

const showLoadingSpinner = function () {
    loader.hidden = false;
    quoteContainer.hidden = true;
    footer.hidden = true;
};

const hideLoadingSpinner = function () {
    loader.hidden = true;
    quoteContainer.hidden = false;
    footer.hidden = false;
};

const getQuote = async function () {
    try {
        const response = await fetch('https://api.quotable.io/quotes/random');

        if (!response.ok) throw new Error('Failed to fetch quote');

        const [data] = await response.json();
        const {author, content} = data;
        return {author, content};
    } catch (e) {
        console.error(e);
    }
};

const updateDOM = async function () {
    showLoadingSpinner();

    try {
        quote = await getQuote();

        quote.content.length > 100 ? quoteTxt.classList.add('long-quote') : quoteTxt.classList.remove('long-quote');

        quoteTxt.innerText = quote.content;
        authorTxt.innerText = quote.author || 'Unknown';

        hideLoadingSpinner();
    } catch (e) {
        console.error(e);
        quoteTxt.innerText = 'Failed to fetch quote';
    }
};

const tweetQuote = function () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.content} - ${quote.author}`;
    window.open(twitterUrl, '_blank');
};


updateDOM();

twitterBtn.addEventListener('click', tweetQuote);

newQuoteBtn.addEventListener('click', updateDOM);
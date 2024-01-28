const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

const toggleButtonVisibility = () => button.disabled = !button.disabled;

const speech = function (text) {
    VoiceRSS.speech({
        key: API_KEY,
        src: text,
        hl: 'en-US',
        r: 2,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
};

const getJoke = async function () {
    let jokeText = '';

    try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Programming");

        if (!response.ok) throw new Error("Something went wrong!");

        const data = await response.json();

        if (data.error) throw new Error("Sorry, we couldn't find any joke.");

        if (data.type === 'single') {
            const {joke} = data;
            jokeText = joke;
        }

        if (data.type === 'twopart') {
            const {setup, delivery} = data;
            jokeText = `${setup}... ${delivery}`;
        }

        speech(jokeText);
        toggleButtonVisibility();
    } catch (e) {
        console.error(e);
    }
};

button.addEventListener('click', getJoke);

audioElement.addEventListener('ended', toggleButtonVisibility);
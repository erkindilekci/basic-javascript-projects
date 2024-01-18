"use strict";

const countriesContainer = document.querySelector(".countries");

const countryNames = [
    "russia",
    "canada",
    "china",
    "brazil",
    "australia",
    "india",
    "argentina",
    "kazakhstan",
    "algeria",
    "denmark",
    "mexico",
    "indonesia",
    "sudan",
    "libya",
    "iran",
    "mongolia",
    "peru",
    "chad",
    "niger",
    "angola",
    "mali",
    "colombia",
    "ethiopia",
    "bolivia",
    "mauritania",
    "egypt",
    "tanzania",
    "nigeria",
    "venezuela",
    "namibia",
    "mozambique",
    "turkey",
    "chile",
    "zambia",
    "myanmar",
    "france",
    "somalia",
    "ukraine",
    "madagascar",
    "botswana",
    "kenya",
    "yemen",
    "thailand",
    "spain",
    "turkmenistan",
    "cameroon",
    "sweden",
    "uzbekistan",
    "morocco",
    "paraguay",
    "zimbabwe",
    "norway",
    "japan",
    "germany",
    "congo",
    "finland",
    "vietnam",
    "malaysia",
    "poland",
    "oman",
    "italy",
    "philippines",
    "ecuador",
    "gabon",
    "guinea",
    "uganda",
    "ghana",
    "romania",
    "laos",
    "guyana",
    "belarus",
    "kyrgyzstan",
    "senegal",
    "cambodia",
    "uruguay",
    "tunisia",
    "nepal",
    "bangladesh",
    "tajikistan",
    "greece",
    "nicaragua",
];

const getCountryData = (countryName) => {
    const request = new XMLHttpRequest();
    request.open(
        "GET",
        `https://countries-api-836d.onrender.com/countries/name/${countryName}`
    );
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        const { currencies, languages } = data;
        const { name: currency } = currencies[0];
        const { name: language } = languages[0];

        const html = `
        <article class="country">
            <img class="country__img" src="${data.flag}"/>
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                    +data.population / 1_000_000
                ).toFixed(1)} million people</p>
                <p class="country__row"><span>🗣️</span>${language}</p>
                <p class="country__row"><span>💰</span>${currency}</p>
            </div>
        </article>
    `;

        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
    });
};

countryNames.forEach((c) => getCountryData(c));

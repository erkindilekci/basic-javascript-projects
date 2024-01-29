let page = 1;

const itemContainer = document.querySelector(".item-container");
const loadMoreBtn = document.querySelector(".btn-load");

const getData = async function (page) {
    const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
    );

    if (!response) return;

    const data = await response.json();
    return data;
};

const createItem = function (obj) {
    return `
        <div class="item">
            <h3 class="item__name">${obj.name}</h3>
            <h4 class="item__status">${obj.status} - ${obj.species}</h4>
            <img class="item__image" src="${obj.image}">
        </div>
    `;
};

const parseData = async function (page) {
    const data = await getData(page);
    const list = data.results.map(createItem).join("");
    itemContainer.insertAdjacentHTML("beforeend", list);
};

parseData(page);

const loadNextPage = function () {
    if (page < 40) {
        parseData(++page);
    }
};

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400)
        loadNextPage();
});

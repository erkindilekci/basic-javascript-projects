const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById('btn');
const color = document.querySelector('.color');

btn.addEventListener('click', () => {
    const randomColor = generateRandomColor();
    color.textContent = randomColor;
    color.style.color = randomColor;
    document.body.style.backgroundColor = randomColor;
});

function generateRandomColor() {
    const colorList = ['#'];
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hex.length);
        colorList.push(hex[randomIndex]);
    }
    return colorList.join('');
}

const passwordBox = document.getElementById('password');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const toast = document.getElementById('toast');
const length = 20;

const upperCase = "ABCDEFGHIJKLMOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmopqrstuvwxyz";
const number = "0123456789";
const symbol = "@#$%^&*()_+-=[]{}|;:,.<>?!";

const allChars = upperCase + lowerCase + number + symbol;

generateBtn.addEventListener('click', () => {
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while (length > password.length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    passwordBox.value = password;
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hidden');
    }, 3000);
}

copyBtn.addEventListener('click', async (event) => {
    try {
        await navigator.clipboard.writeText(passwordBox.value);
        showToast('Copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
});


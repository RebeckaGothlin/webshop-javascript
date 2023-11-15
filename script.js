// hamburger menu

const menuBtn = document.querySelector('#toggleMenu');
const menu = document.querySelector('#menu');

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    const isOpen = menu.classList.toggle('open');
    menuBtn.classList.toggle('open');
    if (isOpen) {
        menuBtn.setAttribute('aria-label', 'Close menu');
    } else {
        menuBtn.setAttribute('aria-label', 'Open menu');
    }
}

// toggle theme, dark theme

if (
    window.matchMedia && 
    window.matchMedia('(prefers-color-scheme: dark)').matches) 
{
    document.body.classList.add('dark-theme');
}

const themeToggle = document.querySelector("#themeToggle");

themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
    if (document.body.classList.contains('dark-theme')) {
    document.body.classList.remove('dark-theme');
    } else {
    document.body.classList.add('dark-theme');
    }
}

// add to cart, applicera på alla!! querySelectorAll..

const minus = document.querySelector('#subtract');
const plus = document.querySelector('#add');
const price = document.querySelector('#price');
const currentCount = document.querySelector('#currentCount');
let amount = Number(currentCount.value);


minus.addEventListener('click', subtractValue);
plus.addEventListener('click', addValue);

function subtractValue() {
    amount -= 1;
    currentCount.value = amount; // !!! fixa så inte -1 on noll..

    updatePrice();
}

function addValue() {
    amount += 1;
    currentCount.value = amount;

    updatePrice();
}

function updatePrice() {
    price.innerHTML = amount * 10 + ' kr';
}
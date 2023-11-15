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

// add to cart

const minus = document.querySelector('#subtract');
const plus = document.querySelector('#add');
const currentCount = document.querySelector('#currentCount');

minus.addEventListener('click', subtract);
plus.addEventListener('click', add);

function subtract() {
    currentCount.value -= 1; // !!! fixa så inte -1 on noll..
}

function add() {
    currentCount.value = Number(currentCount.value) + 1;
}
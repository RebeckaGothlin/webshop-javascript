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
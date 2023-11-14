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
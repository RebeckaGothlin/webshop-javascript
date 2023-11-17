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
    window.matchMedia('(prefers-color-scheme: dark)').matches) {
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


/*
1. Skapa array med chokladbollarna (products) som objekt
2. loopa ut arrayen på sidan så alla chokladbollar (products) visas
3. skapa unika id:n för knapparna för plus och minus
4. koppla ihop plus och minus med varje chokladboll
 */

const products = [
    {
        name: "Chokladboll - cappuccino",
        price: 10,
        rating: 4.5,
        category: "kaffe",
        imageUrl: "assets/chokladboll-cappuccino.png",
        amount: 0,
    },
    {
        name: "Chokladboll - chokladdragerad",
        price: 12,
        rating: 4.8,
        category: "choklad",
        imageUrl: "assets/chokladboll-chokladdragerad.png",
        amount: 0,
    },
    {
        name: "Chokladboll - hallon",
        price: 15,
        rating: 4.6,
        category: "fruktig",
        imageUrl: "assets/chokladboll-hallon.png",
        amount: 0,
    },
    {
        name: "Chokladboll - kaffe",
        price: 12,
        rating: 4.3,
        category: "kaffe",
        imageUrl: "assets/chokladboll-kaffe.png",
        amount: 0,
    },
    {
        name: "Chokladboll - kokos",
        price: 10,
        rating: 4.8,
        category: "choklad",
        imageUrl: "assets/chokladboll-kokos.png",
        amount: 0,
    },
    {
        name: "Chokladboll - pärlsocker",
        price: 10,
        rating: 4.4,
        category: "choklad",
        imageUrl: "assets/chokladboll-parlsocker.png",
        amount: 0,
    },
    {
        name: "Chokladboll - raw",
        price: 13,
        rating: 4.2,
        category: "choklad",
        imageUrl: "assets/chokladboll-raw.png",
        amount: 0,
    },
    {
        name: "Chokladboll - sockerfri",
        price: 12,
        rating: 4,
        category: "choklad",
        imageUrl: "assets/chokladboll-sockerfri.png",
        amount: 0,
    },
    {
        name: "Chokladboll - strössel",
        price: 10,
        rating: 4.4,
        category: "fruktig",
        imageUrl: "assets/chokladboll-strossel.png",
        amount: 0,
    },
    {
        name: "Havreboll",
        price: 15,
        rating: 4.9,
        category: "havre",
        imageUrl: "assets/havreboll.png",
        amount: 0,
    },
];

const productsContainer = document.querySelector('#products');

for (let i = 0; i < products.length; i++) {
    productsContainer.innerHTML +=
        `<div class="product-container">
            <div id="product-${i}">
            <div class="image-container">
                <img src="${products[i].imageUrl}" alt="${products[i].name}">
            </div>
            <div class="product-details">
                Rating: ${products[i].rating}
                <strong>${products[i].name}</strong>
                Pris: ${products[i].price} kr
                
                <div class="buttons-container">
                    <button class="subtract" id="subtract-${i}">-</button>
                    ${products[i].amount}
                    <button class="add" id="add-${i}">+</button>
                </div>
                <button class="addProduct" id="addProduct-${i}">Lägg till</button>
            </div>
            </div>
        </div>`;
}

const addButtons = Array.from(document.querySelectorAll('.add'));
for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', addAmount);
}

function addAmount(e) {
    // Hämta id:t från knappen man tryckt på
    // Ta bort texten add- från id:t så man får fram siffran ist
    // Siffran = platsen för chokladbollen i arrayen
    const index = e.target.id.replace('add-', '');
    console.log(index);

    products[index].amount += 1;

    productsContainer.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        productsContainer.innerHTML +=
            `<div class="product-container">
                <div id="product-${i}">
                <div class="product-container">
                <div class="image-container">
                    <img src="${products[i].imageUrl}" alt="${products[i].name}">
                </div>
                <div class="product-details">
                    Rating: ${products[i].rating}
                    <strong>${products[i].name}</strong>
                    Pris: ${products[i].price} kr

                    <div class="buttons-container">
                        <button class="subtract" id="subtract-${i}">-</button>
                        ${products[i].amount}
                        <button class="add" id="add-${i}">+</button>
                    </div>
                    <button class="addProduct" id="addProduct-${i}">Lägg till</button>
                </div>
                </div
            </div>`;
    }

    // Lägg till eventlyssnare igen på plus-knapparna då de tidigare knapparna raderades när vi nollställde  (rad 156)
    const addButtons = Array.from(document.querySelectorAll('.add'));
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', addAmount);
    }
}

function addAmount(e) {
    const index = e.target.id.replace('add-', '');
    products[index].amount += 1;
    updateProductsContainer();
}

function subtractAmount(e) {
    const index = e.target.id.replace('subtract-', '');
    if (products[index].amount > 0) {
        products[index].amount -= 1;
        updateProductsContainer();
    }
}

function updateProductsContainer() {
    productsContainer.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        productsContainer.innerHTML +=
            `<div class="product-container">
                <div id="product-${i}">
                <div class="product-container"> 
                <div class="image-container">
                    <img src="${products[i].imageUrl}" alt="${products[i].name}">
                </div>
                <div class="product-details">
                    Rating: ${products[i].rating}
                    <strong>${products[i].name}</strong>
                    Pris: ${products[i].price} kr

                    <div class="buttons-container">
                        <button class="subtract" id="subtract-${i}">-</button>
                        ${products[i].amount}
                        <button class="add" id="add-${i}">+</button>
                    </div>
                    <button class="addProduct" id="addProduct-${i}">Lägg till</button>
                </div>
                </div>
            </div>`;
    }

    const addButtons = Array.from(document.querySelectorAll('.add'));
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', addAmount);
    }

    const subtractButtons = Array.from(document.querySelectorAll('.subtract'));
    for (let i = 0; i < subtractButtons.length; i++) {
        subtractButtons[i].addEventListener('click', subtractAmount);
    }
}

updateProductsContainer();


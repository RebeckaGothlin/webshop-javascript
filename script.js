// HAMBURGERMENYN

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

// MÖRKT TEMA

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



// PRODUKTERNA
/*
1. Skapa array med chokladbollarna (products) som objekt
2. loopa ut arrayen på sidan så alla chokladbollar (products) visas
3. skapa unika id:n för knapparna för plus och minus
4. koppla ihop plus och minus med varje chokladboll
 */

// UPPDATERA VARUKORGEN
/*
	Koppla ihop varukorgen i headern med knappen addProduct 
	och plus/minus-knapparna så när man trycker på Lägg till
	(i varukorgen) så ska den varukorgen i headern uppdateras
	med antal och/eller kronor.
 */

// NOTE TO SELF: Försök förstå all denna kod, ish.

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

// Funktion för att skapa produktHTML
function createProductHTML(product, index) {
	return `
        <div class="product-container">
            <div id="product-${index}">
                <div class="product-container">
                    <div class="image-container">
                        <img src="${product.imageUrl}" alt="${product.name}" width="300" height="300" loading="lazy">
                    </div>
                    <div class="product-details">
                        Rating: ${product.rating}
                        <strong>${product.name}</strong>
                        Pris: ${product.price} kr

                        <div class="buttons-container">
                            <button class="subtract" id="subtract-${index}">-</button>
                            ${product.amount}
                            <button class="add" id="add-${index}">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

// Funktion för att uppdatera productsContainer
function updateProductsContainer() {
	productsContainer.innerHTML = '';

	for (let i = 0; i < products.length; i++) {
		productsContainer.innerHTML += createProductHTML(products[i], i);
	}

	addEventListeners();
}

// Funktion för att adda event listeners för add och subtract buttons
function addEventListeners() {
	const addButtons = Array.from(document.querySelectorAll('.add'));
	for (let i = 0; i < addButtons.length; i++) {
		addButtons[i].addEventListener('click', addAmount);
	}

	const subtractButtons = Array.from(document.querySelectorAll('.subtract'));
	for (let i = 0; i < subtractButtons.length; i++) {
		subtractButtons[i].addEventListener('click', subtractAmount);
	}
}


// Funktion för att hantera addAmount
function addAmount(e) {
	const index = e.target.id.replace('add-', '');
	products[index].amount += 1;
	updateProductsContainer();
	updateTotalPrice();
}

// Funktion för att hantera subtractAmount
function subtractAmount(e) {
	const index = e.target.id.replace('subtract-', '');
	if (products[index].amount > 0) {
		products[index].amount -= 1;
		updateProductsContainer();
		updateTotalPrice();

	}
}

updateProductsContainer();


const totalPriceSpan = document.getElementById('price');
let totalPrice = 0;

function updateTotalPrice() {
	totalPrice = products.reduce((sum, product) => sum + product.amount * product.price, 0);
	totalPriceSpan.textContent = totalPrice + ' kr';
}

updateTotalPrice();

// NOTE TO SELF: Läs igenom all denna kod flera gånger och försök förstå.
// Försök skriv det igen utan att kolla! 

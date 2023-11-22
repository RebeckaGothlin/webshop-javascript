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

let products = [
	{
		name: "Chokladboll - cappuccino",
		price: 10,
		rating: 4.5,
		category: "kaffe",
		image: {
			src: 'assets/chokladboll-cappuccino.png',
			alt: 'chocolate ball with cappuccino taste',
			widht: 456,
			height: 418,
		},
		amount: 0,
	},
	{
		name: "Chokladboll - chokladdragerad",
		price: 12,
		rating: 4.8,
		category: "choklad",
		image: {
			src: 'assets/chokladboll-chokladdragerad.png',
			alt: 'chocolate ball covered in chocolate and coconut flakes',
			widht: 540,
			height: 540,
		},
		amount: 0,
	},
	{
		name: "Chokladboll - hallon",
		price: 15,
		rating: 4.6,
		category: "fruktig",
		image: {
			src: 'assets/chokladboll-hallon.png',
			alt: 'chocolate ball covered in freeze-dried raspberry',
			widht: 600,
			height: 607,
		},
		amount: 0,
	},
	{
		name: "Chokladboll - kaffe",
		price: 12,
		rating: 4.3,
		category: "kaffe",
		image: {
			src: 'assets/chokladboll-kaffe.png',
			alt: 'chocolate ball with taste of coffee covered in coconut flakes',
			widht: 800,
			height: 800,
		},
		amount: 0,
	},
	{
		name: "Chokladboll - kokos",
		price: 10,
		rating: 4.8,
		category: "choklad",
		image: {
			src: 'assets/chokladboll-kokos.png',
			alt: 'chocolate ball covered in coconut flakes',
			widht: 800,
			height: 800,
		},
		amount: 0,
	},
	{
		name: "Chokladboll - pärlsocker",
		price: 10,
		rating: 4.4,
		category: "choklad",
		image: {
			src: 'assets/chokladboll-parlsocker.png',
			alt: 'chocolate ball covered in nib sugar',
			widht: 2048,
			height: 1637,
		},
		amount: 0,
	},
	{
		name: "Chokladboll - raw",
		price: 13,
		rating: 4.2,
		category: "choklad",
		image: {
			src: 'assets/chokladboll-raw.png',
			alt: 'a raw chocolate ball covered in coconut flakes',
			widht: 800,
			height: 800,
		},
		amount: 0,
	},
	{
		name: "Chokladboll - sockerfri",
		price: 12,
		rating: 4,
		category: "choklad",
		image: {
			src: 'assets/chokladboll-sockerfri.png',
			alt: 'sugar free chocolate ball covered in coconut flakes',
			widht: 1000,
			height: 816,
		},
		amount: 0,
	},
	{
		name: "Chokladboll - strössel",
		price: 10,
		rating: 4.4,
		category: "fruktig",
		image: {
			src: 'assets/chokladboll-strossel.png',
			alt: 'chocolate ball covered in colorful sprinkles',
			widht: 1034,
			height: 980,
		},
		amount: 0,
	},
	{
		name: "Havreboll",
		price: 15,
		rating: 4.9,
		category: "havre",
		image: {
			src: 'assets/havreboll.png',
			alt: 'light outmeal ball covered in coconut flakes',
			widht: 2048,
			height: 1637,
		},
		amount: 0,
	},
];

const productsContainer = document.querySelector('#products');
const cartHtmlContainer = document.querySelector('#cart');

const today = new Date();
const isFriday = today.getDay() === 6;
const isMonday = today.getDay() === 1;
const currentHour = today.getHours();

const categoryFilterRadios = document.querySelectorAll('[name="categoryFilter"]');
const priceRangeSlider = document.querySelector('#priceRange');
const currentPrice = document.querySelector('#currentRangeValue');

let filteredProduct = [...products];
let productsInPriceRange = [...products];
let totalOrderSum = 0;

let slownessTimeout = setTimeout(slowCustomerMessage, 1000 * 60 * 15);



function slowCustomerMessage() {
	if (slownessTimeout) {
		alert('Du är för långsam på att beställa!');
	}
}

printProducts();


function decreaseAmount(e) {
	let index = e.target.id.replace('decrease-', '');
	if (products[index].amount > 0) {
		products[index].amount -= 1;
		index = Number(index);

		printProducts();
	}
}

function increaseAmount(e) {
	let index = e.target.id.replace('increase-', '');
	index = Number(index);
	products[index].amount += 1;

	printProducts();
}



function getPriceMultiplier() {
	if ((isFriday && currentHour >= 15) || (isMonday && currentHour <= 3)) {
		return 1.15;
	}
	return 1;
}



// print products
function printProducts() {
	productsContainer.innerHTML = '';

	let priceIncrease = getPriceMultiplier();



	productsInPriceRange.forEach((product, i) => {
		productsContainer.innerHTML += `
		<div class="product-container">
            <div id="product-${i}}">
                <div class="product-container">
                    <div class="image-container">
                        <img src="${product.image.src}" alt="${product.image.alt}" width="${product.image.width}" height="${product.image.height}" loading="lazy">
                    </div>
                    <div class="product-details">
                        Rating: ${product.rating}
                        <strong>${product.name}</strong>
                        Pris: ${product.price * priceIncrease} kr

                        <div class="buttons-container">
                            <button class="decrease" id="decrease-${i}">-</button>
                            ${product.amount}
                            <button class="increase" id="increase-${i}">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		`;
	});

	const increaseButtons = document.querySelectorAll('.increase');
	increaseButtons.forEach(btn => {
		btn.addEventListener('click', increaseAmount);
		updateTotalPrice();
	});

	const decreaseButtons = document.querySelectorAll('.decrease');
	decreaseButtons.forEach(btn => {
		btn.addEventListener('click', decreaseAmount);
		updateTotalPrice();
	});
	updateTotalPrice();
	printCartProducts();
}


/*
	Varukorgen i headern (bredvid ikonen)
*/
function updateTotalPrice() {
	const totalPriceSpan = document.querySelector('#price');
	const totalPrice = products.reduce((total, product) => total + product.amount * product.price, 0);
	totalPriceSpan.textContent = `${totalPrice} kr`
}

// printar produkterna i varukorgen (inte i headern)
function printCartProducts() {
	cartHtmlContainer.innerHTML = '';

	let sum = 0;
	let orderedProductAmount = 0;
	let msg = '';
	let priceIncrease = getPriceMultiplier();



	// cart
	products.forEach(product => {
		orderedProductAmount += product.amount;

		if (product.amount > 0) {
			let productPrice = product.price;
			if (product.amount >= 10) {
				productPrice *= 0.9;
			}
			const adjustedProductPrice = productPrice * priceIncrease;

			sum += product.amount * adjustedProductPrice;

			cartHtmlContainer.innerHTML += `
			<div class="cart-summary">
			<img src="${product.image.src}"> <span class="cart-name">${product.name}</span> <span class="cart-amount">${product.amount}</span> <span class="cart-sum">${product.amount * adjustedProductPrice} kr</span>
			</div>
			`;
		}
	});

	if (sum <= 0) {
		return;
	}

	if (today.getDay() === 1 && today.getHours() < 10) { 
		sum += 0.9;
		msg += `<p>Måndagsrabatt: 10 % på hela beställningen</p>`
	}

	cartHtmlContainer.innerHTML += `<p>Summa: ${sum} kr</p>`;
	cartHtmlContainer.innerHTML += `<div>${msg}</div`;

	if (orderedProductAmount > 15) {
		cartHtmlContainer.innerHTML += '<p>Frakt: 0 kr</p>';
	} else 
		cartHtmlContainer.innerHTML += `<p>Frakt: ${Math.round(25 + (0.1 * sum))} kr</p>`;
}






/* 
Sort by price
*/



function changePriceRange() {
	const currentPrice = priceRangeSlider.value;
	currentRangeValue.innerHTML = currentPrice;

	productsInPriceRange = products.filter((product) => product.price <= currentPrice);
	updateTotalPrice();
}

function updateCategoryFilter(e) {
	const selectedCategory = e.currentTarget.value;

	if (selectedCategory === 'Visa alla') {
		filteredProducts = [...products];
	} else {
		filteredProducts = [];

		for (let i = 0; i < products.length; i++) {
			const prod = products[i];

			const catsInLowercase = [];
			for (let j = 0; j < prod.category.length; j++) {
				catsInLowercase.push(prod.category[j].toLowerCase());
			}
			if (catsInLowercase.indexOf(selectedCategory) > -1) {
				products.push(prod);
			}
		}
	}
	changePriceRange();
}

priceRangeSlider.addEventListener('input', changePriceRange);

updateTotalPrice();










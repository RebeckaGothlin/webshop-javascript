// HAMBURGERMENYN

const menuBtn = document.querySelector('#toggleMenu');
const menu = document.querySelector('#menu');

menuBtn.addEventListener('click', toggleMenu);
menu.addEventListener('click', toggleMenu);

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



// PRODUKTERNA i array
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
		productNo: 111,
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
		productNo: 222,
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
		productNo: 333,
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
		productNo: 444,
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
		productNo: 555,
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
		productNo: 666,
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
		productNo: 777,
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
		productNo: 888,
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
		productNo: 999,
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
		productNo: 1010,
	},
];

// div products från HTML 
const productsContainer = document.querySelector('#products');
// div cart från HTML
const cartHtmlContainer = document.querySelector('#cart');

let cart = [...products];

// datum för rabatter/helgpåslag
const today = new Date();
const isFriday = today.getDay() === 6;
const isMonday = today.getDay() === 1;
const currentHour = today.getHours();

// sortering, kategori och pris (EJ KLAR!!)
const categoryFilterRadios = document.querySelectorAll('[name="categoryFilter"]');
const priceRangeSlider = document.querySelector('#priceRange');
const currentRangeValue = document.querySelector('#currentRangeValue');

let filteredProduct = [...products];
let filteredProductsInPriceRange = [...products];
let totalOrderSum = 0;

// långsam kund 
let slownessTimeout = setTimeout(slowCustomerMessage, 1000 * 60 * 15);


// långsam kund 
function slowCustomerMessage() {
	if (slownessTimeout) {
		cartHtmlContainer.innerHTML = '';
		alert('Du är för långsam på att beställa!');
	}
}
// printar ut produkterna på sidan
printProducts();

// minus-knappen 
function decreaseAmount(e) {
	let index = e.target.id.replace('decrease-', '');
	if (products[index].amount > 0) {
		products[index].amount -= 1;
		index = Number(index);

		printProducts();
		printCartProducts();
	}
}

// plus-knappen
function increaseAmount(e) {
	let index = e.target.id.replace('increase-', '');
	index = Number(index);
	products[index].amount += 1;
	cart = products.filter(product => product.amount > 0);

	printProducts();
	printCartProducts();
}


// rabatt/ HELGPÅSLAG
function getPriceMultiplier() {
	if ((isFriday && currentHour >= 15) || (isMonday && currentHour <= 3)) {
		return 1.15;
	}
	return 1;
}



// PRODUKTERNA print products
function printProducts() {
	productsContainer.innerHTML = '';

	// helgpåslag
	let priceIncrease = getPriceMultiplier();

	filteredProductsInPriceRange.forEach((product, i) => {
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

	// plus-knapp eventlyssnare
	const increaseButtons = document.querySelectorAll('.increase');
	increaseButtons.forEach(btn => {
		btn.addEventListener('click', increaseAmount);
		updateTotalAmount();
	});

	// minus-knapp eventlyssnare
	const decreaseButtons = document.querySelectorAll('.decrease');
	decreaseButtons.forEach(btn => {
		btn.addEventListener('click', decreaseAmount);
		updateTotalAmount();
	});
	updateTotalAmount();
	printCartProducts();
}


// Varukorgen i headern (ikonen + summan)
function updateTotalAmount() {
	const totalAmountSpan = document.querySelector('#amount');
	const totalAmount = products.reduce((total, product) => total + product.amount, 0);
	totalAmountSpan.textContent = `${totalAmount}`

	// UPPDATERA PRISET ÄVEN EFTER RABATTER OCH HELGPÅSLAG HÄR
}

// printar produkterna i varukorgen (inte i headern)
function printCartProducts() {
	cartHtmlContainer.innerHTML = '';

	// rabatt/helgpåslag
	let sum = 0;
	let orderedProductAmount = 0;
	let msg = '';
	let priceIncrease = getPriceMultiplier();

	// cart
	products.forEach(product => {
		orderedProductAmount += product.amount;

		// rabatt/helgpåslag
		if (product.amount > 0) {
			let productPrice = product.price;
			if (product.amount >= 10) {
				productPrice *= 0.9;
			}
			const adjustedProductPrice = productPrice * priceIncrease;

			sum += product.amount * adjustedProductPrice;

			cartHtmlContainer.innerHTML += `
			<div class="cart-summary">
				<img src="${product.image.src}"> 
				<span class="cart-name">${product.name}</span> 
				<span class="cart-amount">${product.amount}</span> 
				<span class="cart-sum">${product.amount * adjustedProductPrice} kr</span> 
				<button id="delete-${product.productNo}" class="delete material-symbols-outlined">delete</button>
			</div>
			`;
		}
	});

	/*
	när man trycker på knappen ska varan tas bort:
	- koppla ihop knappen med produkten
	- klickevent när man trycker
	- funktion ta bort 
	*/

	// remove/delete-knapp eventlyssnare (EJ KLAR!!!)



	if (sum <= 0) {
		return;
	}

	// rabatt måndag
	if (today.getDay() === 1 && today.getHours() < 10) {
		sum += 0.9;
		msg += `<p>Måndagsrabatt: 10 % på hela beställningen</p>`
	}

	// summan i varukorgen (och meddelande om måndagsrabatt)
	cartHtmlContainer.innerHTML += `<p>Summa: ${sum} kr</p>`;
	cartHtmlContainer.innerHTML += `<div>${msg}</div`;

	// frakt i varukorgen (över 15 varor: frakt=0kr)
	if (orderedProductAmount > 15) {
		cartHtmlContainer.innerHTML += '<p>Frakt: 0 kr</p>';
	} else
		cartHtmlContainer.innerHTML += `<p>Frakt: ${Math.round(25 + (0.1 * sum))} kr</p>`;

	// fortsätt-knapp (continue)
	cartHtmlContainer.innerHTML += `<button id="continue">Fortsätt</button>`

	// fortsätt-knappen (continue) eventlyssnare
	const continueBtn = document.querySelector('#continue');
	continueBtn.addEventListener('click', confirmationPopUp);

	// delete product-knappen cart
	const deleteBtn = document.querySelectorAll('.delete');
	deleteBtn.forEach(btn => {
		btn.addEventListener('click', removeItem);
	});
}

// remove/delete-knapp cart
function removeItem(e) {
	const productNumber = Number(e.target.id.replace('delete-', ''));

	const indexInCart = cart.findIndex(product => product.productNo === productNumber);

	const indexInProducts = products.findIndex(product => product.productNo === productNumber);

	if (indexInCart > -1) {
		cart.splice(indexInCart, 1);

		products[indexInProducts].amount = 0;

		printCartProducts();
		printProducts();
	}
}

// fortsättknappen (continue) popup (SKRIV MEDDELANDE)
function confirmationPopUp(e) {
	alert('Bekräftelse');
}


// sortering efter pris (EJ KLAR!!)
function changePriceRange() {
	const currentPrice = priceRangeSlider.value;
	currentRangeValue.innerHTML = currentPrice;

	filteredProductsInPriceRange = products.filter((product) => product.price <= currentPrice);
	console.log(filteredProductsInPriceRange);
	printProducts();
}

// sortering efter namn (EJ KLAR!!)

// sortering efter kategori (EJ KLAR!!!)
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
				filteredProducts.push(prod);
			}
		}
	}
	changePriceRange();
}

for (let i = 0; i < categoryFilterRadios.length; i++) {
	categoryFilterRadios[i].addEventListener('click', updateCategoryFilter);
}

// sortering av pris (EJ KLAR!!!)
priceRangeSlider.addEventListener('input', changePriceRange);


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


// FILTER-KNAPPEN (SORTERING AV PRODUKTERNA)
const filterBtn = document.querySelector('#filterBtn');
const sortContainer = document.querySelector('#sortContainer');

filterBtn.addEventListener('click', toggleContainerOpenState);
sortContainer.addEventListener('click', toggleContainerOpenState);

function toggleContainerOpenState(e) {
	
	console.log(e);
	if (e.target.nodeName == 'INPUT') {
		return;
	}
	sortContainer.classList.toggle('open');
}



// PRODUKTERNA i array
let products = [
	{
		name: "Chokladboll - cappuccino",
		price: 10,
		rating: 4,
		category: "Coffee",
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
		rating: 5,
		category: "Chocolate",
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
		rating: 4,
		category: "Fruity",
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
		rating: 3,
		category: "Coffee",
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
		rating: 2,
		category: "Chocolate",
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
		rating: 3,
		category: "Chocolate",
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
		rating: 2,
		category: "Chocolate",
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
		rating: 1,
		category: "Chocolate",
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
		rating: 2,
		category: "Fruity",
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
		rating: 5,
		category: "Oat",
		image: {
			src: 'assets/havreboll.png',
			alt: 'light oatmeal ball covered in coconut flakes',
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

// sortering, kategori och pris
const categoryFilterRadios = document.querySelectorAll('[name="categoryFilter"]');
const priceRangeSlider = document.querySelector('#priceRange');
const currentRangeValue = document.querySelector('#currentRangeValue'); // sparad som variabel för återanvändning
// sortering namn
const ascendingRadio = document.querySelector('input[value="Ascending"]');
const descendingRadio = document.querySelector('input[value="Descending"]');
// sortering rating
const ratingRadio = document.querySelectorAll('[name="ratingFilter"]'); 

let filteredProducts = [...products]; // för kategorifiltreringen
let filteredProductsInPriceRange = [...products]; // används för att filtrera produkterna
let totalOrderSum = 0;

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

	// skriv ut baserat på prisfiltret
	filteredProductsInPriceRange.forEach((product, i) => {
		productsContainer.innerHTML += `
		<div class="product-container">
            <div id="product-${i}">
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
}

// printar produkterna i varukorgen (inte i headern)
function printCartProducts() {
	cartHtmlContainer.innerHTML = '';

	// rabatt/helgpåslag
	let sum = 0;
	let orderedProductAmount = 0;
	let msg = '';
	let priceIncrease = getPriceMultiplier();
	// långsam kund 
	let slownessTimeout = setTimeout(slowCustomerMessage, 1000 * 60 * 15);

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


	// långsam kund 
	function slowCustomerMessage() {
		if (slownessTimeout) {
			cartHtmlContainer.innerHTML = '';
			alert('Du är för långsam på att beställa!');
		}
	}


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


// sortering efter pris
function changePriceRange() {
	const currentPrice = priceRangeSlider.value; // läser av värdet i priceRangeSlidern
	currentRangeValue.innerHTML = currentPrice; // skriver ut på sidan = värdet i kronor som blir när man drar i range slidern

	// loopar igenom varje produkt och kolla att priset är mindre än eller lika som currentPrice (värdet som blir i range slidern).
	filteredProductsInPriceRange = filteredProducts.filter((product) => product.price <= currentPrice);
	printProducts();
}


// sortering efter kategori
function updateCategoryFilter(e) {
	// Hantera värdet på vald radio button
	const selectedCategory = e.currentTarget.value;

	if (selectedCategory === 'All') {
		filteredProducts = [...products];
	} else {
		// Filtrera produkter baserat på vald kategori
		filteredProducts = products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());
	}

	// Sortera produkterna efter kategori
	filteredProducts.sort((a, b) => a.category.localeCompare(b.category));

	changePriceRange();
}

// Sortering av namn

function sortProducts(order) {
    if (order === 'Ascending') {
        // Sortera produkterna i alfabetiska ordning
        filteredProductsInPriceRange.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'Descending') {
        // Sortera produkterna i omvänd alfabetisk ordning
        filteredProductsInPriceRange.sort((a, b) => b.name.localeCompare(a.name));
    }

    printProducts();
}

// Sortering av rating
function sortByRating(e) {
    const selectedRating = e.currentTarget.value;

    if (selectedRating === 'All') {
        // If "All" is selected, show all products without filtering by rating
        filteredProductsInPriceRange = [...products];
    } else {
        // Filter products based on the selected rating
        filteredProductsInPriceRange = products.filter(product => product.rating.toString() === selectedRating);

        // Sort the filtered products by rating
        filteredProductsInPriceRange.sort((a, b) => b.rating - a.rating);
    }

    // Print the updated products
    printProducts();
}

// sortering av kategori
for (let i = 0; i < categoryFilterRadios.length; i++) {
	categoryFilterRadios[i].addEventListener('click', updateCategoryFilter);
}

// sortering av pris 
priceRangeSlider.addEventListener('input', changePriceRange);


// sortering av namn
ascendingRadio.addEventListener('click', () => sortProducts('Ascending'));
descendingRadio.addEventListener('click', () => sortProducts('Descending'));

// sortering av rating
for (let i = 0; i < ratingRadio.length; i++) {
    ratingRadio[i].addEventListener('click', sortByRating);
}

printProducts();





// FAKTURA ELLER KORT

// gör till array
const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="payment-option"]'));
const inputs = [
	document.querySelector('#creditCardNumber'),
	document.querySelector('#creditCardYear'),
	document.querySelector('#creditCardMonth'),
	document.querySelector('#creditCardCvc'),
	document.querySelector('#personalId'),
];

const invoiceOption = document.querySelector('#invoice');
const cardOption = document.querySelector('#card');

// Default options
let selectedPaymentOption = 'card';

const orderBtn = document.querySelector('#orderBtn');

//REGEX
//personnummer
const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/);
// kort 
const creditCardNumberRegEx = new RegExp(/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/); // MasterCard


//Add event listeners
inputs.forEach(input => {
	input.addEventListener('focusout', activateOrderButton);
	input.addEventListener('change', activateOrderButton);
});
// loopa igenom arrayen för att lägga på ett klickevent på båda
cardInvoiceRadios.forEach(radioBtn => {
	radioBtn.addEventListener('change', switchPaymentMethod);
})


/**
 * Switches between invoice payment method 
 * and card payment method. Toggles their visibility.
 */
function switchPaymentMethod(e) {
	invoiceOption.classList.toggle('hidden'); //göm faktura
	cardOption.classList.toggle('hidden'); //göm kort

	selectedPaymentOption = e.target.value;
	console.log(selectedPaymentOption);
}

//personnummer 


function isPersonalIdNumberValid() {
	return personalIdRegEx.exec(personalId.value);
	// return early = koncept, helst avbryta funktioner så fort som möjligt (slipper köra onödig kod)
}

//kort

function activateOrderButton() {
	orderBtn.setAttribute('disabled', ''); // knappen ska vara disabled som default, och först när användaren skrivit rätt då tas attributet (disabled) bort

	if (selectedPaymentOption === 'invoice' && !isPersonalIdNumberValid()) {
		return;
	}
	if (selectedPaymentOption === 'card') {
		//check card number
		if (creditCardNumberRegEx.exec(creditCardNumber.value === null)) {
			console.log('credit card number not valid');
			return;
		}

		// check card year
		let year = Number(creditCardYear.value);
		const today = new Date();
		const shortYear = Number(String(today.getFullYear()).substring(2));
		console.log(shortYear);

		if (year > shortYear + 2 || year < shortYear) {
			console.warn('credit card year not valid');
			return;
		}

		// fixa månad. Padstart med 0.



		// Check card CVC
		if (creditCardCvc.value.length !== 3) {
			console.warn('cvc not valid.');
			return;
		}
	}
	orderBtn.removeAttribute('disabled');
}





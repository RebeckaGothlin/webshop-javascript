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
			width: 456,
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
			width: 439,
			height: 420,
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
			width: 748,
			height: 730,
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
			width: 710,
			height: 667,
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
			width: 618,
			height: 615,
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
			width: 1291,
			height: 1279,
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
			width: 501,
			height: 487,
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
			width: 455,
			height: 458,
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
			width: 713,
			height: 743,
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
			width: 1354,
			height: 1286,
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
const ascendingRadio = document.querySelector('input[value="ascending"]');
const descendingRadio = document.querySelector('input[value="descending"]');
// sortering rating
const ratingRadio = document.querySelectorAll('[name="ratingFilter"]');
const invoiceOption = document.querySelector('#invoice');
const cardOption = document.querySelector('#card');
// rabattkod
const discountCodeField = document.querySelector('#discountCode');

let filteredProducts = [...products]; // för kategorifiltreringen
let filteredProductsInPriceRange = [...products]; // används för att filtrera produkterna
let totalOrderSum = 0;
// långsam kund 
let slownessTimeout;


invoiceOption.removeAttribute('disabled');
invoiceOption.disabled = false;

// printar ut produkterna på sidan
printProducts();

discountCodeField.addEventListener('input', applyDiscount);

// minus-knappen 
function decreaseAmount(e) {
	let index = e.target.id.replace('decrease-', '');
	if (products[index].amount > 0) {
		products[index].amount -= 1;
		index = Number(index);
		cart = products.filter(product => product.amount > 0);
		totalOrderSum = cart.reduce((sum, product) => sum + product.amount * (product.discountedPrice || product.price), 0);
		printProducts();
		printCartProducts();
		updateTotalOrderAndInvoiceOption();
	}
}

// plus-knappen
function increaseAmount(e) {
	let index = e.target.id.replace('increase-', '');
	index = Number(index);
	products[index].amount += 1;

	const discountedPrice = products[index].discount ? products[index].price - (products[index].price * products[index].discount / 100) : products[index].price;
    
    products[index].discountedPrice = discountedPrice;

	cart = products.filter(product => product.amount > 0);
	totalOrderSum = cart.reduce((sum, product) => sum + product.amount * (product.discountedPrice || product.price), 0);
	printProducts();
	printCartProducts();
	resetSlowCustomerTimeout();
	updateTotalOrderAndInvoiceOption();
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

// Varukorgen i headern (ikonen + antal)
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
	// cart
	products.forEach(product => {
		orderedProductAmount += product.amount;
		// rabatt/helgpåslag
		if (product.amount > 0) {
			let productPrice = product.discountedPrice || product.price;
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
	// Om inga produkter finns i varukorgen:
	if (sum <= 0) {
		cartHtmlContainer.innerHTML = '<p>Din varukorg är tom.</p>';
		return;
	}
	// rabatt måndag
	if (today.getDay() === 1 && today.getHours() < 10) {
		sum += 0.9;
		msg += `<p>Måndagsrabatt: 10 % på hela beställningen</p>`
	}
	// summan i varukorgen 
	cartHtmlContainer.innerHTML += `<p>Summa: ${sum} kr</p>`;
	//  meddelande om måndagsrabatt i varukorgen
	cartHtmlContainer.innerHTML += `<div>${msg}</div`;

	// frakt i varukorgen (över 15 varor: frakt=0kr)
	if (orderedProductAmount > 15) {
		cartHtmlContainer.innerHTML += '<p>Frakt: 0 kr</p>';
	} else
		cartHtmlContainer.innerHTML += `<p>Frakt: ${Math.round(25 + (0.1 * sum))} kr</p>`;

	// fortsätt-knapp (continue)
	cartHtmlContainer.innerHTML += `<button class="continue-button" id="continue"><a style="text-decoration: none; href="#page3-link">Fortsätt</a></button>`

	// delete product-knappen cart
	const deleteBtn = document.querySelectorAll('.delete');
	deleteBtn.forEach(btn => {
		btn.addEventListener('click', removeItem);
	});
}

// långsam kund 
function slowCustomerMessage() {
	alert('Du är för långsam på att beställa!');
	cart = [];
	printCartProducts();
}
function resetSlowCustomerTimeout() {
	clearTimeout(slownessTimeout);
	slownessTimeout = setTimeout(slowCustomerMessage, 1000 * 60 * 15);
}

// remove product/delete-knapp cart
function removeItem(e) {
	const productNumber = Number(e.target.id.replace('delete-', ''));
	const indexInCart = cart.findIndex(product => product.productNo === productNumber);
	const indexInProducts = products.findIndex(product => product.productNo === productNumber);
	if (indexInCart > -1) {
		cart.splice(indexInCart, 1);
		products[indexInProducts].amount = 0;
		totalOrderSum = cart.reduce((sum, product) => sum + product.amount * product.price, 0);
		printCartProducts();
		printProducts();
	}
}
// fortsättknappen (continue) popup (SKRIV MEDDELANDE)
function confirmationPopUp() {
    // Lagra infon om ordern
    let orderDetails = 'Orderdetaljer:\n\n';
    // går igenom produkterna i varukorgen
    cart.forEach(product => {
        const price = product.discountedPrice || product.price;  // använd nedsatt pris om det finns
        orderDetails += `${product.name} - Antal: ${product.amount} - Pris: ${price * product.amount} kr\n Leveranstid: 2-5 arbetsdagar.`;
    });
    // beräknar och visar totala priset på ordern
    const totalOrderSum = cart.reduce((sum, product) => sum + (product.discountedPrice || product.price) * product.amount, 0);
    orderDetails += `\nSumma: ${totalOrderSum} kr`;

    // bekräftlse med modal
    const confirmationText = document.querySelector('#confirmationModal .modal-content p');
    confirmationText.textContent = orderDetails;

    // visa modal
    const confirmationModal = document.querySelector('#confirmationModal');
    confirmationModal.style.display = 'block';

	// när man klickat på ok ska modal-fönstret försvinna
    const confirmBtn = document.querySelector('#confirmationModal #confirmBtn');
    confirmBtn.addEventListener('click', () => {
        confirmationModal.style.display = 'none';
    });
}

// SORTERING AV PRODUKTERNA
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
	if (order === 'ascending') {
		// Sortera produkterna i alfabetiska ordning
		filteredProductsInPriceRange.sort((a, b) => a.name.localeCompare(b.name));
	} else if (order === 'descending') {
		// Sortera produkterna i omvänd alfabetisk ordning
		filteredProductsInPriceRange.sort((a, b) => b.name.localeCompare(a.name));
	}
	printProducts();
}

// Sortering av rating
function sortByRating(e) {
	const selectedRating = e.currentTarget.value;
	if (selectedRating === 'All') {
		// Om 'All' väljs, visa produkterna utan ratingfilter
		filteredProductsInPriceRange = [...products];
	} else {
		// Filtrera produkterna baserat på valda ratingen
		filteredProductsInPriceRange = products.filter(product => product.rating.toString() === selectedRating);
		// Sortera de filtrerade produkterna efter rating
		filteredProductsInPriceRange.sort((a, b) => b.rating - a.rating);
	}
	printProducts();
}

// sortering av kategori
for (let i = 0; i < categoryFilterRadios.length; i++) {
	categoryFilterRadios[i].addEventListener('click', updateCategoryFilter);
}

// sortering av pris 
priceRangeSlider.addEventListener('input', changePriceRange);

// sortering av namn
ascendingRadio.addEventListener('click', () => sortProducts('ascending'));
descendingRadio.addEventListener('click', () => sortProducts('descending'));

// sortering av rating
for (let i = 0; i < ratingRadio.length; i++) {
	ratingRadio[i].addEventListener('click', sortByRating);
}

// rabattkod
function applyDiscount() {
    const discountCode = discountCodeField.value.toLowerCase();

	// om koden 'rabatt' skrivs in ska rabatt ges
    if (discountCode === 'rabatt') {
        const discountPercentage = 0.10;

        cart.forEach(product => {
            const discountedPrice = product.price * (1 - discountPercentage);
            product.discountedPrice = discountedPrice;
        });

        printProducts();
        printCartProducts();
        updateTotalOrderAndInvoiceOption();

        alert('Rabatt tillämpad.');
    }
}

printProducts();


// FAKTURA ELLER KORT
const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="payment-option"]'));
const inputs = [
	document.querySelector('#creditCardNumber'),
	document.querySelector('#creditCardYear'),
	document.querySelector('#creditCardMonth'),
	document.querySelector('#creditCardCvc'),
	document.querySelector('#personalId'),
];
// Default option
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
	input.addEventListener('input', activateOrderButton);
});
// loopa igenom arrayen för att lägga på ett klickevent på båda
cardInvoiceRadios.forEach(radioBtn => {
	radioBtn.addEventListener('input', switchPaymentMethod);
})
// växlar mellan faktura- och kort-betalning. Växlar visibility.
function switchPaymentMethod(e) {
	// togglar synligheten av betalningsmetoder
	invoiceOption.classList.toggle('hidden');
	cardOption.classList.toggle('hidden');
	selectedPaymentOption = e.target.value;
}
//personnummer 
function isPersonalIdNumberValid() {
	return personalIdRegEx.exec(personalId.value);
	// return early = koncept, helst avbryta funktioner så fort som möjligt (slipper köra onödig kod)
}
//kort
function activateOrderButton() {
	// knappen ska vara disabled som default, och först när 
	// användaren skrivit rätt då tas attributet (disabled) bort
	orderBtn.setAttribute('disabled', '');
	if (selectedPaymentOption === 'invoice' && !isPersonalIdNumberValid()) {
		return;
	}
	if (selectedPaymentOption === 'card') {
		// kolla kortnumber
		if (creditCardNumberRegEx.exec(creditCardNumber.value === null)) {
			console.log('credit card number not valid');
			return;
		}
		// kolla året på kort
		let year = Number(creditCardYear.value);
		const today = new Date();
		const shortYear = Number(String(today.getFullYear()).substring(2));
		console.log(shortYear);
		if (year > shortYear + 2 || year < shortYear) {
			console.warn('credit card year not valid');
			return;
		}
		// CVC
		if (creditCardCvc.value.length !== 3) {
			console.warn('cvc not valid.');
			return;
		}
	}
	orderBtn.removeAttribute('disabled');
}


// Funktion för att uppdatera totala summan och kolla invoice option
function updateTotalOrderAndInvoiceOption() {
	totalOrderSum = cart.reduce((sum, product) => sum + product.amount * product.price, 0);
	// Inaktivera faktura om total är over 800 kr
	if (totalOrderSum > 800) {
		invoiceOption.setAttribute('disabled', 'true');
		invoiceOption.style.display = 'none'; // Hide invoice option
	} else {
		invoiceOption.removeAttribute('disabled');
		invoiceOption.style.display = 'block'; // Show invoice option
	}

	if (cart.length === 0) {
		invoiceOption.removeAttribute('disabled');
		invoiceOption.style.display = 'block';
	}

	printProducts();
	printCartProducts();
}

// KONTAKTFORMULÄR
const form = document.querySelector('#contactForm');
const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#lastname');
const address = document.querySelector('#address');
const housenumber = document.querySelector('#housenumber');
const zipcode = document.querySelector('#zipcode');
const city = document.querySelector('#city');
const phonenumber = document.querySelector('#phonenumber');
const submitBtn = document.querySelector('#submitBtn');
const resetBtn = document.querySelector('#resetBtn');
const agreementGDPRcheckbox = document.querySelector('#agreementGDPR');

const textRegex = new RegExp(/^[A-Za-zåäöÅÄÖ\s]+$/);
const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const telephoneRegex = new RegExp(/^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/);
const addressRegex = new RegExp(/^[A-Za-zåäöÅÄÖ\s]+$/);
const numberRegex = new RegExp(/^[0-9][A-Za-z0-9 -]*$/);
const zipRegex = new RegExp(/^\d{3}\s?\d{2}$/);

firstName.addEventListener('input', activateSubmitBtn);
lastName.addEventListener('input', activateSubmitBtn);
address.addEventListener('input', activateSubmitBtn);
housenumber.addEventListener('input', activateSubmitBtn);
zipcode.addEventListener('input', activateSubmitBtn);
city.addEventListener('input', activateSubmitBtn);
phonenumber.addEventListener('input', activateSubmitBtn);
agreementGDPRcheckbox.addEventListener('click', activateSubmitBtn);
resetBtn.addEventListener('click', resetFormAndCart);

// Reset-knappen för formuläret
function resetFormAndCart() {
	// Återställ/Reset formulärfälten
	form.reset();
	// Reset product amount i produktarrayen
	products.forEach(product => {
		product.amount = 0;
	});
	// Reset cart
	cart = [];
	printCartProducts();
	// Reset form validation (om det behövs)
	activateSubmitBtn();
	// Uppdatera total amount i varukorgen i headern
	updateTotalAmount();
	printProducts();
}

// validering av formulärfälten
function isFirstNameValid() {
	return textRegex.test(firstName.value);
}
function isLastNameValid() {
	return textRegex.test(lastName.value);
}
function isAddressValid() {
	return addressRegex.test(address.value);
}
function isHouseNumberValid() {
	return numberRegex.test(housenumber.value);
}
function isZipcodeValid() {
	return zipRegex.test(zipcode.value);
}
function isCityValid() {
	return textRegex.test(city.value);
}
function isPhonenumberValid() {
	return telephoneRegex.test(phonenumber.value);
}
// aktivera submit-knapp när alla fält validerade
function activateSubmitBtn() {
	let isValid = true;

	// error-meddelande
	errorMessages.forEach((error) => {
		if (error.textContent != '') {
			isValid = false;
		}
	});

	// om alla är valid ska disabled tas bort från submit-knapp
	if (
		isValid &&
		isFirstNameValid() &&
		isLastNameValid() &&
		isAddressValid() &&
		isHouseNumberValid() &&
		isZipcodeValid() &&
		isCityValid() &&
		isPhonenumberValid() &&
		agreementGDPRcheckbox.checked
	) {
		submitBtn.removeAttribute('disabled');
	} else {
		submitBtn.setAttribute('disabled', '');
	}
}

// visa error-meddelande
function displayError(inputField, errorMessage) {
    const errorElement = inputField.parentElement.querySelector('.error');
    errorElement.textContent = errorMessage;
}
const errorMessages = document.querySelectorAll('.error');

// error-meddelanden
firstName.addEventListener('input', () => {
	if (!isFirstNameValid()) {
		displayError(firstName, 'Ange giltigt förnamn.');
	} else {
		displayError(firstName, '');
	}
	activateSubmitBtn();
});
lastName.addEventListener('input', () => {
	if (!isLastNameValid()) {
		displayError(lastName, 'Ange giltigt efternamn.');
	} else {
		displayError(lastName, '');
	}
	activateSubmitBtn();
});
address.addEventListener('input', () => {
	if (!isAddressValid()) {
		displayError(address, 'Ange giltig adress.');
	} else {
		displayError(address, '');
	}
	activateSubmitBtn();
});
housenumber.addEventListener('input', () => {
	if (!isHouseNumberValid()) {
		displayError(housenumber, 'Ange giltigt husnummer.');
	} else {
		displayError(housenumber, '');
	}
	activateSubmitBtn();
});
zipcode.addEventListener('input', () => {
	if (!isZipcodeValid()) {
		displayError(zipcode, 'Ange gitligt postnummer.');
	} else {
		displayError(zipcode, '');
	}
	activateSubmitBtn();
});
city.addEventListener('input', () => {
	if (!isCityValid()) {
		displayError(city, 'Ange giltig postort.');
	} else {
		displayError(city, '');
	}
	activateSubmitBtn();
});
phonenumber.addEventListener('input', () => {
	if (!isPhonenumberValid()) {
		displayError(phonenumber, 'Ange giltigt telefonnummer.');
	} else {
		displayError(phonenumber, '');
	}
	activateSubmitBtn();
});
personalId.addEventListener('input', () => {
	if (!isPersonalIdNumberValid()) {
		displayError(personalId, 'Ange giltigt personnummer.');
	} else {
		displayError(personalId, '');
	}
	activateSubmitBtn();
});

// bekräftelse-ruta submit
submitBtn.addEventListener('click', confirmationPopUp);


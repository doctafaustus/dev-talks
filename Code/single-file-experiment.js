(function exp1(){
	console.log('exp1 active');

	// Add styles
	document.head.insertAdjacentHTML('beforeend', `<style>
		.bag-image,
		.bag-count {
			pointer-events: none;
		}

		.minicart-open .bag-section {
			padding: 12px 0 12px 16px;
	    box-shadow: 0 0 10px #d0cccc;
	    position: relative;
	    z-index: 101;
	    background-color: #fff;
		}

		.minicart-open .bag-section:after {
			height: 10px;
	    width: 100%;
	    background: #fff;
	    content: '';
	    position: absolute;
	    right: 0;
	    bottom: -10px;
		}

		#exp1-minicart {
			position: absolute;
			display: none;
			z-index: 100;
			right: 0;
			top: 72px;
			background-color: #fff;
			box-shadow: 0 0 10px #d0cccc;
			padding: 16px;
		}


		.minicart-open #exp1-minicart {
			display: block;
		}

		.minicart-title,
		.minicart-estimated-total-title {
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 10px;
		}

		.minicart-shipping {
			font-size: 15px;
			margin-bottom: 20px;
		}

		.minicart-shipping:before {
			content: '\\2713';
		  display: inline-block;
		  color: #16af00;
		  padding: 0 6px 0 0;
		  font-weight: bold;
		}

		.minicart-products {
			border-top: solid 1px #d3d3d3;
			border-bottom: solid 1px #d3d3d3;
			padding: 24px 0;
		}

		.minicart-product {
			display: grid;
			grid-template-columns: 90px auto 35px;
			grid-column-gap: 10px;
			text-align: left;
		}

		.minicart-product:not(:first-child) {
			margin-top: 10px;
		}

		.minicart-product-image {
			width: 100%;
		}

		.minicart-product-title {
			font-weight: bold;
			color: #6805fb;;
			margin-bottom: 10px;
			text-decoration: none;
			display: inline-block;
		}

		.minicart-product-size,
		.minicart-product-color {
			font-size: 14px;
			color: #808284;
			margin-bottom: 4px;
		}

		.minicart-footer {
			padding-top: 20px;
		}

		.minicart-total-row {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}

		.minicart-estimated-total-value {
			text-align: right;
			font-weight: bold;
		}

		.minicart-cart-cta {
			background-color: #6805fb;
	    display: block;
	    color: #fff;
	    text-decoration: none;
	    padding: 12px 0;
	    font-weight: bold;
	    letter-spacing: 0.5px;
		}

			.minicart-cart-cta:hover {
				background-color: #781eff;
			}
	</style>`);

	// Build minicart HTML
	function buildMinicartHTML(localStorageCart) {
		document.querySelector('.header-right').insertAdjacentHTML('beforeend', `
			<div id="exp1-minicart">
				<div class="minicart-header">
					<div class="minicart-title">Order Summary</div>
					<div class="minicart-shipping">
						Your order qualifies for FREE shipping!
					</div>
				</div>

				<ul class="minicart-products">
					${ 
						localStorageCart.reverse().map(item => {
							return `
								<li class="minicart-product">
									<a class="minicart-product-link" href="/item/${item.productID}">
										<img class="minicart-product-image" src="${item.image}">
									</a>

									<div class="minicart-product-details">
										<a class="minicart-product-title" href="/item/${item.productID}">${item.title}</a>
										<div class="minicart-product-size">
											<span>Size:</span> <span class="minicart-product-size-value">${item.size}</span>
										</div>
										<div class="minicart-product-color">
											<span>Color:</span> <span class="minicart-product-color-value">${item.color}</span>
										</div>
									</div>

									<div class="minicart-product-price">$${item.price}</div>
								</li>
							`;
						}).join('') 
					}
				</ul>

				<div class="minicart-footer">
					<div class="minicart-total-row">
						<div class="minicart-estimated-total-title">Estimated Total</div>
						<div class="minicart-estimated-total-value">$${getTotal(localStorageCart)}</div>
					</div>
					<a class="minicart-cart-cta" href="/cart">Checkout</a>
				</div>
			</div>
		`);
	}

	// Get cart data from localStorage
	function generateMinicart() {
		const localStorageCart = localStorage.cart && JSON.parse(localStorage.cart);

		if (!localStorageCart) return console.log('No items in cart');
		else {
			buildMinicartHTML(localStorageCart);
			bindHover();
		}
	}

	function getTotal(localStorageCart) {
		return localStorageCart.reduce((sum, item) => sum + item.price, 0);
	}

	// Add minicart hover events
	function bindHover() {
		const bagSection = document.querySelector('.header-right');

		bagSection.addEventListener('mouseenter', toggleMinicart.bind(null, 'add'));
		bagSection.addEventListener('mouseleave', toggleMinicart.bind(null, 'remove'));

		function toggleMinicart(method) {
			bagSection.classList[method]('minicart-open');
		}
	}

	// Remove existing minicart and rebuild
	function regenerateMinicart() {
		const minicart = document.querySelector('#exp1-minicart');
		if (minicart) minicart.remove();

		generateMinicart();
	}


	// Initialize
	optimizely.get('utils').waitForElement('.header-right').then(generateMinicart);
	document.addEventListener('cart-update', regenerateMinicart);
})();

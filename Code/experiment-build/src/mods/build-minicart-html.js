import getTotal from '@/mods/get-total.js';

// Build minicart HTML
export default function buildMinicartHTML(localStorageCart) {
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

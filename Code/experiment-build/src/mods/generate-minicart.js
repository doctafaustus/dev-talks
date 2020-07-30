import buildMinicartHTML from '@/mods/build-minicart-html.js';
import bindHover from '@/mods/bind-hover.js';

// Get cart data from localStorage
export default function generateMinicart() {
  const localStorageCart = localStorage.cart && JSON.parse(localStorage.cart);

  if (!localStorageCart) return console.log('No items in cart');
  else {
    buildMinicartHTML(localStorageCart);
    bindHover();
  }
}

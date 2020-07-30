// CSS
import css from '@/styles/v1.scss';

// Mods
import generateMinicart from '@/mods/generate-minicart.js';
import regenerateMinicart from '@/mods/regenerate-minicart.js';


// Add styles
document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

// Initialize
console.log('exp1 active');
optimizely.get('utils').waitForElement('.header-right').then(generateMinicart);
document.addEventListener('cart-update', regenerateMinicart);

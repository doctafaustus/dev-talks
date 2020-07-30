import generateMinicart from '@/mods/generate-minicart.js';

// Remove existing minicart and rebuild
export default function regenerateMinicart() {
  const minicart = document.querySelector('#exp1-minicart');
  if (minicart) minicart.remove();

  generateMinicart();
}

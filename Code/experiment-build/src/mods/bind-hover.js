// Add minicart hover events
export default function bindHover() {
  const bagSection = document.querySelector('.header-right');

  bagSection.addEventListener('mouseenter', toggleMinicart.bind(null, 'add'));
  bagSection.addEventListener('mouseleave', toggleMinicart.bind(null, 'remove'));

  function toggleMinicart(method) {
    bagSection.classList[method]('minicart-open');
  }
}
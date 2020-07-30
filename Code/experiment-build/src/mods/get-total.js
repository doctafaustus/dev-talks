export default function getTotal(localStorageCart) {
  return localStorageCart.reduce((sum, item) => sum + item.price, 0);
}
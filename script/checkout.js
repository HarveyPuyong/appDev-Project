// checkout.js
let checkout = localStorage.getItem('checkout');
if (checkout) {
  checkout = JSON.parse(checkout);
} else {
  checkout = [];
}
console.log(checkout);
export { checkout };


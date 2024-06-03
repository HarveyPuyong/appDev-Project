import { cart, saveToStorage } from "../data/addedCart.js";
import { updateCartSummary } from "../script/cart.js";

// Update cart item quantity
function updateCartItemQuantity(bikeId, quantity) {
  const bikeInCart = cart.find(bike => bike.bikeId === bikeId);
  if (bikeInCart) {
    bikeInCart.bikeQuantity = quantity;
    saveToStorage();
  }
  updateCartSummary();
}

//button and price//
export function PriceAndButton() {
  const allBtnMinus = document.querySelectorAll('.btn-minus');
  const allBtnPlus = document.querySelectorAll('.btn-plus');
  const allInputQuantity = document.querySelectorAll('.input-quantity');

  allBtnMinus.forEach((btnMinus, index) => {
    btnMinus.addEventListener('click', () => {
      const bikeId = btnMinus.dataset.bikeId;
      const bikePriceStr = document.querySelector(`.bike-price-${bikeId}`).innerHTML;
      const bikePrice = parseInt(bikePriceStr.replace(/,/g, ''), 10);

      let currentValue = parseInt(allInputQuantity[index].value);
      if (currentValue > 0) {
        currentValue = allInputQuantity[index].value = currentValue - 1;
        updateCartItemQuantity(bikeId, currentValue);
      }

      document.querySelector(`.total-price-${bikeId}`).innerHTML = (bikePrice * currentValue).toLocaleString();
    });
  });

  allBtnPlus.forEach((btnPlus, index) => {
    btnPlus.addEventListener('click', () => {
      const bikeId = btnPlus.dataset.bikeId;
      const bikePriceStr = document.querySelector(`.bike-price-${bikeId}`).innerHTML;
      const bikePrice = parseInt(bikePriceStr.replace(/,/g, ''), 10);

      let currentValue = parseInt(allInputQuantity[index].value);
      currentValue = allInputQuantity[index].value = currentValue + 1;
      updateCartItemQuantity(bikeId, currentValue);

      document.querySelector(`.total-price-${bikeId}`).innerHTML = (bikePrice * currentValue).toLocaleString();
    });
  });

  allInputQuantity.forEach((input) => {
    input.addEventListener('input', (event) => {
      event.target.value = event.target.value.replace(/\D/g, '');
    });
    input.addEventListener('keydown', (event) => {
      if (event.target.value.length === 0 && event.key === 'Backspace') {
        event.preventDefault();
      }
    });

    input.addEventListener('change', (event) => {
      const bikeId = input.dataset.bikeId;
      const bikePriceStr = document.querySelector(`.bike-price-${bikeId}`).innerHTML;
      const bikePrice = parseInt(bikePriceStr.replace(/,/g, ''), 10);
      let currentValue = parseInt(input.value);
      updateCartItemQuantity(bikeId, currentValue);

      document.querySelector(`.total-price-${bikeId}`).innerHTML = (bikePrice * currentValue).toLocaleString();
    });
  });
}

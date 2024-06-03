// cart.js
import { bikes } from "../data/bikesData.js"; 
import { cart, removeFromCart, updateCartQuantity, saveToStorage } from "../data/addedCart.js";
import { PriceAndButton } from "../data/cart calculate price.js";
import { checkout } from "./checkout.js";

// Function to update the cart summary and total price
function updateCartSummary(){
  let cartSummaryHTML = '';
  let totalPriceOfAllBikes = 0;

  cart.forEach((bikeAdded) => {
    let bikeId = bikeAdded.bikeId;
    let matchingBike = bikes.find(bike => bike.id === bikeId);

    if (matchingBike) {
      let bikePrice = parseInt(matchingBike.price.replace(/,/g, ''), 10);
      let totalBikePrice = bikePrice * bikeAdded.bikeQuantity;
      totalPriceOfAllBikes += totalBikePrice;
      console.log(matchingBike.price)
      cartSummaryHTML += `
        <tr class="js-cart-bike-main-container-${matchingBike.id}">
          <td class="bike-container">
            <div class="delete-button-container">
              <button style="border:none;" class="delete-button js-delete-button" data-bike-id="${matchingBike.id}">
                <img class="delete-icon" src="images and icon/cart icon and image/cross icon.png" alt="Cross Icon"> 
              </button>
            </div>
            <div class="bike-image">
              <img class="bike-image" src="${matchingBike.image}">
            </div>
            <div class="bike-details">
              <div>Name: ${matchingBike.name}</div>
              <div>Color: ${matchingBike.color}</div>
              <div>Type: ${matchingBike.type}</div>
            </div>
          </td>
          <td>&#8369;<span class="bike-price-${matchingBike.id}">${matchingBike.price}</span></td>
          <td style="width:15%; min-width:3.3rem">
            <div class="quantity-container">
              <input class="input-quantity" type="text" value="${bikeAdded.bikeQuantity}" data-bike-id="${matchingBike.id}">
              <button class="btn-minus" data-bike-id="${matchingBike.id}"><img src="images and icon/cart icon and image/minus button.svg"></button>
              <button class="btn-plus" data-bike-id="${matchingBike.id}"><img src="images and icon/cart icon and image/plus button.svg"></button>
            </div>
          </td>
          <td>&#8369;<span class="total-price-${matchingBike.id} bike-total">${totalBikePrice.toLocaleString()}</span></td>
        </tr>
      `;
    }
  });
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Re-add event listeners for the new buttons
  subtotalHTML(totalPriceOfAllBikes)
  addDeleteButtonListeners();
  PriceAndButton();
  exitButton()
  goToCheckoutPage()
  goToViewOrdersPage()
}

// Initialize the cart summary on page load
document.addEventListener('DOMContentLoaded', updateCartSummary);

// Re-add event listeners for delete buttons
function addDeleteButtonListeners() {
  document.querySelectorAll('.js-delete-button').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const bikeId = deleteButton.dataset.bikeId;

      removeFromCart(bikeId);
      updateCartSummary(); // Update cart summary after deletion
    });
  });
}

function subtotalHTML(totalPriceOfAllBikes) {
  let subtotalHTML = `
    <div class="subtotal-section">
    <div class="subtotal-container">
      <div class="subtotal-text">SUBTOTAL</div>
      <div class="subtotal">&#8369;<span class="all-subtotal">${totalPriceOfAllBikes.toLocaleString()}</span></div>
    </div>
    <div class="note">Shipping & taxes calculated at checkout</div>
    <div class="checkout-button-container">
      <button class="checkout-button js-checkout-button">PROCEED TO CHECKOUT</button>
    </div>
  </div>

  <div class="view-orders-button-container">
    <button class="view-orders-button js-view-orders-button" data-subtotal="${totalPriceOfAllBikes}">
      View Orders
    </button>
  </div>
  `;

  document.querySelector('.subtotal-and-view-order-section').innerHTML = subtotalHTML;
}

// Go to checkout page
function goToCheckoutPage(){
  document.querySelector('.js-checkout-button').addEventListener('click', () => {
    // Create an empty array to store checkout items
    let checkoutItems = [];

    // Iterate over each matching bike in the cart summary
    cart.forEach((bikeAdded) => {
      let bikeId = bikeAdded.bikeId;
      let matchingBike = bikes.find(bike => bike.id === bikeId);

      if (matchingBike) {
        // Check if the quantity is greater than zero
        if (bikeAdded.bikeQuantity > 0) {
          // Calculate total price for the bike
          let bikePrice = parseInt(matchingBike.price.replace(/,/g, ''), 10);
          let totalBikePrice = bikePrice * bikeAdded.bikeQuantity;

          // Create an object with required information including total price
          let checkoutItem = {
            id: matchingBike.id,
            name: matchingBike.name,
            price: matchingBike.price, // Original price
            totalPrice: totalBikePrice, // Total price for the bike
            color: matchingBike.color,
            type: matchingBike.type,
            image: matchingBike.image,
            quantity: bikeAdded.bikeQuantity
          };
          console.log(typeof totalPrice);

          // Add the object to the checkoutItems array
          checkoutItems.push(checkoutItem);
        }
      }
    });

    // Save the checkoutItems array to local storage
    localStorage.setItem('checkout', JSON.stringify(checkoutItems));

    // Redirect to the checkout page
    window.location.href = 'login form.html';
  });
}


// Go to view order
function goToViewOrdersPage(){
  document.querySelector('.js-view-orders-button').addEventListener('click', () => {
    window.location.href = './order.html';
  });
}

// Add event listener for the exit button
function exitButton(){
  const exitButton = document.querySelector(".exit-button");
  exitButton.addEventListener("click", function() {
    window.history.back();
  });
};

console.log(cart);

export { updateCartSummary, checkout };

import { bikes } from "../data/bikesData.js";
import {cart, addToCart} from '../data/addedCart.js'
import { moreBikeDetail } from "./more-bike-detail.js";
import { checkout } from "./checkout.js";

// ALL ADDED BIKE IN BIKE SHOP SECTION //
let bikesHTML='';

bikes.forEach((bike)=>{
  bikesHTML +=`
  <div class="bike-container ${bike.type}" data-bike-id="${bike.id}" data-bike-image="${bike.image}" data-bike-name="${bike.name}" data-bike-price="${bike.price}" data-bike-type="${bike.type}" 
  data-bike-color="${bike.color}" data-bike-quantity="${bike.quantity}"
  data-bike-components="${bike.components}">
    <div class="bike-image">
      <img src="${bike.image}">
    </div>
    <div class="bike-name">${bike.name}</div>       
    <div class="bike-price"> &#8369;${bike.price}</div>
    <div class="order-button-and-cart">
      <div class="order-button-container" >
        <button class="order-buttons js-order-buttons" 
        data-bike-id="${bike.id}"
        data-bike-type="${bike.type}"
        data-bike-name="${bike.name}"
        data-bike-price="${bike.price}"
        data-bike-color="${bike.color}"
        data-bike-image="${bike.image}">Buy now</button>
      </div>
      <p class="added-in-cart-text">added in cart</p>
      <div class="mini-cart-container">
          <button class="add-to-cart-button js-add-to-cart-button"
            data-bike-id="${bike.id}"
            data-bike-type="${bike.type}"
            data-bike-name="${bike.name}"
            data-bike-price="${bike.price}"
            data-bike-color="${bike.color}">
            <img src="body and header/logo and cart/cart icon.png">
          </button>
      </div>        
    </div>
  </div>
  `
});
document.querySelector('.js-bikes-shop-section').innerHTML = bikesHTML;

// SHOW MORE DETAIL OF BIKE WHEN CLICK THE BIKE
moreBikeDetail(orderButton, addToCart, cart);


//---------SELECT BIKE-TYPE FUNCTIONALITY-------//
   // Retrieve ang selected option from localStorage
  const selectedOption = localStorage.getItem('selectedOption');
  if (selectedOption) {
    document.querySelector('.select-bike-type').value = selectedOption;
    filterBikeContainers(selectedOption);
  }
document.querySelector('.select-bike-type').addEventListener('change', (event) => {
  const selectedType = event.target.value;
   // save ang selected option to localStorage//
  localStorage.setItem('selectedOption', selectedType);
  filterBikeContainers(selectedType);
});

function filterBikeContainers(selectedType) {
  const bikeShopSection = document.querySelector('.bikes-shop-section')
  const bikeMoreDetail = document.querySelector('.bike-more-detail-section')
  const bikeContainers = document.querySelectorAll('.bike-container');
  bikeContainers.forEach((container) => {
    if (selectedType === 'all' || container.classList.contains(selectedType)) {
      bikeShopSection.style.display = 'flex';
      bikeMoreDetail.style.display = 'none';
      container.style.display = 'flex';
    } else {
      container.style.display = 'none';
    }
  });
}

// ----------- ORDER and ADD TO CART BUTTON--------//

//order button//
function orderButton(){
  document.querySelectorAll('.js-order-buttons').forEach((button)=>{
    button.addEventListener('click', ()=>{
      const bikeId = button.dataset.bikeId;
      const bikeType = button.dataset.bikeType
      const bikeName =  button.dataset.bikeName;
      const bikePrice =  button.dataset.bikePrice;
      const bikeColor =  button.dataset.bikeColor;
      const bikeImage = button.dataset.bikeImage;
      
      // Convert the bikePrice string to an integer
      const bikePriceNumber = parseInt(bikePrice.replace(/,/g, ''), 10);

      let checkoutAdded = [
        {
          id:bikeId,
          name:bikeName,
          type:bikeType,
          image:bikeImage,
          color:bikeColor,
          quantity:"1",
          totalPrice: bikePriceNumber
        },
      ]
      localStorage.setItem('checkout', JSON.stringify(checkoutAdded));
      window.location.href = 'checkout.html'
    })
  })
}


//add to cart button//
document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const bikeId = button.dataset.bikeId;
    const bikeType = button.dataset.bikeType
    const bikeName =  button.dataset.bikeName;
    const bikePrice =  button.dataset.bikePrice;
    addToCart(bikeId, bikeType, bikeName, bikePrice);
    cartQuantity();
    displayAddedCartText(button);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  updateCartQuantity();
});

// Update cart quantity and save to localStorage
function cartQuantity(){
  let cartQuantity = 0;

  cart.forEach((bike) => {
    cartQuantity += bike.bikeQuantity;
  });

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  localStorage.setItem('cartQuantity', cartQuantity); // Save to localStorage
}

// Retrieve and display cart quantity from localStorage
function updateCartQuantity() {
  const savedCartQuantity = localStorage.getItem('cartQuantity');
  if (savedCartQuantity) {
    document.querySelector('.cart-quantity').innerHTML = savedCartQuantity;
  }
}
function displayAddedCartText(button){
  const addedInCartText = button.closest('.order-button-and-cart').querySelector('.added-in-cart-text');
    addedInCartText.style.opacity = '0';
    addedInCartText.classList.remove('hide');
    addedInCartText.classList.add('show'); 

    void addedInCartText.offsetWidth;
    addedInCartText.style.opacity = '1';
    if (addedInCartText.timeout) {
        clearTimeout(addedInCartText.timeout);
    }
    addedInCartText.timeout = setTimeout(() => {
        addedInCartText.style.opacity = '0';
        addedInCartText.classList.remove('show');
        addedInCartText.classList.add('hide');
    }, 2000);
}




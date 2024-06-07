export function moreBikeDetail(orderButton, addToCart, cart){
  const bikeShopSection =  document.querySelector('.bikes-shop-section');
 const bikeMoreDetail =  document.querySelector('.bike-more-detail-section');

  document.querySelectorAll('.bike-container').forEach((bike)=>{
    bike.addEventListener('click', (event)=>{
      if (!event.target.closest('.js-add-to-cart-button') && !event.target.closest('.js-order-buttons')){ // Check if the click target or its parent is the cart-button
        bikeMoreDetail.style.display = 'inherit';
        bikeShopSection.style.display = 'none';
      }
      const bikeId = bike.dataset.bikeId;
      const bikeType = bike.dataset.bikeType
      const bikeName = bike.dataset.bikeName;
      const bikeImage = bike.dataset.bikeImage;
      const bikeColor = bike.dataset.bikeColor;
      const bikePrice = bike.dataset.bikePrice;
      const bikeQuantity = bike.dataset.bikeQuantity;
      const bikeComponents = bike.dataset.bikeComponents;
  
      const bikeMoreDetailHTML = `
      <div class="bike-image-and-detail-container">
      <div class="bike-image">
        <img style=" height:100%;border-radius: 3px;" src="${bikeImage}">
      </div>
      <div class="bike-detail">
        <div>
          <div class="bike-name">${bikeName}</div>
          <div class="bike-price">&#8369;${bikePrice}</div>
        </div>
  
        <div>
          <div class="bike-size-and-available-container">
            <div>
              Color:
              <div class="size">${bikeColor}</div>
            </div>          
            <div>
              Available item:
              <div class="available-bike">${bikeQuantity}</div>
            </div>
          </div>
          <div class="order-and-cart-button-container">
            <div class="quantity-container">              
              <img src="images and icon/cart icon and image/minus button.svg" alt="" class="minus-button js-minus-button">
              <input type="text" value="1" class="input-quantity" style="height:90%; text-align: center;">
              <img src="images and icon/cart icon and image/plus button.svg" alt="" class="plus-button js-plus-button">
            </div>
            <div class="order-button-container">
              <button class="order-button js-order-buttons"
                data-bike-id="${bikeId}"
                data-bike-type="${bikeType}"
                data-bike-name="${bikeName}"
                data-bike-price="${bikePrice}"
                data-bike-color="${bikeColor}"
                data-bike-image="${bikeImage}">
                Buy now
              </button>
            </div>
            <div class="cart-button-container">
              <button class="cart-button js-add-to-carts-button"
                data-bike-id="${bikeId}"
                data-bike-type="${bikeType}"
                data-bike-name="${bikeName}"
                data-bike-price="${bikePrice}"><img class="cart-image" src="body and header/logo and cart/cart icon.png" alt="">
              </button>
            </div>
          </div>
         </div>   
      </div>
    </div>
    
    <div class="bike-components-container">
      Components
      <div class="components-list">
        <ul>
          <li>Frame:Desribe the material(aluminum, carbon fiber steel, titanium),frame geomerty</li>
          <li>Color:Describe the color</li>
          <li>Wheel:Mention the size, tread pattern and wheater they're tubeless or not</li>
          <li>Tires:Specify the tire size, thread pattern, and wheater they're tubless-ready or not</li>
          <li>Fork:Highlight the type of suspension()if applicable), travel distance and any adjustment available</li>
          <li>Drivetrain: Include details about the number of gears, brand of components and type gearing system</li>
          <li>Brakes:Specify wheater they're rim breaks or disc brakes, brand and type</li>
          <li>Saddle:Mention the brand,type and any special features like gel padding of ergonomic design</li>

        </ul>
      </div>
    </div>
    <div class="user-might-also-like">
    </div>`
    document.querySelector('.bike-more-detail-section').innerHTML = bikeMoreDetailHTML;
    
    // call function of order button//
    orderButton()
    //add to cart button//
document.querySelectorAll('.js-add-to-carts-button').forEach((buttons) => {
  buttons.addEventListener('click', () => {
    console.log('hello');
    const bikeId = buttons.dataset.bikeId;
    const bikeType = buttons.dataset.bikeType
    const bikeName =  buttons.dataset.bikeName;
    const bikePrice =  buttons.dataset.bikePrice;
    addToCart(bikeId, bikeType, bikeName, bikePrice);
    cartQuantity();
  });
});

function cartQuantity(){
  let cartQuantity = 0;

    cart.forEach((bike) => {
    cartQuantity += bike.bikeQuantity;
  })

  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}
     // minus and plus button functionality//
      const allMinusButton = document.querySelectorAll('.js-minus-button');
      const allPlusButton = document.querySelectorAll('.js-plus-button');
      const allInputQuantity = document.querySelectorAll('.input-quantity');
  
      allMinusButton.forEach((minusButton, index) => {
        minusButton.addEventListener('click', () => {
          let currentValue = parseInt(allInputQuantity[index].value);
          if (currentValue > 0) {
            allInputQuantity[index].value = currentValue - 1;
          }
        });
      });
      allPlusButton.forEach((plusButton, index) => {
        plusButton.addEventListener('click', () => {
          let currentValue = parseInt(allInputQuantity[index].value);
          allInputQuantity[index].value = currentValue + 1;
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
      });
    });
  });
  }
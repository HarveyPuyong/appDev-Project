let cart = JSON.parse(localStorage.getItem('cart'))
if(!cart){
  cart = [{
    bikeId: '6',
    bikeQuantity: 2 ,
   }, {
    bikeId: '2',
    bikeQuantity: 1 ,
   }]  
}

 function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
 }

 function addToCart(bikeId, bikeType, bikeName, bikePrice){
  let matchingBike;
  cart.forEach((bike) => {
    if(bikeId === bike.bikeId){
      matchingBike = bike;
    }
  });

  if(matchingBike){
    matchingBike.bikeQuantity += 1;
  } else {
    cart.push({
      bikeId: bikeId,
      bikeType: bikeType,
      bikeName: bikeName,
      bikePrice: bikePrice,
      bikeQuantity: 1,
    });
  }

  saveToStorage();
  updateCartQuantity(); // Update cart quantity
}

// Remove from cart function with cart quantity update
function removeFromCart(bikeId){
  let newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.bikeId !== bikeId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
  updateCartQuantity(); // Update cart quantity
}

// Update cart quantity and save to localStorage
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((bike) => {
    cartQuantity += bike.bikeQuantity;
  });
  localStorage.setItem('cartQuantity', cartQuantity); // Save to localStorage
}
export { cart, addToCart, removeFromCart, updateCartQuantity 
  , saveToStorage
}
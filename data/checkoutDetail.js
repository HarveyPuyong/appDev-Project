import { checkout } from "../script/checkout.js";

let checkoutSummaryHTML = ``;
let subTotal = 0; // Initialize subtotal variable
console.log(checkout.totalPrice)

checkout.forEach((bikeChekoutAdded) =>{
   checkoutSummaryHTML += `
   <div class="order-summary">
   <div class="order-detail">
     <div class="order-image"><img class="image" src="${bikeChekoutAdded.image}"></div>
     <div>
       <div>${bikeChekoutAdded.name}</div>
       <div>${bikeChekoutAdded.color}</div>
       <div>Qty: ${bikeChekoutAdded.quantity}</div>
       <div>${bikeChekoutAdded.type}</div>
     </div>
   </div>
   <div class="order-price"> &#8369;${bikeChekoutAdded.totalPrice.toLocaleString()}</div>
   </div>
   </div>
`;


   // Add totalPrice to subTotal
   subTotal += bikeChekoutAdded.totalPrice;
});


// Set inner HTML of order-summary-section
document.querySelector('.checkout-container').innerHTML = checkoutSummaryHTML;
document.querySelector('.subtotal-price').innerHTML = subTotal.toLocaleString();


const pickerInformation = document.querySelector('.picker-information-container');
const deliveryAdress = document.querySelector('.delivery-adress-container');

document.querySelector('#deliver-method').addEventListener('click',()=>{
  pickerInformation.style.display = 'none';
  deliveryAdress.style.display = 'inherit'
})
document.querySelector('#pickup-method').addEventListener('click',()=>{
  deliveryAdress.style.display = 'none';
  pickerInformation.style.display = 'inherit';
})

// continue browsing button
document.querySelector('.exit-button').addEventListener('click', ()=>{
  window.location.href = 'shop.html';
})

// submit-button
// const submitButton = document.querySelector('.submit-button').addEventListener('click', ()=>{
//   window.location.href = 'order.html'
// })

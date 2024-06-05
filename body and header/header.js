document.addEventListener("DOMContentLoaded", function() {
  const cartButton = document.querySelector(".cart-button");
  cartButton.addEventListener("click", function() {
    window.location.href = "cart.html";
  });
});


window.addEventListener('scroll',()=>{
  let header = document.querySelector('header');
  let navContainer = document.querySelector('.nav-container');
  let logo = document.querySelector('.logo-container');
  let cart  = document.querySelector('.cart-container');
  let cartIcon = document.querySelector('.cart-icon');
  let navigation1 = document.querySelector('.home-navigation');
  let navigation2 = document.querySelector('.shop-navigation');
  let navigation3 = document.querySelector('.contact-navigation');
  let navigation4 = document.querySelector('.about-navigation');
  let cartQuantity = document.querySelector('.cart-quantity');

  if (window.scrollY > 10) {
    header.style.backgroundColor='rgb(240, 240, 240)'
    header.style.opacity='0.9'
    header.style.position = "sticky";
    header.style.top = "0";
    header.style.gap = "9%";
    header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.426)';
    navContainer.style.display = 'flex';
    logo.style.width = 'clamp(1.9rem, 9.7vw, 6.6rem)';
    cart.style.width = 'clamp(1.2rem, 3.8vw, 2.5rem)';
    cartQuantity.style.fontSize= "clamp(7px, 1.5vw, 0.9rem)";
    cartQuantity.style.top='10%'
    navigation1.style.fontSize= "clamp(5px, 1.5vw, 1rem)";
    navigation2.style.fontSize= "clamp(5px, 1.5vw, 1rem)";
    navigation3.style.fontSize= "clamp(5px, 1.5vw, 1rem)";
    navigation4.style.fontSize= "clamp(5px, 1.5vw, 1rem)";
  } 
  else {
    header.style.border = 'none';
    header.style.borderBottom='1px solid rgba(0, 0, 0, 0.426)';
    header.style.backgroundColor='white';
    header.style.opacity='1';
    header.style.gap = "7%";
    header.style.width = '100%';
    header.style.position = 'static';
    navContainer.style.display = 'flex';
    logo.style.width = 'clamp(4.2rem, 14.7vw, 10.5rem)';
    cart.style.width = 'clamp(1.5rem, 4.250vw, 3.2rem)';
    cartQuantity.style.fontSize= "clamp(12px, 1.9vw, 1.2rem)";
    cartQuantity.style.top='0%'
    navigation1.style.fontSize= "clamp(8px, 1.7vw, 1.2rem)";
    navigation2.style.fontSize= "clamp(8px, 1.7vw, 1.2rem)";
    navigation3.style.fontSize= "clamp(8px, 1.7vw, 1.2rem)";
    navigation4.style.fontSize= "clamp(8px, 1.7vw, 1.2rem)";
  }
});



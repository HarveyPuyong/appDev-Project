function handleAnimation(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-slide');
    } else {
      entry.target.classList.remove('animate-slide');
    }
  });
}
const itemsToAnimate = document.querySelectorAll('.new-arrival-item .items-container');
const observer = new IntersectionObserver(handleAnimation, { threshold: 0.3 });

itemsToAnimate.forEach(item => {
  observer.observe(item);
});


// view in shop button
let button = document.querySelector('.view-shop-button').addEventListener('click', ()=>{
  window.location.href = 'shop.html';
});
"use strict";

////////swiper deisgn
var swiper = new Swiper('.swiper', {
  slidesPerView: 6,
  slidesPerGroup: 2,
  grid: {
    column: 3
  },
  autoplay: {
    delay: 2500
  },
  loop: true,
  speed: 300,
  spaceBetween: 50
});
/*const swiper2 = document.querySelector('.swiper').swiper;
swiper2.slideNext();*/
////////curosr deisgn

/*const cursorSmall = document.querySelector('.small');
const cursorBig = document.querySelector('.big');

const positionElement = (e) =>{
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  
  cursorSmall.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
  
  cursorBig.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
}
window.addEventListener('mousemove', positionElement);*/

var heads = document.querySelectorAll('.head');
var headOt8 = document.querySelector('#head9');
var memberImgAll = document.querySelectorAll('.per-member');
heads.forEach(function (head, i) {
  head.addEventListener('click', function (e) {
    var arrow = e.target.nextElementSibling.children[1];
    var memberImg = e.target.nextElementSibling.children[0];

    if (headOt8.classList.contains('active') && e.target.getAttribute('id') != 'head9') {
      //點擊到的不是headOt8 且 headOt8已active時，清除headOt8的active
      console.log('選到個人！');
      headOt8.classList.remove('active'); //<----這句沒反應
    }

    if (e.target.getAttribute('id') === 'head9' && !e.target.classList.contains('active')) {
      //點擊到的是headOt8 且 點擊到的元素未包含active時，清除所有按鈕的active，再幫點到的該元素加上active
      console.log('選到團體變成紫！');
      memberImgAll.forEach(function (item) {
        item.classList.remove('active');
      });
      memberImgAll[i].classList.toggle('active');
      headOt8.classList.toggle('active');
    } else {
      console.log('toggle！');
      memberImgAll[i].classList.toggle('active');
    }

    console.log(e.target.getAttribute('id'));
  });
});
//# sourceMappingURL=all.js.map

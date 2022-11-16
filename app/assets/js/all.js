////////swiper deisgn
const swiper = new Swiper('.swiper', {
  slidesPerView:6,
  slidesPerGroup:2,
  grid: {
    column: 3,
  },
  autoplay: {
    delay: 2500,
  },
  loop: true,
  speed: 300,
  spaceBetween: 50,
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

const heads = document.querySelectorAll('.head');
const headOt8 = document.querySelector('#head9');
const memberImgAll = document.querySelectorAll('.per-member');

heads.forEach((head) => {
  head.addEventListener('click', (e) => {
    
    const arrow = e.target.nextElementSibling.children[1];
    const memberImg = e.target.nextElementSibling.children[0];
    if (headOt8.classList.contains('active') && e.target.getAttribute('id')!='head9') {
      //點擊到的不是headOt8 且 headOt8已active時，清除headOt8的active
      headOt8.classList.remove('active');
      console.log('選到個人！');
    } else if(e.target.getAttribute('id')==='head9'&& !e.target.classList.contains('active')){
       //點擊到的是headOt8 且 點擊到的元素未包含active時，清除所有按鈕的active，再幫點到的該元素加上active
      memberImgAll.forEach(item=>{item.classList.remove('active')});
      e.target.classList.add('active');
      console.log('選到團體！');
    }else{
        e.target.classList.toggle('active');
        console.log('toggle！');
    }
    console.log(e.target.getAttribute('id'));
  })
})



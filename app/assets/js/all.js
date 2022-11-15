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
    if (e.target.checked && e.target.getAttribute('id')!='head9') {
      arrow.classList.add('arr-active');
      memberImg.classList.add('active');
    } else if(e.target.getAttribute('id')==='head9'){
      console.log('選到全員！');
      memberImgAll.forEach(item=>{item.classList.remove('active')});
      memberImg.classList.toggle('active'); 
    }else{
        arrow.classList.remove('arr-active');
        memberImg.classList.remove('active');
    }
    console.log(e.target.getAttribute('id'));
    console.log(memberImgAll);
  })
})



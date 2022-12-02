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


//按鈕邏輯區-start
const heads = document.querySelectorAll('.head');
const headOt8 = document.querySelector('#head9');
const memberImgAll = document.querySelectorAll('.member-img');

heads.forEach((head, i) =>{
  head.addEventListener('click', (e) =>{
    const clickedId = e.target.getAttribute('id') //點擊到元素的id
    const clicked = document.getElementById(`${clickedId}`); //該id的dom元素
    if(clickedId!="head9" && headOt8.nextElementSibling.classList.contains('active')){
      headOt8.nextElementSibling.classList.remove('active'); //清9留個人：如果點到的不是9號按鈕，且，9號按鈕子層元素的class有紫邊的話，將9號按鈕的紫邊移除。
    }
    if(clickedId ==="head9" && !clicked.nextElementSibling.classList.contains('active')){
       memberImgAll.forEach(el =>{
        el.classList.remove('active');
      })
      headOt8.nextElementSibling.classList.add('active');//清個人留9：如果點到的是9號按鈕，且，9號按鈕子層元素沒有紫邊的話，先將1-8號的紫邊移除，再幫9號加上紫邊。
    }
    else{
    memberImgAll[i].classList.toggle('active'); } //其他狀況：個別獨立toggle，放在else裡
  })
})

//按鈕邏輯區-end

//登入註冊區-start
//按鈕切換頁面
/*const toLoginBtn = document.getElementById('toLogin-btn');
const toSignBtn = document.getElementById('toSign-btn');
const signUpArea = document.querySelector('.signUpArea');
const logInArea = document.querySelector('.logInArea');

toLoginBtn.addEventListener('click', (e) =>{
  logInArea.classList.remove('display-none');
  signUpArea.classList.add('display-none');
})

toSignBtn.addEventListener('click', (e) =>{
  signUpArea.classList.remove('display-none');
  logInArea.classList.add('display-none');
})*/
//登入註冊區-end

//產品渲染區-start
let productData = [];

getProduct();

function getProduct(){
  axios.get('http://localhost:3000/products')
  .then(function(response){
    console.log(response.data);
    productData = response.data;
    //renderProduct(productData);
  })
  .catch(function(error){
    console.log(error);
  })
}

const productList = document.querySelector('.product-row');

console.log(productList);
function renderProduct(data){
   let str = "";
   data.forEach(item =>{
    const {id, title, imgUrl, channel, price, leftmember} = item;
    if(data.length>0 && productList){
    str += `<div id="${id}" class="card col-lg-3 col-md-4 col-sm-6 px-2 border border-0 mb-5">
    <div class="card-head d-flex justify-content-center">
    <a href="/product.html" class="card-img-topa"><img src="${imgUrl}" class="card-img-top" alt="..."></a>
  </div>
    <div class="card-body px-4">
      <p class="card-title fz-20-w">${title}</p>
        <h6 class="channel text-primary mb-2">${channel}</h6>
        <h6 class="price text-secondary">$<span>${price}</span></h6>
      <p class="card-text mt-7">差<span class="group-mem-num text-orange">${leftmember.length}</span>位成團</p>
    </div>
  </div>`;
}else{
  return "";
}
productList.innerHTML = str;
   })
}
//產品渲染區-end

//card-group 找幾團按鈕
const findGroupBtn = document.querySelector('#findGroupBtn');


findGroupEvent();

function findGroupEvent(){
  if(findGroupBtn){
findGroupBtn.addEventListener('click', (e) =>{
  let arr = [];
  let memId = [];
  let testArr = [];
memberImgAll.forEach(el =>{
    if(el.classList.contains('active')){
      memId = (el.previousElementSibling).getAttribute('id')[4];  
      arr.push(memId);
    }
  })//取畫面上的成員id

  console.log(memId); //memId是個陣列
  //如果要用memId跑一個簡單的forEach就會顯示is not a function如下
  memId.forEach(el =>{
    console.log(el);
  })

  /*productData.forEach(item =>{
   const {leftmember} = item;
   memId.forEach(el =>{
    if(leftmember[el]==true){
      testArr.push(el);
    }
    console.log(testArr);
   })
  })*/
  
  console.log(productData);
  console.log('在這');
  console.log(arr);
  
})
}
}




const array1 = [5, 12, 8, 130, 44];
const arr2 = [5, 12, 8, 130, 44];
//console.log(JSON.stringify(array1)===JSON.stringify(arr2));

//可以用sort因為陣列長度<10，sort會使用Insertion Sort，不會有10以上Quick Sort的不穩定現象。
//比較兩個陣列是否相等：JSON.stringify(a)===JSON.stringify(b);或是while迴圈


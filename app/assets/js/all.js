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
const api_Pro_Url = 'http://localhost:3000/products';
let productData = [];

getProduct(`${api_Pro_Url}`);

//`${api_Pro_Url}`

function getProduct(url){
  axios.get(url)
  .then(function(response){
    console.log(response.data);
    productData = response.data;
    renderProduct(productData);
  })
  .catch(function(error){
    console.log(error);
  })
}



const productList = document.querySelector('.product-row');

console.log(productList);
function renderProduct(data){
   let str = "";
   let obj= {};
   data.forEach(item =>{
    const {id, title, imgUrl, channel, price, leftmember} = item;
    if(data.length>0 && productList){
      //obj為計算每一個item裡的leftmember中true跟false數量的物件
    obj = Object.values(leftmember).reduce((a,b) => {
      if(a[b]){a[b]++;}
      else{a[b]=1}
      return a},{});
      //下方組html字串
    str += `<div id="${id}" class="card col-lg-3 col-md-4 col-sm-6 px-2 border border-0 mb-5">
    <div class="card-head d-flex justify-content-center">
    <a href="/product.html" class="card-img-topa"><img src="${imgUrl}" class="card-img-top" alt="..."></a>
  </div>
    <div class="card-body px-4">
      <p class="card-title fz-20-w">${title}</p>
        <h6 class="channel text-primary mb-2">${channel}</h6>
        <h6 class="price text-secondary">$<span>${price}</span></h6>
      <p class="card-text mt-7">差<span class="group-mem-num text-orange">${obj['true']}</span>位成團</p>
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
  let arr = []; //active的id們的陣列
  let memId; //active的id
  let testArr = []; //篩選出空位的成員：第一次聯集
memberImgAll.forEach(el =>{
    if(el.classList.contains('active')){
      memId = (el.previousElementSibling).getAttribute('id')[4];  
      arr.push(memId);
    }
  })//取畫面上的成員id

    productData.forEach(item =>{
      const {leftmember, id} = item;
      //只要符合其中一位成員就先丟到陣列裡
      arr.forEach(el =>{
      if(leftmember[el]===true){
        testArr.push(id);
      }
    })
    })
    console.log(testArr); 
    //第一次聯集的結果先轉成key與value互配形式：得到每一個產品id有符合幾位成員
    let compare = Object.entries(testArr.reduce((acc,cur) =>{
      if(acc[cur]){
        acc[cur]++;
      }else{
        acc[cur]=1;
      }
      return acc;
    },{}));
    let filtId = [];
    console.log(compare);
    //篩選出空位的成員：第二次增加條件達到交集，要兩位皆符合才會回傳
    compare.forEach(item =>{
      if(item[1]==arr.length){
        filtId.push(item[0]);
      }
    })
    console.log(`產品id${filtId}`); //這是篩選出來可渲染的產品id
    //組json的url字串
    let api_Pro_Id_Url = `${api_Pro_Url}?id=`;
    let filt_API_Url = "";
    let checkEnd = '';
    filtId.forEach(item =>{
      if(filtId.length===1){
      api_Pro_Id_Url+= item;  
      }else{
      api_Pro_Id_Url+=`${item}&id=`; 
      } 
    })
    checkEnd = api_Pro_Id_Url.substring(api_Pro_Id_Url.length-4,api_Pro_Id_Url.length)
    //修剪字串末多餘字元
    if(checkEnd=="&id="){
      filt_API_Url = api_Pro_Id_Url.substring(0,api_Pro_Id_Url.length-4);
    }
    console.log(api_Pro_Id_Url);
    console.log(filt_API_Url);//實際上要axios.get的json url
    getProduct(`${filt_API_Url}`);
})
}
}


//api_Pro_Id_Url.substring(0,api_Pro_Id_Url.length-4)
//const array1 = [5, 12, 8, 130, 44];
//const arr2 = [5, 12, 8, 130, 44];
//console.log(JSON.stringify(array1)===JSON.stringify(arr2));

//可以用sort因為陣列長度<10，sort會使用Insertion Sort，不會有10以上Quick Sort的不穩定現象。
//比較兩個陣列是否相等：JSON.stringify(a)===JSON.stringify(b);或是while迴圈


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
//.headers.common.Authorization
/*****js各function皆有補上：如果吃得到該元素，才會啟動。 */

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

//GSAP-start
/*gsap.to(".box", { x: 200 })
gsap.registerPlugin(ScrollTrigger);
let Scrollbar = window.Scrollbar;
const bodyScrollBar = Scrollbar.init(document.querySelector('#my-scrollbar'));/*Scrollbar.init(document.body, {
  damping: 0.1,
  delegateTo: document,
});*/

/*ScrollTrigger.scrollerProxy(".scroller", {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  },
});
bodyScrollBar.addListener(ScrollTrigger.update);

gsap.set(".panel", { zIndex: (i, target, targets) => targets.length - i });

var images = gsap.utils.toArray('.panel:not(.purple)');

images.forEach((image, i) => {
  
  var tl = gsap.timeline({
    
    scrollTrigger: {
      trigger: "section.black",
      scroller: ".scroller",
      start: () => "top -" + (window.innerHeight*(i+0.5)),
      end: () => "+=" + window.innerHeight,
      scrub: true,
      toggleActions: "play none reverse none",
      invalidateOnRefresh: true,     
    }
    
  })
  
  tl
  .to(image, { height: 0 })
  ;
  
});

gsap.set(".panel-text", { zIndex: (i, target, targets) => targets.length - i });

var texts = gsap.utils.toArray('.panel-text');

texts.forEach((text, i) => {
  
  var tl = gsap.timeline({
    
    scrollTrigger: {
      trigger: "section.black",
      scroller: ".scroller",
      start: () => "top -" + (window.innerHeight*i),
      end: () => "+=" + window.innerHeight,
      scrub: true,
      toggleActions: "play none reverse none",
      invalidateOnRefresh: true,     
    }
    
  })
  
  tl
  .to(text, { duration: 0.33, opacity: 1, y:"50%" })  
  .to(text, { duration: 0.33, opacity: 0, y:"0%" }, 0.66)
  ;
  
});

ScrollTrigger.create({

    trigger: "section.black",
    scroller: ".scroller",
    scrub: true,
    markers: true,
    pin: true,
    start: () => "top top",
    end: () => "+=" + ((images.length + 1) * window.innerHeight),
    invalidateOnRefresh: true,

});*/

//GSAP-end

//按鈕邏輯區-start
const heads = document.querySelectorAll('.head');
const headOt8 = document.querySelector('#head9');
const memberImgAll = document.querySelectorAll('.member-img');

memberChoose();

function memberChoose(){
if(heads){
heads.forEach((head, i) =>{
  head.addEventListener('click', (e) =>{
    const clickedId = e.target.getAttribute('id') //點擊到元素的id
    const clicked = document.getElementById(`${clickedId}`); //該id的dom元素
    console.log(clicked);
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
}
}


//按鈕邏輯區-end

const api_User_Url = 'http://localhost:3003';
//登入註冊區-start
//按鈕切換頁面
const toLoginBtn = document.getElementById('toLogin-btn');
const toSignBtn = document.getElementById('toSign-btn');
const signUpArea = document.querySelector('.signUpArea');
const logInArea = document.querySelector('.logInArea');
const logInInfoBtn = document.querySelector('.logInInfo-btn');
const signUpInfoBtn = document.querySelector('.signUpInfo-btn');
const logAccountInput = document.querySelector('#logAccountInput');
const logPasswordInput = document.querySelector('#logPasswordInput');
const signAccountInput = document.querySelector('#signAccountInput');
const signPasswordInput = document.querySelector('#signPasswordInput');
const signPasswordComInput = document.querySelector('#signPasswordComInput');

toLoginPanel();
toSignPanel();
function toLoginPanel(){
  if(toLoginBtn){
toLoginBtn.addEventListener('click', (e) =>{
  logInArea.classList.remove('display-none');
  signUpArea.classList.add('display-none');
})
}
}

function toSignPanel(){
  if(toSignBtn){
toSignBtn.addEventListener('click', (e) =>{
  signUpArea.classList.remove('display-none');
  logInArea.classList.add('display-none');
})
}
}
sendAccPsw();
checkAccPsw();

  //登入完整
function checkAccPsw(){
  if(logInInfoBtn){
    logInInfoBtn.addEventListener('click', (e) =>{
      if(logAccountInput.value==""||logPasswordInput.value==""){
        Swal.fire({
          icon: 'error',
          title: '無法登入！',
          text: '帳號或密碼皆須填寫，否則無法登入！',
          allowOutsideClick:true
        })
        return;
      }
      let obj ={};
      obj.email = logAccountInput.value;
      obj.password = logPasswordInput.value;
      loginPost(api_User_Url,obj);
    })
}
}

let token = '';
 //登入post
function loginPost(url,obj){
  axios.post(`${url}/login`,obj)
    .then(function(response){
      console.log(response.data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '登入成功!',
        showConfirmButton: false,
        timer: 1800
      })
      token = response.data.accessToken;
      localStorage.setItem('user1hrToken',token);
      localStorage.setItem('userId',response.data.user.id); //這句重要
      logAccountInput.value=="";
      logPasswordInput.value=="";
    })
    .catch(function(err){
      console.log(err);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: '帳號或密碼有誤，請重新輸入!',
        showConfirmButton: false,
        timer: 1800
      })
    })
}

  //註冊完整
function sendAccPsw(){
  if(signUpInfoBtn){
    signUpInfoBtn.addEventListener('click', (e) =>{
     if(signAccountInput.value==""||signPasswordInput.value==""||signPasswordComInput.value==''){
      Swal.fire({
        icon: 'error',
        title: '無法註冊',
        text: '帳號或密碼皆須填寫！',
        allowOutsideClick:true
      })
      return;
     }else{
     let signObj ={};
     signObj.email = signAccountInput.value;
     signObj.password = signPasswordInput.value;
     console.log(signObj);
     signUser(api_User_Url,signObj); //json-server-auth已有自動驗證信箱功能
    }
    })
  }
}
  //註冊post
function signUser(url,obj){
  axios.post(`${url}/register`,obj)
  .then(function(response){
   console.log(response.data);
   Swal.fire({
    position: 'center',
    icon: 'success',
    title: '註冊成功!',
    showConfirmButton: false,
    timer: 1800
  })
  signAccountInput.value="";
  signPasswordInput.value="";
  })
  .catch(function(err){
   console.log(err);
   Swal.fire({
    position: 'center',
    icon: 'error',
    title: '信箱或密碼格式不全!',
    showConfirmButton: false,
    timer: 1800
  })
  })
}

//會員區域畫面更動 

const userArea = document.querySelector('.userArea');
authUserOption();

function authUserOption(){
   let loggedToken = localStorage.getItem('user1hrToken');
   let loggedUserId = localStorage.getItem('userId');
   if(loggedUserId && loggedToken){
    userArea.classList.add('dropdown');
  userArea.innerHTML = `<a href="#" class="nav-link dropdown-toggle" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  <i class="fa-regular fa-user icon-width-lg text-primary" id="userIcon"></i>
</a>
<ul class="dropdown-menu" aria-labelledby="userDropdown">
  <li><a class="dropdown-item" href="/auth-user.html">我的收藏</a></li>
  <li><a class="dropdown-item" href="/auth-user.html">我的訂單</a></li>
  <li><a class="dropdown-item" href="/auth-user.html">我的資料</a></li>
  <li><a class="dropdown-item" href="#" id="logOutBtn">登出</a></li>
</ul>`;
logOut();
   }
     
}
//check是否登入
function getLoggedID() {
  return localStorage.getItem('userId') || 0;
}

//登出
const logOutBtn = document.querySelector('#logOutBtn');
const userIcon = document.querySelector('#userIcon');

logOut(); //放在外面，就吃得到了

function logOut(){
if(logOutBtn){
  logOutBtn.addEventListener('click', (e)=>{
    console.log(e.target); 
    localStorage.clear(); //清除所有localStorage儲存的id跟token
    userIcon.classList.remove('text-primary');
    userIcon.classList.add('text-maingray');
    setTimeout(() => {
      window.location.replace('/'); //導回首頁
    }, 300);
  });
}
}


//登入註冊區-end

//aya學姊程式碼閱讀筆記：
//初始化函式包含：如果從localstorage 上取得到userId，就使用axios.defaults.headers.common['Authorization']將所有的請求加上authorized header。


//產品渲染區-start
const api_Pro_Url = 'http://localhost:3003/products';
let productData = [];

getProduct(`${api_Pro_Url}`)

//`${api_Pro_Url}`

//api取產品資料-here
function getProduct(url){
  axios.get(url)
  .then(function(response){
    console.log(response.data);
    productData = response.data;
    const filterGroup = productData.filter(el => {return el.type ==='拆卡'})
    const filterCard = productData.filter(el => {return el.type ==='出卡'})
    console.log(productData);
    console.log(checkChannel(productData));
    renderProduct(filterGroup);
    renderCardProduct(filterCard);
  })
  .catch(function(error){
    console.log(error);
  })
}

const productList = document.querySelector('.product-row');

//這個版型僅for 一般跟拆卡
function renderProduct(data){
   let str = "";
   let obj= {};
   data.forEach(item =>{
    const {id, title, imgUrl, channel, price, leftmember } = item;
    if(data.length>0 && productList){
      //obj為計算每一個item裡的leftmember中true跟false數量的物件
    obj = Object.values(leftmember).reduce((a,b) => {
      if(a[b]){a[b]++;}
      else{a[b]=1}
      return a},{});
      //下方組html字串
    str += `<div class="card col-lg-3 col-md-4 col-sm-6 px-2 border border-0 mb-5">
    <div class="card-head d-flex justify-content-center">
    <a href="/product.html?id=${id}" class="card-img-topa"><img src="${imgUrl}" class="card-img-top" alt="..."></a>
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

const cardList = document.querySelector('.product-row-card');

//這個版型僅for換卡
function renderCardProduct(data){
  let cardStr = "";
  let obj= {1:"Bangchan", 2:"Leeknow", 3:"Changbin", 4:"Hyunjin", 5:"Han", 6:"Felix", 7:"Seungmin", 8:"I.N"};
  data.forEach(item =>{
   const {id, title, imgUrl, price, member} = item;
   if(data.length>0 && cardList){
     //下方組html字串
     cardStr += `<div class="cardList col-lg-3 col-md-4 col-sm-6 px-2 border border-0 mb-5">
     <div class="card-head d-flex justify-content-center">
   <a href="/product.html?id=${id}" class="card-img-topCarda"><img src="${imgUrl}" class="card-img-topCard" alt="..."></a>
 </div>
   <div class="card-body px-9">
     <p class="card-title fz-20-w">${title}</p>
       <h6 class="channel text-primary mb-2">${obj[member]}</h6>
       <h6 class="price text-secondary">$<span>${price}</span></h6>
   </div></div>`;
}else{
 return "";
}
cardList.innerHTML = cardStr;
  })
}

//產品渲染區-end

//card-group 找幾團按鈕
const findGroupBtn = document.querySelector('#findGroupBtn');

function findGroupEvent(data){
  if(findGroupBtn){
findGroupBtn.addEventListener('click', (e) =>{
  console.log()
  let arr = []; //active的id們的陣列
  let memId; //active的id
  let testArr = []; //篩選出空位的成員：第一次聯集
memberImgAll.forEach(el =>{
    if(el.classList.contains('active')){
      memId = (el.previousElementSibling).getAttribute('id')[4];  
      arr.push(memId);
    }
  })//取畫面上的成員id
 
    console.log(arr); //到這邊沒錯
    data.forEach(item =>{
      const {leftmember, id, channel} = item;
      //只要符合其中一位成員就先丟到陣列裡
      arr.forEach(el =>{
      if(leftmember[el] === true){
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
    console.log(filtId); //這是篩選出來可渲染的產品id

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
      getProduct(`${filt_API_Url}`);
    }else{
      getProduct(`${api_Pro_Id_Url}`);
    }
    console.log(api_Pro_Id_Url);
    console.log(filt_API_Url);//實際上要axios.get的json url
    
})
}
}

//篩選通路功能 -here

const productChannels = document.querySelector('.productChannels');

function checkChannel(data){
  let channelVal;
  if(productChannels){
    productChannels.addEventListener('change', (e) =>{
    channelVal = e.target.value;
    console.log(channelVal);
    return channelVal === "所有通路" ? data : data.filter(el => { return el.channel === channelVal });
    })
  }
}



//api_Pro_Id_Url.substring(0,api_Pro_Id_Url.length-4)
//const array1 = [5, 12, 8, 130, 44];
//const arr2 = [5, 12, 8, 130, 44];
//console.log(JSON.stringify(array1)===JSON.stringify(arr2));

//可以用sort因為陣列長度<10，sort會使用Insertion Sort，不會有10以上Quick Sort的不穩定現象。
//比較兩個陣列是否相等：JSON.stringify(a)===JSON.stringify(b);或是while迴圈

//結帳頁面-start
const toSecondStep = document.querySelector('#toSecondStep');
const toThirdStep = document.querySelector('#toThirdStep');
const checkoutFirstStep = document.querySelector('#checkoutFirstStep');
const checkoutSecondStep = document.querySelector('#checkoutSecondStep');
const checkoutLastStep = document.querySelector('#checkoutLastStep');

toSecondStepPage();
toLastStepPage();

function toSecondStepPage(){
  if(toSecondStep){
toSecondStep.addEventListener('click', e =>{
  e.preventDefault();
  checkoutSecondStep.classList.remove('display-none');
  checkoutFirstStep.classList.add('display-none');
});
}
}

function toLastStepPage(){
  if(toThirdStep){
toThirdStep.addEventListener('click', e =>{
  e.preventDefault();
  checkoutLastStep.classList.remove('display-none');
  checkoutSecondStep.classList.add('display-none');
});
}
}

//結帳頁面-end

//商品頁面：確認卡位-start-TBC
const confirmJoinBtn = document.querySelector('#confirmJoinBtn');
const JoinNum = document.querySelector('#confirmJoinBtn span');

confirmJoin();

function confirmJoin(){
  if(confirmJoinBtn){
  confirmJoinBtn.addEventListener('click', (e) =>{
    console.log(e.target);
  });
}
}

//商品頁面：確認卡位-end
getPerProduct();
const api_User2_Url = 'http://localhost:3003/users';
let perObj = {};
let sellerId;

//取得單一產品（總
function getPerProduct(){

const productId = location.href.split("=")[1]; //這個可以放函式內不然會每個頁面都undefined
  console.log(productId);
  if(productId){
   axios.get(`${api_Pro_Url}/${productId}`)
   .then(function(response){
    perObj = response.data;
    console.log(perObj.sellerId);
    sellerId = perObj.sellerId;
    getPerSeller(sellerId);
    renderPerProduct(perObj);
   })
   .catch(function(error){
    console.log(error);
   })
  }

}

//渲染per商品頁
const productImg = document.querySelector('.product-img');
const productDescription = document.querySelector('.product-des');
const sellerLeft = document.querySelector('.seller-left');
const internationalFeeArea = document.querySelector('.internationalFee');
const domesticCourierList = document.querySelector('.domesticCourier');
const fullDescriptionArea = document.querySelector('.description');
const picArea = document.querySelector('.pic-area');

//因為賣家資訊與商品資訊取的資料集不同，故拉出來渲染
function getPerSeller(sellerId){
  let sellerData = {};
  if(sellerLeft){
    axios.get(`${api_User2_Url}/${sellerId}`)
    .then(function(response){
      sellerData = response.data
      console.log(sellerData);
      renderSeller(sellerData);
    })
    .catch(function(error){
      console.log(error);
    })
  }
}
//渲染賣家區域
function renderSeller(data){
  const { name, groupHistory, imgUrl} = data;
  if(sellerLeft){
    sellerLeft.innerHTML = `<img class="seller-pic" src="${imgUrl}" alt="sellerpic"><h5 class="ms-2">${name}</h5><p class="ms-6">主拆成團 <span class="text-primary">${groupHistory}</span> 筆</p>`;
  }else{
    return "";
  }
}
//渲染產品資料區域
function renderPerProduct(data){
   if(productImg && productDescription && internationalFeeArea && domesticCourierList ){
    const {imgUrl, title, id, price, description, internationalFee, domesticCourier, imgsUrl, channel} = data;
    fullDescriptionArea.textContent = description;
    productImg.innerHTML = `<img src=${imgUrl} alt="">`;
    let imgsStr = '';
    if(imgsUrl.length>0){
      imgsUrl.forEach(it =>{
      imgsStr += `<li class="mb-4"><img src=${it} alt=""></li>`;
    })
    picArea.innerHTML = imgsStr;
    }
    productDescription.innerHTML = `<h1 class="mb-3">${title}</h1>
    <p class="mb-1">卡團編號：#${id}</p>
    <p class="mb-2">通路：${channel}</p>
    <div class="member-option border border-primary display-none">
    <div class="member-row member-row-sm d-flex justify-content-between mb-2">

        <label for="head10">
            <input type="checkbox" id="head10" class="head">
            <div class="member-img-sm mb-1">
                <img class="per-member small-head" src="https://i.imgur.com/5PlS2aH.png" alt="Bangchan">
            </div>
            <h2 class="text-maingray text-center fz-16">Bangchan</h2>
          </label> 
        <label for="head11">
          <input type="checkbox" id="head11" class="head">
          <div class="member-img-sm disabled mb-1">
              <img class="per-member small-head" src="https://i.imgur.com/ATWXtR9.png" alt="Leeknow">
          </div>
          <h2 class="text-maingray text-center fz-16 tx-disabled">Leeknow</h2>
        </label> 
        <label for="head12">
          <input type="checkbox" id="head12" class="head">
          <div class="member-img member-img-sm mb-1">
              <img class="per-member small-head" src="https://i.imgur.com/XhAHWYu.png" alt="Changbin">
          </div>
          <h2 class="text-maingray text-center fz-16">Changbin</h2>
        </label> 
        <label for="head13">
            <input type="checkbox" id="head13" class="head">
            <div class="member-img member-img-sm mb-1">
                <img class="per-member small-head" src="https://i.imgur.com/AANylPt.png" alt="Hyunjin">
            </div>
            <h2 class="text-maingray text-center fz-16">Hyunjin</h2>
          </label> 
      </div>
      <div class="member-row member-row-sm d-flex justify-content-between mb-2">

        <label for="head14">
            <input type="checkbox" id="head14" class="head">
            <div class="member-img member-img-sm mb-1">
                <img class="per-member small-head" src="https://i.imgur.com/UQ7he1p.png" alt="Han">
            </div>
            <h2 class="text-maingray text-center fz-16">Han</h2>
          </label> 
        <label for="head15">
          <input type="checkbox" id="head15" class="head">
          <div class="member-img member-img-sm mb-1">
              <img class="per-member small-head" src="https://i.imgur.com/UFTzeFH.png" alt="Felix">
          </div>
          <h2 class="text-maingray text-center fz-16">Felix</h2>
        </label> 
        <label for="head16">
          <input type="checkbox" id="head16" class="head">
          <div class="member-img member-img-sm mb-1">
              <img class="per-member small-head" src="https://i.imgur.com/UiFtZSu.png" alt="Seungmin">
          </div>
          <h2 class="text-maingray text-center fz-16">Seungmin</h2>
        </label> 
        <label for="head17">
            <input type="checkbox" id="head17" class="head">
            <div class="member-img member-img-sm mb-1">
                <img class="per-member small-head" src="https://i.imgur.com/3JdX3kx.png" alt="I.N">
            </div>
            <h2 class="text-maingray text-center fz-16">I.N</h2>
          </label> 
      </div>
    </div>
    <div class="member-option">
      <div class="member-row member-row-sm d-flex justify-content-between mb-2">
        <div class="py-1 px-1 rounded-xxl">
          <label for="head10">
              <input type="checkbox" id="head10" class="head">
              <div class="member-img member-img-sm mb-1">
                  <img class="per-member small-head" src="https://i.imgur.com/5PlS2aH.png" alt="Bangchan">
              </div>
              <h2 class="text-maingray text-center fz-16">Bangchan</h2>
            </label> 
          </div>
          <div class="py-1 px-1 rounded-xxl">
          <label for="head11">
            <input type="checkbox" id="head11" class="head">
            <div class="member-img member-img-sm disabled mb-1">
                <img class="per-member small-head" src="https://i.imgur.com/ATWXtR9.png" alt="Leeknow">
            </div>
            <h2 class="text-maingray text-center fz-16 tx-disabled">Leeknow</h2>
          </label> 
        </div>
        <div class="py-1 px-1 rounded-xxl">
          <label for="head12">
            <input type="checkbox" id="head12" class="head">
            <div class="member-img member-img-sm mb-1">
                <img class="per-member small-head" src="https://i.imgur.com/XhAHWYu.png" alt="Changbin">
            </div>
            <h2 class="text-maingray text-center fz-16">Changbin</h2>
          </label> 
        </div>
        <div class="py-1 px-1 rounded-xxl">
          <label for="head13">
              <input type="checkbox" id="head13" class="head">
              <div class="member-img member-img-sm mb-1">
                  <img class="per-member small-head" src="https://i.imgur.com/AANylPt.png" alt="Hyunjin">
              </div>
              <h2 class="text-maingray text-center fz-16">Hyunjin</h2>
            </label> 
        </div>
      </div>
        <div class="member-row member-row-sm d-flex justify-content-between mb-2">
          <div class="py-1 px-1 rounded-xxl">
          <label for="head14">
              <input type="checkbox" id="head14" class="head">
              <div class="member-img member-img-sm mb-1">
                  <img class="per-member small-head" src="https://i.imgur.com/UQ7he1p.png" alt="Han">
              </div>
              <h2 class="text-maingray text-center fz-16">Han</h2>
            </label> 
          </div>
          <div class="white-area py-1 px-1 rounded-xxl">
          <label for="head15">
            <input type="checkbox" id="head15" class="head">
            <div class="member-img member-img-sm mb-1">
                <img class="per-member small-head" src="https://i.imgur.com/UFTzeFH.png" alt="Felix">
            </div>
            <h2 class="text-maingray text-center fz-16">Felix</h2>
          </label> 
        </div>
        <div class="white-area py-1 px-1 rounded-xxl">
          <label for="head16">
            <input type="checkbox" id="head16" class="head">
            <div class="member-img member-img-sm mb-1">
                <img class="per-member small-head" src="https://i.imgur.com/UiFtZSu.png" alt="Seungmin">
            </div>
            <h2 class="text-maingray text-center fz-16">Seungmin</h2>
          </label> 
        </div>
          <div class="white-area py-1 px-1 rounded-xxl">
          <label for="head17">
              <input type="checkbox" id="head17" class="head">
              <div class="member-img member-img-sm mb-1">
                  <img class="per-member small-head" src="https://i.imgur.com/3JdX3kx.png" alt="I.N">
              </div>
              <h2 class="text-maingray text-center fz-16">I.N</h2>
            </label>
          </div> 
        </div>
      </div>
      <h2 class="text-primary">$${price}</h2>
      <div class="btn-area my-lg-4 px-lg-2 d-flex flex-column align-items-end">
        <p class="fz-8 mb-1 display-none">＊確認卡位成員後無法更改。送出前請再三確認。</p>
        <p class="fz-8 mb-1">＊帶藍區必帶紅區，請確認是否達成必填門檻，否則將無法送出。</p>
        <div class="btns d-flex">
        <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3 me-3" id="confirmJoinBtn">確認卡位<span>(2)</span></button>
        <button type="button" class="product-btn btn btn-white border-primary rounded-xxl py-1 px-3"><i class="fa-regular fa-heart me-2"></i>收藏</button>
    </div>
      </div>`;
    console.log(internationalFee.amount);
    console.log(internationalFeeArea);
    internationalFeeArea.innerHTML = `<p><i class="fa-solid fa-plane me-3 text-primary fz-20"></i>國際運費</p><p class="text-orange pe-1">${internationalFee.amount}</p>`;
    let courierOption = Object.keys(domesticCourier);
    let courierStr = '';
    courierOption.forEach(el =>{
      courierStr+= `<li>${el} $${domesticCourier[el]}</li>`;
    })
    domesticCourierList.innerHTML = courierStr;
   }
   
}

//欠：個別賣家賣場/ 

//



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
}); //.headers.common.Authorization

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

var heads = document.querySelectorAll('.head');
var headOt8 = document.querySelector('#head9');
var memberImgAll = document.querySelectorAll('.member-img');
memberChoose();

function memberChoose() {
  if (heads) {
    heads.forEach(function (head, i) {
      head.addEventListener('click', function (e) {
        var clickedId = e.target.getAttribute('id'); //點擊到元素的id

        var clicked = document.getElementById("".concat(clickedId)); //該id的dom元素

        console.log(clicked);

        if (clickedId != "head9" && headOt8.nextElementSibling.classList.contains('active')) {
          headOt8.nextElementSibling.classList.remove('active'); //清9留個人：如果點到的不是9號按鈕，且，9號按鈕子層元素的class有紫邊的話，將9號按鈕的紫邊移除。
        }

        if (clickedId === "head9" && !clicked.nextElementSibling.classList.contains('active')) {
          memberImgAll.forEach(function (el) {
            el.classList.remove('active');
          });
          headOt8.nextElementSibling.classList.add('active'); //清個人留9：如果點到的是9號按鈕，且，9號按鈕子層元素沒有紫邊的話，先將1-8號的紫邊移除，再幫9號加上紫邊。
        } else {
          memberImgAll[i].classList.toggle('active');
        } //其他狀況：個別獨立toggle，放在else裡

      });
    });
  }
} //按鈕邏輯區-end


var api_User_Url = 'http://localhost:3003'; //登入註冊區-start
//按鈕切換頁面

var toLoginBtn = document.getElementById('toLogin-btn');
var toSignBtn = document.getElementById('toSign-btn');
var signUpArea = document.querySelector('.signUpArea');
var logInArea = document.querySelector('.logInArea');
var logInInfoBtn = document.querySelector('.logInInfo-btn');
var signUpInfoBtn = document.querySelector('.signUpInfo-btn');
var logAccountInput = document.querySelector('#logAccountInput');
var logPasswordInput = document.querySelector('#logPasswordInput');
var signAccountInput = document.querySelector('#signAccountInput');
var signPasswordInput = document.querySelector('#signPasswordInput');
var signPasswordComInput = document.querySelector('#signPasswordComInput');
toLoginPanel();
toSignPanel();

function toLoginPanel() {
  if (toLoginBtn) {
    toLoginBtn.addEventListener('click', function (e) {
      logInArea.classList.remove('display-none');
      signUpArea.classList.add('display-none');
    });
  }
}

function toSignPanel() {
  if (toSignBtn) {
    toSignBtn.addEventListener('click', function (e) {
      signUpArea.classList.remove('display-none');
      logInArea.classList.add('display-none');
    });
  }
}

sendAccPsw();
checkAccPsw(); //登入完整

function checkAccPsw() {
  if (logInInfoBtn) {
    logInInfoBtn.addEventListener('click', function (e) {
      if (logAccountInput.value == "" || logPasswordInput.value == "") {
        Swal.fire({
          icon: 'error',
          title: '無法登入！',
          text: '帳號或密碼皆須填寫，否則無法登入！',
          allowOutsideClick: true
        });
        return;
      }

      var obj = {};
      obj.email = logAccountInput.value;
      obj.password = logPasswordInput.value;
      loginPost(api_User_Url, obj);
    });
  }
}

var token = ''; //登入post

function loginPost(url, obj) {
  axios.post("".concat(url, "/login"), obj).then(function (response) {
    console.log(response.data);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '登入成功!',
      showConfirmButton: false,
      timer: 1800
    });
    token = response.data.accessToken;
    localStorage.setItem('user1hrToken', token);
    localStorage.setItem('userId', response.data.user.id); //這句重要

    logAccountInput.value == "";
    logPasswordInput.value == "";
  })["catch"](function (err) {
    console.log(err);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '帳號或密碼有誤，請重新輸入!',
      showConfirmButton: false,
      timer: 1800
    });
  });
} //註冊完整


function sendAccPsw() {
  if (signUpInfoBtn) {
    signUpInfoBtn.addEventListener('click', function (e) {
      if (signAccountInput.value == "" || signPasswordInput.value == "" || signPasswordComInput.value == '') {
        Swal.fire({
          icon: 'error',
          title: '無法註冊',
          text: '帳號或密碼皆須填寫！',
          allowOutsideClick: true
        });
        return;
      } else {
        var signObj = {};
        signObj.email = signAccountInput.value;
        signObj.password = signPasswordInput.value;
        console.log(signObj);
        signUser(api_User_Url, signObj); //json-server-auth已有自動驗證信箱功能
      }
    });
  }
} //註冊post


function signUser(url, obj) {
  axios.post("".concat(url, "/register"), obj).then(function (response) {
    console.log(response.data);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '註冊成功!',
      showConfirmButton: false,
      timer: 1800
    });
    signAccountInput.value = "";
    signPasswordInput.value = "";
  })["catch"](function (err) {
    console.log(err);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: '信箱或密碼格式不全!',
      showConfirmButton: false,
      timer: 1800
    });
  });
} //會員區域畫面更動 


var userArea = document.querySelector('.userArea');
authUserOption();

function authUserOption() {
  var loggedToken = localStorage.getItem('user1hrToken');
  var loggedUserId = localStorage.getItem('userId');

  if (loggedUserId && loggedToken) {
    userArea.classList.add('dropdown');
    userArea.innerHTML = "<a href=\"#\" class=\"nav-link dropdown-toggle\" id=\"userDropdown\" role=\"button\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n  <i class=\"fa-regular fa-user icon-width-lg text-primary\" id=\"userIcon\"></i>\n</a>\n<ul class=\"dropdown-menu\" aria-labelledby=\"userDropdown\">\n  <li><a class=\"dropdown-item\" href=\"/auth-user.html\">\u6211\u7684\u6536\u85CF</a></li>\n  <li><a class=\"dropdown-item\" href=\"/auth-user.html\">\u6211\u7684\u8A02\u55AE</a></li>\n  <li><a class=\"dropdown-item\" href=\"/auth-user.html\">\u6211\u7684\u8CC7\u6599</a></li>\n  <li><a class=\"dropdown-item\" href=\"#\" id=\"logOutBtn\">\u767B\u51FA</a></li>\n</ul>";
    logOut();
  }
} //check是否登入


function getLoggedID() {
  return localStorage.getItem('userId') || 0;
} //登出


var logOutBtn = document.querySelector('#logOutBtn');
var userIcon = document.querySelector('#userIcon');
logOut(); //放在外面，就吃得到了

function logOut() {
  if (logOutBtn) {
    logOutBtn.addEventListener('click', function (e) {
      console.log(e.target);
      localStorage.clear(); //清除所有localStorage儲存的id跟token

      userIcon.classList.remove('text-primary');
      userIcon.classList.add('text-maingray');
      setTimeout(function () {
        window.location.replace('/'); //導回首頁
      }, 300);
    });
  }
} //登入註冊區-end
//aya學姊程式碼閱讀筆記：
//初始化函式包含：如果從localstorage 上取得到userId，就使用axios.defaults.headers.common['Authorization']將所有的請求加上authorized header。
//產品渲染區-start


var api_Pro_Url = 'http://localhost:3003/products';
var productData = [];
getProduct("".concat(api_Pro_Url)); //`${api_Pro_Url}`
//api取產品資料-here

function getProduct(url) {
  axios.get(url).then(function (response) {
    console.log(response.data);
    productData = response.data;
    var filterGroup = productData.filter(function (el) {
      return el.type === '拆卡';
    });
    var filterCard = productData.filter(function (el) {
      return el.type === '出卡';
    });
    console.log(productData);
    console.log(checkChannel(productData));
    renderProduct(filterGroup);
    renderCardProduct(filterCard);
  })["catch"](function (error) {
    console.log(error);
  });
}

var productList = document.querySelector('.product-row'); //這個版型僅for 一般跟拆卡

function renderProduct(data) {
  var str = "";
  var obj = {};
  data.forEach(function (item) {
    var id = item.id,
        title = item.title,
        imgUrl = item.imgUrl,
        channel = item.channel,
        price = item.price,
        leftmember = item.leftmember;

    if (data.length > 0 && productList) {
      //obj為計算每一個item裡的leftmember中true跟false數量的物件
      obj = Object.values(leftmember).reduce(function (a, b) {
        if (a[b]) {
          a[b]++;
        } else {
          a[b] = 1;
        }

        return a;
      }, {}); //下方組html字串

      str += "<div class=\"card col-lg-3 col-md-4 col-sm-6 px-2 border border-0 mb-5\">\n    <div class=\"card-head d-flex justify-content-center\">\n    <a href=\"/product.html?id=".concat(id, "\" class=\"card-img-topa\"><img src=\"").concat(imgUrl, "\" class=\"card-img-top\" alt=\"...\"></a>\n  </div>\n    <div class=\"card-body px-4\">\n      <p class=\"card-title fz-20-w\">").concat(title, "</p>\n        <h6 class=\"channel text-primary mb-2\">").concat(channel, "</h6>\n        <h6 class=\"price text-secondary\">$<span>").concat(price, "</span></h6>\n      <p class=\"card-text mt-7\">\u5DEE<span class=\"group-mem-num text-orange\">").concat(obj['true'], "</span>\u4F4D\u6210\u5718</p>\n    </div>\n  </div>");
    } else {
      return "";
    }

    productList.innerHTML = str;
  });
}

var cardList = document.querySelector('.product-row-card'); //這個版型僅for換卡

function renderCardProduct(data) {
  var cardStr = "";
  var obj = {
    1: "Bangchan",
    2: "Leeknow",
    3: "Changbin",
    4: "Hyunjin",
    5: "Han",
    6: "Felix",
    7: "Seungmin",
    8: "I.N"
  };
  data.forEach(function (item) {
    var id = item.id,
        title = item.title,
        imgUrl = item.imgUrl,
        price = item.price,
        member = item.member;

    if (data.length > 0 && cardList) {
      //下方組html字串
      cardStr += "<div class=\"cardList col-lg-3 col-md-4 col-sm-6 px-2 border border-0 mb-5\">\n     <div class=\"card-head d-flex justify-content-center\">\n   <a href=\"/product.html?id=".concat(id, "\" class=\"card-img-topCarda\"><img src=\"").concat(imgUrl, "\" class=\"card-img-topCard\" alt=\"...\"></a>\n </div>\n   <div class=\"card-body px-9\">\n     <p class=\"card-title fz-20-w\">").concat(title, "</p>\n       <h6 class=\"channel text-primary mb-2\">").concat(obj[member], "</h6>\n       <h6 class=\"price text-secondary\">$<span>").concat(price, "</span></h6>\n   </div></div>");
    } else {
      return "";
    }

    cardList.innerHTML = cardStr;
  });
} //產品渲染區-end
//card-group 找幾團按鈕


var findGroupBtn = document.querySelector('#findGroupBtn');

function findGroupEvent(data) {
  if (findGroupBtn) {
    findGroupBtn.addEventListener('click', function (e) {
      console.log();
      var arr = []; //active的id們的陣列

      var memId; //active的id

      var testArr = []; //篩選出空位的成員：第一次聯集

      memberImgAll.forEach(function (el) {
        if (el.classList.contains('active')) {
          memId = el.previousElementSibling.getAttribute('id')[4];
          arr.push(memId);
        }
      }); //取畫面上的成員id

      console.log(arr); //到這邊沒錯

      data.forEach(function (item) {
        var leftmember = item.leftmember,
            id = item.id,
            channel = item.channel; //只要符合其中一位成員就先丟到陣列裡

        arr.forEach(function (el) {
          if (leftmember[el] === true) {
            testArr.push(id);
          }
        });
      });
      console.log(testArr); //第一次聯集的結果先轉成key與value互配形式：得到每一個產品id有符合幾位成員

      var compare = Object.entries(testArr.reduce(function (acc, cur) {
        if (acc[cur]) {
          acc[cur]++;
        } else {
          acc[cur] = 1;
        }

        return acc;
      }, {}));
      var filtId = [];
      console.log(compare); //篩選出空位的成員：第二次增加條件達到交集，要兩位皆符合才會回傳

      compare.forEach(function (item) {
        if (item[1] == arr.length) {
          filtId.push(item[0]);
        }
      });
      console.log(filtId); //這是篩選出來可渲染的產品id
      //組json的url字串

      var api_Pro_Id_Url = "".concat(api_Pro_Url, "?id=");
      var filt_API_Url = "";
      var checkEnd = '';
      filtId.forEach(function (item) {
        if (filtId.length === 1) {
          api_Pro_Id_Url += item;
        } else {
          api_Pro_Id_Url += "".concat(item, "&id=");
        }
      });
      checkEnd = api_Pro_Id_Url.substring(api_Pro_Id_Url.length - 4, api_Pro_Id_Url.length); //修剪字串末多餘字元

      if (checkEnd == "&id=") {
        filt_API_Url = api_Pro_Id_Url.substring(0, api_Pro_Id_Url.length - 4);
        getProduct("".concat(filt_API_Url));
      } else {
        getProduct("".concat(api_Pro_Id_Url));
      }

      console.log(api_Pro_Id_Url);
      console.log(filt_API_Url); //實際上要axios.get的json url
    });
  }
} //篩選通路功能 -here


var productChannels = document.querySelector('.productChannels');

function checkChannel(data) {
  var channelVal;

  if (productChannels) {
    productChannels.addEventListener('change', function (e) {
      channelVal = e.target.value;
      console.log(channelVal);
      return channelVal === "所有通路" ? data : data.filter(function (el) {
        return el.channel === channelVal;
      });
    });
  }
} //api_Pro_Id_Url.substring(0,api_Pro_Id_Url.length-4)
//const array1 = [5, 12, 8, 130, 44];
//const arr2 = [5, 12, 8, 130, 44];
//console.log(JSON.stringify(array1)===JSON.stringify(arr2));
//可以用sort因為陣列長度<10，sort會使用Insertion Sort，不會有10以上Quick Sort的不穩定現象。
//比較兩個陣列是否相等：JSON.stringify(a)===JSON.stringify(b);或是while迴圈
//結帳頁面-start


var toSecondStep = document.querySelector('#toSecondStep');
var toThirdStep = document.querySelector('#toThirdStep');
var checkoutFirstStep = document.querySelector('#checkoutFirstStep');
var checkoutSecondStep = document.querySelector('#checkoutSecondStep');
var checkoutLastStep = document.querySelector('#checkoutLastStep');
toSecondStepPage();
toLastStepPage();

function toSecondStepPage() {
  if (toSecondStep) {
    toSecondStep.addEventListener('click', function (e) {
      e.preventDefault();
      checkoutSecondStep.classList.remove('display-none');
      checkoutFirstStep.classList.add('display-none');
    });
  }
}

function toLastStepPage() {
  if (toThirdStep) {
    toThirdStep.addEventListener('click', function (e) {
      e.preventDefault();
      checkoutLastStep.classList.remove('display-none');
      checkoutSecondStep.classList.add('display-none');
    });
  }
} //結帳頁面-end
//商品頁面：確認卡位-start-TBC


var confirmJoinBtn = document.querySelector('#confirmJoinBtn');
var JoinNum = document.querySelector('#confirmJoinBtn span');
confirmJoin();

function confirmJoin() {
  if (confirmJoinBtn) {
    confirmJoinBtn.addEventListener('click', function (e) {
      console.log(e.target);
    });
  }
} //商品頁面：確認卡位-end


getPerProduct();
var api_User2_Url = 'http://localhost:3003/users';
var perObj = {};
var sellerId; //取得單一產品（總

function getPerProduct() {
  var productId = location.href.split("=")[1]; //這個可以放函式內不然會每個頁面都undefined

  console.log(productId);

  if (productId) {
    axios.get("".concat(api_Pro_Url, "/").concat(productId)).then(function (response) {
      perObj = response.data;
      console.log(perObj.sellerId);
      sellerId = perObj.sellerId;
      getPerSeller(sellerId);
      renderPerProduct(perObj);
    })["catch"](function (error) {
      console.log(error);
    });
  }
} //渲染per商品頁


var productImg = document.querySelector('.product-img');
var productDescription = document.querySelector('.product-des');
var sellerLeft = document.querySelector('.seller-left');
var internationalFeeArea = document.querySelector('.internationalFee');
var domesticCourierList = document.querySelector('.domesticCourier');
var fullDescriptionArea = document.querySelector('.description');
var picArea = document.querySelector('.pic-area'); //因為賣家資訊與商品資訊取的資料集不同，故拉出來渲染

function getPerSeller(sellerId) {
  var sellerData = {};

  if (sellerLeft) {
    axios.get("".concat(api_User2_Url, "/").concat(sellerId)).then(function (response) {
      sellerData = response.data;
      console.log(sellerData);
      renderSeller(sellerData);
    })["catch"](function (error) {
      console.log(error);
    });
  }
} //渲染賣家區域


function renderSeller(data) {
  var name = data.name,
      groupHistory = data.groupHistory,
      imgUrl = data.imgUrl;

  if (sellerLeft) {
    sellerLeft.innerHTML = "<img class=\"seller-pic\" src=\"".concat(imgUrl, "\" alt=\"sellerpic\"><h5 class=\"ms-2\">").concat(name, "</h5><p class=\"ms-6\">\u4E3B\u62C6\u6210\u5718 <span class=\"text-primary\">").concat(groupHistory, "</span> \u7B46</p>");
  } else {
    return "";
  }
} //渲染產品資料區域


function renderPerProduct(data) {
  if (productImg && productDescription && internationalFeeArea && domesticCourierList) {
    var imgUrl = data.imgUrl,
        title = data.title,
        id = data.id,
        price = data.price,
        description = data.description,
        internationalFee = data.internationalFee,
        domesticCourier = data.domesticCourier,
        imgsUrl = data.imgsUrl,
        channel = data.channel;
    fullDescriptionArea.textContent = description;
    productImg.innerHTML = "<img src=".concat(imgUrl, " alt=\"\">");
    var imgsStr = '';

    if (imgsUrl.length > 0) {
      imgsUrl.forEach(function (it) {
        imgsStr += "<li class=\"mb-4\"><img src=".concat(it, " alt=\"\"></li>");
      });
      picArea.innerHTML = imgsStr;
    }

    productDescription.innerHTML = "<h1 class=\"mb-3\">".concat(title, "</h1>\n    <p class=\"mb-1\">\u5361\u5718\u7DE8\u865F\uFF1A#").concat(id, "</p>\n    <p class=\"mb-2\">\u901A\u8DEF\uFF1A").concat(channel, "</p>\n    <div class=\"member-option border border-primary display-none\">\n    <div class=\"member-row member-row-sm d-flex justify-content-between mb-2\">\n\n        <label for=\"head10\">\n            <input type=\"checkbox\" id=\"head10\" class=\"head\">\n            <div class=\"member-img-sm mb-1\">\n                <img class=\"per-member small-head\" src=\"https://i.imgur.com/5PlS2aH.png\" alt=\"Bangchan\">\n            </div>\n            <h2 class=\"text-maingray text-center fz-16\">Bangchan</h2>\n          </label> \n        <label for=\"head11\">\n          <input type=\"checkbox\" id=\"head11\" class=\"head\">\n          <div class=\"member-img-sm disabled mb-1\">\n              <img class=\"per-member small-head\" src=\"https://i.imgur.com/ATWXtR9.png\" alt=\"Leeknow\">\n          </div>\n          <h2 class=\"text-maingray text-center fz-16 tx-disabled\">Leeknow</h2>\n        </label> \n        <label for=\"head12\">\n          <input type=\"checkbox\" id=\"head12\" class=\"head\">\n          <div class=\"member-img member-img-sm mb-1\">\n              <img class=\"per-member small-head\" src=\"https://i.imgur.com/XhAHWYu.png\" alt=\"Changbin\">\n          </div>\n          <h2 class=\"text-maingray text-center fz-16\">Changbin</h2>\n        </label> \n        <label for=\"head13\">\n            <input type=\"checkbox\" id=\"head13\" class=\"head\">\n            <div class=\"member-img member-img-sm mb-1\">\n                <img class=\"per-member small-head\" src=\"https://i.imgur.com/AANylPt.png\" alt=\"Hyunjin\">\n            </div>\n            <h2 class=\"text-maingray text-center fz-16\">Hyunjin</h2>\n          </label> \n      </div>\n      <div class=\"member-row member-row-sm d-flex justify-content-between mb-2\">\n\n        <label for=\"head14\">\n            <input type=\"checkbox\" id=\"head14\" class=\"head\">\n            <div class=\"member-img member-img-sm mb-1\">\n                <img class=\"per-member small-head\" src=\"https://i.imgur.com/UQ7he1p.png\" alt=\"Han\">\n            </div>\n            <h2 class=\"text-maingray text-center fz-16\">Han</h2>\n          </label> \n        <label for=\"head15\">\n          <input type=\"checkbox\" id=\"head15\" class=\"head\">\n          <div class=\"member-img member-img-sm mb-1\">\n              <img class=\"per-member small-head\" src=\"https://i.imgur.com/UFTzeFH.png\" alt=\"Felix\">\n          </div>\n          <h2 class=\"text-maingray text-center fz-16\">Felix</h2>\n        </label> \n        <label for=\"head16\">\n          <input type=\"checkbox\" id=\"head16\" class=\"head\">\n          <div class=\"member-img member-img-sm mb-1\">\n              <img class=\"per-member small-head\" src=\"https://i.imgur.com/UiFtZSu.png\" alt=\"Seungmin\">\n          </div>\n          <h2 class=\"text-maingray text-center fz-16\">Seungmin</h2>\n        </label> \n        <label for=\"head17\">\n            <input type=\"checkbox\" id=\"head17\" class=\"head\">\n            <div class=\"member-img member-img-sm mb-1\">\n                <img class=\"per-member small-head\" src=\"https://i.imgur.com/3JdX3kx.png\" alt=\"I.N\">\n            </div>\n            <h2 class=\"text-maingray text-center fz-16\">I.N</h2>\n          </label> \n      </div>\n    </div>\n    <div class=\"member-option\">\n      <div class=\"member-row member-row-sm d-flex justify-content-between mb-2\">\n        <div class=\"py-1 px-1 rounded-xxl\">\n          <label for=\"head10\">\n              <input type=\"checkbox\" id=\"head10\" class=\"head\">\n              <div class=\"member-img member-img-sm mb-1\">\n                  <img class=\"per-member small-head\" src=\"https://i.imgur.com/5PlS2aH.png\" alt=\"Bangchan\">\n              </div>\n              <h2 class=\"text-maingray text-center fz-16\">Bangchan</h2>\n            </label> \n          </div>\n          <div class=\"py-1 px-1 rounded-xxl\">\n          <label for=\"head11\">\n            <input type=\"checkbox\" id=\"head11\" class=\"head\">\n            <div class=\"member-img member-img-sm disabled mb-1\">\n                <img class=\"per-member small-head\" src=\"https://i.imgur.com/ATWXtR9.png\" alt=\"Leeknow\">\n            </div>\n            <h2 class=\"text-maingray text-center fz-16 tx-disabled\">Leeknow</h2>\n          </label> \n        </div>\n        <div class=\"py-1 px-1 rounded-xxl\">\n          <label for=\"head12\">\n            <input type=\"checkbox\" id=\"head12\" class=\"head\">\n            <div class=\"member-img member-img-sm mb-1\">\n                <img class=\"per-member small-head\" src=\"https://i.imgur.com/XhAHWYu.png\" alt=\"Changbin\">\n            </div>\n            <h2 class=\"text-maingray text-center fz-16\">Changbin</h2>\n          </label> \n        </div>\n        <div class=\"py-1 px-1 rounded-xxl\">\n          <label for=\"head13\">\n              <input type=\"checkbox\" id=\"head13\" class=\"head\">\n              <div class=\"member-img member-img-sm mb-1\">\n                  <img class=\"per-member small-head\" src=\"https://i.imgur.com/AANylPt.png\" alt=\"Hyunjin\">\n              </div>\n              <h2 class=\"text-maingray text-center fz-16\">Hyunjin</h2>\n            </label> \n        </div>\n      </div>\n        <div class=\"member-row member-row-sm d-flex justify-content-between mb-2\">\n          <div class=\"py-1 px-1 rounded-xxl\">\n          <label for=\"head14\">\n              <input type=\"checkbox\" id=\"head14\" class=\"head\">\n              <div class=\"member-img member-img-sm mb-1\">\n                  <img class=\"per-member small-head\" src=\"https://i.imgur.com/UQ7he1p.png\" alt=\"Han\">\n              </div>\n              <h2 class=\"text-maingray text-center fz-16\">Han</h2>\n            </label> \n          </div>\n          <div class=\"white-area py-1 px-1 rounded-xxl\">\n          <label for=\"head15\">\n            <input type=\"checkbox\" id=\"head15\" class=\"head\">\n            <div class=\"member-img member-img-sm mb-1\">\n                <img class=\"per-member small-head\" src=\"https://i.imgur.com/UFTzeFH.png\" alt=\"Felix\">\n            </div>\n            <h2 class=\"text-maingray text-center fz-16\">Felix</h2>\n          </label> \n        </div>\n        <div class=\"white-area py-1 px-1 rounded-xxl\">\n          <label for=\"head16\">\n            <input type=\"checkbox\" id=\"head16\" class=\"head\">\n            <div class=\"member-img member-img-sm mb-1\">\n                <img class=\"per-member small-head\" src=\"https://i.imgur.com/UiFtZSu.png\" alt=\"Seungmin\">\n            </div>\n            <h2 class=\"text-maingray text-center fz-16\">Seungmin</h2>\n          </label> \n        </div>\n          <div class=\"white-area py-1 px-1 rounded-xxl\">\n          <label for=\"head17\">\n              <input type=\"checkbox\" id=\"head17\" class=\"head\">\n              <div class=\"member-img member-img-sm mb-1\">\n                  <img class=\"per-member small-head\" src=\"https://i.imgur.com/3JdX3kx.png\" alt=\"I.N\">\n              </div>\n              <h2 class=\"text-maingray text-center fz-16\">I.N</h2>\n            </label>\n          </div> \n        </div>\n      </div>\n      <h2 class=\"text-primary\">$").concat(price, "</h2>\n      <div class=\"btn-area my-lg-4 px-lg-2 d-flex flex-column align-items-end\">\n        <p class=\"fz-8 mb-1 display-none\">\uFF0A\u78BA\u8A8D\u5361\u4F4D\u6210\u54E1\u5F8C\u7121\u6CD5\u66F4\u6539\u3002\u9001\u51FA\u524D\u8ACB\u518D\u4E09\u78BA\u8A8D\u3002</p>\n        <p class=\"fz-8 mb-1\">\uFF0A\u5E36\u85CD\u5340\u5FC5\u5E36\u7D05\u5340\uFF0C\u8ACB\u78BA\u8A8D\u662F\u5426\u9054\u6210\u5FC5\u586B\u9580\u6ABB\uFF0C\u5426\u5247\u5C07\u7121\u6CD5\u9001\u51FA\u3002</p>\n        <div class=\"btns d-flex\">\n        <button type=\"button\" class=\"product-btn btn btn-white border-primary rounded-xxl py-1 px-3 me-3\" id=\"confirmJoinBtn\">\u78BA\u8A8D\u5361\u4F4D<span>(2)</span></button>\n        <button type=\"button\" class=\"product-btn btn btn-white border-primary rounded-xxl py-1 px-3\"><i class=\"fa-regular fa-heart me-2\"></i>\u6536\u85CF</button>\n    </div>\n      </div>");
    console.log(internationalFee.amount);
    console.log(internationalFeeArea);
    internationalFeeArea.innerHTML = "<p><i class=\"fa-solid fa-plane me-3 text-primary fz-20\"></i>\u570B\u969B\u904B\u8CBB</p><p class=\"text-orange pe-1\">".concat(internationalFee.amount, "</p>");
    var courierOption = Object.keys(domesticCourier);
    var courierStr = '';
    courierOption.forEach(function (el) {
      courierStr += "<li>".concat(el, " $").concat(domesticCourier[el], "</li>");
    });
    domesticCourierList.innerHTML = courierStr;
  }
} //欠：個別賣家賣場/ 
//
//# sourceMappingURL=all.js.map

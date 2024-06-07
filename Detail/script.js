var mainImage = document.getElementById("mainImage");
var variantWrapImages = document.querySelector("#variantWrapImages");
var disCount = document.getElementById("disCount");
var productName = document.getElementById("productName");
var productOldPrice = document.getElementById("productOldPrice");
var productPrice = document.getElementById("productPrice");
var productDesc = document.getElementById("productDesc");

var profileName = document.querySelectorAll(".product-name-id");
var iconDefault = document.querySelectorAll(".profile-icon");
var iconLogeed = document.querySelectorAll(".btn-group");
var dropdownMenuButton1 = document.getElementById("dropdownMenuButton1");
var dropdownSearch = document.getElementById("dropdownSearch");
var inputSearchMain = document.querySelectorAll(".input-search-main");
var dropdownMenuMain = document.querySelectorAll(".dropdown-menu-main");
var itemCart = document.getElementsByClassName('item-cart');

var buttonSearch = document.querySelectorAll(".button-search");
var productQuantity = document.getElementById("productQuantity");
var currentImgComment = document.getElementById("currentImgComment");

var products = [];
var quantity = productQuantity.value;
var currentUserParse = {};
var productDetail = {};
var currentProductID = 0;
var avatarUrl;


var onLoadProductDetail = async () => {
  const { search } = window.location;
  const pathName = search.split("=")[1];

  const response = await fetch('../product.json');
  const productsGlobal = await response.json();

  products = productsGlobal;
  productDetail = products.find((product) => product.slug === pathName);
  currentProductID = productDetail.id;


  mainImage.src = `../img/${productDetail.images[0]}`;
  mainImage.dataset.zoom = `../img/${productDetail.images[0]}`;
  disCount.innerText = productDetail.discount + '%';
  productName.innerText = productDetail.name;
  productOldPrice.innerText = formatVND(productDetail.oldPrice);
  productPrice.innerText = formatVND(productDetail.price);
  productDesc.innerText = productDetail.description;
  document.title = productDetail.name;

  variantWrapImages.innerHTML = '';

  productDetail.images.forEach((image, index) => {
    const variantProductItemHTML = `
        <img class="variantProductItem ${index === 0 ? 'variant-image-active' : ''}  me-2 me-md-4" 
        src="../img/${image}" alt="" width="100"
        height="100" data-zoom="../img/${image}">
      `;

    variantWrapImages.insertAdjacentHTML('beforeend', variantProductItemHTML);
  });

  var variantProductItem = document.querySelectorAll(".variantProductItem");

  for (let i = 0; i < variantProductItem.length; i++) {
    variantProductItem[i].addEventListener("click", (e) => {
      mainImage.src = e.target.src;
      // mainImage.setAttribute("data-zoom", this.getAttribute("data-zoom"));

      for (let j = 0; j < variantProductItem.length; j++) {
        variantProductItem[j].classList.remove("variant-image-active");
      }

      e.target.classList.add("variant-image-active");
    }, false);
  }

};
onLoadProductDetail();


var setProfileUser = () => {
  const currentUser = localStorage.getItem('user_info');
  currentUserParse = currentUser ? JSON.parse(currentUser) : null;

  if (currentUserParse?.fullname) {
    const url = createInitialAvatar(currentUserParse?.fullname);
    currentImgComment.src = url;
    avatarUrl = url;
  }

  if (currentUserParse?.fullname) {
    const nameParts = currentUserParse.fullname.trim().split(" ");
    const lastName = nameParts[nameParts.length - 1];
    profileName[0].innerHTML = lastName;
    profileName[1].innerHTML = lastName;
    iconLogeed[0].style.display = "block";
    iconLogeed[1].style.display = "block";
  } else {
    iconLogeed[0].style.display = "none";
    iconLogeed[1].style.display = "none";
  }

  if (!currentUserParse?.fullname) {
    iconDefault[0].style.display = "block"
    iconDefault[1].style.display = "block"
  } else {
    iconDefault[0].style.display = "none"
    iconDefault[1].style.display = "none"
  }
}

setProfileUser();


var setCartCount = () => {
  const currentUser = localStorage.getItem('user_info');
  const userParsed = JSON.parse(currentUser);

  if (userParsed?.id && userParsed?.cart.length) {
    itemCart[0].innerHTML = userParsed.cart.length;
    itemCart[1].innerHTML = userParsed.cart.length;
    itemCart[0].style.display = 'flex';
    itemCart[1].style.display = 'flex';
  } else {
    itemCart[0].style.display = 'none';
    itemCart[1].style.display = 'none';
  }
}

setCartCount();

var listComment = document.getElementById("listComment");
var countReview = document.getElementById("countReview");
var onLoadReviewsList = async () => {
  const product = localStorage.getItem("list_review");
  let productParse = [];

  if (product) {
    productParse = JSON.parse(product);
  } else {
    productParse = [];
    localStorage.setItem("list_review", JSON.stringify(productParse));
  }

  // wait product detail load
  setTimeout(() => {
    const productItem = productParse.find(({ id }) => id == currentProductID);
    listComment.innerHTML = "";

    productItem?.reviews?.forEach((item) => {
      const commentItemHTML = `
        <div class="comment-item border-bottom py-4 py-xl-5 px-xl-5">
          <div class="d-flex justify-content-between mb-3">
              <div class="d-flex gap-3">
                  <img class="comment-write-img" src="${item.avatarUrl}" alt="">
                  <div>
                      <div class="d-flex align-items-center gap-2">
                          <div class="comment-author fw-bold">${item.author}</div>
                          <div class="comment-create-at">${item.createAt}</div>
                      </div>
                      <div>
                          <img src="../img/star.png" width="14" height="14" alt="">
                          <img src="../img/star.png" width="14" height="14" alt="">
                          <img src="../img/star.png" width="14" height="14" alt="">
                          <img src="../img/star.png" width="14" height="14" alt="">
                          <img src="../img/star.png" width="14" height="14" alt="">
                      </div>
                  </div>
              </div>
              <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>

          <div class="comment-content">${item.content}</div>
        </div>`

      listComment.insertAdjacentHTML('beforeend', commentItemHTML);
    })

    countReview.innerText = (productItem?.reviews ? productItem?.reviews?.length : 0)
      + ' phản hồi'

  }, 1000);
}

onLoadReviewsList();


var onMinusQuantity = () => {
  if (quantity > 1) {
    quantity--;
    productQuantity.value = quantity;
  }
}

var onPlusQuantity = () => {
  quantity++;
  productQuantity.value = quantity;
}

var onAddProductToCart = () => {
  const listUser = getLocalStorage(LIST_USER) || [];
  const user = listUser.find(({ id }) => id === currentUserParse.id);

  if (user) {
    const productInCart = user.cart.find(item => item.id === productDetail.id);

    if (productInCart) {
      productInCart.quantity += parseInt(productQuantity.value);
    } else {
      user.cart.push(new Product(
        productDetail.id,
        productDetail.name,
        productDetail.images[0],
        parseInt(productQuantity.value),
        productDetail.price
      ));


    }

    localStorage.setItem('list_user', JSON.stringify(listUser));
    localStorage.setItem('user_info', JSON.stringify(user));

    setCartCount();
  } else {
    redirectPage("Login");
  }
}

var onFocusInputComment = () => {
  document.getElementById('comment-buttons').style.display = 'flex'
}

var onCancelInput = () => {
  document.getElementById('comment-buttons').style.display = 'none'
}

var onPostComment = () => {
  const product = localStorage.getItem("list_review");
  const productParse = product ? JSON.parse(product) : null;
  var commentInput = document.getElementById("commentInput");

  // current product item
  let productItem = productParse.find(({ id }) => id === currentProductID);
  if (!productItem) {
    productItem = {
      id: currentProductID,
      reviews: []
    };
    productParse.push(productItem);
    localStorage.setItem("list_review", JSON.stringify(productParse));
  }

  // Format date and time
  const now = new Date();
  const formattedDateTime =
    ('0' + now.getHours()).slice(-2) + ':' +
    ('0' + now.getMinutes()).slice(-2) + ' ' +
    ('0' + now.getDate()).slice(-2) + '-' +
    ('0' + (now.getMonth() + 1)).slice(-2) + '-' +
    now.getFullYear();

  if (commentInput && commentInput.value.trim()) {
    productItem.reviews.push(new Comments(
      currentUserParse.fullname,
      avatarUrl,
      formattedDateTime,
      commentInput.value.trim()
    ))
  }


  localStorage.setItem("list_review", JSON.stringify(productParse));
  commentInput.value = "";
  onLoadReviewsList();
}

var onLogout = () => {
  setLocalStorage(USER_INFO, {});
  redirectPage("Login");
}


// search debouce
var keyword;

inputSearchMain[0].addEventListener('input', function (e) {
  keyword = e.target.value.toLowerCase();

  if (keyword) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(keyword)
    );

    dropdownMenuMain[0].innerHTML = "";

    if (filteredProducts.length === 0) dropdownMenuMain[0].innerHTML = `
      <li><a class="dropdown-item">Không tìm thấy kết quả phù hợp</a></li>`;

    filteredProducts.forEach(({ name }) => {
      let highlightName = name.replace(new RegExp(keyword, 'gi'), (match) => {
        return `<span style="font-weight: bold">${match}</span>`;
      });

      const resultItemHTML = `
      <li class="result-search-item"><a class="dropdown-item" href="/Search/index.html?keyword=${name}">${highlightName}</a></li>
      `

      dropdownMenuMain[0].insertAdjacentHTML('beforeend', resultItemHTML);
    })

    dropdownMenuMain[0].style.display = "block";
  } else {
    dropdownMenuMain[0].style.display = "none";
  }
});

inputSearchMain[1].addEventListener('input', function (e) {
  keyword = e.target.value.toLowerCase();

  if (keyword) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(keyword)
    );

    dropdownMenuMain[1].innerHTML = "";

    if (filteredProducts.length === 0) dropdownMenuMain[1].innerHTML = `
      <li><a class="dropdown-item">Không tìm thấy kết quả phù hợp</a></li>`;

    filteredProducts.forEach(({ name }) => {
      let highlightName = name.replace(new RegExp(keyword, 'gi'), (match) => {
        return `<span style="font-weight: bold">${match}</span>`;
      });

      const resultItemHTML = `
      <li class="result-search-item"><a class="dropdown-item" href="/Search/index.html?keyword=${name}">${highlightName}</a></li>
      `

      dropdownMenuMain[1].insertAdjacentHTML('beforeend', resultItemHTML);
    })

    dropdownMenuMain[1].style.display = "block";
  } else {
    dropdownMenuMain[1].style.display = "none";
  }
});


document.addEventListener('click', function (event) {
  var isClickInsideInput = inputSearchMain[0].contains(event.target);
  var isClickInsideDropdown1 = dropdownMenuMain[0].contains(event.target);
  var isClickInsideDropdown2 = dropdownMenuMain[1].contains(event.target);

  if (!isClickInsideInput && !isClickInsideDropdown1 && !isClickInsideDropdown2) {
    dropdownMenuMain[0].style.display = "none";
    dropdownMenuMain[1].style.display = "none";
  }
});


inputSearchMain[0].addEventListener('focus', function () {
  dropdownMenuMain[0].style.display = "block";
});


inputSearchMain[1].addEventListener('focus', function () {
  dropdownMenuMain[1].style.display = "block";
});



var onSearch = () => {
  window.location.replace(window.location.protocol + "//" +
    window.location.host + '/Search/index.html?keyword=' + keyword);
}

inputSearchMain[0].addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    onSearch();
  }
});

inputSearchMain[1].addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    onSearch();
  }
});





// new Drift(document.querySelector(".product-img"), {
//   paneContainer: document.querySelector(".details"),
//   inlinePane: 900,
//   inlineOffsetY: -85,
//   containInline: true,
//   hoverBoundingBox: true,
// });




var backToTopBtn = document.getElementById("btn-gotop");

window.onscroll = function () {
  if (window.scrollY >= 2000) {
    backToTopBtn.style.opacity = "1";
  } else {
    backToTopBtn.style.opacity = "0";
  }
};

backToTopBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});


function createInitialAvatar(fullname) {
  // Lấy từ cuối cùng và chữ cái đầu của từ đó
  const nameParts = fullname.trim().split(" ");
  const initial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();

  // Tạo nền màu ngẫu nhiên
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFF6', '#FF8C33'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  // Tạo canvas để vẽ ảnh
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 100;
  canvas.height = 100;

  // Vẽ hình tròn màu nền
  context.fillStyle = randomColor;
  context.beginPath();
  context.arc(50, 50, 50, 0, Math.PI * 2);
  context.fill();

  // Vẽ chữ cái đầu
  context.fillStyle = '#FFFFFF'; // Màu chữ
  context.font = '50px Arial';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(initial, 50, 50);

  // Trả về URL của ảnh và màu nền
  return canvas.toDataURL()
}
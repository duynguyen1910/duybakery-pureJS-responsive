var profileName = document.querySelectorAll(".product-name-id");
var iconDefault = document.querySelectorAll(".profile-icon");
var iconLogeed = document.querySelectorAll(".btn-group");

var dropdownMenuButton1 = document.getElementById("dropdownMenuButton1");
var dropdownSearch = document.getElementById("dropdownSearch");
var inputSearchMain = document.querySelectorAll(".input-search-main");
var dropdownMenuMain = document.querySelectorAll(".dropdown-menu-main");
var buttonSearch = document.querySelectorAll(".button-search");

var cartBody = document.getElementById('cartBody');
var emptyCart = document.getElementById('emptyCart')
var itemCart = document.getElementsByClassName('item-cart');
var totalCart = document.getElementById('totalCart');
var inputQuantity = document.getElementsByClassName("input-quantity");

var provinceSelect = document.getElementById("province");
var paymentOptions = document.querySelectorAll(".payment-options");

var usernamePayment = document.getElementById("usernamePayment");
var phoneNumberPayment = document.getElementById("phoneNumberPayment");


var products = [];
// var cart = [];
var currentUserParse = {};


var setProfileUser = () => {
  const currentUser = localStorage.getItem('user_info');
  currentUserParse = currentUser ? JSON.parse(currentUser) : null;

  if (currentUserParse?.fullname) {
    const nameParts = currentUserParse.fullname.trim().split(" ");
    const lastName = nameParts[nameParts.length - 1];
    profileName[0].innerHTML = lastName;
    profileName[1].innerHTML = lastName;
    iconLogeed[0].style.display = "block";
    iconLogeed[1].style.display = "block";

    usernamePayment.innerText = currentUserParse.fullname;
    phoneNumberPayment.innerText = currentUserParse.username.replace('0', '(+84) ');
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


var renderCart = () => {
  const currentUser = localStorage.getItem('user_info');
  let currentUserParse = currentUser ? JSON.parse(currentUser) : null;
  const wrapperProductCart = document.getElementById('wrapperProductCart');

  wrapperProductCart.innerHTML = '';

  currentUserParse?.cart?.forEach((item) => {
    const cartItemHTML = `
      <div class="row py-4 border-bottom align-items-center">
        <div class="d-flex align-items-center justify-content-center col-6 col-md-3">
            <img class="img-product" src="../img/${item.image}" alt="" width="140" height="140">
        </div>
        <div class="col-6 d-flex flex-column justify-content-center gap-2 d-md-none"
            style="color: #010148;">
            <h6 class="fw-bold text-sm-start">${item.name}</h6>
            <h6 class="price fw-bold text-xl-start" style="color: #ff6924;">${formatVND(item.price)}&nbsp;</h6>
            <div class="qty-input border">
                <input disabled data-product-id="${item.id}" class="product-qty input-quantity" type="number" name="product-qty" min="0" value=${item.quantity}>
            </div>
            <i class="fa fa-trash d-none" aria-hidden="true"></i>
        </div>
        <h6 class="fw-bold text-sm-start d-none d-md-block col-md-2">${item.name}</h6>
        <h6 class="price fw-bold text-xl-start  d-none d-md-block col-md-2" style="color: #ff6924;">
            ${formatVND(item.price)}&nbsp;</h6>
        <div class="d-none d-md-block col-md-3 ">
            <div class="border qty-input">
                <input disabled data-product-id="${item.id}" class="product-qty input-quantity" type="number" name="product-qty" min="0" value=${item.quantity}>
            </div>
        </div>

        <h5 class="price fw-bold d-none d-md-block col-md-2" style="color: #ff6924;">${formatVND(item.price * item.quantity)}</h5>
      </div>  
    `

    wrapperProductCart.insertAdjacentHTML('beforeend', cartItemHTML);
  });
}
renderCart();


var setCartCount = () => {
  const currentUser = localStorage.getItem('user_info');
  const userParsed = JSON.parse(currentUser);

  if (userParsed?.id && userParsed?.cart.length) {
    itemCart[0].innerHTML = userParsed.cart.length;
    itemCart[1].innerHTML = userParsed.cart.length;
  } else {
    itemCart[0].style.display = 'none';
    itemCart[1].style.display = 'none';
  }

  const total = userParsed?.cart?.reduce((accumulator, item) => accumulator + (item.price * item.quantity), 0);
  totalCart.innerHTML = "";
  totalCart.innerHTML = formatVND(total);
}
setCartCount();


var addInputEventListeners = () => {
  document.querySelectorAll('.input-quantity').forEach(input => {
    input.addEventListener('input', (event) => {
      const productID = event.target.getAttribute('data-product-id');
      const newQuantity = parseInt(event.target.value);

      if (newQuantity && newQuantity > 0) {
        updateCartQuantity(parseInt(productID), newQuantity);
      }
    });
  });

}

addInputEventListeners();


const listUser = getLocalStorage('list_user') || [];
var updateCartQuantity = (productID, newQuantity) => {
  const currentUser = listUser.find(({ id }) => id === currentUserParse.id);
  const productIndex = currentUser.cart.findIndex(item => item.id === productID);

  currentUser.cart[productIndex].quantity = newQuantity;

  localStorage.setItem('user_info', JSON.stringify(currentUser));
  localStorage.setItem('list_user', JSON.stringify(listUser));

  renderCart();
  setCartCount();
  addInputEventListeners();
}

document.querySelectorAll('.payment-option').forEach((option) => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
  })
})

var keyword;

inputSearchMain[0].addEventListener('input', function (e) {
  keyword = e.target.value.toLowerCase().trim();

  if (keyword) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(keyword)
    );

    dropdownMenuMain[0].innerHTML = "";

    if (filteredProducts.length === 0) dropdownMenuMain[0].innerHTML = `
      <li><a class="dropdown-item">Không tìm thấy kết quả phù hợp</a></li>`;

    filteredProducts.forEach(({ name, slug }) => {
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
  keyword = e.target.value.toLowerCase().trim();

  if (keyword) {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(keyword)
    );

    dropdownMenuMain[1].innerHTML = "";

    if (filteredProducts.length === 0) dropdownMenuMain[1].innerHTML = `
      <li><a class="dropdown-item">Không tìm thấy kết quả phù hợp</a></li>`;

    filteredProducts.forEach(({ name, slug }) => {
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
  if (keyword) {
    dropdownMenuMain[0].style.display = "block";
  }

});


inputSearchMain[1].addEventListener('focus', function () {
  if (keyword) {
    dropdownMenuMain[1].style.display = "block";
  }
});


var onSearch = () => {
  if (keyword) {
    window.location.replace(window.location.protocol + "//" +
      window.location.host + '/Search/index.html?keyword=' + keyword);
  }
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



var onLogout = () => {
  setLocalStorage(USER_INFO, {});
  redirectPage("Login");
}


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
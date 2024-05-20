var productListWrapTag = document.querySelector("#productListWrapTag");
var profileName = document.querySelectorAll(".product-name-id");
var iconDefault = document.querySelectorAll(".profile-icon");
var iconLogeed = document.querySelectorAll(".btn-group");
var dropdownMenuButton1 = document.getElementById("dropdownMenuButton1");
var dropdownSearch = document.getElementById("dropdownSearch");
var inputSearchMain = document.querySelectorAll(".input-search-main");
var dropdownMenuMain = document.querySelectorAll(".dropdown-menu-main");
var buttonSearch = document.querySelectorAll(".button-search");

var moreButton = document.getElementById("more");
var lessButton = document.getElementById("less");

var categories = [];
var products = [];
var isExpanded = false;
var categoriesChecked = [];
var keyword = "";
var categoryParam = 0;


var onLoadCategory = async () => {
  const categoryFilterWrap = document.getElementById("categoryFilterWrap");
  const response = await fetch('../category.json');
  const category = await response.json();
  categories = category;

  categoryFilterWrap.innerHTML = '';

  const itemsToShow = isExpanded ? category.length : 5;

  category.slice(0, itemsToShow).forEach(({ id, name }) => {
    const cateItemHTML = `
      <div class="form-check mb-1">
        <input ${categoryParam === id ? 'checked' : ''} onclick="onCheckCategory(id)"
         class="form-check-input" type="checkbox" value="" id="${id}">
        <label class="form-check-label" for="${id}">
            ${name}
        </label>
      </div>
    `;
    categoryFilterWrap.insertAdjacentHTML('beforeend', cateItemHTML);
  });


  moreButton.style.display = isExpanded ? 'none' : 'inline-block';
  lessButton.style.display = isExpanded ? 'inline-block' : 'none';
}
onLoadCategory();


var onCheckCategory = (checkedID) => {
  const parseIntID = parseInt(checkedID);

  if (categoriesChecked?.includes(parseIntID)) {
    categoriesChecked = categoriesChecked.filter((id) => id !== parseIntID);
  } else {
    categoriesChecked = [...categoriesChecked, parseIntID]
  }

  // re-render product list by category checkbox 
  const filteredByCategoryID = products.filter(({ name, categoryID }) =>
    (name.toLowerCase().includes(keyword) && categoriesChecked.includes(categoryID)));

  productListWrapTag.innerHTML = "";

  filteredByCategoryID.forEach(product => {
    const productItemHTML = `
        <div class="col-sm-6 col-xxl-4">
            <div class="product-block">
                <div class="left-block">
                    <a class="product_img_link text-center text-sm-start" href="../Detail/index.html?n=${product.slug}"
                        title="${product.name}">
                        <img class="img-responsive" src="../img/${product.images[0]}" alt="${product.name}"
                            width="250" height="250" /></a>
                    <span class="quick-view btn-tooltip"><i class="fa fa-eye"></i></span>
                    <span class="label-new label">Mới</span>
                </div>
                <div class="right-block">
                    <div class="product-meta">
                        <h5 class="name">
                            <span class="product-name">${product.name}</span>
                        </h5>
                        <div class="d-flex justify-content-between align-items-center w-100 comments_note product-rating clearfix">
                            <div class="star_content">
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                            </div>
                            <div class="tag-category-product-item">
                               ${getCategoryName(product.categoryID)}
                            </div>
                        </div>
                        <div class="content_price">
                            <span class="price product-price">${formatVND(product.price)}
                            </span>
                            <span class="old-price product-price">${formatVND(product.oldPrice)}</span>
                            <span class="price-percent-reduction">${product.discount}%</span>
                        </div>
                        <div class="functional-buttons clearfix">
                            <span class="button ajax_add_to_cart_button">Thêm nhanh</span>
                            <span class="btn-tooltip addToWishlist">
                                <i class="fa fa-heart" aria-hidden="true"></i>
                            </span>
                            <span class="btn-tooltip addToWishlist">
                                <i class="fa fa-comment" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    productListWrapTag.insertAdjacentHTML('beforeend', productItemHTML);
  });
}


var toggleCategories = () => {
  isExpanded = !isExpanded;

  onLoadCategory();
}


var onLoadProductByKeyword = async () => {
  const response = await fetch('../product.json');
  const productsGlobal = await response.json();

  products = productsGlobal;

  let filteredProducts = [];

  if (keyword) {
    filteredProducts = productsGlobal.filter(({ name }) =>
      name.toLowerCase().includes(keyword)
    );
  } else {
    filteredProducts = productsGlobal.filter(({ categoryID }) => categoryID === categoryParam);
  }

  productListWrapTag.innerHTML = "";

  filteredProducts.forEach(product => {
    const productItemHTML = `
        <div class="col-sm-6 col-xxl-4">
            <div class="product-block">
                <div class="left-block">
                    <a class="product_img_link text-center text-sm-start" href="../Detail/index.html?n=${product.slug}"
                        title="${product.name}">
                        <img class="img-responsive" src="../img/${product.images[0]}" alt="${product.name}"
                            width="250" height="250" /></a>
                    <span class="quick-view btn-tooltip"><i class="fa fa-eye"></i></span>
                    <span class="label-new label">Mới</span>
                </div>
                <div class="right-block">
                    <div class="product-meta">
                        <h5 class="name">
                            <span class="product-name">${product.name}</span>
                        </h5>
                        <div class="d-flex justify-content-between align-items-center w-100 comments_note product-rating clearfix">
                            <div class="star_content">
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                            </div>
                            <div class="tag-category-product-item">
                               ${getCategoryName(product.categoryID)}
                            </div>
                        </div>
                        <div class="content_price">
                            <span class="price product-price">${formatVND(product.price)}
                            </span>
                            <span class="old-price product-price">${formatVND(product.oldPrice)}</span>
                            <span class="price-percent-reduction">${product.discount}%</span>
                        </div>
                        <div class="functional-buttons clearfix">
                            <span class="button ajax_add_to_cart_button">Thêm nhanh</span>
                            <span class="btn-tooltip addToWishlist">
                                <i class="fa fa-heart" aria-hidden="true"></i>
                            </span>
                            <span class="btn-tooltip addToWishlist">
                                <i class="fa fa-comment" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    productListWrapTag.insertAdjacentHTML('beforeend', productItemHTML);
  });
}


var getParamsURL = () => {
  const keywordSearch = document.querySelector('#keywordSearch');
  const params = window.location.search.slice(1).split("=");
  const decodeValueParam = decodeURIComponent(params[1]);

  if (params[0] === "category") {
    categoryParam = parseInt(params[1]);

    onCheckCategory(params[1]);
  } else {
    keyword = (decodeValueParam.toLowerCase());

    keywordSearch.innerHTML = decodeValueParam;
    inputSearchMain[0].value = decodeValueParam;
    inputSearchMain[1].value = decodeValueParam;
    document.title = decodeValueParam;
  }

  onLoadProductByKeyword();
}
getParamsURL();


var setProfileUser = () => {
  const currentUser = localStorage.getItem('user_info');
  let currentUserParse = currentUser ? JSON.parse(currentUser) : null;

  if (currentUserParse?.fullname) {
    profileName[0].innerHTML = currentUserParse.fullname.split(" ")[2];
    profileName[1].innerHTML = currentUserParse.fullname.split(" ")[2];
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


var getCategoryName = (categoryId) => {
  const categoryObj = categories.find(({ id }) => id === categoryId);

  return categoryObj?.name;
}


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
const profileName = document.querySelectorAll(".product-name-id");
const iconDefault = document.querySelectorAll(".profile-icon");
const iconLogeed = document.querySelectorAll(".btn-group");

const productListWrapTag = document.querySelector("#productListWrapTag");

let products = [];

const setProfileUser = () => {
  const currentUser = localStorage.getItem('user_info') || {};
  let { fullname } = JSON.parse(currentUser);

  if (fullname) {
    profileName[0].innerHTML = fullname.split(" ")[2];
    profileName[1].innerHTML = fullname.split(" ")[2];
    iconLogeed[0].style.display = "block";
    iconLogeed[1].style.display = "block";
  } else {
    iconLogeed[0].style.display = "none";
    iconLogeed[1].style.display = "none";
  }

  if (!fullname) {
    iconDefault[0].style.display = "block"
    iconDefault[1].style.display = "block"
  } else {
    iconDefault[0].style.display = "none"
    iconDefault[1].style.display = "none"
  }
}

setProfileUser();

const onLogout = () => {
  setLocalStorage(USER_INFO, {});
  redirectPage("Login");
}

const onRenderProduct = async () => {
  const response = await fetch('../product.json');
  products = await response.json();


  products.forEach(product => {
    const productItemHTML = `
        <div class="col-sm-6 col-lg-4 col-xxl-3">
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
                        <div class="comments_note product-rating clearfix">
                            <div class="star_content">
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
                                <i class="fas fa-star star"></i>
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

onRenderProduct();


// search product debouce
const dropdownMenuButton1 = document.getElementById("dropdownMenuButton1");
const dropdownSearch = document.getElementById("dropdownSearch");
const inputSearchMain = document.querySelectorAll(".input-search-main");
const dropdownMenuMain = document.querySelectorAll(".dropdown-menu-main");
const buttonSearch = document.querySelectorAll(".button-search");

let keyword;

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
        <li class="result-search-item"><a class="dropdown-item" href="#">${highlightName}</a></li>
        `

      dropdownMenuMain[0].insertAdjacentHTML('beforeend', resultItemHTML);
    })

    dropdownMenuMain[0].style.display = "block";
  } else {
    dropdownMenuMain[0].style.display = "none";
  }
});

inputSearchMain[0].addEventListener('blur', function () {
  dropdownMenuMain[0].style.display = "none";
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
        <li class="result-search-item"><a class="dropdown-item" href="#">${highlightName}</a></li>
        `

      dropdownMenuMain[1].insertAdjacentHTML('beforeend', resultItemHTML);
    })

    dropdownMenuMain[1].style.display = "block";
  } else {
    dropdownMenuMain[1].style.display = "none";
  }
});

inputSearchMain[1].addEventListener('blur', function () {
  dropdownMenuMain[1].style.display = "none";
});


const onSearch = () => {
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



// carousel blogs
let items = document.querySelectorAll("#carousel2 .carousel-item");
items.forEach((el) => {
  const minPerSlide = 3;
  let next = el.nextElementSibling;
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});

// header effect
const myButton = document.getElementsByClassName("navbar-toggler")[0];
const navbarEle = document.getElementById("navbar");
const logoNavEle = document.getElementById("logo-nav");
const backToTopBtn = document.getElementById("btn-gotop");
const quantityCart = document.getElementsByClassName("item-cart")[1];
const quantityCart0 = document.getElementsByClassName("item-cart")[0];

let flagMenuStatus = true;
myButton.onclick = function (e) {
  if (flagMenuStatus) {
    navbarEle.style.backgroundColor = "#000";
  } else {
    navbarEle.style.backgroundColor = "transparent";
  }
  flagMenuStatus = !flagMenuStatus;
};

window.onscroll = function () {
  if (window.scrollY >= 150) {
    navbarEle.style.backgroundColor = "#000";
    logoNavEle.src = "../img/logo.png";
    quantityCart.style.backgroundColor = "#ff6924";
    quantityCart0.style.backgroundColor = "#ff6924";
  } else {
    navbarEle.style.backgroundColor = "transparent";
    logoNavEle.src = "../img/logo-transparent.png";
    quantityCart.style.backgroundColor = "transparent";
    quantityCart0.style.backgroundColor = "transparent";
  }

  if (window.scrollY >= 3000) {
    backToTopBtn.style.opacity = "1";
  } else {
    backToTopBtn.style.opacity = "0";
  }
};

backToTopBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

// content carousel
const captions = document.querySelectorAll(".carousel-caption");
const hiddenClass = "hidden";
const hiddenClass1 = "hidden1";
const hiddenClass2 = "hidden2";

var TACarousel = document.querySelector("#carouselExampleAutoplaying");

let currentItem, nextItem;

document.addEventListener("DOMContentLoaded", (e) => {
  // console.log("AAAA", captions[0]);
  currentItem = captions[0];

  currentItem.firstElementChild.classList.remove(hiddenClass1);
  currentItem.lastElementChild.classList.remove(hiddenClass1);
});

// show
TACarousel.addEventListener("slid.bs.carousel", (e) => {
  currentItem = e.relatedTarget.nextElementSibling;

  if (e.to == 0) {
    nextItem.firstElementChild.classList.remove(hiddenClass1);
    nextItem.lastElementChild.classList.remove(hiddenClass1);
  }

  if (e.to == 1) {
    nextItem.firstElementChild.classList.remove(hiddenClass);
    nextItem.lastElementChild.classList.remove(hiddenClass);
  }

  if (e.to == 2) {
    nextItem.firstElementChild.classList.remove(hiddenClass2);
    nextItem.lastElementChild.classList.remove(hiddenClass);
  }

  if (e.to == 3) {
    nextItem.firstElementChild.classList.remove(hiddenClass1);
    nextItem.lastElementChild.classList.remove(hiddenClass2);

    if (!document.getElementById("year-carousel-caption").childNodes.length) {
      animateValue("year-carousel-caption", 0, 74);
      animateValue("cake-carousel-caption", 0, 150);
    }
  }
});

// hidden
TACarousel.addEventListener("slide.bs.carousel", (e) => {
  nextItem = e.relatedTarget.nextElementSibling;

  if (e.from == 0) {
    currentItem.firstElementChild.classList.add(hiddenClass1);
    currentItem.lastElementChild.classList.add(hiddenClass1);
  }

  if (e.from == 1) {
    currentItem.firstElementChild.classList.add(hiddenClass);
    currentItem.lastElementChild.classList.add(hiddenClass);
  }

  if (e.from == 2) {
    currentItem.firstElementChild.classList.add(hiddenClass2);
    currentItem.lastElementChild.classList.add(hiddenClass);
  }

  if (e.from == 3) {
    currentItem.firstElementChild.classList.add(hiddenClass1);
    currentItem.lastElementChild.classList.add(hiddenClass2);
  }
});

const animateValue = (id, start, end) => {
  if (start === end) return;
  var current = start;
  var increment = end > start ? 1 : -1;
  var obj = document.getElementById(id);
  var timer = setInterval(function () {
    current += increment;
    obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, 0);
};



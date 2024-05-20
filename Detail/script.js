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
var buttonSearch = document.querySelectorAll(".button-search");

var products = [];


var onLoadProductDetail = async () => {
  const { search } = window.location;
  const pathName = search.split("=")[1];

  const response = await fetch('../product.json');
  const productsGlobal = await response.json();

  products = productsGlobal;
  const productDetail = products.find((product) => product.slug === pathName);

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
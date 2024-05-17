var mainImage = document.getElementById("mainImage");
var variantWrapImages = document.querySelector("#variantWrapImages");
var disCount = document.getElementById("disCount");
var productName = document.getElementById("productName");
var productOldPrice = document.getElementById("productOldPrice");
var productPrice = document.getElementById("productPrice");
var productDesc = document.getElementById("productDesc");


var onLoadProductDetail = async () => {
  const { search } = window.location;
  const pathName = search.split("=")[1];

  const response = await fetch('../product.json');
  const products = await response.json();

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
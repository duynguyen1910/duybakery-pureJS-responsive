new Drift(document.querySelector(".product-img"), {
  paneContainer: document.querySelector(".details"),
  inlinePane: 900,
  inlineOffsetY: -85,
  containInline: true,
  hoverBoundingBox: true,
});

// change variant product
const mainImage = document.getElementById("main-image");
const variantIds = document.querySelectorAll("#vairiant-images");

variantIds[0].style.border = "2px solid #ff6924";

function imageSwap(e) {
  mainImage.src = this.src;
  mainImage.setAttribute("data-zoom", this.getAttribute("data-zoom"));

  variantIds.forEach((img) => {
    img.style.border = "solid 1px #e1e1e1";
  });

  if (this.src) {
    this.style.border = "2px solid #ff6924";
  }
}

for (let i = 0; i < variantIds.length; i++) {
  variantIds[i].addEventListener("click", imageSwap, false);
}



const backToTopBtn = document.getElementById("btn-gotop");

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
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
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

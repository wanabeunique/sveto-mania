import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";

document.querySelector(".header__burger").addEventListener("click", () => {
  document.querySelector(".header__menu").classList.toggle("active");
  if (document.querySelector(".header__menu").classList.contains("active")) {
    disableScroll();
  } else {
    enableScroll();
  }
});

const swiper = new Swiper(".slider__content", {
  modules: [Navigation, Pagination],
  loop: true,
  navigation: {
    nextEl: ".slider__next",
    prevEl: ".slider__prev",
  },
});

const tabs = [...document.querySelectorAll(".tabs")];

tabs.forEach((tab) => {
  let selectTab = [...tab.querySelectorAll(".tabs__top--item")];
  selectTab.forEach((select, i) => {
    select.addEventListener("click", () => {
      switchActiveSelect(select, i);
      switchTab(select, i);
    });
  });
});

function switchActiveSelect(select) {
  let contextSelects = [
    ...select.closest(".tabs__top").querySelectorAll(".tabs__top--item"),
  ];
  contextSelects.forEach((contextSelect) => {
    contextSelect.classList.remove("active-select");
  });
  select.classList.add("active-select");
}

function switchTab(select, i) {
  let contextItems = [
    ...select
      .closest(".tabs")
      .querySelector(".tabs__content")
      .querySelectorAll(".tabs__content--item"),
  ];
  contextItems.forEach((item) => {
    if (item !== contextItems[i]) {
      item.classList.remove("active-tab");
      return;
    }
    item.classList.add("active-tab");
  });
}

// calculator
const invoiceWrapper = document.querySelector(".calculator__invoice");
const invoiceFields = [
  ...invoiceWrapper.querySelectorAll(".calculator__field"),
];
invoiceFields.forEach((el) => (el.onclick = (event) => setInvoice(event)));

const companyWrapper = document.querySelector(".calculator__company");
const companyFields = [
  ...companyWrapper.querySelectorAll(".calculator__field"),
];
companyFields.forEach((el) => (el.onclick = (event) => setCompany(event)));

const calcs = [...document.querySelectorAll(".calculator__area")];
calcs.forEach((calc) => {
  calc.querySelector(".calculator__minus").addEventListener("click", () => {
    let value = calc.querySelector(".calculator__value").innerText.toString();
    if (value > 0) {
      value--;
    }
    calc.querySelector(".calculator__value").innerText = value;
  });
  calc.querySelector(".calculator__plus").addEventListener("click", () => {
    let value = calc.querySelector(".calculator__value").innerText.toString();
    value++;
    calc.querySelector(".calculator__value").innerText = value;
  });
});

function getRes() {}

function getInvoice() {}

function setInvoice(e) {
  const fields = [...invoiceWrapper.querySelectorAll(".calculator__field")];
  fields.forEach((field) => field.classList.remove("active"));
  event.target.classList.add("active");
}

function setCompany(e) {
  const fields = [...companyWrapper.querySelectorAll(".calculator__field")];
  fields.forEach((field) => field.classList.remove("active"));
  event.target.classList.add("active");
}

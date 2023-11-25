import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";

import disableScroll from "../../functions/disableScroll.js";
import enableScroll from "../../functions/enableScroll.js";
import validateForms from "../../functions/validateForms.js";

const rules = [
  {
    ruleSelector: ".calculator__input",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
];

function afterForm() {
  document.querySelector('.calculator__form').innerHTML = '<p class="text">Заявка успешно отправлена</p>'
}

validateForms("#form", rules, afterForm);

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

const matteItems = [
  { name: "MSD Classic", price: 620 },
  { name: "MSD Premium", price: 670 },
  { name: "MSD Evolution", price: 720 },
  { name: "Teqtum km2", price: 1650 },
  { name: "Teqtum euro", price: 750 },
  { name: "Lumfer", price: 1650 },
  { name: "Bauf 205", price: 670 },
  { name: "Halead", price: 600 },
];

const glossyItems = [
  { name: "MSD Premium", price: 950 },
  { name: "Bauf 205", price: 750 },
];

const satinItems = [
  { name: "MSD Premium", price: 950 },
  { name: "Teqtum euro", price: 750 },
  { name: "Bauf 205", price: 750 },
];

const clothItems = [{ name: "D-Premium", price: 200 }];

const cornerPrice = 150;
const lampPrice = 150;

function renderInitial() {
  const type = document
    .querySelector(".calculator__invoice")
    .querySelector(".active")
    .getAttribute("data-type");
  switch (type) {
    case "matte":
      renderList(matteItems);
      break;
    case "glossy":
      renderList(glossyItems);
      break;
    case "satin":
      renderList(satinItems);
      break;
    case "cloth":
      renderList(clothItems);
      break;
    default:
      break;
  }
}

function renderList(array) {
  const wrapper = document.querySelector(".calculator__company");
  wrapper.innerHTML = "";
  array.forEach((element, i) => {
    const domElement = document.createElement("div");
    domElement.textContent = element.name;
    domElement.setAttribute("price", element.price);
    domElement.classList.add("text");
    domElement.classList.add("calculator__field");
    domElement.onclick = (event) => setListenerCompany(event);
    if (i == 0) {
      domElement.classList.add("active");
    }
    wrapper.append(domElement);
  });
}

const resWrapper = document.querySelector(".calculator__price");
const invoiceWrapper = document.querySelector(".calculator__invoice");
const invoiceFields = [
  ...invoiceWrapper.querySelectorAll(".calculator__field"),
];
invoiceFields.forEach((el) => (el.onclick = (event) => setInvoice(event)));

const companyWrapper = document.querySelector(".calculator__company");
const companyFields = [
  ...companyWrapper.querySelectorAll(".calculator__field"),
];

const calcs = [...document.querySelectorAll(".calculator__area")];
calcs.forEach((calc) => {
  calc.querySelector(".calculator__minus").addEventListener("click", () => {
    const cornerFlag = calc
      .querySelector(".calculator__value")
      .getAttribute("data-corner");

    let value = calc.querySelector(".calculator__value").innerText.toString();
    if (value == 4 && cornerFlag) {
      value -= 4;
    } else if (value > 0) {
      value--;
    }

    calc.querySelector(".calculator__value").innerText = value;
    getRes();
  });
  calc.querySelector(".calculator__plus").addEventListener("click", () => {
    const cornerFlag = calc
      .querySelector(".calculator__value")
      .getAttribute("data-corner");
    let value = Number(calc.querySelector(".calculator__value").innerText);
    if (value == 0 && cornerFlag) {
      value += 4;
    } else {
      value++;
    }
    calc.querySelector(".calculator__value").innerText = value;
    getRes();
  });
});

function getRes() {
  const typePrice = document
    .querySelector(".calculator__company")
    .querySelector(".active")
    .getAttribute("price");
  const space = Number(document.querySelector(".calculator__space").innerHTML);
  const corner = Number(
    document.querySelector(".calculator__corner").innerHTML,
  );
  const lamp = Number(document.querySelector(".calculator__lamp").innerHTML);
  const lamp2 = Number(
    document.querySelector(".calculator__lamp--secondary").innerHTML,
  );
  const res =
    typePrice * space +
    corner * cornerPrice +
    lamp * lampPrice +
    lamp2 * lampPrice;
  resWrapper.innerHTML = res || 0;
}

function getInvoice() {}

function setInvoice(e) {
  const fields = [...invoiceWrapper.querySelectorAll(".calculator__field")];
  fields.forEach((field) => field.classList.remove("active"));
  event.target.classList.add("active");
  renderInitial();
  getRes();
}

function setListenerCompany(e) {
  const companyWrapper = document.querySelector(".calculator__company");
  const fields = [...companyWrapper.querySelectorAll(".calculator__field")];
  fields.forEach((field) => field.classList.remove("active"));
  event.target.classList.add("active");
  getRes();
}

renderInitial();
getRes();

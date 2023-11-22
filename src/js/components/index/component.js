import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';

document.querySelector('.header__burger').addEventListener('click', () => {
  document.querySelector('.header__menu').classList.toggle('active')
})

const swiper = new Swiper('.slider__content', {
  modules: [Navigation, Pagination],
  loop: true,
  navigation: {
    nextEl: '.slider__next',
    prevEl: '.slider__prev',
  },
})

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

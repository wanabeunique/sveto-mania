import enableScroll from './enableScroll.js';
import disableScroll from './disableScroll.js';

export default function scrollToggle() {
  if (document.body.classList.contains('dis-scroll')) {
    enableScroll();
  } else {
    disableScroll();
  }
}
import anime from './anime.js';
import Hamburger from './hamburger.js';

document.addEventListener('DOMContentLoaded', function(event) {
  anime();
  const hamburger = new Hamburger('.js-hamburger', '#js-gnav', 'click');
});

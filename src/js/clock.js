import { $ } from './helpers.js'
const navBarClock = $('.nav-bar__clock')
function clock() {
  setInterval(function () {
    const now = new Date();
    navBarClock.innerHTML = now.toLocaleTimeString();
  }, 1000);
}

export { clock }

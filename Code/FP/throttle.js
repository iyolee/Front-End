// HTML结构
// <button id="btn">click me</button>

const btn = document.getElementById('btn');

function throttle (fn, wait) {
  var timer;
  return function (...args) {
  if (!timer) {
    timer = setTimeout(() => timer = null, wait);
    return fn.apply(this, args);
    }
  }
}

btn.onclick = throttle(function () {
  console.log('button clicked');
}, 500);
// HTML结构
// <button id="btn">click me</button>

function once (fn) {
  return function (...args) {
    let ret;
    if (fn) {
    ret = fn.apply(this, args);
    }
    fn = null;
    return ret;
  }
}

btn.onclick = once(function (e) {
  console.log('clicked');
});
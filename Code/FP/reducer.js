function reducer (state, action) {
  return action(state);
}

function reverse (str) {
  return str.split('').reverse().join('');
}

function upperCase (str) {
  return str.toUpperCase();
}

let str = [reverse, upperCase].reduce(reducer, 'hello world');
console.log(str);
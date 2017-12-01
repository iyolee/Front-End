function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length ?
      fn.call(this, ...args) :
      (...rest) => {
        return curried.call(this, ...args, ...rest);
      };
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);  
curriedAdd(1)(2)(3);  
curriedAdd(1)(2,3); 
# 全面理解JavaScript中的this
this在JS中似乎可以视而不见，但不去正视它学到的就只是残缺的JS。抛开这些“形而上”的意义不说，从实用性及代码简洁展示this的不可或缺的地位，举例子：
``` JavaScript
function identifyUser () {
  return this.name.toUpperCase();
}

let obj1 = {
  name: leeper;
}

let obj2 = {
  name: Sandman;
}

identifyUser.call(obj1) // -> LEEPER
identifyUser.call(obj2) // -> SANDMAN
```
如果不使用this，就需要给identifyUser()显示传入一个上下文对象，但随着使用模式的增加，显示传递上下文对象成了”噩梦“，让代码也变得越来越混乱。为了将API设计得更加简洁并易于复用，就必须正视this。

### 什么是this
  如果在任何函数体外部，无论是否在严格模式，this都指代全局对象。这里着重讨论的是函数体内部的this。JavaScript的this总是指向一个对象，具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。

### 调用方式
  在函数内部，this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式：
  - 作为普通函数调用  
  this的值默认指向全局对象：
  ``` JavaScript
  let a = 233;
  function foo () {
    console.log(this.a);
  }
  foo() // -> 233
  ```
    但在严格模式下，this默认为undefined；
  - 作为对象的方法调用  
  函数调用时会绑定到上下文对象：
  ``` JavaScript
  let obj = {
    a: 233,
    foo: foo
  };
  function foo () {
    console.log(this.a);
  }
  obj.foo(); // -> 233
  ```
    对象引用链中只有在最后一层调用位置中起作用：
  ``` JavaScript
  function foo () {
    console.log(this.a);
  }
  let obj1 = {
    a: 233,
    foo: foo
  };
  let obj2 = {
    a: 2333,
    obj1: obj1
  }
  obj2.obj1.foo() // -> 233
  ```
  - bind方法  
  在讲bind之前不得不先提两种绑定丢失的情况：  
  第一种　　
  ``` JavaScript
  function foo () {
    console.log(this.a);
  }
  var obj = {
    a: 233,
    foo: foo
  };
  var bar = obj.foo;
  var a = 'global a';
  bar(); // -> 'global a'
  ```
    虽然bar是obj.foo的一个引用，但实际上，它引用的foo函数本身，作为普通函数直接调用，非严格模式下，this指向全局对象。
    第二种  
  ``` JavaScript
  function foo () {
    console.log(this.a);
  }
  var obj = {
    a: 233,
    foo: foo
  };
  var a = "global a";
  function doFn(fn) {
    fn();
  }
  doFn(obj.foo); // -> 'global a'
  ```
  ``` JavaScript
  function foo () {
    console.log(this.a);
  }
  var obj = {
    a: 233,
    foo: foo
  };
  var a = "global a";
  setTimeout(obj.foo, 0) // -> 'global a'
  ```
    参数传入的是函数，作为普通函数调用，会导致被传入的这个函数this绑定丢失，this会指向默认的全局对象。
    bind方法可以解决上this绑定丢失的情况：
  ``` JavaScript
  function foo () {
    console.log(this.a);
  }
  var obj = {
    a: 233,
    foo: foo
  };
  var a = "global a";
  var bar = foo.bind(obj);
  function doFn (fn) {
    fn();
  }
  doFn(bar); // -> 233
  ```
    fn.bind(某个对象)会创建一个与fn具有相同函数体和作用域的新函数，在这个新函数中，this将永久地绑定到了bind的第一个参数，无论这个函数如何被调用。
  - call与apply方法  
  这两个方法的第一个参数是一个对象，是给this准备的，接着在调用函数时将其绑定到this。
  ``` JavaScript
  let obj = {
    a:233
  };
  function foo () {
    console.log(this.a);
  }
  foo.call(obj) // -> 233
  ```
  this绑定角度看，apply方法与call方法，区别在于其他参数上。
  - 作为构造函数调用  
  使用new来调用函数时，会自动执行下面操作：
    - 构造一个全新的对象；
    - 构造出的新对象会被执行[[Prototype]]连接；
    - 新对象会绑定到函数调用的this;
    - 如果函数没有返回其他对象，那么表达式中的函数调用会自动返回这个新对象。

   ``` JavaScript
  function foo (a) {
    this.a = a;
  }
  var bar = new foo(233);
  console.log(bar.a); // -> 233
  ```
    使用new来调用foo()时，会构造一个新对象并把它绑定到foo()调用中的this上。
  - 作为DOM事件处理函数  
  当函数被用作事件处理函数时，它的this会指向触发事件的元素。
  - 箭头函数  
  箭头函数会继承外层函数调用的this绑定，在全局作用域中则会绑定到全局对象上。
  ``` JavaScript
  function foo () {
    setTimeout(() => {
      console.log('a', this.a);
      }, 0);
  }
  var a = 'global a';
  foo.call({a: 233}); // -> 233
  ```
    如果是普通函数，执行时this应该指向全局对象，输出的'global a'，而箭头函数this继承它的外层foo函数的this绑定，由于使用call方法将foo函数的this绑定指向{a: 233}，所以输出233。
### 根据优先级判断常见this
  - 函数是否在new中调用？如果是的话，this绑定的是新创建的对象；
  - 函数是否通过call, apply或者bind绑定调用？如果是，this绑定的是指定的对象；
  - 函数是否在某个上下文对象中调用（ var bar = obj.foo() ）？如果是，this绑定到那个上下文对象；
  - 如果都不是，考虑是否是默认绑定，绑定到全局对象。如果是在严格模式下，则绑定到undefined。
  
### 总结
  - 在任何函数体外部，无论是否在严格模式，this都指代全局对象。
  - 在函数内部，this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。
  - 箭头函数会继承外层函数调用的this绑定，在全局作用域中则会绑定到全局对象上。

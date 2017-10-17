# 深入理解闭包

说一个JS中老生常谈而又不能不说的话题：闭包。首先，先说说什么是闭包：**当函数可以记住并访问所在的词法作用域（在书写代码时函数声明的位置决定的作用域）时，就产生了闭包，即使函数在当前词法作用域之外执行。**
如果一句话说明什么是闭包，引用《JS高级程序设计》中对闭包的定义：
> 闭包是指有权访问另一个函数作用域中的变量函数

先来看一个例子：
``` JavaScript
function foo() {
  var gg = 233;
  function bar() {
    console.log(gg)  // ->233
  }
  bar();
}
foo();
```
从闭包的定义来看，函数bar()就是一个闭包，它涵盖了foo()作用域。如果我们在全局访问局部变量gg是访问不到的，但在函数foo()是可以访问得到，这就可以看出**闭包就是能够访问其他函数内部变量的函数。**

再来看一个另外一种形式的闭包：
``` JavaScript
function foo() {
  var gg = 233;
  function bar() {
    console.log(gg);
  }
  return bar;
}
var baz = foo();
baz();
```
这里，函数foo()返回了一个闭包，函数bar。调用函数baz()实际上只是通过不同标识符引用调用了函数bar()，bar()就是在它自己定义的词法作用域之外执行。

如果说闭包仅仅是一种称呼而已，但闭包的身影到处都是。在定时器，Ajax请求，事件监听器等任务中，只要使用了回调函数，实际上就已经是使用了闭包。
``` JavaScript
function await(msg) {
  setTimeout(function timer() {
    console.log(msg);
    }, 100);
}
await('Hello');
```
一般来说，当函数执行完毕后，局部变量会被销毁。但闭包的情况有所不同。100毫秒后，await内部作用域并不会消失,timer仍然涵盖await()的作用域，保有对变量msg的引用。

上面这个例子可以得知闭包存在的问题，闭包会使得函数中的变量都保存在内存中，内存消耗很大，尽管有的JavaScript引擎会尝试回收被闭包占用的内存，但如果滥用闭包，可能会导致性能问题。如果上面的例子想解除引用，可以这么做：
``` JavaScript
function await(msg) {
  setTimeout(function timer() {
    console.log(msg);
    }, 100);
    timer = null;  //通知垃圾回收例程将其回收
}
await('Hello');
```

说到闭包，有一个经典的再不能经典的例子：
``` JavaScript
for (var i=1; i<5; i++) {
  setTimeout(function timer() {
    console.log(i)
    }, 0);
}  // -> 5 5 5 5
```
可能已经猜到输出的结果是4个5，而不是想要的1 2 3 4。为什么呢？当*console.log*被调用的时候，函数timer()保持对外部变量 i 的引用，此时*for*循环已经结束， i 的值被修改成了5，**闭包保存的是整个变量对象**。

为了得到想要的结果，需要在每次循环中创建变量 i 的拷贝，可以通过IIFE（立即执行函数表达式）解决：
``` JavaScript
for (var i=1; i<5; i++) {
  (function(j) {
     setTimeout(function timer() {
       console.log(j);
       }, 0);
    })(i);
}  // -> 1 2 3 4
```
外部的匿名函数会立即执行，并把 i 作为它的参数，由于函数参数是按值传递的，此时函数内 j 变量就拥有了 i 的一个拷贝。在迭代内使用IIFE会为每一个迭代都生成一个新的作用域，因而拷贝的值是不会被循环改变的。

除了使用IIFE，还有一种较为优雅的解决方法，就是使用ECMAScript2015的let关键字：
``` JavaScript
for (let i=1; i<5; i++) {
  setTimeout(function timer() {
    console.log(i)
    }, 0);
}  // -> 1 2 3 4
```
*****
不知不觉到总结时间：
- **闭包是指有权访问另一个函数作用域中的变量函数**
- **闭包是将函数内部和函数外部连接起来的一座桥梁**

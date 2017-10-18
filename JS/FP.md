# 函数式编程
面向对象编程和面向过程编程都是编程范式，函数式编程也是一种编程范式，意味着它们都是软件构建的思维方式。与命令式或面向对象代码相比，函数式代码倾向于更简洁、更可预测以及更易于测试。

### 什么是函数式编程 （通常简称为 FP）
>是指通过复合**纯函数**来构建软件的过程，它避免了**共享的状态**、**易变的数据**、以及**副作用**。函数式编程是**声明式**而不是**命令式**，并且应用程序状态通过纯函数流转。

### 理解函数式编程中核心概念
- 纯函数（Pure functions）
- 函数复合（Function composition）
- 避免共享状态（Avoid shared state）
- 避免改变状态（Avoid mutating state）
- 避免副作用（Avoid side effects）
- 声明式与命令式（Declarative and Imperative）

#### 纯函数
纯函数是满足如下条件的函数：
- 相同输入总是会返回相同的输出
- 不产生副作用
- 不依赖于外部状态  

JS中纯函数的例子：
``` javascript
String.prototype.toUpperCase  
Array.prototype.map
Function.prototype.bind
```
JS中非纯函数的例子：
``` javascript
Date.now
Math.random
Array.prototype.sort
document.body.appendChild
```
纯函数的好处：
1. 易于测试（上下文无关）
2. 可并行计算（时序无关）
3. bug 自限性（问题不会扩散）

#### 函数复合
> 函数复合是结合两个或多个函数，从而产生一个新函数或进行某些计算的过程。

在 JavaScript 中相当于执行 f(g(x))。  

#### 共享状态
> 共享状态 的意思是：任意变量、对象或者内存空间存在于共享作用域（包括全局作用域和闭包作用域）下，或者作为对象的属性在各个作用域之间被传递。

通常，在面向对象编程中，对象以添加属性到其他对象上的方式在作用域之间共享。与面向对象编程不同，函数式编程避免共享状态，它依赖于不可变数据结构和纯粹的计算过程来从已存在的数据中派生出新的数据。    
共享状态的一个常见问题是改变函数调用次序函数调用的次序可能会改变函数调用的结果，进而可能导致一连串的错误：
``` javascript
const x = {
  val: 2
};
const x1 = () => x.val += 1;
const x2 = () => x.val *= 2;
x1(); // -> 3
x2(); // -> 6
```
下面的例子与上面的相同，除了函数调用的次序不同：
``` javascript
const x = {
  val: 2
};
const x1 = () => x.val += 1;
const x2 = () => x.val *= 2;
x2(); // -> 4
x1(); // -> 5
```
如果避免共享状态，就不会改变函数内容，或者改变函数调用的时序不会波及和破坏程序的其他部分：
``` javascript
const x = {
  val: 2
};
const x1 = x => Object.assign({}, x, { val: x.val + 1});
const x2 = x => Object.assign({}, x, { val: x.val * 2});

x1(x); // -> 3
x2(x); // -> 4

/**
x2(x); // -> 4
x1(x); // -> 3
*/
```

#### 不修改状态
在其他类型的语言中，变量往往用来保存"状态"。而函数式编程只是返回新的值，不修改系统变量，即是无破坏性的数据转换。

#### 副作用
> 副作用是指除了函数返回值以外，任何在函数调用之外观察到的应用程序状态改变。

副作用包括：
- 改变了任何外部变量或对象属性
- 写文件
- 发网络请求
- 在屏幕输出
- 调用另一个有副作用的函数  

在函数式编程中，副作用被尽可能避免。

#### 声明式与命令式
- 命令式：程序花费大量代码来描述用来达成期望结果的特定步骤，即"How to do"
- 声明式：程序抽象了控制流过程，花费大量代码描述的是数据流，即"What to do"  

函数式编程是一个声明式范式，意思是说程序逻辑不需要通过明确描述控制流程来表达。  
命令式：
``` javascript
let list = [1, 2, 3, 4];
let map1 = [];
for (let i = 0; i < list.length; i++) {
  map1.push(list[i] * 2);
}
```
声明式：
``` javascript
let list = [1, 2, 3, 4];
let map2 = list.map(x => 2 * x);
```
再来看声明式例子中引出的两个重要概念：
![](https://i.niupic.com/images/2017/10/16/45WWvA.png)  
在讲容器前不得不提什么是范畴：
> 彼此之间存在某种关系的概念、事物、对象等等，都构成"范畴"。

范畴的数学模型简单理解就是："集合 + 函数"。
- 容器（Container）：可以把"范畴"想象成是一个容器，里面包含：值和值的变形（函数）
- 函子（Functor）：是一个有接口的容器，能够遍历其中的值。能够将容器里面的每一个值，映射到另一个容器。

### 函数式编程的应用
在函数式编程中，通常使用functors以及使用**高阶函数**抽象来创建通用功能函数，以处理任意数值或不同类型的数据。

#### 高阶函数
> 高阶函数指的是一个函数以函数为参数，或以函数为返回值，或者既以函数为参数又以函数为返回值。  

高阶函数常用于：
- 部分应用于函数参数（**偏函数**应用）或创建一个**柯里化**的函数，用于复用或**函数复合**。
- 接受一个函数列表并返回一些由这个列表中的函数组成的复合函数。  
面向对象编程倾向于把方法和数据集中到对象上。那些被集中的方法通常只能用来操作包含在特定对象实例上的数据。而函数式编程倾向于复用一组通用的函数功能来处理数据。

#### 偏函数
> 通过指定部分参数来产生一个新定制函数的形式就是偏函数。

``` javascript 
const isType = function (type) {
  return function (obj) {
    return toString.call(obj) == '[object' + type + ']';
  };
};

const isString = isType('string');
const isFunction = isType('function');
```
#### 柯里化
> 柯里化是将一个多参数函数转换成多个单参数函数。

``` javascript
// 柯里化之前
function add(x, y) {
  return x + y;
}

add(1, 2) // 3

// 柯里化之后
function addX(y) {
  return function (x) {
    return x + y;
  };
}

addX(2)(1) // 3
```

#### 函数的复合
> 如果一个值要经过多个函数，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做"函数的复合"。

一个简单的函数的复合例子：
``` javascript
const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
}
```
实现一个高阶函数用来减少非纯函数：
``` javascript
function batch (fn) {
  return function (target, ...args) {
    if (target.length >= 0) {
      return Array.from(target).map(item => fn.apply(this, [item, ...args]));
    } else {
      return fn.apply(this, [target, ...args]);
    }
  }
}
```
例如：[两个非纯函数](https://github.com/iyolee/Front-End/blob/master/Code/FP/twoImpureFunc.js) -> batch(fn) -> [一个非纯函数](https://github.com/iyolee/Front-End/blob/master/Code/FP/oneImpureFunc.js)

### 结论
函数式编程偏好：
- 使用表达式替代语句
- 让可变数据成为不可变的
- 用函数复合替代命令控制流
- 使用声明式而不是命令式代码
- 使用纯函数而不是使用共享状态和副作用
- 使用容器与高阶函数替代多态
- 使用高阶函数来操作许多数据类型，创建通用、可复用功能取代只是操作集中的数据的方法

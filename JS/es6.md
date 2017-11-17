# ECMAScript6 速览
ECMAScript6是ECMAScript历史上最大的一次版本升级，在语言各个方面都有极大的变化。自己在学习中，将一些常用的语法、特性及个人总结写成速览供参考。

### 一、let和const声明
#### let声明 
1. 用let声明的变量仅在块级作用域内有效 

``` javascript
{
  let foo = 233;
  var bar = 2333;
}
console.log(foo); //ReferenceError: foo is not defined
console.log(bar); // -> 2333
```
2. 代码块内部禁止重复声明 

``` JavaScript
var foo = 233;
let foo = 23333;  //SyntaxError: Identifier 'foo' has already been declared
```
3. 不存在变量提升:

``` javascript
console.log(foo);
let foo = 233;  //ReferenceError: foo is not defined
```
let不像var那样会存在“变量提升”，所以，变量一定要在声明后使用。
#### const声明
1. const声明会阻止对于变量绑定与变量自身值的修改

``` JavaScript
const PI = 3.14;
PI = 3; //TypeError: Assignment to constant variable
```
2. const一旦声明常量，必须立即初始化，不能之后再赋值

``` JavaScript
const foo;
foo = 2333; //SyntaxError: Missing initializer in const declaration
```
3. const声明只是保证变量名指向的地址不变，并不保证该地址的数据不变

``` JavaScript
const foo = {
  name: 'lee'
}

//可以修改foo对象的成员，没有修改foo的绑定值
foo.name = 'leeper'; // -> 'leeper'

//当试图为foo改变变量绑定，会导致错误
foo = {
  name: 'leeper'
} //TypeError: Assignment to constant variable
```
#### 暂时性死区（TDZ）
使用let或const声明的变量，在到达声明处之前都是无法访问的，在语法上称为“暂时性死区”，试图访问会导致一个引用错误。（即使使用typeof运算符也是如此）
``` JavaScript
if (true) {
  //TDZ开始
  console.log(typeof foo); //ReferenceError: foo is not defined
  let foo = 233;  //TDZ结束
}
```
#### let, const, var
- const声明：模块内不变的引用和常量
- let声明：可变的变量或引用
- var声明：整个作用域内需要使用的变量

使用let, const赋值语句的执行速度比使用var的快

### 模板字符串
ES6之前，需要借助“字符串+操作符”拼接或数组join()方法连接多个字符串变量。模板字符串实现如下：
``` JavaScript
let name = 'leeper';
let str = `<h2>Hello, ${name}</h2>
    <p>Hello World!</p>`
```
模板字符串不会压缩内部的换行与空格，而是按照原有的格式输出，只将变量内容替换。如果需要去除空格，可以使用trim()方法消除。注意：使用ES6转译工具生成的ES5代码，格式可能丢失。

### 解构赋值
解构赋值主要分为数组解构和对象解构：
``` javascript
let [a, b, c] = [11, 22];

[a, b] = [b, c];  // 交换a, b变量的值
console.log(c);  // -> undefined
```
数组解构是严格按照数组下标依次对应顺序赋值的，如果赋值的常量个数不够，则对应下标变量默认为undefined；如果常量个数超出，则多余的会被舍弃。
``` JavaScript
let {one, two, three} = {two: 2, three: 3, one: 1};
```
对象解构赋值是按对象引用的键名来进行赋值，可以无视顺序。  
注意：如果某个变量已经被声明，就不能参加解构赋值了。

### 数组新特性
ES6为数组内置对象添加了较多新特性， 主要包括...复制数组和新增数组API。
``` JavaScript
const arr = ['leeper', 'zonkin'];
const newArr = [...arr]; // ['leeper', 'zonkin']
```
注意：...进行的数组复制是浅拷贝。
ES6数组新增方法：
- Array.from：用于将类数组对象转化为真正的数组
- Array.of：可以将传入的1一组参数值转换为数组
- Array.prototype.fill：使用给定的值，填充一个数组，会改变原来的数组
- Array.prototype.find：用于找出第一个符合条件的数组元素，有点类似filter
- Array.prototype.findIndex：用来返回某个特定数组元素在数组中的位置
- Array.prototype.copyWithin：可以在当前数组内部将指定位置的数组项复制到其他位置，然后返回当前数组，使用copyWithin方法会修改当前数组
``` JavaScript
let nums = ['one', 'two', 'three'];

console.log(Array.from(nums)); // -> ['one', 'two', 'three']

console.log(Array.of('one', 'two', 'three')); // -> ['one', 'two', 'three']

nums.find(function (num) {
  if (num === 'one') {
    return num;
  }
});  // one

nums.findIndex(function (num) {
  if (num === 'one') {
    return num;
  }
});  // 0

nums.copyWithin(0, 2);  // ['three', 'two', 'three']

// fill会改变数组的值
nums.fill('five');  // ['five', 'five', 'five']
```
ES6还添加了数组迭代的方法：entries(), keys(), values()，entries()是对数组中键值进行遍历, keys()是对数组键名进行遍历, values()是对数组键值进行遍历(注意： Chrome 未实现，Firefox未实现，Edge已实现。)，都是返回一个迭代器对象。
``` JavaScript
for (let index of ['a', 'b'].keys()) {
  console.log(index);  // -> 0 1
}

for (let elem of ['a', 'b'].values()) {
  console.log(elem); // -> "a" "b"
}

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem); 
}
// 0 "a"
// 1 "b"
```
另外，Array.prototype[Symbol.iterator]也可以用来获取遍历数组对象的迭代器。

### 循环与迭代器Iterator
到了ES6，可以用for...in来遍历对象，使用for...of, map, forEach，遍历数组的最佳方式是for...of，此外for...of也可以用来遍历Map, Set, WeakMap, WeakSet等集合。Iterator迭代器的加入则让遍历数组、对象、和集合的方式更加灵活可控，Iterator可以控制每次单步循环触发的时机，不用一次遍历所有的循环。  
原生具备 Iterator 接口的数据结构如下：
- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象

for...of遍历实现：
``` javascript
const nums = [1, 2, 3, 4, 5];
for (let num of nums) {
  console.log(num);
}
```
迭代器遍历数组：
``` JavaScript
const nums = [1, 2, 3];

let iterator = nums[Symbol.iterator]();

//step 1
let result = iterator.next();
console.log(result.value); // -> 1

//step 2
result = iterator.next();
console.log(result.value); // -> 2

//step 3
result = iterator.next();
console.log(result.value); // -> 3
```
每次Iterator调用next()都会返回一个对象{done: false, value: item}, done属性是boolean值，表示循环遍历是否完成，value则是每一步next()调用获取到的值。

### 集合类型Map+Set+WeakMap+WeakSet
ES6之前数组和对象可以存储任何类型的值，但有几个问题需要考虑：
1. 对象的键名只能是字符串
2. 对象没有直接获得属性个数等这些方便操作的方法
3. 对对象的任何操作都需要进入对象的内部数据中完成

ES6增加Map+Set+WeakMap+WeakSet就是为了弥补这些不足。   
Set和Map都有size 属性获取成员总数，都有has, add, delete, clear方法来管理和操作数据集合，另外Map还有set，get方法。WeakSet只存储对象类型的元素，不能遍历，没有size属性；WeakMap只能接受基本类型的值作为键名，没有keys，values，entries等遍历方法，也没有size属性。
``` JavaScript
let ws = new WeakSet();
wa.add({foo: 233});

let wm = new WeakMap();
wm.set('key', {foo: 233});
```  
可以认为：Set是增强的数组类型，Map是增强的对象类型，WeakSet和WeakMap则是Set和Map的优化类型。  
需要注意：Map和Set移除属性可能造成内存泄露问题。

### 函数参数
ES6对函数参数主要添加了默认参数，不定参数和拓展参数。
``` JavaScript
// 默认参数
// 指定了默认值后，length属性将失真

function foo (name = 'leeper') {
  console.log(`Hello, ${name}`);
}
foo();
```
``` JavaScript
// 不定参数
// rest 参数也不会计入length属性

function foo (...name) {
  console.log(name.reduce((a, b) => `Hello, ${a} ${b}`));
}
foo('leeper', 'zonkin');
```
``` JavaScript
// 扩展参数
let name = ['leeper', 'zonkin'];

function foo (name1, name2) {
  console.log(`Hello, ${name1} ${name2}`);
}
foo(...name);
```
不定参数的...和数组复制的...是有区别的，不定参数可以使用函数的形参来表示所有的参数组成的列表。

### 箭头函数
``` JavaScript
// 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分

[1, 2, 3].map(x => x * x);
```
``` javascript
// 如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回

let sum = (num1, num2) => { return num1 + num2; }
```
注意：  
1. 箭头函数与外层执行上下文共享this值
2. 不可以当作构造函数
3. 不可以使用arguments对象
4. 箭头函数不能用作Generator函数

### 增强对象
``` JavaScript
const name = 'leeper';

const person = {
  // 属性简写
  name,
  // 返回变量名或对象作为属性名
  [getKey('age')]: 20,
  // 对象方法属性简写声明
  sayHi () {
    console.log(`Hello ${this.name}`);
  }
}
person.sayHi();

function getKey (key) {
  return key;
}
```

### 类
``` javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
  show () {
    console.log(`${this.x} ${this.color}`);
  }
}

let cp = new ColorPoint(25, 8, 'green');
cp.show(); // -> 25 green
```

### 模块
JavaScript之前的模块规范包括AMD、CMD、CommonJS，ES6又加了import/export。
``` JavaScript
import { foo } from './foo';
export default foo;
```

### Symbol
Symbol是ES6新增加的基本数据类型，一般用作属性键值，并且能避免对象属性键的命名冲突。
``` JavaScript
let object = {};

//属性的键名是Symbol
let name = Symbol();
let age = Symbol();

//仍可以使用object[name]去读取对象的属性
object[name] = 'leeper';
object[age] = 20;

typeof name; // symbol

// Symbol变量是不能被重复声明的
```

### Proxy
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
``` javascript
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

### Reflect
Refelect可以理解为原有对象上的一个引用代理，它用于对原有对象进行赋值或取值操作，但不会触发对象属性的getter或setter调用，而直接使用=对对象进行赋值或取值操作会自动触发getter或setter方法。

### 统一码
ES6字符串支持新的Unicode文本格式，同时也增加了新的正则表达式修饰符u来处理统一码。
``` JavaScript
'字符串'.match(/./ug).length === 3;  // true
```

### 进制数支持
ES6增加了对二进制（b）和八进制（o）数字面量支持。
``` JavaScript
0b111110111 === 503; // true
0o767 === 503 //true
```

### tail calls尾调用
tail calls尾调用保证了函数尾部调用是调用栈有一定的长限制，这使得递归函数即使在没有限制输入时也能保证安全性而避免发生错误。
``` JavaScript
function factorial (n, start = 1) {
  if (n <= 1) {
    return start;
  }
  return factorial(n - 1, n * start);
}

// 默认情况下会发生栈溢出，但是在ES6中是可以安全执行的
factorial(100000);
```

### 生成器Generator
Generator函数可以认为是一个可中断执行的特殊函数，声明方法是在函数名后面加上*来与普通函数区分。使用yield关键字来分割成多个不同的代码段，每次Generator调用next()都只会执行yield关键字之间的一段代码。
``` JavaScript
const generator = function* () {
  const nums = [1, 2, 3, 4];
  for (let num of nums) {
    yield setTimeout(() => {
      console.log(num);
    }, 3000);
  }
}

let result = generator();
let done = result.next();
while (!done.done) {
  done = result.next();
}
console.log('start');
// -> start 1 2 3 4
```

### Promise
Promise可以用来避免异步操作函数里的多层嵌套回调（callback hell）问题。Promise代表一个异步操作的执行返回状态，这个执行返回状态在Promise对象创建时未知的，它允许为异步操作的成功或失败指定处理方法。
``` JavaScript
let promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('A');
    resolve();
  }, 1000);
});
// 只有resolve或reject被调用时，Promise方法才会继续执行，进入下一个then方法操作

promise.then(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('B');
      resolve();
    }, 2000);
  });
}).then(() => {
  return new Promise((resolve, reject) => {
    console.log('C');
  });
});
```
Promise的状态有三种：Fulfilled状态表示Promise执行成功；Rejected状态表示Promise执行失败；Pending表示Promise正在执行中。

### async 函数
ES2017标准引入了 async 函数，使得异步操作变得更加方便，它是 Generator 函数的语法糖。  
async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。  
async 函数多种使用形式：
``` JavaScript
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};

```
``` JavaScript
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
// 50毫秒以后，输出hello world
```

### 参考：
- [阮一峰-《ECMAScript 6 入门》](http://es6.ruanyifeng.com/#README)
- [ECMA草案完整版](https://tc39.github.io/ecma262/)

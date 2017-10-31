# 浅析JavaScript中的提升
JavaScript代码在执行时并不完全是由上到下一行一行执行的，由此产生了一个提升的问题。

### 什么是提升
可以简单理解为：声明(变量和函数)都会被“移动”到各自作用域的最顶端,这个过程被称为提升。

### 具体例子看提升
下面两个例子a会log什么出来呢？
``` JavaScript
a = 233;
var a;
console.log(a)
```
``` JavaScript
console.log(a);
var a = 233;
```
“看起来”第一个例子应该log出undefined，第二个例子变量a在使用前没有先进行声明,因此会抛出ReferenceError异常。但实际上，第一个例子a输出233，第二个例子a输出undefined。  

为什么？  

在知道为什么之前有必要了解：JavaScript虽然是解释型语言，但在解释JavaScript代码之前首先对其进行编译的。编译阶段中的一部分工作就是找到所有的声明,并用合适的作用域将它们关联起来。
    
变量和函数在内的所有声明都会在任何代码被执行前首先被处理。
``` javascript
var a = 233;
```  
上面的声明看起来是一个声明，而对于JavaScript而言实际上这是两个声明：var a;和a = 233;。第一个定义声明是在编译阶段进行的。第二个赋值声明会被留在原地等待执行阶段。  

看回前面两个例子，第一个例子的代码会被这样处理：
``` JavaScript
var a;
a = 233;
console.log(a);
```
第二个例子：
``` JavaScript
var a;
console.log(a);
a = 233;
```  
注意：**只有声明本身会被提升,而赋值或其他运行逻辑会留在原地 。**  

### 函数声明与函数表达式
第一个例子：  
``` JavaScript
foo();
function foo() {
  console.log(a); // undefined
  var a = 233;
}
```
函数foo可以正常执行。  
第二个例子：  
``` JavaScript
foo(); // TypeError
var foo = function bar() {
  // ...
}
```
报错：Uncaught TypeError: foo is not a function  

由此可以看到：**函数声明会被提升,但是函数表达式却不会被提升。**  
第三个例子：
``` JavaScript
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
  // ...
};
```
这段代码经过提升后,可以理解为以下形式:  
``` JavaScript
var foo;
foo(); // TypeError
bar(); // ReferenceError
foo = function() {
  var bar = ...self...
  // ...
};
```
由此可见：**具名的函数表达式,名称标识符在赋值之前也无法在所在作用域中使用。**  

### 函数优先
既然函数声明和变量声明都会被提升，那么问题来了，重复声明的代码中的优先级是怎样的，是函数声明被提升还是变量声明被提升？  
继续验证：
``` JavaScript
foo(); // 1
var foo;
function foo() {
  console.log( 1 );
}
foo = function() {
  console.log( 2 );
}
```
var foo尽管出现在 function foo()...的声明之前，但它是重复的声明而被忽略，因为**函数声明会被提升到普通变量之前**。可以得知：函数声明提升的优先权大于普通变量声明。  
  

尽管重复的var声明会被忽略掉,但**出现在后面的函数声明还是可以覆盖前面的**：
``` JavaScript
foo(); // 3
function foo() {
  console.log( 1 );
}
var foo = function() {
  console.log( 2 );
};
function foo() {
  console.log( 3 );
}
```  

### ES6中的变量声明
ES6新增了let、const声明，它们会存在一个暂时性死区（TDZ），表现出的情况会有所不同，具体可以参考：[let, const](https://github.com/iyolee/Front-End/blob/master/JS/es6.md)

### 总结
- var变量声明和函数声明存在提升
- 函数表达式不会被提升
- 函数声明提升的优先权大于普通变量声明
- let, const由于存在暂时性死区，表现出的情况和var声明有所不同
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
#### let和const声明小结
let和const声明都不会进行变量提升，并且只会在声明它们的代码块内部存在。由于块级绑定存在TDZ，试图在声明位置之前访问它就会导致错误。